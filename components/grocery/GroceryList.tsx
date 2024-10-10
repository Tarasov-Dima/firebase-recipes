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
import { ItemSeparatorComponent } from "../ItemSeparatorComponent";

type Section = {
	title: string;
	data: Ingredient[];
};

type GroceryListBasicProps = {
	selectedGroceries: number[];
	handleSelectGrocery: (id: number) => void;
	selectedType?: "default" | "lineThrough";
};

type GroceryListWithSectionsProps = GroceryListBasicProps & {
	sections: Section[];
	isBottomSheet?: false;
	data?: never;
};

type GroceryListWithDataProps = GroceryListBasicProps & {
	data: Ingredient[];
	isBottomSheet: true;
	sections?: never;
};

type GroceryListProps = GroceryListWithSectionsProps | GroceryListWithDataProps;

export const GroceryList = ({
	sections,
	data,
	selectedGroceries,
	handleSelectGrocery,
	selectedType = "lineThrough",
	isBottomSheet = false,
}: GroceryListProps) => {
	const renderItem = ({ item }: { item: Ingredient }) => {
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
	if (sections) {
		return (
			<SectionList
				sections={sections}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				renderSectionHeader={renderSectionHeader}
				ListEmptyComponent={ListEmptyComponent}
				contentContainerStyle={{ padding: 12 }}
				ItemSeparatorComponent={() => <ItemSeparatorComponent height={8} />}
				stickySectionHeadersEnabled={false}
			/>
		);
	}
	return null;
};
