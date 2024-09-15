import { useEffect, useState } from "react";
import { useGroceryList } from "@/storage/useGroceryList";
import { useThemeContext } from "@/theme";
import { Alert } from "react-native";
import { GroceryList } from "@/components/grocery/GroceryList";
import { FAB } from "react-native-paper";

const GroceryTab = () => {
	const groceries = useGroceryList((state) => state.groceries);
	const resetGroceries = useGroceryList((state) => state.resetGroceries);

	const [selectedGroceries, setSelectedGroceries] = useState<number[]>([]);

	const handleSelectGrocery = (newGroceryId: number) => {
		setSelectedGroceries((prevGroceries) => {
			if (prevGroceries.some((groceryId) => groceryId === newGroceryId)) {
				return prevGroceries.filter((groceryId) => groceryId !== newGroceryId);
			} else {
				return [...prevGroceries, newGroceryId];
			}
		});
	};

	const resetAll = () => {
		resetGroceries();
		setSelectedGroceries([]);
	};

	useEffect(() => {
		if (groceries.length > 0 && selectedGroceries.length === groceries.length) {
			groceryListAlert({
				title: "All Groceries Selected",
				subtitle: "You got all groceries. Do you want to clear the list?",
				onPress: resetAll,
			});
		}
	}, [selectedGroceries, groceries.length]);

	const showClearList = groceries.length > 0;
	return (
		<>
			<GroceryList
				data={groceries}
				selectedGroceries={selectedGroceries}
				handleSelectGrocery={handleSelectGrocery}
			/>
			{showClearList && (
				<FAB
					icon='basket-remove'
					style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
					onPress={() =>
						groceryListAlert({
							title: "Do you want to clear the list?",
							subtitle: "",
							onPress: resetAll,
						})
					}
				/>
			)}
		</>
	);
};

export default GroceryTab;

const groceryListAlert = ({ title, subtitle, onPress }) => {
	Alert.alert(
		title,
		subtitle,
		[
			{
				text: "No",
				style: "cancel",
			},
			{
				text: "Yes",
				onPress: onPress,
			},
		],
		{ cancelable: false }
	);
};
