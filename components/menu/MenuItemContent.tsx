import React from "react";
import { View, Text } from "react-native";
import { IngredientsView } from "./IngredientsView";
import { RecipeView } from "./RecipeView";
import { NutrientsView } from "./NutrientsView";

export const MenuItemContent = ({
	menuChoiceType,
	allIngredients,
	recipe,
	selectedUserNutrients,
	openBottomSheet,
}) => {
	switch (menuChoiceType) {
		case "ingredients": {
			return (
				<IngredientsView
					rowItems={allIngredients}
					onOpenBottomSheet={openBottomSheet}
				/>
			);
		}
		case "recipe": {
			return <RecipeView recipe={recipe} />;
		}
		case "nutrients": {
			return <NutrientsView nutrients={selectedUserNutrients} />;
		}
		default: {
			return <></>;
		}
	}
};
