import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar } from "react-native-paper";

// Define the type for the snackbar context
type SnackbarContextType = {
	showSnackbar: (options: SnackbarOptions) => void;
	hideSnackbar: () => void;
};

// Define the options for the snackbar
type SnackbarOptions = {
	message: string;
	duration?: number;
	action?: {
		label: string;
		onPress: () => void;
	};
};

// Create the context
const SnackbarContext = createContext<SnackbarContextType | undefined>(
	undefined
);

// Custom hook to use the snackbar context
export const useSnackbar = (): SnackbarContextType => {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error("useSnackbar must be used within a SnackbarProvider");
	}
	return context;
};

// Snackbar Provider component
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
	const [snackbarState, setSnackbarState] = useState<
		SnackbarOptions & { visible: boolean }
	>({
		visible: false,
		message: "",
		duration: Snackbar.DURATION_SHORT,
	});

	const showSnackbar = ({
		message,
		duration = Snackbar.DURATION_SHORT,
		action,
	}: SnackbarOptions) => {
		setSnackbarState({
			visible: true,
			message,
			duration,
			action,
		});
	};

	const hideSnackbar = () => {
		setSnackbarState((prevState) => ({
			...prevState,
			visible: false,
		}));
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
			{children}
			<Snackbar
				visible={snackbarState.visible}
				onDismiss={hideSnackbar}
				duration={snackbarState.duration}
				action={snackbarState.action}
				onIconPress={hideSnackbar}
				style={{ bottom: 40 }}
			>
				{snackbarState.message}
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
