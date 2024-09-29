import { Nutrients } from "@/types";
import { Category, getCategoryByKey } from "./category";
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
	category: Category;
};

export const ingredients: { [key in IngredientNutrientIDType]: Ingredient } = {
	[IngredientNutrientID.CottageCheese]: {
		id: 1,
		name: "cottage cheese",
		nutrients_per_100g: getNutrientByKey("CottageCheese"),
		category: getCategoryByKey("Dairy"),
	},
	[IngredientNutrientID.Eggs]: {
		id: 2,
		name: "eggs",
		nutrients_per_100g: getNutrientByKey("Eggs"),
		weight_per_unit: 50,
		category: getCategoryByKey("Eggs"),
	},
	[IngredientNutrientID.Flour]: {
		id: 3,
		name: "flour",
		nutrients_per_100g: getNutrientByKey("Flour"),
		category: getCategoryByKey("BakingSupplies"),
	},
	[IngredientNutrientID.BakingPowder]: {
		id: 4,
		name: "baking powder",
		nutrients_per_100g: getNutrientByKey("BakingPowder"),
		category: getCategoryByKey("BakingSupplies"),
	},
	[IngredientNutrientID.Milk]: {
		id: 5,
		name: "milk",
		nutrients_per_100g: getNutrientByKey("Milk"),
		category: getCategoryByKey("Dairy"),
	},
	[IngredientNutrientID.SourCreme]: {
		id: 6,
		name: "sour cream 18%",
		nutrients_per_100g: getNutrientByKey("SourCreme"),
		category: getCategoryByKey("Dairy"),
	},
	[IngredientNutrientID.Raspberry]: {
		id: 7,
		name: "raspberry",
		nutrients_per_100g: getNutrientByKey("Raspberry"),
		category: getCategoryByKey("Fruits"),
	},
	[IngredientNutrientID.Salt]: {
		id: 8,
		name: "salt",
		nutrients_per_100g: getNutrientByKey("Salt"),
		category: getCategoryByKey("SeasoningsAndSpices"),
	},
};

export const getIngredientByKey = (key: keyof typeof IngredientNutrientID) => {
	const id = IngredientNutrientID[key];
	return ingredients[id];
};
