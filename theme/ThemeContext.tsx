import { createContext, useContext, ReactNode } from "react";
import { lightTheme, darkTheme } from "./customTheme";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { useAppSettings } from "@/storage/useAppSettings";

const ThemeContext = createContext({
	theme: lightTheme,
	isDarkTheme: false,
});

type ThemeProviderProps = {
	children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { themeMode } = useAppSettings();

	const isDarkTheme = themeMode === "dark";

	const theme = isDarkTheme ? darkTheme : lightTheme;

	return (
		<ThemeContext.Provider
			value={{
				isDarkTheme,
				theme,
			}}
		>
			<PaperProvider theme={theme}>
				<NavigationThemeProvider value={theme}>
					{children}
				</NavigationThemeProvider>
			</PaperProvider>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext(ThemeContext);
