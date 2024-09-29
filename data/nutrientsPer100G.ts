import { Nutrients } from "@/types";

export const IngredientNutrientID = {
	CottageCheese: 1,
	Eggs: 2,
	Flour: 3,
	BakingPowder: 4,
	Milk: 5,
	SourCreme: 6,
	Raspberry: 7,
	Salt: 8,
} as const;

export type IngredientNutrientIDType =
	(typeof IngredientNutrientID)[keyof typeof IngredientNutrientID];

export const nutrientsPer100G: {
	[key: number]: Omit<Nutrients, "weight">;
} = {
	[IngredientNutrientID.CottageCheese]: {
		energy: 98,
		protein: 11.1,
		fat: 4.3,
		carbohydrates: 3.4,
	},
	[IngredientNutrientID.Eggs]: {
		energy: 155,
		protein: 13,
		fat: 11,
		carbohydrates: 1.1,
	},
	[IngredientNutrientID.Flour]: {
		energy: 364,
		protein: 10,
		fat: 1,
		carbohydrates: 76,
	},
	[IngredientNutrientID.BakingPowder]: {
		energy: 53,
		protein: 0,
		fat: 0,
		carbohydrates: 28.1,
	},
	[IngredientNutrientID.Milk]: {
		energy: 42,
		protein: 3.4,
		fat: 1,
		carbohydrates: 5,
	},
	[IngredientNutrientID.SourCreme]: {
		energy: 196,
		protein: 2.7,
		fat: 19,
		carbohydrates: 3.7,
	},
	[IngredientNutrientID.Raspberry]: {
		energy: 53,
		protein: 1.2,
		fat: 0.7,
		carbohydrates: 12,
	},
	[IngredientNutrientID.Salt]: {
		energy: 0,
		protein: 0,
		fat: 0,
		carbohydrates: 0,
	},
};

export const getNutrientByKey = (key: keyof typeof IngredientNutrientID) => {
	const id = IngredientNutrientID[key];
	return nutrientsPer100G[id];
};
