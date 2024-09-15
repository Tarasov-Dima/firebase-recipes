import { useGroceryList } from "@/storage/useGroceryList";
import { Stack } from "expo-router";

const StackLayout = () => {
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ headerShown: true, headerTitle: "Grocery" }}
			/>
		</Stack>
	);
};

export default StackLayout;
