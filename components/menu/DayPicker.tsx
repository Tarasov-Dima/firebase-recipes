import { UseDayPickerReturn } from "@/hooks/useDayPicker";
import { useThemeContext } from "@/theme";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, Chip, Icon } from "react-native-paper";

const DOUBLE_TAP_DELAY = 300;

export const DayPicker = ({
	days,
	selectedDay,
	setSelectedDay,
	visitedDays,
	markDayAsVisited,
}: UseDayPickerReturn) => {
	const { theme } = useThemeContext();
	const [lastTap, setLastTap] = useState<number | null>(null);

	const handleDayPress = (item: UseDayPickerReturn["selectedDay"]) => {
		const now = Date.now();
		if (lastTap && now - lastTap < DOUBLE_TAP_DELAY) {
			markDayAsVisited(item);
		} else {
			setSelectedDay(item);
		}
		setLastTap(now);
	};

	const renderItem = ({
		item,
	}: {
		item: UseDayPickerReturn["selectedDay"];
	}) => {
		const isSelected = selectedDay === item;
		const isVisited = visitedDays.includes(item);

		const backgroundColor = isSelected
			? theme.colors.primary
			: theme.colors.secondaryContainer;

		const selectedColor = isSelected
			? theme.colors.onPrimary
			: theme.colors.text;
		return (
			<Button
				onPress={() => handleDayPress(item)}
				style={{ backgroundColor }}
				contentStyle={{ height: 46 }}
				textColor={selectedColor}
				icon={() =>
					isVisited ? (
						<Icon
							size={20}
							source={"checkbox-marked-circle-outline"}
							color={selectedColor}
						/>
					) : undefined
				}

				// selectedColor={selectedColor}
				// showSelectedOverlay={isSelected}
			>
				Day {item}
			</Button>
		);
	};

	return (
		<Card style={{ marginBottom: 6 }}>
			<Card.Content>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={days}
					renderItem={renderItem}
					contentContainerStyle={{ gap: 8 }}
				/>
			</Card.Content>
		</Card>
	);
};
