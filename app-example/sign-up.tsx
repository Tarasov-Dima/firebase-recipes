import { View } from "react-native";
import { RegisterForm } from "@/components/RegisterForm";

export default function SignUp() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<RegisterForm />
		</View>
	);
}
