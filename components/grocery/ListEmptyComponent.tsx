import { useThemeContext } from "@/theme";
import { View } from "react-native";
import { Icon } from "react-native-paper";

export const ListEmptyComponent = () => {
	const { theme } = useThemeContext();

	return (
		<View
			style={{
				alignItems: "center",
				marginTop: "50%",
			}}
		>
			<Icon
				source={"basket-off-outline"}
				size={100}
				color={theme.colors.secondary}
			/>
		</View>
	);
};
