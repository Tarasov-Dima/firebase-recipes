import {
	FAB,
	Text,
	Card,
	IconButton,
	TouchableRipple,
} from "react-native-paper";
import { Link, useFocusEffect } from "expo-router";
import { Alert, View } from "react-native";
import { useStorage } from "@/useStorage";
import { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { User } from "@/types";
import { ScreenContainer } from "@/components/ScreenContainer";
import { MealVariant } from "../../../data/meals";

const SettingsTab = () => {
	const { data: users, refetch, setValue } = useStorage<User[]>("users");

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	const onDeleteUser = (id: User["id"], name) => {
		const filteredUsers = users?.filter((user) => user.id !== id);

		Alert.alert(
			`Delete user data`,
			`Do you want to delete ${name}'s data?`,
			[
				{
					text: "No",
					style: "cancel",
				},
				{
					text: "Yes",
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

		const { name, id, age, height, weight, sex, calculateAMR, activityLevel } =
			item;
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
						<Text variant='titleMedium'>Age: {age} years</Text>
						<Text variant='titleMedium'>Height: {height} cm</Text>
						<Text variant='titleMedium'>Weight: {weight} kg</Text>
						<Text variant='titleMedium'>Sex: {sex}</Text>
						<Text variant='titleMedium'>
							Energy per day: {calculateAMR} Cal
						</Text>
					</Card.Content>
				</Card>
			</Link>
		);
	};

	const showFab = !users || users?.length < 3;

	return (
		<ScreenContainer withScroll={false} withVerticalPadding={false}>
			<FlashList
				data={users ?? []}
				renderItem={renderItem}
				estimatedItemSize={200}
				contentContainerStyle={{ paddingVertical: 12 }}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
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
						label='add user'
					/>
				)}
			</Link>
		</ScreenContainer>
	);
};

export default SettingsTab;
