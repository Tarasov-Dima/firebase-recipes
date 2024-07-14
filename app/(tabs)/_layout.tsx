import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='plans'
				options={{
					tabBarLabelStyle: {
						fontSize: 14,
					},
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "beer" : "beer-outline"}
							color={color}
							size={30}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='settings'
				options={{
					tabBarLabelStyle: {
						fontSize: 14,
					},
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? "settings" : "settings-outline"}
							color={color}
							size={30}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
