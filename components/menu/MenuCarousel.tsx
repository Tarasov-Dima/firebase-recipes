import React, { useEffect, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { CarouselItem } from "./CarouselItem";
import { PaginationDots } from "./PaginationDots";
import { BottomSheetModalRef } from "../BottomSheetModal";
import { FAB } from "react-native-paper";

export const MenuCarousel = ({ data }) => {
	const flatListRef = useRef<FlatList>(null);
	const scrollX = useSharedValue(0);

	const bottomSheetRef = useRef<BottomSheetModalRef>(null);

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	const closeBottomSheet = () => {
		bottomSheetRef.current?.close();
	};

	const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			const visibleItemIndex = viewableItems[0].index;
			setCurrentVisibleIndex(visibleItemIndex);
		}
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollX.value = event.contentOffset.x;
		},
	});

	const scrollToFirstItem = () => {
		if (flatListRef.current) {
			flatListRef.current.scrollToIndex({
				index: 0,
				animated: false,
			});
		}
	};

	useEffect(() => {
		if (data.length > 0) {
			scrollToFirstItem();
		}
	}, [data]);

	return (
		<>
			<ScrollView showsVerticalScrollIndicator={false}>
				<PaginationDots numberOfDots={data.length} scrollX={scrollX} />
				<Animated.FlatList
					ref={flatListRef}
					data={data}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<CarouselItem
							item={item}
							bottomSheetRef={
								index === currentVisibleIndex ? bottomSheetRef : null
							}
							closeBottomSheet={closeBottomSheet}
						/>
					)}
					keyExtractor={(item) => item.id}
					scrollEventThrottle={16}
					onScroll={scrollHandler}
					onViewableItemsChanged={onViewableItemsChanged}
					viewabilityConfig={viewabilityConfig}
				/>
			</ScrollView>
			<FAB
				icon='basket-plus'
				style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
				onPress={openBottomSheet}
			/>
		</>
	);
};
