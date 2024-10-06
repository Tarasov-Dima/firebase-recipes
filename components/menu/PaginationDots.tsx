import { useThemeContext } from "@/theme";
import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolation,
} from "react-native-reanimated";

export const PaginationDots = ({ scrollX, numberOfDots }) => {
	const { width } = useWindowDimensions();
	const { theme } = useThemeContext();

	return (
		<View style={styles.paginationContainer}>
			{Array.from({ length: numberOfDots }).map((_, index) => {
				const animatedDotStyle = useAnimatedStyle(() => {
					const opacity = interpolate(
						scrollX.value,
						[(index - 1) * width, index * width, (index + 1) * width],
						[0.5, 1, 0.5],
						Extrapolation.CLAMP
					);

					const scale = interpolate(
						scrollX.value,
						[(index - 1) * width, index * width, (index + 1) * width],
						[0.8, 1.3, 0.8],
						Extrapolation.CLAMP
					);

					return {
						opacity,
						transform: [{ scale }],
					};
				});

				return (
					<Animated.View
						key={index}
						style={[
							styles.dot,
							animatedDotStyle,
							{ backgroundColor: theme.colors.primary },
						]}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	paginationContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 16,
	},
	dot: {
		height: 10,
		width: 10,
		borderRadius: 5,
		marginHorizontal: 8,
	},
});
