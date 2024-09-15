import {
	FAB,
	Text,
	Card,
	IconButton,
	TouchableRipple,
} from "react-native-paper";
import { Link, useFocusEffect } from "expo-router";
import { View } from "react-native";
import { useStorage } from "@/useStorage";
import { useCallback } from "react";
import { FlashList } from "@shopify/flash-list";
import { User } from "@/types";
import { ScreenContainer } from "@/components/ScreenContainer";

const SettingsTab = () => {
	const { data: users, refetch, setValue } = useStorage<User[]>("users");

	useFocusEffect(
		useCallback(() => {
			refetch();
		}, [refetch])
	);

	const onDeleteUser = (id: User["id"]) => {
		const filteredUsers = users?.filter((user) => user.id !== id);
		setValue(filteredUsers);
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
				<TouchableRipple key={id}>
					<Card mode='outlined'>
						<Card.Title
							title={name}
							right={() => (
								<IconButton
									size={24}
									icon='delete'
									onPress={() => onDeleteUser(id)}
								/>
							)}
						/>
						<Card.Content>
							<Text variant='titleLarge'>User data:</Text>
							<Text>Age: {age} years</Text>
							<Text>Height: {height} cm</Text>
							<Text>Weight: {weight} kg</Text>
							<Text>Sex: {sex}</Text>
							<Text>Energy per day: {calculateAMR} Cal</Text>
						</Card.Content>
					</Card>
				</TouchableRipple>
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
