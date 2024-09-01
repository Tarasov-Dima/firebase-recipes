import { type MealVariant } from "@/data/meals";

const percentCaloriesMealMap: Record<MealVariant, { percent: number }> = {
	Breakfast: { percent: 28 },
	Lunch: { percent: 33 },
	Dinner: { percent: 39 },
};

type CalculateMealCaloriesPerPersonProps = {
	personDayCalories: number | undefined;
	type: MealVariant;
};

export const calculateMealCaloriesPerPerson = ({
	personDayCalories,
	type,
}: CalculateMealCaloriesPerPersonProps) => {
	if (!personDayCalories) {
		return 0;
	}

	const { percent } = percentCaloriesMealMap[type];

	return Math.floor((personDayCalories * percent) / 100);
};

// Breakfast: 28%
// Lunch: 33%
// Dinner: 39%
