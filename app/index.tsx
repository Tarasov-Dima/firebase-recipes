import { View } from "react-native";
import { Logout } from "@/components/Logout";
import { useState } from "react";
import FirebaseAuthService from "@/FirebaseAuthService";
import { LoginForm } from "@/components/LoginForm";
import { useTheme } from "@rneui/themed";

export default function Index() {
	const { theme } = useTheme();

	const [user, setUser] = useState(null);

	FirebaseAuthService.subscribeToAuthChanges(setUser);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.colors.background,
			}}
		>
			{user ? <Logout user={user} /> : <LoginForm />}
		</View>
	);
}
