import React from "react";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import PieChart from "../PieChart";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { usePortions } from "@/hooks/usePortions";
import { LabelInput } from "../settings/LabelInput";
import { useTranslation } from "react-i18next";

type Portions = {
	selectedUserNutrients: PreparedDataForUser;
	totalWeight: number;
};

export const Portions = ({
	selectedUserNutrients,
	totalWeight: weight,
}: Portions) => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const {
		preparedData,
		pieChartData,
		mainDishWeight,
		totalWeight,
		setMainDishWeight,
		resetToInitialWeight,
	} = usePortions({ selectedUserNutrients, weight });

	return (
		<View style={{ gap: 5 }}>
			<Text variant='headlineSmall'>{t("plans.menu.portions.title")}</Text>
			<LabelInput
				title={t("plans.menu.portions.inputHint")}
				label={t("plans.menu.portions.dishWeight")}
				value={mainDishWeight}
				onChange={setMainDishWeight}
				maxLength={5}
				onReset={resetToInitialWeight}
			/>
			{pieChartData.length > 1 && <PieChart data={pieChartData} radius={60} />}
			<View
				style={{
					flex: 1,
					justifyContent: "space-between",
					flexDirection: "row",
				}}
			>
				<Text>{t("plans.menu.portions.for")}</Text>
				<Text>{t("plans.menu.portions.sizeOfPortion")}</Text>
			</View>
			{preparedData.map(
				({ userName, totalNutrients, dishes, color, textColor }, index) => {
					return (
						<View key={userName}>
							<View
								key={userName + index}
								style={{
									backgroundColor: color,
									flex: 1,
									justifyContent: "space-between",
									flexDirection: "row",
									borderRadius: 8,
									paddingHorizontal: 5,
								}}
							>
								<Text
									style={{
										color: textColor,
										padding: 4,
									}}
								>
									{userName}{" "}
								</Text>
								<Text style={{ color: textColor, padding: 4 }}>
									≈{Math.round(totalNutrients.weight)}{" "}
									{t("plans.menu.portions.g")}
								</Text>
							</View>
							<DataTable>
								{dishes.map(({ name, nutrients }) => {
									return (
										<DataTable.Row key={name}>
											<DataTable.Cell>{name}</DataTable.Cell>
											<DataTable.Cell numeric>
												≈ {Math.round(nutrients.weight)}{" "}
												{t("plans.menu.portions.g")}
											</DataTable.Cell>
										</DataTable.Row>
									);
								})}
							</DataTable>
						</View>
					);
				}
			)}
			<Text variant='titleMedium'>
				{t("plans.menu.portions.totalWeight", { totalWeight })}
			</Text>
		</View>
	);
};
