import { Text, View } from "react-native";
import firebase from "../FirebaseConfig";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				// justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ fontSize: 40 }}>GitHub actions</Text>
		</View>
	);
}
