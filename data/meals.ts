import { type Dish, getDishByKey } from "./dishes";

export type MealVariant = "Breakfast" | "Lunch" | "Dinner";

export type Meal = {
	id: number;
	type: MealVariant;
	dishes: Dish[];
};
export const MealID = {
	firstBreakfast: 1,
	firstLunch: 2,
} as const;

export const meals: { [key: number]: Meal } = {
	[MealID.firstBreakfast]: {
		id: MealID.firstBreakfast,
		type: "Breakfast",
		dishes: [getDishByKey("CottageCheesePancakes")],
	},
	[MealID.firstLunch]: {
		id: MealID.firstLunch,
		type: "Lunch",
		dishes: [getDishByKey("CottageCheesePancakes")],
	},
};

export const getMealByKey = (key: keyof typeof MealID) => {
	const mealId = MealID[key];
	return meals[mealId];
};

export const getMealByDay = () => {
	const meals = [getMealByKey("firstBreakfast"), getMealByKey("firstLunch")];
	return meals;
};
