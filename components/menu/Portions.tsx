import React from "react";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import PieChart from "../PieChart";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { usePortions } from "@/hooks/usePortions";
import { LabelInput } from "../settings/LabelInput";

type Portions = {
	selectedUserNutrients: PreparedDataForUser;
	totalWeight: number;
};

export const Portions = ({
	selectedUserNutrients,
	totalWeight: weight,
}: Portions) => {
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
			<Text variant='headlineSmall'>Portions</Text>
			<LabelInput
				title='You can correct main dish weight'
				label='Main dish weight'
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
				<Text>For</Text>
				<Text>Size of portion</Text>
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
									≈{Math.round(totalNutrients.weight)} g
								</Text>
							</View>
							<DataTable>
								{dishes.map(({ name, nutrients }) => {
									return (
										<DataTable.Row key={name}>
											<DataTable.Cell>{name}</DataTable.Cell>
											<DataTable.Cell numeric>
												≈ {Math.round(nutrients.weight)} g
											</DataTable.Cell>
										</DataTable.Row>
									);
								})}
							</DataTable>
						</View>
					);
				}
			)}
			<Text variant='titleMedium'>Total weight: ≈ {totalWeight}g</Text>
		</View>
	);
};
