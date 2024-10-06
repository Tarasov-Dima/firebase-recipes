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
		id: IngredientNutrientID.CottageCheese,
		name: "cottage cheese",
		nutrients_per_100g: getNutrientByKey("CottageCheese"),
		category: getCategoryByKey("Dairy"),
	},
	[IngredientNutrientID.Eggs]: {
		id: IngredientNutrientID.Eggs,
		name: "eggs",
		nutrients_per_100g: getNutrientByKey("Eggs"),
		weight_per_unit: 50,
		category: getCategoryByKey("Eggs"),
	},
	[IngredientNutrientID.Flour]: {
		id: IngredientNutrientID.Flour,
		name: "flour",
		nutrients_per_100g: getNutrientByKey("Flour"),
		category: getCategoryByKey("BakingSupplies"),
	},
	[IngredientNutrientID.BakingPowder]: {
		id: IngredientNutrientID.BakingPowder,
		name: "baking powder",
		nutrients_per_100g: getNutrientByKey("BakingPowder"),
		category: getCategoryByKey("BakingSupplies"),
	},
	[IngredientNutrientID.Milk]: {
		id: IngredientNutrientID.Milk,
		name: "milk",
		nutrients_per_100g: getNutrientByKey("Milk"),
		category: getCategoryByKey("Dairy"),
	},
	[IngredientNutrientID.SourCreme]: {
		id: IngredientNutrientID.SourCreme,
		name: "sour cream 18%",
		nutrients_per_100g: getNutrientByKey("SourCreme"),
		category: getCategoryByKey("Dairy"),
	},
	[IngredientNutrientID.Raspberry]: {
		id: IngredientNutrientID.Raspberry,
		name: "raspberry",
		nutrients_per_100g: getNutrientByKey("Raspberry"),
		category: getCategoryByKey("Fruits"),
	},
	[IngredientNutrientID.Salt]: {
		id: IngredientNutrientID.Salt,
		name: "salt",
		nutrients_per_100g: getNutrientByKey("Salt"),
		category: getCategoryByKey("SeasoningsAndSpices"),
	},
	[IngredientNutrientID.UdonNoodles]: {
		id: IngredientNutrientID.UdonNoodles,
		name: "udon noodles",
		nutrients_per_100g: getNutrientByKey("UdonNoodles"),
		category: getCategoryByKey("GrainsAndCereals"),
	},
	[IngredientNutrientID.VegetableOil]: {
		id: IngredientNutrientID.VegetableOil,
		name: "vegetable oil",
		nutrients_per_100g: getNutrientByKey("VegetableOil"),
		category: getCategoryByKey("OilsAndFats"),
	},
	[IngredientNutrientID.Zucchini]: {
		id: IngredientNutrientID.Zucchini,
		name: "zucchini",
		nutrients_per_100g: getNutrientByKey("Zucchini"),
		category: getCategoryByKey("Vegetables"),
	},
	[IngredientNutrientID.CurryPaste]: {
		id: IngredientNutrientID.CurryPaste,
		name: "curry paste",
		nutrients_per_100g: getNutrientByKey("CurryPaste"),
		category: getCategoryByKey("SeasoningsAndSpices"),
	},
	[IngredientNutrientID.Shrimp]: {
		id: IngredientNutrientID.Shrimp,
		name: "shrimp",
		nutrients_per_100g: getNutrientByKey("Shrimp"),
		category: getCategoryByKey("Seafood"),
	},
	[IngredientNutrientID.CoconutMilk]: {
		id: IngredientNutrientID.CoconutMilk,
		name: "coconut milk",
		nutrients_per_100g: getNutrientByKey("CoconutMilk"),
		category: getCategoryByKey("DairyAlternatives"),
	},
	[IngredientNutrientID.Coriander]: {
		id: IngredientNutrientID.Coriander,
		name: "coriander",
		nutrients_per_100g: getNutrientByKey("Coriander"),
		category: getCategoryByKey("Herbs"),
	},
	[IngredientNutrientID.Tomato]: {
		id: IngredientNutrientID.Tomato,
		name: "tomato",
		nutrients_per_100g: getNutrientByKey("Tomato"),
		category: getCategoryByKey("Vegetables"),
	},
	[IngredientNutrientID.Beans]: {
		id: IngredientNutrientID.Beans,
		name: "beans",
		nutrients_per_100g: getNutrientByKey("Beans"),
		category: getCategoryByKey("Vegetables"),
	},
};

export const getIngredientByKey = (key: keyof typeof IngredientNutrientID) => {
	const id = IngredientNutrientID[key];
	return ingredients[id];
};
