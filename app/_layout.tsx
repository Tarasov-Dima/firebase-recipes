import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import { ThemeProvider } from "@/theme";

const RootLayout = () => {
	return (
		<ThemeProvider>
			<SafeAreaProvider>
				<View style={{ flex: 1, backgroundColor: "red" }}>
					<Stack>
						<Stack.Screen
							name='(tabs)'
							options={{
								headerShown: false,
							}}
						/>
					</Stack>
				</View>
			</SafeAreaProvider>
		</ThemeProvider>
	);
};

export default RootLayout;
