import React, { forwardRef, ReactNode } from "react";
import BottomSheetModal, { BottomSheetModalProps } from "@gorhom/bottom-sheet";
import { useThemeContext } from "@/theme";

type BottomSheetProps = BottomSheetModalProps & {
	children: ReactNode;
};
export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
	({ children }, ref, ...rest) => {
		const { theme } = useThemeContext();

		return (
			<BottomSheetModal
				ref={ref}
				snapPoints={["50%"]}
				index={-1}
				backgroundStyle={[
					{ backgroundColor: theme.colors.elevation.level4, marginBottom: 6 },
				]}
				handleIndicatorStyle={[{ backgroundColor: theme.colors.primary }]}
				enablePanDownToClose
				{...rest}
			>
				{children}
				{/* <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView> */}
			</BottomSheetModal>
		);
	}
);
