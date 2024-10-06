import { useMenuItem } from "@/hooks/useMenuItem";
import { useStorage } from "@/useStorage";
import { prepareMealDataForUsers } from "@/utils/prepareMealDataForUsers";
import { useWindowDimensions, Image } from "react-native";
import { MenuItem } from "./MenuItem";
import { MenuBottomSheet } from "./MenuBottomSheet";
import { useMenuGrocery } from "@/hooks/useMenuGrocery";

export const CarouselItem = ({ item, bottomSheetRef, closeBottomSheet }) => {
	const { dishes, type, image } = item;

	const { width } = useWindowDimensions();
	const { data: users, loading } = useStorage("users");

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
				style={{ width: width - 32, flex: 1 }}
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
