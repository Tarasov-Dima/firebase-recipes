import React from "react";
import { DataTable } from "react-native-paper";
import { type Nutrients } from "@/types";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";

type NutrientsProps = {
	nutrients: Nutrients | PreparedDataForUser;
};

type NutrientKey = keyof Nutrients;

const calculateNutrientPer100Grams = ({
	totalWeight,
	nutrientValue,
}: {
	totalWeight: number;
	nutrientValue: number | string;
}) => {
	return Number(((Number(nutrientValue) / totalWeight) * 100).toFixed(2));
};

export const NutrientsView = ({ nutrients }: NutrientsProps) => {
	const isNutrientsAsArray = Array.isArray(nutrients);

	const renderTitle = () => {
		if (isNutrientsAsArray) {
			return nutrients.map(({ userName }) => {
				return (
					<DataTable.Title numeric key={userName}>
						For {userName}
					</DataTable.Title>
				);
			});
		}

		return (
			<>
				<DataTable.Title numeric>Per serving</DataTable.Title>
				<DataTable.Title numeric>Per 100 g</DataTable.Title>
			</>
		);
	};

	const renderRows = () => {
		if (isNutrientsAsArray) {
			const allUserNutrients = nutrients.map(
				({ totalNutrients }) => totalNutrients
			);
			const nutrientKeys = Object.keys(allUserNutrients[0]).filter(
				(key): key is NutrientKey => key !== "weight"
			);

			return nutrientKeys.map((key) => {
				const amountType = key === "energy" ? "Cal" : "g";

				return (
					<DataTable.Row key={key}>
						<DataTable.Cell>{key}</DataTable.Cell>
						{allUserNutrients.map((userNutrients, userIndex) => (
							<DataTable.Cell key={`${key}-user-${userIndex}`} numeric>
								{Math.round(userNutrients[key])} {amountType}
							</DataTable.Cell>
						))}
					</DataTable.Row>
				);
			});
		}

		return Object.entries(nutrients).map(([key, value]) => {
			if (key === "weight") {
				return;
			}
			const amountType = key === "energy" ? "Cal" : "g";
			const { weight } = nutrients;

			return (
				<DataTable.Row key={key}>
					<DataTable.Cell>{key}</DataTable.Cell>
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
		<DataTable>
			<DataTable.Header>
				<DataTable.Title>{undefined}</DataTable.Title>
				{renderTitle()}
			</DataTable.Header>
			{renderRows()}
		</DataTable>
	);
};

// Breakfast: 28%
// Lunch: 33%
// Dinner: 39%
