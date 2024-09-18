import React from "react";
import { View, FlatList } from "react-native";
import { GroceryListItem } from "./GroceryListItem";
import { Ingredient } from "@/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ListEmptyComponent } from "./ListEmptyComponent";

type GroceryListProps = {
	data: Ingredient[];
	selectedGroceries: number[];
	handleSelectGrocery: (id: number) => void;
	selectedType?: "default" | "lineThrough";
	isBottomSheet?: boolean;
};

export const GroceryList = ({
	data,
	selectedGroceries,
	handleSelectGrocery,
	selectedType = "lineThrough",
	isBottomSheet = false,
}: GroceryListProps) => {
	const renderItem = ({ item }) => {
		const { id, name, amount } = item;
		const isSelected = selectedGroceries.some((groceryId) => groceryId === id);
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
	};

	if (isBottomSheet) {
		return (
			<BottomSheetFlatList
				data={data}
				renderItem={renderItem}
				contentContainerStyle={{ padding: 12, flex: 1 }}
				ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
				ListEmptyComponent={ListEmptyComponent}
			/>
		);
	}
	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			ListEmptyComponent={ListEmptyComponent}
			contentContainerStyle={{ padding: 12 }}
			ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
		/>
	);
};
