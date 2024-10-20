import { FAB, Text, Card, IconButton } from "react-native-paper";
import { Link, useFocusEffect } from "expo-router";
import { Alert } from "react-native";
import { useStorage } from "@/useStorage";
import { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { User } from "@/types";
import { ItemSeparatorComponent } from "@/components/ItemSeparatorComponent";
import { useTranslation } from "react-i18next";

const SettingsTab = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});
	const { data: users, refetch, setValue } = useStorage<User[]>("users");

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	const onDeleteUser = (id: User["id"], name) => {
		const filteredUsers = users?.filter((user) => user.id !== id);
		Alert.alert(
			t("settings.alert.deleteUserData.title"),
			t("settings.alert.deleteUserData.message", { name }),
			[
				{
					text: t("settings.alert.deleteUserData.options.no"),
					style: "cancel",
				},
				{
					text: t("settings.alert.deleteUserData.options.yes"),
					onPress: () => setValue(filteredUsers),
				},
			],
			{ cancelable: false }
		);
	};

	const renderItem = ({ item }: { item: User | undefined }) => {
		if (!item) {
			return null;
		}

		const { name, id, age, height, weight, sex, calculateAMR } = item;
		return (
			<Link
				href={{
					pathname: "./settings/user",
					params: item,
				}}
				asChild
			>
				<Card>
					<Card.Title
						title={name}
						titleVariant='titleLarge'
						right={() => (
							<IconButton
								size={24}
								icon='delete'
								onPress={() => onDeleteUser(id, name)}
							/>
						)}
					/>
					<Card.Content>
						<Text variant='titleMedium'>{t("settings.age", { age })}</Text>
						<Text variant='titleMedium'>
							{t("settings.height", { height })}
						</Text>
						<Text variant='titleMedium'>
							{t("settings.weight", { weight })}
						</Text>
						<Text variant='titleMedium'>{t("settings.sex", { sex })}</Text>
						<Text variant='titleMedium'>
							{t("settings.energy", { energy: calculateAMR })}
						</Text>
					</Card.Content>
				</Card>
			</Link>
		);
	};

	const showFab = !users || users?.length < 3;

	return (
		<>
			<FlashList
				data={users ?? []}
				renderItem={renderItem}
				estimatedItemSize={200}
				contentContainerStyle={{ padding: 16 }}
				ItemSeparatorComponent={ItemSeparatorComponent}
			/>
			<Link
				href={{
					pathname: "./settings/user",
				}}
				asChild
			>
				{showFab && (
					<FAB
						icon='plus'
						style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
						label={t("settings.addUserBtn")}
					/>
				)}
			</Link>
		</>
	);
};

export default SettingsTab;
