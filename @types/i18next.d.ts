import "i18next";
import { en, pl, uk } from "../i18n/locales";

type TranslationResources = typeof en | typeof pl | typeof uk;

declare module "i18next" {
	interface CustomTypeOptions {
		returnNull: false;
		resources: {
			translation: TranslationResources;
		};
	}
}
