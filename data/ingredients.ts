import { Nutrients } from "@/types";
import {
	IngredientNutrientID,
	IngredientNutrientIDType,
	getNutrientByKey,
} from "./nutrientsPer100G";

type Ingredient = {
	name: string;
	nutrients_per_100g: Omit<Nutrients, "weight">;
	weight_per_unit?: number;
};

export const ingredients: { [key in IngredientNutrientIDType]: Ingredient } = {
	[IngredientNutrientID.CottageCheese]: {
		name: "cottage cheese",
		nutrients_per_100g: getNutrientByKey("CottageCheese"),
	},
	[IngredientNutrientID.Eggs]: {
		name: "eggs",
		nutrients_per_100g: getNutrientByKey("Eggs"),
		weight_per_unit: 50,
	},
	[IngredientNutrientID.Flour]: {
		name: "flour",
		nutrients_per_100g: getNutrientByKey("Flour"),
	},
	[IngredientNutrientID.BakingPowder]: {
		name: "baking powder",
		nutrients_per_100g: getNutrientByKey("BakingPowder"),
	},
	[IngredientNutrientID.Milk]: {
		name: "milk",
		nutrients_per_100g: getNutrientByKey("Milk"),
	},
	[IngredientNutrientID.SourCreme]: {
		name: "sour cream 18%",
		nutrients_per_100g: getNutrientByKey("SourCreme"),
	},
	[IngredientNutrientID.Raspberry]: {
		name: "raspberry",
		nutrients_per_100g: getNutrientByKey("Raspberry"),
	},
};

export const getIngredientByKey = (key: keyof typeof IngredientNutrientID) => {
	const id = IngredientNutrientID[key];
	return ingredients[id];
};
