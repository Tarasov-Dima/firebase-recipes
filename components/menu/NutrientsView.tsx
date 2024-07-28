import { type Nutrients } from "@/types";
import { useStorage } from "@/useStorage";
import React, { useState } from "react";
import { Switch, Text, DataTable } from "react-native-paper";

type NutrientsProps = {
	nutrients: Nutrients;
};

const calculateNutrientPer100Grams = ({
	totalWeight,
	nutrientValue,
}: {
	totalWeight: number;
	nutrientValue: number | string;
}) => {
	return ((Number(nutrientValue) / totalWeight) * 100).toFixed(2);
};

const calculateBreakfastCaloriesPerPerson = (personDayCalories) => {
	if (!personDayCalories) {
		return 0;
	}
	return Math.floor((personDayCalories * 28) / 100);
};
export const NutrientsView = ({ nutrients }: NutrientsProps) => {
	const { energy, weight } = nutrients;
	const { user, loading } = useStorage("Dima");

	const caloriesForBreakfastForPerson = calculateBreakfastCaloriesPerPerson(
		user?.calculateAMR
	);
	console.log(caloriesForBreakfastForPerson);
	const renderRows = () => {
		return Object.entries(nutrients).map(([key, value]) => {
			if (key === "weight") {
				return;
			}
			const amountType = key === "energy" ? "Cal" : "g";

			return (
				<DataTable.Row key={key}>
					<DataTable.Cell>{key}</DataTable.Cell>
					{/* <DataTable.Cell numeric>
							{calculateNutrientsForCaloriesPerPerson(
								caloriesForBreakfastForPerson,
								energy,
								value
							)}{" "}
							{amountType}
						</DataTable.Cell> */}

					<DataTable.Cell numeric>
						{Math.round(value)} {amountType}
					</DataTable.Cell>
					<DataTable.Cell numeric>
						{Math.round(
							calculateNutrientPer100Grams({
								totalWeight: weight,
								nutrientValue: value,
							})
						)}{" "}
						{amountType}
					</DataTable.Cell>
				</DataTable.Row>
			);
		});
	};

	return (
		<>
			{/* <Text>
				Your portion is{" "}
				{calculateNutrientsForCaloriesPerPerson(
					caloriesForBreakfastForPerson,
					energy,
					nutrients.weight
				)}
				g from {nutrients.weight}g of meal
			</Text> */}

			<DataTable>
				<DataTable.Header>
					<DataTable.Title>{undefined}</DataTable.Title>
					<>
						<DataTable.Title numeric>
							Per serving {Math.round(weight)}g
						</DataTable.Title>
						<DataTable.Title numeric>Per 100 g</DataTable.Title>
					</>
				</DataTable.Header>
				{renderRows()}
			</DataTable>
		</>
	);
};

// Breakfast: 28%
// Lunch: 33%
// Dinner: 39%
