import React from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawerContent } from "@/components/drawer/CustomDrawerContent";

const DrawerLayout = () => {
	return (
		<Drawer drawerContent={() => <CustomDrawerContent />}>
			<Drawer.Screen
				name='(tabs)'
				options={{
					headerShown: false,
					drawerType: "front",
					swipeEdgeWidth: 50,
				}}
			/>
		</Drawer>
	);
};

export default DrawerLayout;
