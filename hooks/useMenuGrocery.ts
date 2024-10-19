import { useSnackbar } from "@/providers/SnackbarProvider";
import { useGroceryList } from "@/storage/useGroceryList";
import { useState } from "react";

export const useMenuGrocery = (allGroceries, closeBottomSheet) => {
	const [unselectedGroceries, setUnselectedGroceries] = useState([]);
	const addGroceries = useGroceryList((state) => state.addGroceries);

	const { showSnackbar } = useSnackbar();

	const selectedGroceries = allGroceries
		.filter((grocery) => {
			return unselectedGroceries.some((id) => id === grocery.id);
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
		const filteredGroceries = allGroceries.filter((grocery) => {
			return !unselectedGroceries.some((id) => id === grocery.id);
		});
		addGroceries(filteredGroceries);
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
