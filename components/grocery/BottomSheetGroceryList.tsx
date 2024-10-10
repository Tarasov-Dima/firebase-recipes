import React, { useCallback } from "react";
import { GroceryListItem } from "./GroceryListItem";
import { Ingredient } from "@/types";
import { ListEmptyComponent } from "./ListEmptyComponent";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ItemSeparatorComponent } from "../ItemSeparatorComponent";

type GroceryListProps = {
	data: Ingredient[];
	selectedGroceries: number[];
	handleSelectGrocery: (id: number) => void;
	selectedType?: "default" | "lineThrough";
};

export const BottomSheetGroceryList = ({
	data,
	selectedGroceries,
	handleSelectGrocery,
	selectedType = "lineThrough",
}: GroceryListProps) => {
	const renderItem = useCallback(
		({ item }) => {
			const { id, name, amount } = item;
			const isSelected = selectedGroceries.some(
				(groceryId) => groceryId === id
			);
			return (
				<GroceryListItem
					onSelectItem={handleSelectGrocery}
					id={id}
					selected={isSelected}
					text={name}
					amount={amount}
					selectedType={selectedType}
				/>
			);
		},
		[selectedGroceries]
	);

	return (
		<BottomSheetFlatList
			data={data}
			renderItem={renderItem}
			ListEmptyComponent={ListEmptyComponent}
			contentContainerStyle={{ padding: 12 }}
			ItemSeparatorComponent={() => <ItemSeparatorComponent height={8} />}
		/>
	);
};
