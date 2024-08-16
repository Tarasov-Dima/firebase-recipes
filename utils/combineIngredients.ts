import { Ingredient } from "@/types";

export const combineIngredients = (ingredients: Ingredient[]): Ingredient[] => {
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
