import { getMealById } from "@/data/meals";
import { useLocalSearchParams } from "expo-router";
import { MenuCarousel } from "@/components/menu/MenuCarousel";
import { DayPicker } from "@/components/menu/DayPicker";
import { useDayPicker } from "@/hooks/useDayPicker";

const Menu = () => {
	const params = useLocalSearchParams();

	const { days, selectedDay, visitedDays, setSelectedDay, markDayAsVisited } =
		useDayPicker();

	const meals = getMealById(selectedDay);

	return (
		<>
			<DayPicker
				days={days}
				selectedDay={selectedDay}
				setSelectedDay={setSelectedDay}
				visitedDays={visitedDays}
				markDayAsVisited={markDayAsVisited}
			/>
			<MenuCarousel data={meals} key={selectedDay} />
		</>
	);
};

export default Menu;
