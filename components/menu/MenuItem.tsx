import React, { useState } from "react";
import { IngredientsView } from "./IngredientsView";
import {
	Card,
	Chip,
	Divider,
	Modal,
	Portal,
	SegmentedButtons,
	Text,
} from "react-native-paper";
import { NutrientsView } from "./NutrientsView";
import { RecipeView } from "./RecipeView";
import { Dish } from "@/data/dishes";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Portions } from "./Portions";
import { MealVariant } from "@/data/meals";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { useMenuItem } from "@/hooks/useMenuItem";

type MenuItemProps = {
	preparedDataForUsers: PreparedDataForUser;
	recipe: Dish["recipe"];
	type: MealVariant;
	dishName: Dish["name"];
};

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const MenuItem = ({
	preparedDataForUsers,
	recipe,
	type,
	dishName,
}: MenuItemProps) => {
	const [showPicker, setShowPicker] = useState(false);

	const [menuChoiceType, setMenuChoiceType] =
		useState<MenuChoiceType>("ingredients");

	const {
		allIngredients,
		totalWeight,
		selectedUserNutrients,
		selectedUserName,
		setSelectedUserName,
	} = useMenuItem({ preparedDataForUsers });

	const handleValueChange = (value: string) => {
		setMenuChoiceType(value as MenuChoiceType);
	};

	const handleSetSelectedUser = (value: string) => {
		setSelectedUserName(value);
		onHidePicker();
	};

	const onShowPicker = () => {
		setShowPicker(true);
	};

	const onHidePicker = () => {
		setShowPicker(false);
	};

	const renderContent = () => {
		switch (menuChoiceType) {
			case "ingredients": {
				return <IngredientsView rowItems={allIngredients} />;
			}
			case "recipe": {
				return <RecipeView recipe={recipe} />;
			}
			case "nutrients": {
				return <NutrientsView nutrients={selectedUserNutrients} />;
			}
		}
	};

	return (
		<>
			<Card style={{ marginBottom: 80 }}>
				<Card.Title
					titleVariant='headlineSmall'
					subtitleVariant='bodyLarge'
					subtitle={dishName}
					subtitleNumberOfLines={3}
					title={type}
				/>

				<Card.Content style={{ gap: 10 }}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text>Show for: </Text>
						<Chip onPress={onShowPicker}>{selectedUserName}</Chip>
					</View>
					<SegmentedButtons
						value={menuChoiceType}
						onValueChange={handleValueChange}
						buttons={[
							{ value: "ingredients", label: "Ingredients" },
							{ value: "recipe", label: "Recipe" },
							{ value: "nutrients", label: "Nutrients" },
						]}
					/>
					{renderContent()}
					<Divider bold style={{ marginVertical: 10 }} />
					<Portions
						selectedUserNutrients={selectedUserNutrients}
						totalWeight={totalWeight}
					/>
				</Card.Content>
			</Card>
			<Portal>
				<Modal
					visible={showPicker}
					onDismiss={onHidePicker}
					contentContainerStyle={{ backgroundColor: "white" }}
				>
					<Picker
						selectedValue={selectedUserName}
						onValueChange={handleSetSelectedUser}
					>
						{preparedDataForUsers.map(({ userName }) => {
							return (
								<Picker.Item key={userName} label={userName} value={userName} />
							);
						})}
					</Picker>
				</Modal>
			</Portal>
		</>
	);
};
