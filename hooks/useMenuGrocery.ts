import { useSnackbar } from "@/providers/SnackbarProvider";
import { useGroceryList } from "@/storage/useGroceryList";
import { useState } from "react";

export const useMenuGrocery = (allIngredients, closeBottomSheet) => {
	const [unselectedGroceries, setUnselectedGroceries] = useState([]);
	const addIngredients = useGroceryList((state) => state.addIngredients);

	const { showSnackbar } = useSnackbar();

	const selectedGroceries = allIngredients
		.filter((ingredient) => {
			return unselectedGroceries.some((id) => id === ingredient.id);
		})
		.map((grocery) => grocery.id);

	const onAddToUnselectedGroceries = (id) => {
		setUnselectedGroceries((prevGroceries) => {
			if (prevGroceries.some((groceryId) => groceryId === id)) {
				return prevGroceries.filter((groceryId) => groceryId !== id);
			} else {
				return [...prevGroceries, id];
			}
		});
	};

	const onAddToGroceryList = () => {
		const filteredIngredients = allIngredients.filter((ingredient) => {
			return !unselectedGroceries.some((id) => id === ingredient.id);
		});
		addIngredients(filteredIngredients);
		closeBottomSheet();
		setUnselectedGroceries([]);
		showSnackbar({ message: "Groceries added to list" });
	};

	return {
		selectedGroceries,
		onAddToUnselectedGroceries,
		onAddToGroceryList,
	};
};
