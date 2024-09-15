import { Meal } from "@/data/meals";
import React, { useState } from "react";
import { Card, Divider, SegmentedButtons, Text } from "react-native-paper";
import { IngredientsView } from "./IngredientsView";
import { RecipeView } from "./RecipeView";
import { calculateTotalNutrients } from "@/utils/calculateNutrients";
import { NutrientsView } from "./NutrientsView";

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const BasicMenuItem = ({
	dishes,
	type,
	onAddIngredientsToList,
}: Meal) => {
	const [choice, setChoice] = useState<MenuChoiceType>("ingredients");

	const handleValueChange = (value: string) => {
		setChoice(value as MenuChoiceType);
	};

	const dish = dishes[0];
	const totalIngredients = !!dish.sides
		? [...dish.ingredients, ...dish.sides]
		: dish.ingredients;

	const nutrients = calculateTotalNutrients(totalIngredients);

	const renderContent = () => {
		switch (choice) {
			case "ingredients": {
				return <IngredientsView rowItems={totalIngredients} />;
			}
			case "recipe": {
				return <RecipeView key={dish.name} recipe={dish.recipe} />;
			}
			case "nutrients": {
				return <NutrientsView nutrients={nutrients} />;
			}
		}
	};

	return (
		<Card style={{ marginBottom: 80 }}>
			<Card.Title
				titleVariant='headlineSmall'
				subtitleVariant='bodyLarge'
				subtitle={dishes[0].name}
				subtitleNumberOfLines={3}
				title={type}
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
				<Text variant='titleMedium'>Total weight: {nutrients.weight}g</Text>
			</Card.Content>
		</Card>
	);
};
