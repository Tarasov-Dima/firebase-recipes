import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";

const SettingsTab = () => {
	return (
		<List.Section>
			<List.Subheader>Settings</List.Subheader>
			<Link
				href={{
					pathname: "/settings/user",
				}}
				asChild
			>
				<List.Item
					title='User data'
					left={() => <FontAwesomeIcon name='person-half-dress' size={30} />}
					onPress={() => {}}
				/>
			</Link>
		</List.Section>
	);
};

export default SettingsTab;
