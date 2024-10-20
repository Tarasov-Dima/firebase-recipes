import { useEffect, useRef, useState } from "react";
import { Grocery, useGroceryList } from "@/storage/useGroceryList";
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
import { ingredients } from "@/data/ingredients";
import { useTranslation } from "react-i18next";

const ingredientsArray = Object.values(ingredients);

const GroceryTab = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const bottomSheetRef = useRef<BottomSheetModalRef>(null);
	const { showSnackbar } = useSnackbar();

	const [menuVisible, setMenuVisible] = useState(false);

	const groceries = useGroceryList((state) => state.groceries);
	const addGrocery = useGroceryList((state) => state.addGrocery);
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
		showSnackbar({ message: t("snackbar.groceriesCopiedToClipboard") });
	};

	const isEmptyList = groceries.length === 0;

	useEffect(() => {
		if (!isEmptyList && selectedGroceries.length === groceries.length) {
			groceryListAlert({
				title: t("grocery.groceryListAlert.title"),
				subtitle: t("grocery.groceryListAlert.subtitle"),
				positiveAction: t("grocery.groceryListAlert.actions.clear"),
				negativeAction: t("grocery.groceryListAlert.actions.cancel"),
				onPress: resetAll,
			});
		}
	}, [selectedGroceries, groceries.length]);

	const onAddGrocery = (grocery: Grocery) => {
		addGrocery(grocery);
		setMenuVisible(false);
		bottomSheetRef.current?.dismiss();
	};

	const ingredients = ingredientsArray.map(
		({ nutrients_per_100g, ...rest }) => {
			return {
				...rest,
				amount: {
					number: 0,
				},
			};
		}
	);

	const mergedGroceries = Array.from(
		new Map(
			[...groceries, ...ingredients].map((item) => [item.id, item])
		).values()
	);

	return (
		<>
			<GroceryList
				sections={sections}
				selectedGroceries={selectedGroceries}
				handleSelectGrocery={handleSelectGrocery}
			/>
			<ListFABs
				setMenuVisible={setMenuVisible}
				menuVisible={menuVisible}
				onUnselect={unselectedAll}
				onAdd={onAdd}
				onReset={resetAll}
				onCopy={onCopy}
				unselectDisabled={selectedGroceries.length === 0}
				resetDisabled={isEmptyList}
				copyDisabled={isEmptyList}
			/>
			<BottomSheetModal ref={bottomSheetRef}>
				<AddGroceryForm
					groceries={mergedGroceries}
					onAddGrocery={onAddGrocery}
				/>
			</BottomSheetModal>
		</>
	);
};

export default GroceryTab;

const groceryListAlert = ({
	title,
	subtitle,
	positiveAction,
	negativeAction,
	onPress,
}) => {
	Alert.alert(
		title,
		subtitle,
		[
			{
				text: negativeAction,
				style: "cancel",
			},
			{
				text: positiveAction,
				onPress: onPress,
			},
		],
		{ cancelable: false }
	);
};
