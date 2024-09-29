import { CategoryID } from "@/data/category";
import { IngredientNutrientID } from "@/data/nutrientsPer100G";
import React, { useState } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { TextInput, Button, HelperText, Menu, Chip } from "react-native-paper";

const ingredientOptions = Object.keys(IngredientNutrientID);
const categoryOptions = Object.keys(CategoryID);

export const AddGroceryForm = ({ onAddGrocery }) => {
	const { width } = useWindowDimensions();

	const [name, setName] = useState("");
	const [quantity, setQuantity] = useState("");
	const [category, setCategory] = useState("");
	const [menuVisible, setMenuVisible] = useState(false);
	const [error, setError] = useState(false);

	// Categories for Menu
	const categories = [
		"Fruits",
		"Vegetables",
		"Dairy",
		"Meat",
		"Baking Supplies",
	];

	const handleSubmit = () => {
		if (name.trim() && quantity.trim() && category.trim()) {
			const newGrocery = { id: Date.now(), name, quantity, category };
			onAddGrocery(newGrocery);
			setName("");
			setQuantity("");
			setCategory("");
			setError(false);
		} else {
			setError(true);
		}
	};

	return (
		<View style={styles.container}>
			<Menu
				visible={menuVisible}
				onDismiss={() => setMenuVisible(false)}
				anchor={
					<Chip onPress={() => setMenuVisible(true)}>
						{name || "Select Ingredient"}
					</Chip>
				}
				style={{ width: width - 32 }}
			>
				<View style={{ alignItems: "center" }}>
					{ingredientOptions.map((item) => (
						<Menu.Item
							key={item}
							onPress={() => {
								setName(item);
								setMenuVisible(false);
							}}
							title={item}
							// style={{}}
							titleStyle={{ textAlign: "center" }}
						/>
					))}
				</View>

				{/* Option to add a new ingredient */}
				<View style={styles.newIngredientContainer}>
					<TextInput
						label='Add New Ingredient'
						value={name}
						onChangeText={(text) => setName(text)}
						mode='outlined'
						style={styles.newIngredientInput}
					/>
					<Button onPress={() => {}}>Add</Button>
				</View>
			</Menu>
			{/* <View>
				<TextInput
					label='Grocery Name'
					value={name}
					onChangeText={(text) => setName(text)}
					mode='outlined'
					error={error && !name}
				/>
				{error && !name && (
					<HelperText type='error'>Grocery name is required.</HelperText>
				)}
			</View> */}
			<View>
				<TextInput
					label='Quantity'
					value={quantity}
					onChangeText={(text) => setQuantity(text)}
					mode='outlined'
					keyboardType='numeric'
					error={error && !quantity}
				/>
				{error && !quantity && (
					<HelperText type='error'>Quantity is required.</HelperText>
				)}
			</View>
			{/* <View>
				<Menu
					visible={menuVisible}
					onDismiss={() => setMenuVisible(false)}
					anchor={
						<Chip onPress={() => setMenuVisible(true)}>
							{category || "Select Category"}
						</Chip>
					}
				>
					{categoryOptions.map((item) => (
						<Menu.Item
							key={item}
							onPress={() => {
								setCategory(item);
								setMenuVisible(false);
							}}
							title={item}
							disabled={item === category}
						/>
					))}
				</Menu>
				{error && !category && (
					<HelperText type='error'>Category is required.</HelperText>
				)}
			</View> */}
			<Button mode='contained' onPress={handleSubmit}>
				Add Grocery
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		gap: 16,
	},
	newIngredientContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	newIngredientInput: {
		flex: 1,
		marginRight: 10,
	},
});
