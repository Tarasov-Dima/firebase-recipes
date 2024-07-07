import { Slot, Stack } from "expo-router";
import { SessionProvider } from "../ctx";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FirebaseAuthService from "@/FirebaseAuthService";

const theme = createTheme({ mode: "dark" });

export default function RootLayout() {
	return (
		<ThemeProvider theme={theme}>
			<SafeAreaProvider>
				<SessionProvider>
					<Stack>
						<Stack.Screen name='index' options={{ headerShown: false }} />
					</Stack>
				</SessionProvider>
			</SafeAreaProvider>
		</ThemeProvider>
	);
}
