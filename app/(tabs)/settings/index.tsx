import { List, FAB, Text } from "react-native-paper";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import { View } from "react-native";
import { useStorage } from "@/useStorage";

const SettingsTab = () => {
	const { user, loading } = useStorage("Dima");
	console.log(user);

	if (loading) {
		return null;
	}

	return (
		<View style={{ flex: 1 }}>
			<Text>Name: {user?.name}</Text>
			<Text>Age: {user?.age}</Text>
			<Text>Height: {user?.height}</Text>
			<Text>Weight: {user?.weight}</Text>
			<Text>Sex: {user?.sex}</Text>
			<Text>Calories per day: {user?.calculateAMR}</Text>
			<Link
				href={{
					pathname: "/settings/user",
				}}
				asChild
			>
				<FAB
					icon='plus'
					style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
					label='add user'
				/>
			</Link>
		</View>
	);
};

export default SettingsTab;
