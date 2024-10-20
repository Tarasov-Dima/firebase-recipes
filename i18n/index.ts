import i18n from "i18next";
import { en, pl, uk } from "./locales";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSettings } from "@/storage/useAppSettings";

const resources = {
	en: { translation: en },
	pl: { translation: pl },
	uk: { translation: uk },
};

const setInitialLanguage = async () => {
	try {
		const storedSettings = await AsyncStorage.getItem("app-settings");

		const appSettings = storedSettings ? JSON.parse(storedSettings) : null;

		const initialLanguage = appSettings?.state?.language || "en";

		i18n.use(initReactI18next).init({
			compatibilityJSON: "v3",
			resources,
			lng: initialLanguage,
			fallbackLng: "en",
			interpolation: {
				escapeValue: false,
			},
		});
	} catch (error) {
		console.error("Error loading language from AsyncStorage", error);
		i18n.use(initReactI18next).init({
			compatibilityJSON: "v3",
			resources,
			lng: "en",
			fallbackLng: "en",
			interpolation: {
				escapeValue: false,
			},
		});
	}
};

setInitialLanguage();

export default i18n;
