import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
	Button,
	Dialog,
	FAB,
	Portal,
	Text,
	Dropdown,
} from "react-native-paper";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

export const ListFABs = ({
	onAdd,
	onReset,
	onUnselect,
	resetDisabled,
	unselectDisabled,
}) => {
	const [menuVisible, setMenuVisible] = useState(false);
	const [dialogVariant, setDialogVariant] = useState(undefined);
	const [dialogVisible, setDialogVisible] = useState(false);

	const fabLeftPosition = useSharedValue(0);
	const fabTopPosition = useSharedValue(0);
	const fabTopLeftPositionX = useSharedValue(0);
	const fabTopLeftPositionY = useSharedValue(0);
	const fabOpacity = useSharedValue(0);

	const fabLeftStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(fabLeftPosition.value, { duration: 300 }),
				},
			],
			opacity: withTiming(fabOpacity.value, { duration: 300 }),
		};
	});

	const fabTopStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withDelay(
						100,
						withTiming(fabTopPosition.value, { duration: 300 })
					),
				},
			],
			opacity: withDelay(100, withTiming(fabOpacity.value, { duration: 300 })),
		};
	});

	const fabTopLeftStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withDelay(
						50,
						withTiming(fabTopLeftPositionX.value, { duration: 300 })
					),
				},
				{
					translateY: withDelay(
						50,
						withTiming(fabTopLeftPositionY.value, { duration: 300 })
					),
				},
			],
			opacity: withTiming(fabOpacity.value, { duration: 300 }),
		};
	});

	const toggleMenu = () => {
		if (menuVisible) {
			fabLeftPosition.value = 0;
			fabTopPosition.value = 0;
			fabTopLeftPositionX.value = 0;
			fabTopLeftPositionY.value = 0;
			fabOpacity.value = 0;
		} else {
			fabLeftPosition.value = -70;
			fabTopPosition.value = -70;
			fabTopLeftPositionX.value = -70;
			fabTopLeftPositionY.value = -70;
			fabOpacity.value = 1;
		}
		setMenuVisible(!menuVisible);
	};

	const showDialog = (variant) => {
		setDialogVariant(variant);
		setDialogVisible(true);
	};

	const hideDialog = () => {
		setDialogVisible(false);
		toggleMenu();
		setDialogVariant(undefined);
	};

	const handleReset = () => {
		onReset();
		hideDialog();
	};

	const handleUnselect = () => {
		onUnselect();
		hideDialog();
	};

	const isResetDialog = dialogVariant === "reset";
	return (
		<>
			<Animated.View style={[styles.fab, fabLeftStyle]}>
				<FAB icon='basket-plus' onPress={onAdd} />
			</Animated.View>
			<Animated.View style={[styles.fab, fabTopStyle]}>
				<FAB
					icon='basket-remove'
					onPress={() => showDialog("reset")}
					disabled={resetDisabled}
				/>
			</Animated.View>
			<Animated.View style={[styles.fab, fabTopLeftStyle]}>
				<FAB
					icon='basket-minus'
					onPress={() => showDialog("unselect")}
					disabled={unselectDisabled}
				/>
			</Animated.View>
			<FAB
				icon={menuVisible ? "close" : "playlist-edit"}
				style={styles.fab}
				onPress={toggleMenu}
			/>
			<Portal>
				<Dialog visible={dialogVisible} onDismiss={hideDialog}>
					<Dialog.Title>{isResetDialog ? "Clear" : "Unselect"}</Dialog.Title>
					<Dialog.Content>
						<Text variant='bodyMedium'>
							{isResetDialog
								? "Do you want to clear the list?"
								: "Do you want unselect all groceries?"}
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={isResetDialog ? handleReset : handleUnselect}>
							{isResetDialog ? "Clear" : "Unselect"}
						</Button>
						<Button onPress={hideDialog}>Cancel</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
};

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
