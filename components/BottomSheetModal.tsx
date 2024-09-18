import { useThemeContext } from "@/theme";
import {
	type BottomSheetModalProps,
	BottomSheetModal as GBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
export type BottomSheetModalRef = GBottomSheetModal;

// type BottomSheetProps = BottomSheetModalProps;

export const BottomSheetModal = forwardRef<
	BottomSheetModalRef,
	BottomSheetModalProps
>(({ children, ...rest }, ref) => {
	const { theme } = useThemeContext();
	const snapPoints = useMemo(() => ["70%"], []);

	return (
		<GBottomSheetModal
			ref={ref}
			index={0}
			snapPoints={snapPoints}
			backgroundStyle={[
				{ backgroundColor: theme.colors.elevation.level4, marginBottom: 6 },
			]}
			handleIndicatorStyle={[{ backgroundColor: theme.colors.primary }]}
			enablePanDownToClose
			{...rest}
		>
			{children}
		</GBottomSheetModal>
	);
});
