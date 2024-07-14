import React from "react";
import { Stack } from "expo-router";
import { SessionProvider } from "../ctx";
import { PaperProvider } from "react-native-paper";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

const RootLayout = () => {
	return (
		<PaperProvider>
			<SafeAreaProvider>
				<View style={{ flex: 1, backgroundColor: "red" }}>
					<Stack>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					</Stack>
				</View>
			</SafeAreaProvider>
		</PaperProvider>
	);
};

export default RootLayout;
