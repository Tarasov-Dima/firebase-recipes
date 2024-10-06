import { BottomSheetGroceryList } from "@/components/grocery/BottomSheetGroceryList";
import { getMealById, MealDayID } from "@/data/meals";
import { User } from "@/types";
import { useStorage } from "@/useStorage";
import { prepareMealDataForUsers } from "@/utils/prepareMealDataForUsers";
import {
	BottomSheetModal,
	type BottomSheetModalRef,
} from "@/components/BottomSheetModal";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button, FAB } from "react-native-paper";
import { useMenuItem } from "@/hooks/useMenuItem";
import { useGroceryList } from "@/storage/useGroceryList";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MenuCarousel } from "@/components/menu/MenuCarousel";
import { DayPicker } from "@/components/menu/DayPicker";
import { useDayPicker } from "@/hooks/useDayPicker";
import { MenuBottomSheet } from "@/components/menu/MenuBottomSheet";
import { useMenuGrocery } from "@/hooks/useMenuGrocery";

const Menu = () => {
	const params = useLocalSearchParams();

	const { days, selectedDay, visitedDays, setSelectedDay, markDayAsVisited } =
		useDayPicker();

	const meals = getMealById(selectedDay);

	if (!meals) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<>
			<DayPicker
				days={days}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				visitedDays={visitedDays}
				markDayAsVisited={markDayAsVisited}
			/>
			<MenuCarousel data={meals} />
		</>
	);
};

export default Menu;
