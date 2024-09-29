import React from "react";
import { View, SectionList } from "react-native";
import { GroceryListItem } from "./GroceryListItem";
import { Ingredient } from "@/types";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ListEmptyComponent } from "./ListEmptyComponent";
import { Text } from "react-native-paper";
import Animated, {
	FadeIn,
	FadeOut,
	FadingTransition,
} from "react-native-reanimated";

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
	const groupAndSortByCategory = (
		ingredients: Ingredient[],
		selectedGroceries: number[]
	) => {
		// Group ingredients by category
		const groupedCategories = ingredients.reduce((sections, ingredient) => {
			const { category } = ingredient;
			const section = sections.find(
				(section) => section.title === category.name
			);
			if (section) {
				section.data.push(ingredient);
			} else {
				sections.push({ title: category.name, data: [ingredient] });
			}
			return sections;
		}, [] as { title: string; data: Ingredient[] }[]);

		// Move selected ingredients to the bottom within each category
		groupedCategories.forEach((section) => {
			section.data.sort((a, b) => {
				const isSelectedA = selectedGroceries.includes(a.id);
				const isSelectedB = selectedGroceries.includes(b.id);
				return isSelectedA === isSelectedB ? 0 : isSelectedA ? 1 : -1;
			});
		});

		// Move fully selected categories to the bottom
		const allSelectedCategories = groupedCategories.filter((section) =>
			section.data.every((item) => selectedGroceries.includes(item.id))
		);
		const partiallySelectedCategories = groupedCategories.filter(
			(section) =>
				!section.data.every((item) => selectedGroceries.includes(item.id))
		);

		// Return partially selected categories first, fully selected categories last
		return [...partiallySelectedCategories, ...allSelectedCategories];
	};

	const sections = groupAndSortByCategory(data, selectedGroceries);

	const renderItem = ({ item }) => {
		const { id, name, amount } = item;
		const isSelected = selectedGroceries.some((groceryId) => groceryId === id);
		return (
			<Animated.View
				entering={FadeIn}
				exiting={FadeOut}
				layout={FadingTransition}
			>
				<GroceryListItem
					onSelectItem={handleSelectGrocery}
					id={id}
					selected={isSelected}
					text={name}
					amount={amount}
					selectedType={selectedType}
				/>
			</Animated.View>
		);
	};

	const keyExtractor = (item: Ingredient) => item.id.toString();

	const renderSectionHeader = ({
		section: { title },
	}: {
		section: { title: string };
	}) => {
		return (
			<Animated.View entering={FadeIn} exiting={FadeOut}>
				<Text variant='titleMedium' style={{ paddingVertical: 8 }}>
					{title}
				</Text>
			</Animated.View>
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
		<SectionList
			sections={sections}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			renderSectionHeader={renderSectionHeader}
			ListEmptyComponent={ListEmptyComponent}
			contentContainerStyle={{ padding: 12 }}
			ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
			stickySectionHeadersEnabled={false}
		/>
	);
};
