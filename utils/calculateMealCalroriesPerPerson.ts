type Meals = "breakfast" | "lunch" | "dinner";

const percentCaloriesMealMap: Record<Meals, { percent: number }> = {
	breakfast: { percent: 28 },
	lunch: { percent: 33 },
	dinner: { percent: 39 },
};

type CalculateMealCaloriesPerPersonProps = {
	personDayCalories: number | undefined;
	type: Meals;
};

export const calculateMealCaloriesPerPerson = ({
	personDayCalories,
	type,
}: CalculateMealCaloriesPerPersonProps) => {
	if (!personDayCalories) {
		return 0;
	}

	const { percent } = percentCaloriesMealMap[type];

	return (personDayCalories * percent) / 100;
};

// Breakfast: 28%
// Lunch: 33%
// Dinner: 39%
