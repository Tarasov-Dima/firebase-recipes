import * as Localization from "react-native-localize";
import i18n from "i18n-js";
import { en, pl, uk } from "./translation";

i18n.translations = {
	en,
	pl,
	uk,
};

i18n.fallbacks = true;

const fallback = { languageTag: "en", isRTL: false };
const { languageTag } =
	Localization.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
	fallback;
i18n.locale = languageTag;

export default i18n;
