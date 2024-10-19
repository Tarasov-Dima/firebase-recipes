import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Button, Dialog, FAB, Portal, Text } from "react-native-paper";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

export const ListFABs = ({
	menuVisible,
	setMenuVisible,
	onAdd,
	onReset,
	onUnselect,
	resetDisabled,
	unselectDisabled,
	onCopy,
	copyDisabled,
}) => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const [dialogVariant, setDialogVariant] = useState(undefined);
	const [dialogVisible, setDialogVisible] = useState(false);

	const resetFabPosition = useSharedValue(0);
	const addFabPosition = useSharedValue(0);
	const unselectFabPosition = useSharedValue(0);
	const copyFabPosition = useSharedValue(0);
	const fabOpacity = useSharedValue(0);

	const resetFabStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withTiming(resetFabPosition.value, { duration: 300 }),
				},
			],
			opacity: withTiming(fabOpacity.value, { duration: 300 }),
		};
	});
	const addFabStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withTiming(addFabPosition.value, { duration: 300 }),
				},
			],
			opacity: withTiming(fabOpacity.value, { duration: 300 }),
		};
	});
	const unselectFabStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: withTiming(unselectFabPosition.value, { duration: 300 }),
				},
			],
			opacity: withTiming(fabOpacity.value, { duration: 300 }),
		};
	});
	const copyFabStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: withTiming(copyFabPosition.value, { duration: 300 }),
				},
			],
			opacity: withTiming(fabOpacity.value, { duration: 300 }),
		};
	});

	const hideAnimation = () => {
		resetFabPosition.value = 0;
		addFabPosition.value = 0;
		unselectFabPosition.value = 0;
		copyFabPosition.value = 0;
		fabOpacity.value = 0;
	};

	const showAnimation = () => {
		resetFabPosition.value = -210;
		addFabPosition.value = -140;
		unselectFabPosition.value = -70;
		copyFabPosition.value = -70;
		fabOpacity.value = 1;
	};

	const toggleMenu = () => {
		if (menuVisible) {
			hideAnimation();
		} else {
			showAnimation();
		}

		setMenuVisible(!menuVisible);
	};

	useEffect(() => {
		if (menuVisible) {
			showAnimation();
		} else {
			hideAnimation();
		}
	}, [menuVisible]);

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

	const handleCopy = () => {
		onCopy();
		toggleMenu();
	};

	const isResetDialog = dialogVariant === "reset";
	return (
		<>
			<Animated.View style={[styles.fab, addFabStyle]}>
				<FAB icon='basket-plus' onPress={onAdd} />
			</Animated.View>
			<Animated.View style={[styles.fab, resetFabStyle]}>
				<FAB
					icon='basket-remove'
					onPress={() => showDialog("reset")}
					disabled={resetDisabled}
				/>
			</Animated.View>
			<Animated.View style={[styles.fab, unselectFabStyle]}>
				<FAB
					icon='basket-minus'
					onPress={() => showDialog("unselect")}
					disabled={unselectDisabled}
				/>
			</Animated.View>
			<Animated.View style={[styles.fab, copyFabStyle]}>
				<FAB icon='content-copy' onPress={handleCopy} disabled={copyDisabled} />
			</Animated.View>
			<FAB
				icon={menuVisible ? "close" : "playlist-edit"}
				style={styles.fab}
				onPress={toggleMenu}
			/>
			<Portal>
				<Dialog visible={dialogVisible} onDismiss={hideDialog}>
					<Dialog.Title>
						{isResetDialog
							? t("grocery.dialog.clearTitle")
							: t("grocery.dialog.unselectTitle")}
					</Dialog.Title>
					<Dialog.Content>
						<Text variant='bodyMedium'>
							{isResetDialog
								? t("grocery.dialog.clearMessage")
								: t("grocery.dialog.unselectMessage")}
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={isResetDialog ? handleReset : handleUnselect}>
							{isResetDialog
								? t("grocery.dialog.actions.clear")
								: t("grocery.dialog.actions.unselect")}
						</Button>
						<Button onPress={hideDialog}>
							{t("grocery.dialog.actions.cancel")}
						</Button>
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
