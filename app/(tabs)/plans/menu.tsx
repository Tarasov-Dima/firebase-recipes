import { MenuItem } from "@/components/menu/MenuItem";
import { Ingredient } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Switch, Text } from "react-native-paper";

const Menu = () => {
	const params = useLocalSearchParams();
	const [premium, setPremium] = useState(false);
	const onToggleSwitch = () => setPremium(!premium);

	return (
		<ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 16 }}>
			<Switch value={premium} onValueChange={onToggleSwitch} />
			{menu.map((menuItem) => {
				return <MenuItem key={menuItem.id} {...menuItem} premium={premium} />;
			})}
		</ScrollView>
	);
};

export default Menu;
type MenuItem = {
	id: number;
	title: "Breakfast" | "lunch" | "dinner";
	name: string;
	ingredients: Ingredient[];
	recipe: string;
};

const menu: MenuItem[] = [
	{
		id: 12331,
		title: "Breakfast",
		name: "Cottage Cheese Pancakes",
		ingredients: [
			{
				id: 1,
				name: "cottage cheese",
				amount: {
					number: 430,
					type: "g",
				},
				nutrients_per_100g: {
					energy: 98,
					protein: 11.1,
					fat: 4.3,
					carbohydrates: 3.4,
				},
			},
			{
				id: 2,
				name: "eggs",
				amount: {
					number: 4,
				},
				nutrients_per_100g: {
					energy: 155,
					protein: 13,
					fat: 11,
					carbohydrates: 1.1,
				},
				weight_per_unit: 50,
			},
			{
				id: 3,
				name: "flour",
				amount: {
					number: 110,
					type: "g",
				},
				nutrients_per_100g: {
					energy: 364,
					protein: 10,
					fat: 1,
					carbohydrates: 76,
				},
			},
			{
				id: 4,
				name: "baking powder",
				amount: {
					number: 5,
					type: "g",
				},
				nutrients_per_100g: {
					energy: 53,
					protein: 0,
					fat: 0,
					carbohydrates: 28.1,
				},
			},
			{
				id: 5,
				name: "milk",
				amount: {
					number: 40,
					type: "ml",
				},
				nutrients_per_100g: {
					energy: 42,
					protein: 3.4,
					fat: 1,
					carbohydrates: 5,
				},
			},
		],
		recipe:
			"Crumble the cottage cheese. Add eggs and milk. Mix until smooth. Sift the flour with baking powder. Add a pinch of salt to taste. Mix until smooth. The consistency should be like very thick sour cream. If the pan is not non-stick (steel), grease it with a small amount of sunflower oil or cooking oil. Spread the oil with a brush over the pan. Place spoonfuls of batter onto the heated pan, one spoonful = one cottage cheese pancake.",
	},
	// {
	// 	id: 1232131,
	// 	title: "Lunch",
	// 	ingredients: [
	// 		{
	// 			id: 1,
	// 			name: "milk",
	// 			amount: {
	// 				number: "300",
	// 				type: "ml",
	// 			},
	// 		},
	// 		{
	// 			id: 2,
	// 			name: "meat",
	// 			amount: {
	// 				number: "500",
	// 				type: "g",
	// 			},
	// 		},
	// 		{
	// 			id: 3,
	// 			name: "bread",
	// 			amount: {
	// 				number: "200",
	// 				type: "g",
	// 			},
	// 		},
	// 	],
	// 	recipe: "do it and don't do that",
	// },
	// {
	// 	id: 1233551,
	// 	title: "Dinner",
	// 	ingredients: [
	// 		{
	// 			id: 1,
	// 			name: "milk",
	// 			amount: {
	// 				number: "300",
	// 				type: "ml",
	// 			},
	// 		},
	// 		{
	// 			id: 2,
	// 			name: "meat",
	// 			amount: {
	// 				number: "500",
	// 				type: "g",
	// 			},
	// 		},
	// 		{
	// 			id: 3,
	// 			name: "bread",
	// 			amount: {
	// 				number: "200",
	// 				type: "g",
	// 			},
	// 		},
	// 	],
	// 	recipe: "do it and don't do that",
	// },
];
