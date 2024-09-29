import { useMenuItem } from "@/hooks/useMenuItem";
import { useStorage } from "@/useStorage";
import { prepareMealDataForUsers } from "@/utils/prepareMealDataForUsers";
import { useWindowDimensions } from "react-native";
import { MenuItem } from "./MenuItem";

export const CarouselItem = ({ item }) => {
	const { dishes, type } = item;

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

	const userNames = preparedDataForUsers.map((user) => user.userName);

	const accordionData = userNames.reduce((acc, name) => {
		acc[name] = name;
		return acc;
	}, {});

	return (
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
			style={{ width: width - 32, flex: 1 }}
		/>
	);
};
