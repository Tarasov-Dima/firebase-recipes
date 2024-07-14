import { MenuItem } from "@/components/menu/MenuItem";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Text } from "react-native-paper";

const Menu = () => {
	const params = useLocalSearchParams();

	return (
		<ScrollView style={{ padding: 12 }} contentContainerStyle={{ gap: 12 }}>
			<Text>Menu: {params.id}</Text>
			{menu.map(({ id, title, ingredients, nutrients, recipe }) => {
				return (
					<MenuItem
						key={id}
						title={title}
						ingredients={ingredients}
						nutrients={nutrients}
						recipe={recipe}
					/>
				);
			})}
		</ScrollView>
	);
};

export default Menu;

const menu = [
	{
		id: 12331,
		title: "Breakfast",
		name: "Cottage Cheese Pancakes",
		ingredients: [
			{
				id: 1,
				name: "cottage cheese",
				amount: {
					number: "430",
					type: "g",
				},
			},
			{
				id: 2,
				name: "eggs",
				amount: {
					number: "4",
				},
			},
			{
				id: 3,
				name: "flour",
				amount: {
					number: "110",
					type: "g",
				},
			},
			{
				id: 4,
				name: "baking powder",
				amount: {
					number: "5",
					type: "g",
				},
			},
			{
				id: 5,
				name: "milk",
				amount: {
					number: "40",
					type: "ml",
				},
			},
		],
		recipe:
			"Crumble the cottage cheese. Add eggs and milk. Mix until smooth. Sift the flour with baking powder. Add a pinch of salt to taste. Mix until smooth. The consistency should be like very thick sour cream. If the pan is not non-stick (steel), grease it with a small amount of sunflower oil or cooking oil. Spread the oil with a brush over the pan. Place spoonfuls of batter onto the heated pan, one spoonful = one cottage cheese pancake.",
		nutrients: {
			protein: "323",
			carbohydrate: "356",
			fat: "123",
			calories: "122",
		},
	},
	{
		id: 1232131,
		title: "Lunch",
		ingredients: [
			{
				id: 1,
				name: "milk",
				amount: {
					number: "300",
					type: "ml",
				},
			},
			{
				id: 2,
				name: "meat",
				amount: {
					number: "500",
					type: "g",
				},
			},
			{
				id: 3,
				name: "bread",
				amount: {
					number: "200",
					type: "g",
				},
			},
		],
		recipe: "do it and don't do that",
		nutrients: {
			protein: "323",
			carbohydrate: "356",
			fat: "123",
			calories: "122",
		},
	},
	{
		id: 1233551,
		title: "Dinner",
		ingredients: [
			{
				id: 1,
				name: "milk",
				amount: {
					number: "300",
					type: "ml",
				},
			},
			{
				id: 2,
				name: "meat",
				amount: {
					number: "500",
					type: "g",
				},
			},
			{
				id: 3,
				name: "bread",
				amount: {
					number: "200",
					type: "g",
				},
			},
		],
		recipe: "do it and don't do that",
		nutrients: {
			protein: "323",
			carbohydrate: "356",
			fat: "123",
			calories: "122",
		},
	},
];
