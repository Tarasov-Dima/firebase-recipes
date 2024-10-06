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
import { groupAndSortByCategory } from "@/utils/groupAndSortByCategory";
import { setStringAsync } from "expo-clipboard";
import { useSnackbar } from "@/providers/SnackbarProvider";

const GroceryTab = () => {
	const bottomSheetRef = useRef<BottomSheetModalRef>(null);
	const { showSnackbar } = useSnackbar();

	const groceries = useGroceryList((state) => state.groceries);
	const addIngredient = useGroceryList((state) => state.addIngredient);
	const resetGroceries = useGroceryList((state) => state.resetGroceries);

	const [selectedGroceries, setSelectedGroceries] = useState<number[]>([]);

	const sections = groupAndSortByCategory({
		ingredients: groceries,
		selectedIngredients: selectedGroceries,
	});

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

	const onAdd = () => {
		bottomSheetRef.current?.present();
	};

	const onCopy = async () => {
		const groceriesForCopy = sections
			.map((section) => {
				const category = section.title;
				const groceries = section.data.map((grocery) => {
					return `${grocery.name} - ${grocery.amount.number}${
						grocery.amount.type ?? ""
					}`;
				});
				return `${category}\n${groceries.join("\n")}`;
			})
			.join("\n\n");

		await setStringAsync(groceriesForCopy);
		showSnackbar({ message: "Groceries copied to clipboard!" });
	};

	const isEmptyList = groceries.length === 0;

	useEffect(() => {
		if (!isEmptyList && selectedGroceries.length === groceries.length) {
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
				sections={sections}
				selectedGroceries={selectedGroceries}
				handleSelectGrocery={handleSelectGrocery}
			/>
			<ListFABs
				onUnselect={unselectedAll}
				onAdd={onAdd}
				onReset={resetAll}
				onCopy={onCopy}
				unselectDisabled={selectedGroceries.length === 0}
				resetDisabled={isEmptyList}
				copyDisabled={isEmptyList}
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
