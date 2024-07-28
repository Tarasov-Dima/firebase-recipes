import React, { useState } from "react";
import { IngredientsView } from "./IngredientsView";
import { Card, SegmentedButtons, Switch } from "react-native-paper";
import { NutrientsView } from "./NutrientsView";
import { RecipeView } from "./RecipeView";
import type { Ingredient, Recipe } from "@/types";
import {
	calculateIngredientsForCalories,
	calculateTotalNutrients,
} from "@/utils/calculateNutrients";
import { useStorage } from "@/useStorage";
import { calculateMealCaloriesPerPerson } from "@/utils/calculateMealCalroriesPerPerson";

type MenuItemProps = {
	title: "breakfast" | "lunch" | "dinner";
	ingredients: Ingredient[];
	recipe: Recipe;
	name: string;
};

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const MenuItem = ({
	title,
	ingredients,
	recipe,
	name,
}: MenuItemProps) => {
	const [choice, setChoice] = useState<MenuChoiceType>("ingredients");
	const [premium, setPremium] = useState(false);

	const { data: user } = useStorage("Dima");

	const onToggleSwitch = () => setPremium(!premium);

	const personCaloriesPerMeal = calculateMealCaloriesPerPerson({
		personDayCalories: user?.calculateAMR,
		type: "breakfast",
	});

	const scaledIngredients = calculateIngredientsForCalories(
		ingredients,
		personCaloriesPerMeal
	);
	const mealIngredients = premium ? scaledIngredients : ingredients;
	const totalNutrients = calculateTotalNutrients(mealIngredients);

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

	return (
		<Card>
			<Switch value={premium} onValueChange={onToggleSwitch} />
			<Card.Title title={`${title}: ${name}`} />
			<Card.Content>
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
			</Card.Content>
		</Card>
	);
};
