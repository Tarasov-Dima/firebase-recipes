import React, { useRef } from "react";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
	FadeIn,
	FadeOut,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { CarouselItem } from "./CarouselItem";
import { PaginationDots } from "./PaginationDots";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export const MenuCarousel = ({ data }) => {
	const flatListRef = useRef<FlatList>(null);
	const scrollX = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
		},
	});

	if (!data) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<Animated.ScrollView
			entering={FadeIn}
			exiting={FadeOut}
			style={{ flex: 1 }}
		>
			<PaginationDots numberOfDots={data.length} scrollX={scrollX} />
			<Animated.FlatList
				ref={flatListRef}
				data={data}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<CarouselItem key={index} item={item} />
				)}
				keyExtractor={(item) => item.id}
				scrollEventThrottle={16}
				onScroll={scrollHandler}
				contentContainerStyle={{ paddingBottom: 16 }}
			/>
		</Animated.ScrollView>
	);
};
