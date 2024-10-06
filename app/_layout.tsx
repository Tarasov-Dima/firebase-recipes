import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SnackbarProvider } from "@/providers/SnackbarProvider";

const RootLayout = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider>
				<ThemeProvider>
					<SnackbarProvider>
						<BottomSheetModalProvider>
							<Stack>
								<Stack.Screen
									name='(tabs)'
									options={{
										headerShown: false,
									}}
								/>
							</Stack>
						</BottomSheetModalProvider>
					</SnackbarProvider>
				</ThemeProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};

export default RootLayout;
