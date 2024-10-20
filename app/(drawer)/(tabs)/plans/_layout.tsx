import { CustomHeader } from "@/components/drawer/CustomHeader";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const StackLayout = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					header: () => <CustomHeader title={t("plans.title")} />,
				}}
			/>
			<Stack.Screen
				name='menu'
				options={{
					header: ({ navigation: { goBack } }) => (
						<CustomHeader title={t("plans.menu.title")} goBack={goBack} />
					),
				}}
			/>
		</Stack>
	);
};

export default StackLayout;
