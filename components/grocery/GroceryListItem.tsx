import { useThemeContext } from "@/theme";
import React from "react";
import { View } from "react-native";
import { Card, Icon, Text } from "react-native-paper";

export const GroceryListItem = ({
	selected,
	onSelectItem,
	text,
	id,
	amount,
	selectedType,
}) => {
	const { theme } = useThemeContext();

	return (
		<Card
			mode={selected ? "contained" : "elevated"}
			contentStyle={{
				flexDirection: "row",
				alignItems: "center",
				padding: 12,
				gap: 12,
			}}
			onPress={() => onSelectItem(id)}
		>
			<Icon
				source={selected ? "check-bold" : "check"}
				size={24}
				color={selected ? theme.colors.primary : theme.colors.secondary}
			/>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text
					style={{
						flexShrink: 1,
						textDecorationLine:
							selected && selectedType === "lineThrough"
								? "line-through"
								: "none",
					}}
					variant='bodyLarge'
				>
					{text}
				</Text>
				<Text variant='bodyLarge'>
					{Math.round(amount.number)} {amount.type}
				</Text>
			</View>
		</Card>
	);
};
