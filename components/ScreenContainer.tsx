import React, { ReactNode } from "react";
import { View, ScrollView } from "react-native";

type ScreenContainer = {
	children: ReactNode;
	withScroll?: boolean;
	withVerticalPadding?: boolean;
};

export const ScreenContainer = ({
	withScroll = true,
	withVerticalPadding = true,
	children,
}: ScreenContainer) => {
	if (withScroll) {
		return (
			<ScrollView
				style={[
					{ flex: 1, paddingHorizontal: 16 },
					withVerticalPadding && { paddingVertical: 16 },
				]}
				contentContainerStyle={{ gap: 16, paddingBottom: 64 }}
			>
				{children}
			</ScrollView>
		);
	}
	return (
		<View
			style={[
				{ flex: 1, paddingHorizontal: 16, gap: 16 },
				withVerticalPadding && { paddingVertical: 16 },
			]}
		>
			{children}
		</View>
	);
};
