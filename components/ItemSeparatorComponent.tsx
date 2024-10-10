import React from "react";
import { View } from "react-native";

type ItemSeparatorComponentProps = {
	height?: 8 | 16;
};

export const ItemSeparatorComponent = ({
	height = 16,
}: ItemSeparatorComponentProps) => {
	return <View style={{ height }} />;
};
