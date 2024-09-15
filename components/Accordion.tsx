import { useThemeContext } from "@/theme";
import { useState } from "react";
import { View } from "react-native";
import {
	Icon,
	TouchableRipple,
	Text,
	Chip,
	Portal,
	Dialog,
} from "react-native-paper";

export const Accordion = ({ data, selected, setSelected }) => {
	const [expanded, setExpanded] = useState(false);
	const handlePress = () => setExpanded(!expanded);

	const handleHide = () => {
		setExpanded(false);
	};

	const onHandleSelect = (name) => {
		handleHide();
		setSelected(name);
	};

	const isDisable = data.length === 1;

	return (
		<View style={{ gap: 6 }}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Text>Show for: </Text>
				<Chip onPress={isDisable ? undefined : handlePress}>{selected}</Chip>
			</View>
			<Portal>
				<Dialog visible={expanded} onDismiss={handleHide}>
					<Dialog.Content style={{ gap: 6 }}>
						{data.map((item) => {
							return (
								<ListItem
									key={item}
									title={item}
									onHandleSelect={onHandleSelect}
									selected={selected}
								/>
							);
						})}
					</Dialog.Content>
				</Dialog>
			</Portal>
		</View>
	);
};

const ListItem = ({ title, selected, onHandleSelect }) => {
	const { theme } = useThemeContext();

	const isSelected = title === selected;

	const onPress = () => {
		onHandleSelect(title);
	};

	return (
		<Chip
			icon={isSelected ? "check" : undefined}
			mode={isSelected ? "flat" : "outlined"}
			onPress={onPress}
		>
			{title}
		</Chip>
	);
};
