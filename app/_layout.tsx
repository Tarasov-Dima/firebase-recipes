import { Slot, Stack } from "expo-router";
import { SessionProvider } from "../ctx";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import FirebaseAuthService from "@/FirebaseAuthService";

const theme = createTheme();

export default function RootLayout() {
	return (
		<SessionProvider>
			<ThemeProvider theme={theme}>
				<SafeAreaProvider>
					<Stack>
						<Stack.Screen name='index' options={{ headerShown: false }} />
					</Stack>
				</SafeAreaProvider>
			</ThemeProvider>
		</SessionProvider>
	);
}
