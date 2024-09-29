import React, { useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { CarouselItem } from "./CarouselItem";
import { PaginationDots } from "./PaginationDots";

export const MenuCarousel = ({ data }) => {
	const flatListRef = useRef(null);
	const scrollX = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
		},
	});

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<PaginationDots numberOfDots={data.length} scrollX={scrollX} />
			<Animated.FlatList
				ref={flatListRef}
				data={data}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => <CarouselItem item={item} />}
				keyExtractor={(item) => item.id}
				scrollEventThrottle={16}
				onScroll={scrollHandler}
			/>
		</ScrollView>
	);
};
