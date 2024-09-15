import { Ingredient } from "@/types";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { useState } from "react";

type UseMenuItemParams = {
	preparedDataForUsers: PreparedDataForUser;
};

export const useMenuItem = ({ preparedDataForUsers }: UseMenuItemParams) => {
	const [selectedUserName, setSelectedUserName] = useState("All");

	const selectedUser = preparedDataForUsers.find(
		(userData) => userData.userName === selectedUserName
	)!;

	const allIngredients = selectedUser.dishes.reduce(
		(accumulatedIngredients, dish) => {
			return accumulatedIngredients.concat(dish.ingredients);
		},
		[] as Ingredient[]
	);

	if (preparedDataForUsers.length === 1) {
		return {
			allIngredients,
			totalWeight: Math.round(selectedUser.totalNutrients.weight),
			selectedUserNutrients: preparedDataForUsers,
			selectedUserName,
			setSelectedUserName,
		};
	}
	const totalWeight =
		selectedUserName === "All"
			? Math.round(
					preparedDataForUsers.find(({ userName }) => userName === "All")!
						.totalNutrients.weight
			  )
			: Math.round(selectedUser.totalNutrients.weight);

	const selectedUserNutrients =
		selectedUserName === "All"
			? preparedDataForUsers.filter(({ userName }) => userName !== "All")
			: [selectedUser];

	return {
		allIngredients,
		totalWeight,
		selectedUserNutrients,
		selectedUserName,
		setSelectedUserName,
	};
};
