import type { Ingredient, Nutrients } from "@/types";

const calculateNutrients = ({
	amount,
	nutrients_per_100g,
	weight_per_unit,
}: Ingredient) => {
	const amountInGrams =
		weight_per_unit !== undefined
			? amount.number * weight_per_unit
			: amount.number;

	const nutrients = (
		Object.keys(nutrients_per_100g) as (keyof Omit<Nutrients, "weight">)[]
	).reduce((acc, nutrient) => {
		const rawValue = (nutrients_per_100g[nutrient] / 100) * amountInGrams;
		acc[nutrient] = parseFloat(rawValue.toFixed(2));
		return acc;
	}, {} as Nutrients);

	nutrients.weight = amountInGrams;

	return nutrients;
};

export const calculateTotalNutrients = (ingredients: Ingredient[]) => {
	const totalNutrients: Nutrients = {
		protein: 0,
		carbohydrates: 0,
		fat: 0,
		energy: 0,
		weight: 0,
	};

	ingredients.forEach((ingredient) => {
		const nutrientInfo = calculateNutrients(ingredient);
		(Object.keys(nutrientInfo) as (keyof Nutrients)[]).forEach((nutrient) => {
			totalNutrients[nutrient] += nutrientInfo[nutrient];
		});
	});
	return totalNutrients;
};

export const calculateIngredientsForCalories = (
	ingredients: Ingredient[],
	personCaloriesPerMeal: number
) => {
	const totalNutrients = calculateTotalNutrients(ingredients);
	const totalMealCalories = totalNutrients.energy;

	if (totalMealCalories === 0) {
		throw new Error("Total meal calories cannot be zero.");
	}

	const scaleFactor = personCaloriesPerMeal / totalMealCalories;

	const scaledIngredients = ingredients.map((ingredient) => {
		const scaledAmount = {
			...ingredient.amount,
			number: ingredient.amount.number * scaleFactor,
		};

		return {
			...ingredient,
			amount: scaledAmount,
		};
	});

	return scaledIngredients;
};
