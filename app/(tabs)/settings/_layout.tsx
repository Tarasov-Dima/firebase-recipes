import { useThemeContext } from "@/theme";
import { Stack } from "expo-router";
import { IconButton } from "react-native-paper";

const StackLayout = () => {
	const { toggleTheme, isDarkTheme } = useThemeContext();

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: true,
					headerTitle: "Settings",
					headerRight: () => (
						<IconButton
							icon={isDarkTheme ? "brightness-7" : "brightness-3"}
							onPress={toggleTheme}
						/>
					),
				}}
			/>
			<Stack.Screen
				name='user'
				options={{ headerShown: true, headerTitle: "User" }}
			/>
		</Stack>
	);
};

export default StackLayout;
