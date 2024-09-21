import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";

type LabelInputProps = {
	title: string;
	label: string;
	value: string;
	maxLength: number;
	onReset?: VoidFunction;
	onChange: (text: string) => void;
};

const numberValidation = (text: string): string => {
	return text.replace(/[^0-9]/g, "");
};

export const LabelInput = ({
	title,
	label,
	value,
	onChange,
	maxLength = 3,
	onReset,
}: LabelInputProps) => {
	const handleChange = (text: string) => {
		onChange(numberValidation(text));
	};

	return (
		<View>
			<Text>{title}</Text>
			<TextInput
				label={label}
				value={value}
				onChangeText={handleChange}
				inputMode='numeric'
				maxLength={maxLength}
				right={
					onReset ? (
						<TextInput.Icon icon='close' onPress={onReset} />
					) : undefined
				}
			/>
		</View>
	);
};
