import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { ThemeProvider } from "@/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const RootLayout = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider>
				<SafeAreaProvider>
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
				</SafeAreaProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};

export default RootLayout;
