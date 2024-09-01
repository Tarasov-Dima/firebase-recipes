import React from "react";
import { View } from "react-native";
import { DataTable, Text } from "react-native-paper";
import PieChart from "../PieChart";
import { useThemeContext } from "@/theme";
import { PreparedDataForUser } from "@/utils/prepareMealDataForUsers";
import { Colors } from "@/theme/customTheme";

type Portions = {
	selectedUserNutrients: PreparedDataForUser;
	totalWeight: number;
};

const colorMapping: Record<
	number,
	(colors: Colors) => { color: string; textColor: string }
> = {
	0: ({ primary, onPrimary }) => ({
		color: primary,
		textColor: onPrimary,
	}),
	1: ({ secondary, onSecondary }) => ({
		color: secondary,
		textColor: onSecondary,
	}),
	2: ({ tertiary, onTertiary }) => ({
		color: tertiary,
		textColor: onTertiary,
	}),
};

export const Portions = ({ selectedUserNutrients, totalWeight }: Portions) => {
	const { theme } = useThemeContext();

	const portionPerUser = selectedUserNutrients.map((user, index) => {
		const { color, textColor } = colorMapping[index](theme.colors);

		return {
			name: user.userName,
			portionWeight: Math.round(user.totalNutrients.weight),
			percent: Math.round(
				(Math.round(user.totalNutrients.weight) * 100) / totalWeight
			),
			color,
			textColor,
		};
	});

	return (
		<View style={{ gap: 5 }}>
			<Text variant='headlineSmall'>Portions</Text>
			{portionPerUser.length > 1 && (
				<PieChart data={portionPerUser} radius={60} />
			)}
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
			{selectedUserNutrients.map(
				({ userName, totalNutrients, dishes }, index) => {
					const { color, textColor } = colorMapping[index](theme.colors);

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
