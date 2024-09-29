import { useEffect, useRef, useState } from "react";
import { useGroceryList } from "@/storage/useGroceryList";
import { Alert } from "react-native";
import { GroceryList } from "@/components/grocery/GroceryList";
import { ListFABs } from "@/components/grocery/ListFABs";
import {
	BottomSheetModal,
	BottomSheetModalRef,
} from "@/components/BottomSheetModal";
import { AddGroceryForm } from "@/components/grocery/AddGroceryForm";

const GroceryTab = () => {
	const bottomSheetRef = useRef<BottomSheetModalRef>(null);

	const groceries = useGroceryList((state) => state.groceries);
	const addIngredient = useGroceryList((state) => state.addIngredient);
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

	const unselectedAll = () => {
		setSelectedGroceries([]);
	};

	const resetAll = () => {
		resetGroceries();
		unselectedAll();
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

	return (
		<>
			<GroceryList
				data={groceries}
				selectedGroceries={selectedGroceries}
				handleSelectGrocery={handleSelectGrocery}
			/>
			<ListFABs
				onUnselect={unselectedAll}
				onAdd={() => bottomSheetRef.current?.present()}
				onReset={resetAll}
				unselectDisabled={selectedGroceries.length === 0}
				resetDisabled={groceries.length === 0}
			/>
			<BottomSheetModal ref={bottomSheetRef}>
				<AddGroceryForm onAddGrocery={() => {}} />
			</BottomSheetModal>
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
