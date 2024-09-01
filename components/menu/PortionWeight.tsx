import React from "react";
import { Text } from "react-native-paper";
import { CalorieDistribution } from "./Portions";
import { Ingredient } from "@/types";
import { TotalNutrients } from "@/utils/usersTotalNutrients";

type PortionWeightProps = {
	sides: Ingredient[];
	totalNutrients: TotalNutrients;
};

export const PortionWeight = ({
	totalNutrients,
	sides,
}: PortionWeightProps) => {
	const isNutrientsAsArray = Array.isArray(totalNutrients);

	if (!isNutrientsAsArray) {
		return (
			<Text variant='titleMedium'>Total weight: {totalNutrients.weight}g</Text>
		);
	}

	return <CalorieDistribution totalNutrients={totalNutrients} sides={sides} />;
};
