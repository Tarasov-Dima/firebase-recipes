import { useThemeContext } from "@/theme";
import { Colors } from "@/theme/customTheme";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { useEffect, useMemo, useState } from "react";

type UsePortionsProps = {
	selectedUserNutrients: PreparedDataForUser;
	weight: number;
};

const colorMapping: Record<
	number,
	(colors: Colors) => { color: string; textColor: string }
> = {
	0: ({ primary, onPrimary }) => ({
		color: primary,
		textColor: onPrimary,
	}),
	1: ({ secondary, onSecondary }) => ({
		color: secondary,
		textColor: onSecondary,
	}),
	2: ({ tertiary, onTertiary }) => ({
		color: tertiary,
		textColor: onTertiary,
	}),
};

export const usePortions = ({
	selectedUserNutrients,
	weight: totalWeightOfFood,
}: UsePortionsProps) => {
	const { theme } = useThemeContext();

	const [mainDishWeight, setMainDishWeight] = useState("");

	const calculatedWeightOfMainDish = useMemo(() => {
		const totalWeight = selectedUserNutrients.reduce((acc, user) => {
			return acc + (user.dishes[0]?.nutrients.weight || 0);
		}, 0);
		return Math.round(totalWeight).toString();
	}, [selectedUserNutrients]);

	useEffect(() => {
		setMainDishWeight(calculatedWeightOfMainDish);
	}, [calculatedWeightOfMainDish]);

	const resetToInitialWeight = () => {
		setMainDishWeight(calculatedWeightOfMainDish);
	};

	const pieChartData = useMemo(() => {
		return selectedUserNutrients.map((user, index) => {
			const { color, textColor } = colorMapping[index](theme.colors);
			const userWeight = Math.round(user.totalNutrients.weight);
			const percent = Math.round((userWeight * 100) / totalWeightOfFood);

			return {
				name: user.userName,
				percent,
				color,
				textColor,
			};
		});
	}, [selectedUserNutrients, totalWeightOfFood]);

	const preparedData = useMemo(() => {
		return selectedUserNutrients.map((user, index) => {
			const { color, textColor } = colorMapping[index](theme.colors);

			const userWeight = Math.round(user.totalNutrients.weight);
			const userPortionPercent = (userWeight * 100) / totalWeightOfFood;

			const newMainDishWeight = Math.round(
				(userPortionPercent / 100) * Number(mainDishWeight)
			);

			const updatedDishes = user.dishes.map((dish, index) => {
				if (index === 0) {
					return {
						...dish,
						nutrients: {
							...dish.nutrients,
							weight: Math.max(newMainDishWeight, 0),
						},
					};
				}
				return dish;
			});

			const newMealWeight = updatedDishes.reduce(
				(acc, dish) => acc + Math.round(dish.nutrients.weight),
				0
			);

			return {
				...user,
				dishes: updatedDishes,
				totalNutrients: {
					...user.totalNutrients,
					weight: newMealWeight,
				},
				color,
				textColor,
			};
		});
	}, [selectedUserNutrients, mainDishWeight, totalWeightOfFood]);

	const totalWeight = preparedData.reduce((acc, currentValue) => {
		return acc + currentValue.totalNutrients.weight;
	}, 0);

	return {
		preparedData,
		pieChartData,
		mainDishWeight,
		totalWeight,
		setMainDishWeight,
		resetToInitialWeight:
			calculatedWeightOfMainDish !== mainDishWeight
				? resetToInitialWeight
				: undefined,
	};
};
