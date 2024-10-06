import { useState } from "react";

export type UseDayPickerReturn = {
	days: number[];
	selectedDay: number;
	visitedDays: number[];
	setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
	markDayAsVisited: (day: number) => void;
};

export const useDayPicker = (): UseDayPickerReturn => {
	const [selectedDay, setSelectedDay] = useState(1);
	const [visitedDays, setVisitedDays] = useState<number[]>([]);

	const days = Array.from({ length: 7 }, (_, index) => index + 1);

	const markDayAsVisited = (day: number) => {
		if (visitedDays.includes(day)) {
			setVisitedDays(visitedDays.filter((visitedDay) => visitedDay !== day));
		} else {
			setVisitedDays([...visitedDays, day]);
		}
	};

	return {
		days,
		selectedDay,
		visitedDays,
		setSelectedDay,
		markDayAsVisited,
	};
};
