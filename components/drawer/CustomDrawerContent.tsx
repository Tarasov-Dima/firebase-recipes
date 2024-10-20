import React from "react";
import { View } from "react-native";
import { Switch } from "react-native-paper";
import i18n from "@/i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Drawer as PaperDrawer, Text } from "react-native-paper";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Language, useAppSettings } from "@/storage/useAppSettings";

export const CustomDrawerContent = () => {
	const { t } = useTranslation();

	const { top } = useSafeAreaInsets();
	const navigation = useNavigation();
	const {
		language: selectedLanguage,
		themeMode,
		setLanguage,
		toggleThemeMode,
	} = useAppSettings();

	const handleLanguageChange = (languageKey: Language) => {
		setLanguage(languageKey);
		i18n.changeLanguage(languageKey);
		navigation.dispatch(DrawerActions.closeDrawer());
	};

	const languages = t("drawer.languages", { returnObjects: true });

	return (
		<View style={{ flex: 1, marginTop: top }}>
			<PaperDrawer.Section title={t("drawer.preferences")}>
				<PaperDrawer.Item
					label={t("drawer.darkMode")}
					right={() => (
						<Switch
							value={themeMode === "dark"}
							onValueChange={toggleThemeMode}
						/>
					)}
					icon='theme-light-dark'
				/>
			</PaperDrawer.Section>
			<PaperDrawer.Section
				title={t("drawer.selectLanguage")}
				showDivider={false}
			>
				{languages.map(({ language, key, flag }) => (
					<PaperDrawer.Item
						icon={() => <Text variant='headlineMedium'>{flag}</Text>}
						key={key}
						label={language}
						active={selectedLanguage === key}
						onPress={() => handleLanguageChange(key as Language)}
					/>
				))}
			</PaperDrawer.Section>
		</View>
	);
};
