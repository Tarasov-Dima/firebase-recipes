import { View } from "react-native";
import { TextInput, Text } from "react-native-paper";

type LabelInputProps = {
	title: string;
	label: string;
	value: string;
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
				maxLength={3}
			/>
		</View>
	);
};
