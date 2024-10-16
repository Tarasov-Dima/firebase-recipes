import { Ingredient, Nutrients, User } from "@/types";
import { calculateMealCaloriesPerPerson } from "./calculateMealCaloriesPerPerson";
import {
	calculateIngredientsForCalories,
	calculateNutrients,
	calculateTotalNutrients,
} from "./calculateNutrients";
import { Dish } from "@/data/dishes";
import { type MealVariant } from "@/data/meals";
import { dishes } from "../data/dishes";

type PrepareMealDataForUsersParams = {
	users: User[] | undefined | null;
	dish: Dish;
	mealType: MealVariant;
	premium: boolean;
};

type PreparedDishData = {
	name: string;
	ingredients: Ingredient[];
	nutrients: Nutrients;
}[];

export type PreparedDataForUser = {
	userName: "All" | User["name"];
	dishes: PreparedDishData;
	totalNutrients: Nutrients;
}[];

export const prepareMealDataForUsers = ({
	users,
	dish,
	mealType,
	premium,
}: PrepareMealDataForUsersParams): PreparedDataForUser => {
	if (!users || !premium) {
		const dishes = prepareDishes({ dish });
		return [
			{
				userName: "All",
				dishes: dishes,
				totalNutrients: calculateTotalNutrientsForMeal(dishes),
			},
		];
	}
	let allUsersCalories = 0;

	const preparedDataForUsers = users.map((user) => {
		const personCaloriesPerMeal = calculateMealCaloriesPerPerson({
			personDayCalories: user?.calculateAMR,
			type: mealType,
		});

		allUsersCalories += personCaloriesPerMeal;

		const userDishes = prepareDishes({ calories: personCaloriesPerMeal, dish });

		return {
			userName: user.name,
			dishes: userDishes,
			totalNutrients: calculateTotalNutrientsForMeal(userDishes),
		};
	});

	const allUserDishes = prepareDishes({ calories: allUsersCalories, dish });

	const allUser = {
		userName: "All",
		dishes: allUserDishes,
		totalNutrients: calculateTotalNutrientsForMeal(allUserDishes),
	};

	return [allUser, ...preparedDataForUsers];
};

const prepareDishes = ({
	calories,
	dish,
}: {
	calories?: number;
	dish: Dish;
}): PreparedDishData => {
	const totalIngredients = [...dish.ingredients, ...(dish.sides || [])];

	const scaledIngredients = !!calories
		? calculateIngredientsForCalories(totalIngredients, calories)
		: totalIngredients;

	const preparedSides =
		dish.sides?.map((side) => {
			const ingredients = scaledIngredients.find(
				(ingredient) => ingredient.name === side.name
			)!;

			return {
				name: side.name,
				ingredients: [ingredients],
				nutrients: calculateNutrients(ingredients),
			};
		}) || [];

	const mainIngredients = scaledIngredients.filter(
		(ingredient) => !dish.sides?.some((side) => side.name === ingredient.name)
	);

	const mainDish = {
		name: dish.name,
		ingredients: [...mainIngredients],
		nutrients: calculateTotalNutrients(mainIngredients),
	};

	return [mainDish, ...preparedSides];
};

const calculateTotalNutrientsForMeal = (dishes: PreparedDishData) => {
	return dishes.reduce<Nutrients>(
		(totalNutrients, dish) => {
			totalNutrients.carbohydrates += dish.nutrients.carbohydrates;
			totalNutrients.energy += dish.nutrients.energy;
			totalNutrients.fat += dish.nutrients.fat;
			totalNutrients.protein += dish.nutrients.protein;
			totalNutrients.weight += dish.nutrients.weight;

			return totalNutrients;
		},
		{ carbohydrates: 0, energy: 0, fat: 0, protein: 0, weight: 0 }
	);
};
