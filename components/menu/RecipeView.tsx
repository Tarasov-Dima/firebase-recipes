import { Recipe } from "@/types";
import React from "react";
import { Text } from "react-native-paper";

type RecipeProps = {
	recipe: Recipe;
};

const BULLET = "\u2022";

export const RecipeView = ({ recipe }: RecipeProps) => {
	return splitIntoSteps(recipe).map((recipeStep, index) => {
		return <Text key={index}>{`${BULLET} ${recipeStep}`}</Text>;
	});
};

const splitIntoSteps = (text: Recipe) => {
	return text
		.split(".")
		.map((step) => step.trim())
		.filter((step) => step.length > 0);
};
