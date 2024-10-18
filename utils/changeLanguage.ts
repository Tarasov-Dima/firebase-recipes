import i18n from "../i18n";

// Define the supported language codes
export type SupportedLanguage = "en" | "pl" | "uk";

/**
 * Changes the language of the app.
 * @param lang - The language code ('en', 'pl', 'uk').
 */
export const changeLanguage = (lang: SupportedLanguage): void => {
	i18n.locale = lang; // Change the i18n locale
};
