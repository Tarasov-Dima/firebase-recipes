import { getIngredientByKey } from "@/data/ingredients";
import { Ingredient } from "@/types";

export type Dish = {
	id: number;
	name: string;
	ingredients: Ingredient[];
	sides?: Ingredient[];
	recipe: string;
};

export const DishId = {
	CottageCheesePancakes: 1234567,
} as const;

export const dishes: { [key: number]: Dish } = {
	[DishId.CottageCheesePancakes]: {
		id: DishId.CottageCheesePancakes,
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
};

export const getDishByKey = (key: keyof typeof DishId) => {
	const dishId = DishId[key];
	return dishes[dishId];
};
