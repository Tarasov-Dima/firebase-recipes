import { useThemeContext } from "@/theme";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { IconButton } from "react-native-paper";

const StackLayout = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const { toggleTheme, isDarkTheme } = useThemeContext();

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					headerShown: true,
					headerTitle: t("plans.title"),
					headerRight: () => (
						<IconButton
							icon={isDarkTheme ? "brightness-7" : "brightness-3"}
							onPress={toggleTheme}
						/>
					),
				}}
			/>
			<Stack.Screen
				name='menu'
				options={{ headerShown: true, headerTitle: t("plans.menu.title") }}
			/>
		</Stack>
	);
};

export default StackLayout;
