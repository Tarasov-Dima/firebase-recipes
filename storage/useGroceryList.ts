import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "@/types";

export type Grocery = Pick<
	Ingredient,
	"amount" | "category" | "name" | "id" | "weight_per_unit"
>;

type UseGroceryListState = {
	groceries: Grocery[];
	addGrocery: (grocery: Grocery) => void;
	addGroceries: (groceries: Grocery[]) => void;
	// updateGrocery: (id: number, updatedGrocery: Partial<Grocery>) => void;
	removeGrocery: (id: number) => void;
	resetGroceries: VoidFunction;
};

export const useGroceryList = create<UseGroceryListState>()(
	persist(
		(set) => ({
			groceries: [],
			addGrocery: (newGrocery) =>
				set((state) => {
					const updatedGroceries = [...state.groceries];
					const existingIngredientIndex = updatedGroceries.findIndex(
						(grocery) => grocery.id === newGrocery.id
					);
					if (existingIngredientIndex !== -1) {
						// If the ingredient exists, update its amount.number
						updatedGroceries[existingIngredientIndex].amount.number +=
							newGrocery.amount.number;
					} else {
						// If the ingredient doesn't exist, add it to the array
						updatedGroceries.push(newGrocery);
					}
					return { groceries: updatedGroceries };
				}),
			addGroceries: (newGroceries) =>
				set((state) => {
					const updatedGroceries = [...state.groceries];

					newGroceries.forEach((newGrocery) => {
						const existingIngredientIndex = updatedGroceries.findIndex(
							(grocery) => grocery.id === newGrocery.id
						);

						if (existingIngredientIndex !== -1) {
							// If the ingredient exists, update its amount.number
							updatedGroceries[existingIngredientIndex].amount.number +=
								newGrocery.amount.number;
						} else {
							// If the ingredient doesn't exist, add it to the array
							updatedGroceries.push(newGrocery);
						}
					});

					return { groceries: updatedGroceries };
				}),
			// updateGrocery: (id, updatedGrocery) =>
			// 	set((state) => ({
			// 		groceries: state.groceries.map((grocery) =>
			// 			grocery.id === id ? { ...grocery, ...updatedGrocery } : grocery
			// 		),
			// 	})),
			removeGrocery: (id) =>
				set((state) => ({
					groceries: state.groceries.filter((grocery) => grocery.id !== id),
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
