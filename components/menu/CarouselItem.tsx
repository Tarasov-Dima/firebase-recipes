import { useMenuItem } from "@/hooks/useMenuItem";
import { useStorage } from "@/useStorage";
import { prepareMealDataForUsers } from "@/utils/prepareMealDataForUsers";
import { MenuItem } from "./MenuItem";
import { MenuBottomSheet } from "./MenuBottomSheet";
import { useMenuGrocery } from "@/hooks/useMenuGrocery";
import { BottomSheetModalRef } from "../BottomSheetModal";
import { useRef } from "react";

export const CarouselItem = ({ item }) => {
	const { dishes, type, image } = item;

	const { data: users, loading } = useStorage("users");

	const bottomSheetRef = useRef<BottomSheetModalRef>(null);

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	const closeBottomSheet = () => {
		bottomSheetRef.current?.close();
	};

	const preparedDataForUsers = prepareMealDataForUsers({
		users: users,
		dish: dishes[0],
		mealType: type,
		premium: true,
	});

	const {
		allIngredients,
		totalWeight,
		selectedUserNutrients,
		selectedUserName,
		setSelectedUserName,
	} = useMenuItem({ preparedDataForUsers });

	const { onAddToGroceryList, onAddToUnselectedGroceries, selectedGroceries } =
		useMenuGrocery(allIngredients, closeBottomSheet);

	const userNames = preparedDataForUsers.map((user) => user.userName);

	const accordionData = userNames.reduce((acc, name) => {
		acc[name] = name;
		return acc;
	}, {});

	return (
		<>
			<MenuItem
				image={image}
				allIngredients={allIngredients}
				totalWeight={totalWeight}
				selectedUserNutrients={selectedUserNutrients}
				selectedUserName={selectedUserName}
				accordionData={accordionData}
				setSelectedUserName={setSelectedUserName}
				dishName={dishes[0].name}
				type={type}
				recipe={dishes[0].recipe}
				openBottomSheet={openBottomSheet}
			/>
			<MenuBottomSheet
				ref={bottomSheetRef}
				ingredients={allIngredients}
				onAddToGroceryList={onAddToGroceryList}
				onAddToUnselectedGroceries={onAddToUnselectedGroceries}
				selectedGroceries={selectedGroceries}
			/>
		</>
	);
};
