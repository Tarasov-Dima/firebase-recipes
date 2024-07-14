import React, { useState } from "react";
import { IngredientsView } from "./IngredientsView";
import { Card, SegmentedButtons } from "react-native-paper";
import { NutrientsView } from "./NutrientsView";
import { RecipeView } from "./RecipeView";
import type { Ingredient, Nutrients, Recipe } from "@/types";

type MenuItemProps = {
	title: "Breakfast" | "Lunch" | "Dinner";
	ingredients: Ingredient[];
	nutrients: Nutrients;
	recipe: Recipe;
	name: string;
};

type MenuChoiceType = "ingredients" | "recipe" | "nutrients";

export const MenuItem = ({
	title,
	ingredients,
	nutrients,
	recipe,
}: MenuItemProps) => {
	const [choice, setChoice] = useState<MenuChoiceType>("ingredients");

	const renderContent = () => {
		switch (choice) {
			case "ingredients": {
				return <IngredientsView rowItems={ingredients} />;
			}
			case "recipe": {
				return <RecipeView recipe={recipe} />;
			}
			case "nutrients": {
				return <NutrientsView rowItems={nutrients} />;
			}
		}
	};

	const handleValueChange = (value: string) => {
		setChoice(value as MenuChoiceType);
	};

	return (
		<Card>
			<Card.Title title={title} />
			<Card.Content>
				<SegmentedButtons
					value={choice}
					onValueChange={handleValueChange}
					buttons={[
						{ value: "ingredients", label: "Ingredients" },
						{ value: "recipe", label: "Recipe" },
						{ value: "nutrients", label: "Nutrients" },
					]}
				/>
				{renderContent()}
			</Card.Content>
		</Card>
	);
};
