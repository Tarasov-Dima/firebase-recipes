import { BottomSheetGroceryList } from "@/components/grocery/BottomSheetGroceryList";
import {
	BottomSheetModal,
	BottomSheetModalRef,
} from "@/components/BottomSheetModal";
import { forwardRef } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MenuBottomSheetProps = {
	ingredients;
	onAddToUnselectedGroceries;
	selectedGroceries;
	onAddToGroceryList;
};

export const MenuBottomSheet = forwardRef<
	BottomSheetModalRef,
	MenuBottomSheetProps
>(
	(
		{
			ingredients,
			onAddToUnselectedGroceries,
			selectedGroceries,
			onAddToGroceryList,
		},
		ref
	) => {
		const { bottom } = useSafeAreaInsets();

		return (
			<BottomSheetModal ref={ref}>
				<View
					style={{
						flex: 1,
						marginBottom: bottom,
						gap: 8,
						paddingHorizontal: 8,
					}}
				>
					<View style={{ flex: 1, marginHorizontal: -8 }}>
						<BottomSheetGroceryList
							data={ingredients}
							handleSelectGrocery={onAddToUnselectedGroceries}
							selectedGroceries={selectedGroceries}
							selectedType='lineThrough'
						/>
					</View>
					<Button mode='contained' onPress={onAddToGroceryList}>
						Add to grocery list
					</Button>
				</View>
			</BottomSheetModal>
		);
	}
);
