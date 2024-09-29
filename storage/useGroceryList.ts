import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "@/types";

type UseGroceryListState = {
	groceries: Ingredient[];
	addIngredient: (ingredient: Ingredient) => void;
	addIngredients: (ingredients: Ingredient[]) => void;
	updateIngredient: (
		id: number,
		updatedIngredient: Partial<Ingredient>
	) => void;
	removeIngredient: (id: number) => void;
	resetGroceries: VoidFunction;
};

export const useGroceryList = create<UseGroceryListState>()(
	persist(
		(set) => ({
			groceries: [],
			addIngredient: (newIngredient) =>
				set((state) => {
					const updatedGroceries = [...state.groceries];
					const existingIngredientIndex = updatedGroceries.findIndex(
						(ingredient) => ingredient.id === newIngredient.id
					);
					if (existingIngredientIndex !== -1) {
						// If the ingredient exists, update its amount.number
						updatedGroceries[existingIngredientIndex].amount.number +=
							newIngredient.amount.number;
					} else {
						// If the ingredient doesn't exist, add it to the array
						updatedGroceries.push(newIngredient);
					}
					return { groceries: updatedGroceries };
				}),
			addIngredients: (newIngredients) =>
				set((state) => {
					const updatedGroceries = [...state.groceries];

					newIngredients.forEach((newIngredient) => {
						const existingIngredientIndex = updatedGroceries.findIndex(
							(ingredient) => ingredient.id === newIngredient.id
						);

						if (existingIngredientIndex !== -1) {
							// If the ingredient exists, update its amount.number
							updatedGroceries[existingIngredientIndex].amount.number +=
								newIngredient.amount.number;
						} else {
							// If the ingredient doesn't exist, add it to the array
							updatedGroceries.push(newIngredient);
						}
					});

					return { groceries: updatedGroceries };
				}),
			updateIngredient: (id, updatedIngredient) =>
				set((state) => ({
					groceries: state.groceries.map((ingredient) =>
						ingredient.id === id
							? { ...ingredient, ...updatedIngredient }
							: ingredient
					),
				})),
			removeIngredient: (id) =>
				set((state) => ({
					groceries: state.groceries.filter(
						(ingredient) => ingredient.id !== id
					),
				})),
			resetGroceries: () =>
				set(() => ({
					groceries: [],
				})),
		}),
		{
			name: "grocery-list",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
