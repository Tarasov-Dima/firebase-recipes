import { type Dish, getDishByKey } from "./dishes";

export type MealVariant = "Breakfast" | "Lunch" | "Dinner";

export const MealType = {
	Breakfast: "Breakfast",
	Lunch: "Lunch",
	Dinner: "Dinner",
} as const;

export type Meal = {
	id: string;
	type: MealVariant;
	dishes: Dish[];
	image: string;
};

type DayMeals = Meal[];
// breakfast: Meal;
// lunch: Meal;
// dinner: Meal;

export const MealDayID = {
	day1: 1,
	day2: 2,
	day3: 3,
	day4: 4,
	day5: 5,
	day6: 6,
	day7: 7,
	day8: 8,
	day9: 9,
	day10: 10,
	day11: 11,
	day12: 12,
	day13: 13,
	day14: 14,
	day15: 15,
	day16: 16,
	day17: 17,
	day18: 18,
	day19: 19,
	day20: 20,
	day21: 21,
	day22: 22,
	day23: 23,
	day24: 24,
	day25: 25,
	day26: 26,
	day27: 27,
	day28: 28,
	day29: 29,
	day30: 30,
} as const;

export type MealDayId = (typeof MealDayID)[keyof typeof MealDayID];

export const meals: Record<number, DayMeals> = {
	[MealDayID.day1]: [
		{
			id: MealDayID.day1 + MealType.Breakfast,
			type: MealType.Breakfast,
			dishes: [getDishByKey("CottageCheesePancakes")],
			image: require("../assets/images/food/pancake.webp"),
		},
		{
			id: MealDayID.day1 + MealType.Lunch,
			type: MealType.Lunch,
			dishes: [getDishByKey("UdonShrimpStirFry")],
			image: require("../assets/images/food/udonShrimpStirFry.webp"),
		},
		{
			id: MealDayID.day1 + MealType.Dinner,
			type: MealType.Dinner,
			dishes: [getDishByKey("CottageCheesePancakes")],
			image: require("../assets/images/food/pancake3.webp"),
		},
	],
	[MealDayID.day2]: [
		{
			id: MealDayID.day2 + MealType.Breakfast,
			type: MealType.Breakfast,
			dishes: [getDishByKey("EggsWithBeansInTomatoSous")],
			image: require("../assets/images/food/eggsWithBeansInTomatoSous.webp"),
		},
		{
			id: MealDayID.day2 + MealType.Lunch,
			type: MealType.Lunch,
			dishes: [getDishByKey("CottageCheesePancakes")],
			image: require("../assets/images/favicon.png"),
		},
		{
			id: MealDayID.day2 + MealType.Dinner,
			type: MealType.Dinner,
			dishes: [getDishByKey("CottageCheesePancakes")],
			image: require("../assets/images/food/pancake.webp"),
		},
	],
};

export const getMealById = (id: number) => {
	return meals[id];
};

// export const getMealByDay = () => {
// 	const meals = [
// 		getMealByKey("firstBreakfast"),
// 		getMealByKey("firstLunch"),
// 		getMealByKey("firstLunch"),
// 		getMealByKey("firstLunch"),
// 	];
// 	return meals;
// };
