import { useState } from "react";
import { View } from "react-native";
import { Text, Chip, Portal, Dialog } from "react-native-paper";

type AccordionProps<T extends string> = {
	title: string;
	data: Record<T, string>;
	selected: T;
	setSelected: (key: T) => void;
};
export const Accordion = <T extends string>({
	title,
	data,
	selected,
	setSelected,
}: AccordionProps<T>) => {
	const [expanded, setExpanded] = useState(false);
	const handlePress = () => setExpanded(!expanded);

	const handleHide = () => {
		setExpanded(false);
	};

	const onHandleSelect = (key: T) => {
		handleHide();
		setSelected(key);
	};

	const isDisable = Object.keys(data).length === 2;

	return (
		<View style={{ gap: 6 }}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Text>{title}</Text>
				<Chip onPress={isDisable ? undefined : handlePress}>
					{data[selected]}
				</Chip>
			</View>
			<Portal>
				<Dialog visible={expanded} onDismiss={handleHide}>
					<Dialog.Content style={{ gap: 6 }}>
						{Object.entries(data).map(([key, value]) => (
							<ListItem
								key={key}
								itemKey={key as T}
								title={value as string}
								onHandleSelect={onHandleSelect}
								selected={selected}
							/>
						))}
					</Dialog.Content>
				</Dialog>
			</Portal>
		</View>
	);
};

type ListItemProps<T extends string> = {
	itemKey: T;
	title: string;
	selected: T;
	onHandleSelect: (key: T) => void;
};

const ListItem = <T extends string>({
	itemKey,
	title,
	selected,
	onHandleSelect,
}: ListItemProps<T>) => {
	const isSelected = itemKey === selected;

	return (
		<Chip
			icon={isSelected ? "check" : undefined}
			mode={isSelected ? "flat" : "outlined"}
			onPress={() => onHandleSelect(itemKey)}
		>
			{title}
		</Chip>
	);
};
