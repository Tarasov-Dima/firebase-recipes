import { categories } from "@/data/category";
import { ingredients } from "@/data/ingredients";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Button, Menu, Chip, List, Text } from "react-native-paper";
import { BottomSheetInput } from "../BottomSheetInput";
import { Grocery } from "@/storage/useGroceryList";

const categoryArray = Object.values(categories);

type FormGrocery = {
	name: Grocery["name"];
	category: Grocery["category"];
};

type ExtendedAmountType = Grocery["amount"]["type"] | "pieces";

type GroceryAmount = {
	number: Grocery["amount"]["number"];
	type: ExtendedAmountType;
};

type AddGroceryFormProps = {
	groceries: Grocery[];
	onAddGrocery: (grocery: Grocery) => void;
};

export const AddGroceryForm = ({
	groceries,
	onAddGrocery,
}: AddGroceryFormProps) => {
	const { width, height } = useWindowDimensions();

	const { snapToIndex } = useBottomSheet();
	const inputRef = useRef<any>(null);

	const [menuVisible, setMenuVisible] = useState(false);
	const [typeMenuVisible, setTypeMenuVisible] = useState(false);

	const [ingredientName, setIngredientName] = useState<Grocery["name"]>("");
	const [ingredientNameSuggestions, setIngredientNameSuggestions] = useState<
		FormGrocery[]
	>([]);
	const [ingredientCategory, setIngredientCategory] = useState<
		Grocery["category"] | null
	>(null);

	const [ingredientAmountNumber, setIngredientAmountNumber] =
		useState<GroceryAmount["number"]>();

	const [ingredientAmountType, setIngredientAmountType] =
		useState<ExtendedAmountType>();

	const [selectedGrocery, setSelectedGrocery] = useState<null | FormGrocery>(
		null
	);

	useEffect(() => {
		if (!selectedGrocery && inputRef.current) {
			inputRef.current.focus();
		}
	}, [selectedGrocery]);

	const handleInputChange = (text: string) => {
		const formattedInput = text.trim().toLowerCase();
		setIngredientName(text);

		if (formattedInput.length > 0) {
			const filtered = groceries
				.filter((ingredient) =>
					ingredient.name.toLowerCase().startsWith(formattedInput)
				)
				.slice(0, 5)
				.map(({ name, category }) => {
					return { name, category };
				});
			setIngredientNameSuggestions(filtered);
		} else {
			setIngredientNameSuggestions([]);
		}
	};

	const handleSelectGrocery = ({ category, name }: FormGrocery) => {
		setSelectedGrocery({
			name: name.toLowerCase(),
			category,
		});
		setIngredientName("");
		setIngredientNameSuggestions([]);
		snapToIndex(0);
	};

	const handleSelectCategory = (category: Grocery["category"]) => {
		setIngredientCategory(category);
		setMenuVisible(false);
	};

	const handleDeleteCategory = () => {
		setIngredientCategory(null);
	};

	const handleAddNewIngredient = () => {
		if (!!ingredientCategory && !!ingredientName) {
			setSelectedGrocery({
				name: ingredientName.toLowerCase(),
				category: ingredientCategory,
			});
		}
	};

	const handleAmountNumberChange = (value: string) => {
		const numberValue = parseFloat(value);
		if (numberValue) {
			setIngredientAmountNumber(numberValue);
		} else {
			setIngredientAmountNumber(undefined);
		}
	};

	const handleAmountTypeChange = (value: ExtendedAmountType) => {
		setIngredientAmountType(value);
		setTypeMenuVisible(false);
	};

	const handleAddIngredientToStore = () => {
		const existedIngredient = groceries.find(
			(ingredient) => ingredient.name === selectedGrocery?.name
		);

		const id = !!existedIngredient ? existedIngredient.id : generateId();

		if (!!ingredientAmountNumber && !!selectedGrocery) {
			const updatedIngredient = {
				id,
				...selectedGrocery,
				amount: {
					number: ingredientAmountNumber,
					type:
						ingredientAmountType === "pieces"
							? undefined
							: ingredientAmountType,
				},
			};
			onAddGrocery(updatedIngredient);
		}
	};

	const isAddButtonDisabled = !ingredientCategory;

	const isAddToGroceryButtonVisible =
		!!selectedGrocery && !!ingredientAmountNumber && !!ingredientAmountType;

	return (
		<View style={{ padding: 16, gap: 16 }}>
			<Text variant='titleMedium' style={{ textAlign: "center" }}>
				Add ingredient
			</Text>
			{!selectedGrocery ? (
				<View style={{ gap: 8 }}>
					<BottomSheetInput
						label={"Ingredient name"}
						value={ingredientName}
						onChangeText={handleInputChange}
					/>
					<FlatList
						data={ingredientNameSuggestions}
						keyExtractor={(item) => item.name}
						scrollEnabled={false}
						renderItem={({ item }) => (
							<List.Item
								title={item.name}
								onPress={() => handleSelectGrocery(item)}
							/>
						)}
						ListEmptyComponent={() =>
							ingredientName.length > 0 && (
								<View style={{ gap: 8 }}>
									<View
										style={{
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Text variant='bodyLarge'>Category: </Text>
										{ingredientCategory ? (
											<Chip onClose={handleDeleteCategory}>
												{ingredientCategory.name}
											</Chip>
										) : (
											<Chip
												onPress={() => setMenuVisible(true)}
												mode='outlined'
											>
												{"Select category"}
											</Chip>
										)}
									</View>
									<Button
										mode='contained'
										onPress={handleAddNewIngredient}
										disabled={isAddButtonDisabled}
									>
										Add "{ingredientName}" as new ingredient
									</Button>
								</View>
							)
						}
					/>
				</View>
			) : (
				<View style={{ gap: 16 }}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text variant='bodyLarge'>Ingredient: </Text>
						<Chip
							onClose={() => {
								setSelectedGrocery(null);
							}}
						>
							{selectedGrocery.name}
						</Chip>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text variant='bodyLarge'>Category: </Text>
						<Chip>{selectedGrocery.category.name}</Chip>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text variant='bodyLarge'>Type: </Text>
						<Menu
							visible={typeMenuVisible}
							onDismiss={() => setTypeMenuVisible(false)}
							anchor={
								!!ingredientAmountType ? (
									<Chip
										onPress={() => setTypeMenuVisible(true)}
										onClose={() => setIngredientAmountType(undefined)}
									>
										{ingredientAmountType}
									</Chip>
								) : (
									<Chip
										onPress={() => setTypeMenuVisible(true)}
										mode='outlined'
									>
										select type
									</Chip>
								)
							}
						>
							<ScrollView contentContainerStyle={{ alignItems: "center" }}>
								<Menu.Item
									onPress={() => handleAmountTypeChange("g")}
									title={"g"}
									titleStyle={{ textAlign: "center" }}
								/>
								<Menu.Item
									onPress={() => handleAmountTypeChange("ml")}
									title={"ml"}
									titleStyle={{ textAlign: "center" }}
								/>
								<Menu.Item
									onPress={() => handleAmountTypeChange("pieces")}
									title={"pieces"}
									titleStyle={{ textAlign: "center" }}
								/>
							</ScrollView>
						</Menu>
					</View>
					{ingredientAmountType && (
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<Text variant='bodyLarge'>Amount: </Text>
							<BottomSheetInput
								label={"Enter amount"}
								value={ingredientAmountNumber?.toString()}
								onChangeText={handleAmountNumberChange}
								placeholder={`amount / ${ingredientAmountType}`}
								keyboardType='numeric'
							/>
						</View>
					)}
				</View>
			)}
			{isAddToGroceryButtonVisible && (
				<Button mode='contained' onPress={handleAddIngredientToStore}>
					Add ingredient to grocery
				</Button>
			)}
			<Menu
				visible={menuVisible}
				onDismiss={() => setMenuVisible(false)}
				anchor={{ x: width, y: 0 }}
				style={{ marginVertical: 60, maxHeight: height / 1.5 }}
			>
				<ScrollView contentContainerStyle={{ alignItems: "center" }}>
					{categoryArray.map((category) => (
						<Menu.Item
							key={category.id}
							onPress={() => handleSelectCategory(category)}
							title={category.name}
							titleStyle={{ textAlign: "center" }}
						/>
					))}
				</ScrollView>
			</Menu>
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		marginTop: 8,
		marginBottom: 10,
		borderRadius: 12,
		fontSize: 16,
		lineHeight: 20,
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderWidth: 2,
	},
});

const generateId = () => {
	const timestamp = Date.now(); // Current timestamp in milliseconds
	const randomValue = Math.floor(Math.random() * 10000); // Random value between 0 and 9999
	return timestamp * 10000 + randomValue; // Combine timestamp and random value into a number
};
