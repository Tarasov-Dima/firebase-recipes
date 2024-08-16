import { Ingredient, User } from "@/types";
import {
	calculateIngredientsForCalories,
	calculateTotalNutrients,
} from "./calculateNutrients";
import { calculateMealCaloriesPerPerson } from "./calculateMealCaloriesPerPerson";
import { combineIngredients } from "./combineIngredients";

type UsersTotalNutrientsParams = {
	users: User[] | null | undefined;
	premium: boolean;
	ingredients: Ingredient[];
};

export const usersTotalNutrients = ({
	users,
	premium,
	ingredients,
}: UsersTotalNutrientsParams) => {
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

		combinedMealIngredients = combinedMealIngredients.concat(scaledIngredients);

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
