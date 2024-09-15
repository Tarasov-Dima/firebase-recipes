import { Nutrients } from "@/types";
import {
	IngredientNutrientID,
	IngredientNutrientIDType,
	getNutrientByKey,
} from "./nutrientsPer100G";

type Ingredient = {
	id: number;
	name: string;
	nutrients_per_100g: Omit<Nutrients, "weight">;
	weight_per_unit?: number;
};

export const ingredients: { [key in IngredientNutrientIDType]: Ingredient } = {
	[IngredientNutrientID.CottageCheese]: {
		id: 1,
		name: "cottage cheese",
		nutrients_per_100g: getNutrientByKey("CottageCheese"),
	},
	[IngredientNutrientID.Eggs]: {
		id: 2,
		name: "eggs",
		nutrients_per_100g: getNutrientByKey("Eggs"),
		weight_per_unit: 50,
	},
	[IngredientNutrientID.Flour]: {
		id: 3,
		name: "flour",
		nutrients_per_100g: getNutrientByKey("Flour"),
	},
	[IngredientNutrientID.BakingPowder]: {
		id: 4,
		name: "baking powder",
		nutrients_per_100g: getNutrientByKey("BakingPowder"),
	},
	[IngredientNutrientID.Milk]: {
		id: 5,
		name: "milk",
		nutrients_per_100g: getNutrientByKey("Milk"),
	},
	[IngredientNutrientID.SourCreme]: {
		id: 6,
		name: "sour cream 18%",
		nutrients_per_100g: getNutrientByKey("SourCreme"),
	},
	[IngredientNutrientID.Raspberry]: {
		id: 7,
		name: "raspberry",
		nutrients_per_100g: getNutrientByKey("Raspberry"),
	},
};

export const getIngredientByKey = (key: keyof typeof IngredientNutrientID) => {
	const id = IngredientNutrientID[key];
	return ingredients[id];
};
