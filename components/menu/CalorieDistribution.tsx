import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import PieChart from "../PieChart";
import { useThemeContext } from "@/theme";

export const CalorieDistribution = ({ totalNutrients, totalWeight }) => {
	const { theme } = useThemeContext();

	const colorMapping = [
		{
			color: theme.colors.primary,
			textColor: theme.colors.onPrimary,
		},
		{
			color: theme.colors.secondary,
			textColor: theme.colors.onSecondary,
		},
		{
			color: theme.colors.tertiary,
			textColor: theme.colors.onTertiary,
		},
	];
	const portionPerUser = totalNutrients.map((item, index) => {
		const { color, textColor } = colorMapping[index];

		return {
			name: item.user,
			portionWeight: Math.round(item.nutrients.weight),
			percent: Math.round(
				(Math.round(item.nutrients.weight) * 100) / totalWeight
			),
			color,
			textColor,
		};
	});
	return (
		<View style={{ gap: 5 }}>
			<Text variant='headlineSmall'>Calorie Distribution</Text>
			<PieChart data={portionPerUser} radius={60} />
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
			{portionPerUser.map((user, index) => {
				return (
					<View
						key={user.name + index}
						style={{
							backgroundColor: user.color,
							flex: 1,
							justifyContent: "space-between",
							flexDirection: "row",
							borderRadius: 8,
							paddingHorizontal: 5,
						}}
					>
						<Text
							style={{
								color: user.textColor,
								padding: 4,
							}}
						>
							{user.name}{" "}
						</Text>
						<Text style={{ color: user.textColor, padding: 4 }}>
							≈{user.portionWeight}g
						</Text>
					</View>
				);
			})}
			<Text variant='titleMedium'>Total weight: ≈{totalWeight}g</Text>
		</View>
	);
};
