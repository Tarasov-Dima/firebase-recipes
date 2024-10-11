import { useThemeContext } from "@/theme";
import {
	BottomSheetBackdrop,
	type BottomSheetModalProps,
	BottomSheetModal as GBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export type BottomSheetModalRef = GBottomSheetModal;

export const BottomSheetModal = forwardRef<
	BottomSheetModalRef,
	BottomSheetModalProps
>(({ children, ...rest }, ref) => {
	const { top } = useSafeAreaInsets();
	const { theme } = useThemeContext();
	const snapPoints = useMemo(() => ["70%"], []);

	return (
		<GBottomSheetModal
			ref={ref}
			index={0}
			snapPoints={snapPoints}
			backgroundStyle={[
				{ backgroundColor: theme.colors.surface, marginBottom: 6 },
			]}
			handleIndicatorStyle={[{ backgroundColor: theme.colors.primary }]}
			enablePanDownToClose
			backdropComponent={(props) => (
				<BottomSheetBackdrop
					{...props}
					appearsOnIndex={0}
					disappearsOnIndex={-1}
				/>
			)}
			{...rest}
			style={{ marginTop: top }}
		>
			{children}
		</GBottomSheetModal>
	);
});
