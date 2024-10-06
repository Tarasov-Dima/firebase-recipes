import { getIngredientByKey } from "@/data/ingredients";
import { Ingredient } from "@/types";

export type Dish = {
	id: string;
	name: string;
	ingredients: Ingredient[];
	sides?: Ingredient[];
	recipe: string;
	type: "Breakfast" | "Lunch" | "Dinner";
};

export const DishId = {
	CottageCheesePancakes: "CottageCheesePancakes",
	EggsWithBeansInTomatoSous: "EggsWithBeansInTomatoSous",
	UdonShrimpStirFry: "UdonShrimpStirFry",
} as const;

export const dishes: { [key: string]: Dish } = {
	[DishId.CottageCheesePancakes]: {
		id: DishId.CottageCheesePancakes,
		type: "Breakfast",
		name: "Cottage Cheese Pancakes with sour cream (18%) and raspberry.",
		ingredients: [
			{
				...getIngredientByKey("CottageCheese"),
				amount: { number: 430, type: "g" },
			},
			{
				...getIngredientByKey("Eggs"),
				amount: { number: 4 },
			},
			{
				...getIngredientByKey("Flour"),
				amount: { number: 110, type: "g" },
			},
			{
				...getIngredientByKey("BakingPowder"),
				amount: { number: 5, type: "g" },
			},
			{
				...getIngredientByKey("Milk"),
				amount: { number: 40, type: "ml" },
			},
		],
		sides: [
			{
				...getIngredientByKey("SourCreme"),
				amount: { number: 80, type: "g" },
			},
			{
				...getIngredientByKey("Raspberry"),
				amount: { number: 200, type: "g" },
			},
		],
		recipe: `
			Crumble the cottage cheese. 
			Add eggs and milk. 
			Mix until smooth. 
			Sift the flour with baking powder. 
			Add a pinch of salt to taste. 
			Mix until smooth. 
			The consistency should be like very thick sour cream. 
			If the pan is not non-stick (steel), grease it with a small amount of sunflower oil or cooking oil. 
			Spread the oil with a brush over the pan. 
			Place spoonfuls of batter onto the heated pan, one spoonful = one cottage cheese pancake.
			Serve with sour cream and raspberry.
			`,
	},
	[DishId.EggsWithBeansInTomatoSous]: {
		id: DishId.EggsWithBeansInTomatoSous,
		type: "Breakfast",
		name: "Eggs with beans in tomato sous",
		ingredients: [
			{
				...getIngredientByKey("Eggs"),
				amount: { number: 3 },
			},
			{
				...getIngredientByKey("Tomato"),
				amount: {
					number: 450,
					type: "g",
				},
			},
			{
				...getIngredientByKey("Beans"),
				amount: {
					number: 250,
					type: "g",
				},
			},
		],
		recipe: `do something`,
	},
	[DishId.UdonShrimpStirFry]: {
		id: DishId.UdonShrimpStirFry,
		type: "Lunch",
		name: "Udon Noodles with Shrimp and Zucchini",
		ingredients: [
			{
				...getIngredientByKey("UdonNoodles"),
				amount: { number: 150, type: "g" },
			},
			{
				...getIngredientByKey("VegetableOil"),
				amount: { number: 14, type: "g" },
			},
			{
				...getIngredientByKey("Zucchini"),
				amount: { number: 350, type: "g" },
			},
			{
				...getIngredientByKey("CurryPaste"),
				amount: { number: 15, type: "g" },
			},
			{
				...getIngredientByKey("Shrimp"),
				amount: { number: 250, type: "g" },
			},
			{
				...getIngredientByKey("CoconutMilk"),
				amount: { number: 250, type: "ml" },
			},
		],
		sides: [
			{
				...getIngredientByKey("Coriander"),
				amount: { number: 10, type: "g" },
			},
		],
		recipe: `
		Cook the noodles according to the package instructions. 
		Wash the zucchini and cut it into cubes. 
		Defrost the shrimp if frozen, then peel and clean them.
		Heat the oil in a large pan. Add the zucchini and stir-fry for about 6 minutes. 
		Meanwhile, add the curry paste. 
		Add the shrimp and stir-fry on high heat for about 1 minute. 
		Add the turmeric, season with salt, and stir.
		Pour in the coconut milk and bring to a boil. 
		Cook for about 2 minutes. 
		Add the cooked, drained noodles, mix, and heat through. 
		Serve topped with fresh coriander leaves.
	`,
	},
};

export const getDishByKey = (key: keyof typeof DishId) => {
	const dishId = DishId[key];
	return dishes[dishId];
};
