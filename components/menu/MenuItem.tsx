import React, { useState } from "react";
import { Card, Divider, SegmentedButtons } from "react-native-paper";
import { Dish } from "@/data/dishes";
import { Portions } from "./Portions";
import { MealVariant } from "@/data/meals";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { MenuItemContent } from "./MenuItemContent";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Accordion } from "../Accordion";
import { useWindowDimensions, View } from "react-native";
import { useTranslation } from "react-i18next";

type MenuItemProps = {
	preparedDataForUsers: PreparedDataForUser;
	recipe: Dish["recipe"];
	type: MealVariant;
	dishName: Dish["name"];
};

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const MenuItem = ({
	image,
	allIngredients,
	totalWeight,
	selectedUserNutrients,
	selectedUserName,
	setSelectedUserName,
	accordionData,
	recipe,
	type,
	dishName,
	openBottomSheet,
}: MenuItemProps) => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});
	const { width } = useWindowDimensions();
	const [menuChoiceType, setMenuChoiceType] =
		useState<MenuChoiceType>("ingredients");

	const handleValueChange = (value: string) => {
		setMenuChoiceType(value as MenuChoiceType);
	};

	return (
		<View style={{ width, padding: 16, flex: 1 }}>
			<Card>
				<Card.Title
					style={{ flexGrow: 1, paddingVertical: 8 }}
					titleVariant='headlineSmall'
					subtitleVariant='bodyLarge'
					subtitle={dishName}
					subtitleNumberOfLines={3}
					title={type}
				/>
				<Card.Content style={{ gap: 10 }}>
					<Accordion
						data={accordionData}
						title={t("plans.menu.showFor")}
						selected={selectedUserName}
						setSelected={setSelectedUserName}
					/>
					<Card.Cover source={image} style={{ height: 300 }} />
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
									<MaterialCommunityIcons
										name='nutrition'
										{...props}
										size={24}
									/>
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
						openBottomSheet={openBottomSheet}
					/>
					<Divider bold style={{ marginVertical: 10 }} />
					<Portions
						selectedUserNutrients={selectedUserNutrients}
						totalWeight={totalWeight}
					/>
				</Card.Content>
			</Card>
		</View>
	);
};
