import React from "react";
import { DataTable } from "react-native-paper";
import { type Nutrients } from "@/types";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const renderTitle = () => {
		return nutrients.map(({ userName }) => {
			return (
				<DataTable.Title numeric key={userName} numberOfLines={2}>
					{userName}
				</DataTable.Title>
			);
		});
	};

	const renderRows = () => {
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
	};
	return (
		<DataTable>
			<DataTable.Header>
				<DataTable.Title>{t("plans.menu.nutrients.title")}</DataTable.Title>
				{renderTitle()}
			</DataTable.Header>
			{renderRows()}
		</DataTable>
	);
};

// Breakfast: 28%
// Lunch: 33%
// Dinner: 39%
