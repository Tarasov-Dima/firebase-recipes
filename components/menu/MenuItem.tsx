import React, { useState } from "react";
import { IngredientsView } from "./IngredientsView";
import { Card, Divider, SegmentedButtons, Text } from "react-native-paper";
import { NutrientsView } from "./NutrientsView";
import { RecipeView } from "./RecipeView";
import { User, type Ingredient, type Recipe } from "@/types";
import { useStorage } from "@/useStorage";
import { usersTotalNutrients } from "@/utils/usersTotalNutrients";
import { useThemeContext } from "@/theme";
import { CalorieDistribution } from "./CalorieDistribution";

type MenuItemProps = {
	title: "Breakfast" | "lunch" | "dinner";
	ingredients: Ingredient[];
	recipe: Recipe;
	name: string;
	premium: boolean;
};

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const MenuItem = ({
	title,
	ingredients,
	recipe,
	name,
	premium,
}: MenuItemProps) => {
	const [choice, setChoice] = useState<MenuChoiceType>("ingredients");
	const { data: users } = useStorage<User[]>("users");

	const { mealIngredients, totalNutrients } = usersTotalNutrients({
		users,
		premium,
		ingredients,
	});

	const renderContent = () => {
		switch (choice) {
			case "ingredients": {
				return <IngredientsView rowItems={mealIngredients} />;
			}
			case "recipe": {
				return <RecipeView recipe={recipe} />;
			}
			case "nutrients": {
				return <NutrientsView nutrients={totalNutrients} />;
			}
		}
	};

	const handleValueChange = (value: string) => {
		setChoice(value as MenuChoiceType);
	};

	const renderPortionWeight = () => {
		const isNutrientsAsArray = Array.isArray(totalNutrients);

		if (!isNutrientsAsArray) {
			return (
				<Text variant='titleMedium'>
					Total weight: {totalNutrients.weight}g
				</Text>
			);
		}

		const totalWeight = Math.round(
			totalNutrients.reduce((acc, currentValue) => {
				return (acc += currentValue.nutrients.weight);
			}, 0)
		);

		return (
			<CalorieDistribution
				totalNutrients={totalNutrients}
				totalWeight={totalWeight}
			/>
		);
	};

	return (
		<Card style={{ marginBottom: 80 }}>
			<Card.Title
				titleVariant='headlineSmall'
				subtitleVariant='bodyLarge'
				subtitle={name}
				title={title}
			/>
			<Card.Content style={{ gap: 10 }}>
				<SegmentedButtons
					value={choice}
					onValueChange={handleValueChange}
					buttons={[
						{ value: "ingredients", label: "Ingredients" },
						{ value: "recipe", label: "Recipe" },
						{ value: "nutrients", label: "Nutrients" },
					]}
				/>
				{renderContent()}
				<Divider bold style={{ marginVertical: 10 }} />
				{renderPortionWeight()}
			</Card.Content>
		</Card>
	);
};
