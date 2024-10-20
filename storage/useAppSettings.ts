import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Language = "en" | "pl" | "uk";
export type ThemeMode = "light" | "dark";

type UseAppSettingsState = {
	language: Language;
	themeMode: ThemeMode;
	setLanguage: (language: Language) => void;
	setThemeMode: (themeMode: ThemeMode) => void;
	toggleThemeMode: () => void;
	resetSettings: VoidFunction;
};

export const useAppSettings = create<UseAppSettingsState>()(
	persist(
		(set, get) => ({
			language: "en",
			themeMode: "light",

			setLanguage: (newLanguage) =>
				set(() => ({
					language: newLanguage,
				})),
			setThemeMode: (newThemeMode) =>
				set(() => ({
					themeMode: newThemeMode,
				})),
			toggleThemeMode: () =>
				set(() => ({
					themeMode: get().themeMode === "light" ? "dark" : "light",
				})),
			resetSettings: () =>
				set(() => ({
					language: "en",
					themeMode: "light",
				})),
		}),
		{
			name: "app-settings",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
