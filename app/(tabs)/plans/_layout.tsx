import { Stack } from "expo-router";

const StackLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ headerShown: true, headerTitle: "Plans" }}
			/>
			<Stack.Screen
				name='menu'
				options={{ headerShown: true, headerTitle: "Menu" }}
			/>
		</Stack>
	);
};

export default StackLayout;
