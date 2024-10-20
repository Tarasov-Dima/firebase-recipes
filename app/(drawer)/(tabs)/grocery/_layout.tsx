import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { CustomHeader } from "@/components/drawer/CustomHeader";

const StackLayout = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{
					header: () => <CustomHeader title={t("grocery.title")} />,
				}}
			/>
		</Stack>
	);
};

export default StackLayout;
