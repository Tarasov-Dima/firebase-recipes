import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const TabsLayout = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='plans'
		>
			<Tabs.Screen
				name='settings'
				options={{
					tabBarLabel: t("settings.tabTitle"),
					tabBarLabelStyle: {
						fontSize: 14,
					},
					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name={focused ? "account-cog" : "account-cog-outline"}
							color={color}
							size={30}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='plans'
				options={{
					tabBarLabel: t("plans.tabTitle"),
					tabBarLabelStyle: {
						fontSize: 14,
					},
					tabBarIcon: ({ color }) => (
						<Entypo name='bowl' size={30} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name='grocery'
				options={{
					tabBarLabel: t("grocery.tabTitle"),
					tabBarLabelStyle: {
						fontSize: 14,
					},
					tabBarIcon: ({ color, focused }) => (
						<MaterialCommunityIcons
							name={focused ? "basket-check" : "basket-check-outline"}
							size={30}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
