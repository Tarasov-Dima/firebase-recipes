import React, { useState } from "react";
import { IngredientsView } from "./IngredientsView";
import {
	Card,
	Divider,
	SegmentedButtons,
	Switch,
	Text,
} from "react-native-paper";
import { NutrientsView } from "./NutrientsView";
import { RecipeView } from "./RecipeView";
import type { Ingredient, Recipe } from "@/types";
import {
	calculateIngredientsForCalories,
	calculateTotalNutrients,
} from "@/utils/calculateNutrients";
import { useStorage } from "@/useStorage";
import { calculateMealCaloriesPerPerson } from "@/utils/calculateMealCaloriesPerPerson";

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

	const { data: users } = useStorage("users");

	const onToggleSwitch = () => setPremium(!premium);

	const usersTotalNutrients = () => {
		if (!users || users.length === 0 || !premium) {
			return {
				mealIngredients: ingredients,
				totalNutrients: calculateTotalNutrients(ingredients),
			};
		}
		let combinedMealIngredients: Ingredient[] = [];

		const totalNutrientsPerUser = users.map((user) => {
			const personCaloriesPerMeal = calculateMealCaloriesPerPerson({
				personDayCalories: user?.calculateAMR,
				type: "breakfast",
			});
			const scaledIngredients = calculateIngredientsForCalories(
				ingredients,
				personCaloriesPerMeal
			);

			combinedMealIngredients =
				combinedMealIngredients.concat(scaledIngredients);

			return {
				user: user.name,
				nutrients: calculateTotalNutrients(scaledIngredients),
			};
		});
		return {
			mealIngredients: combineIngredients(combinedMealIngredients),
			totalNutrients: totalNutrientsPerUser,
		};
	};

	const { mealIngredients, totalNutrients } = usersTotalNutrients();

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
			return <Text>Total weight: {totalNutrients.weight}g</Text>;
		}

		const totalWeight = Math.round(
			totalNutrients.reduce((acc, currentValue) => {
				return (acc += currentValue.nutrients.weight);
			}, 0)
		);

		return (
			<>
				<Text>Total weight: {totalWeight}g</Text>
				{totalNutrients.map((item) => {
					const portionWeightForPerson = Math.round(item.nutrients.weight);
					const portionPercentForPerson = Math.round(
						(portionWeightForPerson * 100) / totalWeight
					);
					return (
						<Text key={item.user}>
							For {item.user}: {portionWeightForPerson}g{" "}
							{portionPercentForPerson}%
						</Text>
					);
				})}
			</>
		);
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
				<Divider />
				{renderPortionWeight()}
			</Card.Content>
		</Card>
	);
};

const combineIngredients = (ingredients: Ingredient[]): Ingredient[] => {
	const combined: Record<string, Ingredient> = {};

	ingredients.forEach((ingredient) => {
		const { name, amount, nutrients_per_100g, weight_per_unit } = ingredient;

		if (!combined[name]) {
			combined[name] = {
				amount: { number: 0, type: amount.type },
				id: ingredient.id,
				name,
				nutrients_per_100g,
				weight_per_unit,
			};
		}

		combined[name].amount.number += amount.number;
	});

	return Object.values(combined);
};
