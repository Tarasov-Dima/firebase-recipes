import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
	DrawerActions,
	ParamListBase,
	useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Appbar } from "react-native-paper";

type CustomHeaderProps = {
	title: string;
	goBack?: VoidFunction;
};

export const CustomHeader = ({ title, goBack }: CustomHeaderProps) => {
	const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

	return (
		<Appbar.Header elevated>
			{goBack ? (
				<Appbar.BackAction onPress={goBack} />
			) : (
				<Appbar.Action
					icon='menu'
					onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
				/>
			)}
			<Appbar.Content title={title} />
		</Appbar.Header>
	);
};
