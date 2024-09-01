import { BasicMenuItem } from "@/components/menu/BasicMenuItem";
import { MenuItem } from "@/components/menu/MenuItem";
import { getMealByKey } from "@/data/meals";
import { User } from "@/types";
import { useStorage } from "@/useStorage";
import { prepareMealDataForUsers } from "@/utils/prepareMealDataForUsers";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator, Switch } from "react-native-paper";

const Menu = () => {
	const params = useLocalSearchParams();
	const [premium, setPremium] = useState(true);

	const onToggleSwitch = () => setPremium(!premium);

	const { data: users, loading } = useStorage<User[]>("users");

	const meal = getMealByKey("firstBreakfast");

	if (!premium || users == null) {
		return (
			<ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 16 }}>
				<Switch value={premium} onValueChange={onToggleSwitch} />
				<BasicMenuItem {...meal} />
			</ScrollView>
		);
	}

	// TODO: fix condition
	if (loading || !meal) {
		return <ActivityIndicator />;
	}
	const { dishes, type, id } = meal;

	const preparedDataForUsers = prepareMealDataForUsers({
		users: users!,
		dish: dishes[0],
		mealType: type,
	});

	return (
		<ScrollView style={{ padding: 16 }} contentContainerStyle={{ gap: 16 }}>
			<Switch value={premium} onValueChange={onToggleSwitch} />
			<MenuItem
				preparedDataForUsers={preparedDataForUsers}
				dishName={dishes[0].name}
				type={type}
				recipe={dishes[0].recipe}
			/>
		</ScrollView>
	);
};

export default Menu;
