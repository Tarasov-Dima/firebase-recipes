import { Stack } from "expo-router";

const StackLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ headerShown: true, headerTitle: "Settings" }}
			/>
			<Stack.Screen
				name='user'
				options={{ headerShown: true, headerTitle: "User" }}
			/>
		</Stack>
	);
};

export default StackLayout;
