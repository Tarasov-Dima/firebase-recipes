import React from "react";
import { View, Text, FlatList } from "react-native";
import { GroceryListItem } from "./GroceryListItem";
import { Icon } from "react-native-paper";
import { useThemeContext } from "@/theme";
import { Ingredient } from "@/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

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
				// keyExtractor={(i) => i}
				renderItem={renderItem}
				contentContainerStyle={{ padding: 12, flex: 1 }}
				ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
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

const ListEmptyComponent = () => {
	const { theme } = useThemeContext();

	return (
		<View
			style={{
				alignItems: "center",
				marginTop: "50%",
			}}
		>
			<Icon
				source={"basket-off-outline"}
				size={100}
				color={theme.colors.secondary}
			/>
		</View>
	);
};
