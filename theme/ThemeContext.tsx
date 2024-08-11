import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";
import { lightTheme, darkTheme } from "./customTheme";
import { useStorage } from "@/useStorage";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";

const ThemeContext = createContext({
	theme: lightTheme,
	isDarkTheme: false,
	toggleTheme: () => {},
});

type ThemeProviderProps = {
	children: ReactNode;
};

type Theme = "dark" | "light";

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const { data, setValue } = useStorage<Theme>("theme");
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	useEffect(() => {
		if (data) {
			setIsDarkTheme(data === "dark");
		}
	}, [data]);

	const toggleTheme = () => {
		setIsDarkTheme((prevTheme) => {
			const newTheme = !prevTheme;
			setValue(prevTheme ? "light" : "dark");
			return newTheme;
		});
	};

	const theme = isDarkTheme ? darkTheme : lightTheme;

	return (
		<ThemeContext.Provider
			value={{
				toggleTheme,
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
