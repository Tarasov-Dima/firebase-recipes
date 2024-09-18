import React, { useRef, useState } from "react";
import { Card, Divider, SegmentedButtons } from "react-native-paper";
import { Dish } from "@/data/dishes";
import { View } from "react-native";
import { Portions } from "./Portions";
import { MealVariant } from "@/data/meals";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { MenuItemContent } from "./MenuItemContent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Accordion } from "../Accordion";

type MenuItemProps = {
	preparedDataForUsers: PreparedDataForUser;
	recipe: Dish["recipe"];
	type: MealVariant;
	dishName: Dish["name"];
};

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const MenuItem = ({
	allIngredients,
	totalWeight,
	selectedUserNutrients,
	selectedUserName,
	setSelectedUserName,
	accordionData,
	recipe,
	type,
	dishName,
}: MenuItemProps) => {
	const [menuChoiceType, setMenuChoiceType] =
		useState<MenuChoiceType>("ingredients");

	const handleValueChange = (value: string) => {
		setMenuChoiceType(value as MenuChoiceType);
	};

	return (
		<Card style={{ marginBottom: 80 }}>
			<Card.Title
				titleVariant='headlineSmall'
				subtitleVariant='bodyLarge'
				subtitle={dishName}
				subtitleNumberOfLines={3}
				title={type}
			/>

			<Card.Content style={{ gap: 10 }}>
				<Accordion
					data={accordionData}
					title='Show for: '
					selected={selectedUserName}
					setSelected={setSelectedUserName}
				/>
				<SegmentedButtons
					value={menuChoiceType}
					onValueChange={handleValueChange}
					buttons={[
						{
							value: "ingredients",
							icon: (props) => (
								<MaterialCommunityIcons
									name='food-variant'
									{...props}
									size={24}
								/>
							),
						},
						{
							value: "recipe",
							icon: (props) => (
								<MaterialCommunityIcons name='nutrition' {...props} size={24} />
							),
						},
						{
							value: "nutrients",
							icon: (props) => (
								<FontAwesome name='balance-scale' {...props} size={24} />
							),
						},
					]}
				/>
				<MenuItemContent
					allIngredients={allIngredients}
					menuChoiceType={menuChoiceType}
					recipe={recipe}
					selectedUserNutrients={selectedUserNutrients}
				/>
				<Divider bold style={{ marginVertical: 10 }} />
				<Portions
					selectedUserNutrients={selectedUserNutrients}
					totalWeight={totalWeight}
				/>
			</Card.Content>
		</Card>
	);
};
