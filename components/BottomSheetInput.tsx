import { useThemeContext } from "@/theme";
import React, { useState } from "react";
import { View, StyleSheet, TextInputProps } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Text } from "react-native-paper";

type BottomSheetInputProps = {
	label?: string;
} & TextInputProps;

export const BottomSheetInput = ({
	value,
	onChangeText,
	label,
	placeholder,
	...rest
}: BottomSheetInputProps) => {
	const { theme } = useThemeContext();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View>
			{isFocused && !!label && (
				<Text
					variant='bodyMedium'
					style={[
						styles.label,
						{
							backgroundColor: theme.colors.surface,
							color: theme.colors.text,
							borderColor: theme.colors.primary,
						},
					]}
				>
					{label}
				</Text>
			)}
			<BottomSheetTextInput
				value={value}
				onChangeText={onChangeText}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				style={[
					styles.input,
					{
						color: theme.colors.text,
						borderColor: theme.colors.primary,
					},
				]}
				placeholderTextColor={theme.colors.backdrop}
				placeholder={isFocused ? placeholder : label}
				{...rest}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		borderRadius: 12,
		fontSize: 16,
		lineHeight: 20,
		paddingVertical: 12,
		paddingHorizontal: 14,
		borderWidth: 2,
		minWidth: 200,
	},
	label: {
		position: "absolute",
		left: 16,
		top: -10,
		zIndex: 2,
		paddingHorizontal: 4,
	},
});
