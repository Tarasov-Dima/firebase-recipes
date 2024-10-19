import i18n from "i18next";
import { en, pl, uk } from "./locales";
import { initReactI18next } from "react-i18next";

const resources = {
	en: { translation: en },
	pl: { translation: pl },
	uk: { translation: uk },
};

i18n.use(initReactI18next).init({
	compatibilityJSON: "v3",
	resources,
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
