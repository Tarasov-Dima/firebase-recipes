import {
	MD3LightTheme,
	MD3DarkTheme,
	adaptNavigationTheme,
} from "react-native-paper";
import { darkColors } from "./darkColors";
import { lightColors } from "./lightColors";
import {
	DefaultTheme as NavigationDefaultTheme,
	DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";

const { LightTheme: CombinedLightTheme, DarkTheme: CombinedDarkTheme } =
	adaptNavigationTheme({
		reactNavigationLight: NavigationDefaultTheme,
		reactNavigationDark: NavigationDarkTheme,
		materialLight: MD3LightTheme,
		materialDark: MD3DarkTheme,
	});

const lightTheme = {
	...CombinedLightTheme,
	colors: {
		...CombinedLightTheme.colors,
		...lightColors,
	},
};

const darkTheme = {
	...CombinedDarkTheme,
	colors: {
		...CombinedDarkTheme.colors,
		...darkColors,
		card: "#1E1E1E",
		border: "#272727",
	},
};

export { lightTheme, darkTheme };
