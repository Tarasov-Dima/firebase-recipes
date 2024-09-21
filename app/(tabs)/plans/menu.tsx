import { BottomSheetGroceryList } from "@/components/grocery/BottomSheetGroceryList";
import { MenuItem } from "@/components/menu/MenuItem";
import { ScreenContainer } from "@/components/ScreenContainer";
import { getMealByKey } from "@/data/meals";
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
import { ActivityIndicator, Button, FAB, Switch } from "react-native-paper";
import { useMenuItem } from "@/hooks/useMenuItem";
import { useGroceryList } from "@/storage/useGroceryList";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

const Menu = () => {
	const params = useLocalSearchParams();
	const { bottom } = useSafeAreaInsets();

	const [premium, setPremium] = useState(true);

	const onToggleSwitch = () => setPremium(!premium);

	const { data: users, loading } = useStorage<User[]>("users");
	const [unselectedGroceries, setUnselectedGroceries] = useState([]);

	const meal = getMealByKey("firstBreakfast");

	const bottomSheetRef = useRef<BottomSheetModalRef>(null);

	const { dishes, type, id } = meal;

	const preparedDataForUsers = prepareMealDataForUsers({
		users: users,
		dish: dishes[0],
		mealType: type,
		premium,
	});

	const {
		allIngredients,
		totalWeight,
		selectedUserNutrients,
		selectedUserName,
		setSelectedUserName,
	} = useMenuItem({ preparedDataForUsers });

	const addIngredients = useGroceryList((state) => state.addIngredients);

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	if (loading || !meal) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	const selectedGroceries = allIngredients
		.filter((ingredient) => {
			return unselectedGroceries.some((id) => id === ingredient.id);
		})
		.map((grocery) => grocery.id);

	const onAddToUnselectedGroceries = (id) => {
		setUnselectedGroceries((prevGroceries) => {
			if (prevGroceries.some((groceryId) => groceryId === id)) {
				return prevGroceries.filter((groceryId) => groceryId !== id);
			} else {
				return [...prevGroceries, id];
			}
		});
	};

	const onAddToGroceryList = () => {
		const filteredIngredients = allIngredients.filter((ingredient) => {
			return !unselectedGroceries.some((id) => id === ingredient.id);
		});
		addIngredients(filteredIngredients);
		bottomSheetRef.current?.close();
		setUnselectedGroceries([]);
	};
	const userNames = preparedDataForUsers.map((user) => user.userName);

	const accordionData = userNames.reduce((acc, name) => {
		acc[name] = name;
		return acc;
	}, {} as Record<string, string>);

	return (
		<>
			<ScreenContainer>
				<Switch value={premium} onValueChange={onToggleSwitch} />
				<MenuItem
					allIngredients={allIngredients}
					totalWeight={totalWeight}
					selectedUserNutrients={selectedUserNutrients}
					selectedUserName={selectedUserName}
					accordionData={accordionData}
					setSelectedUserName={setSelectedUserName}
					dishName={dishes[0].name}
					type={type}
					recipe={dishes[0].recipe}
				/>
			</ScreenContainer>
			<FAB
				icon='basket-plus'
				style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
				onPress={openBottomSheet}
			/>
			<BottomSheetModal ref={bottomSheetRef}>
				<View
					style={{
						flex: 1,
						marginBottom: bottom,
						gap: 8,
						paddingHorizontal: 8,
					}}
				>
					<View style={{ flex: 1, marginHorizontal: -8 }}>
						<BottomSheetGroceryList
							data={allIngredients}
							handleSelectGrocery={onAddToUnselectedGroceries}
							selectedGroceries={selectedGroceries}
							selectedType='lineThrough'
						/>
					</View>
					<Button mode='contained' onPress={onAddToGroceryList}>
						Add to grocery list
					</Button>
				</View>
			</BottomSheetModal>
		</>
	);
};

export default Menu;
