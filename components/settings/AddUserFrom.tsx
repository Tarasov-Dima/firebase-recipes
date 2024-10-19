import { calculateBMR } from "@/utils/calculateBMR";
import React, { useState } from "react";
import { Button, SegmentedButtons, TextInput, Text } from "react-native-paper";
import { LabelInput } from "./LabelInput";
import { router, useLocalSearchParams } from "expo-router";
import { useStorage } from "@/useStorage";
import { activityLevelsName, Sex, User } from "@/types/user";
import { ScreenContainer } from "../ScreenContainer";
import { Accordion } from "../Accordion";
import { useTranslation } from "react-i18next";

type Activity = {
	index: string;
	name: string;
	description: string;
};

const activityLevels: Record<string, Activity> = {
	sedentary: {
		index: "1.2",
		name: "Sedentary",
		description: "(little or no exercise)",
	},
	lightlyActive: {
		index: "1.375",
		name: "Lightly active",
		description: "(exercise 1–3 days/week)",
	},
	moderatelyActive: {
		index: "1.55",
		name: "Moderately active",
		description: "(exercise 3–5 days/week)",
	},
	active: {
		index: "1.725",
		name: "Active",
		description: "(exercise 6–7 days/week)",
	},
	extremelyActive: {
		index: "1.9",
		name: "Extremely active",
		description: "(hard exercise 6–7 days/week)",
	},
};

export const AddUserForm = () => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const {
		name: prevName,
		sex: prevSex,
		weight: prevWeight,
		height: prevHeight,
		age: prevAge,
		activityLevel: prevActivityLevel,
		id: prevUserId,
	} = useLocalSearchParams<User>();

	const { data: users, setValue } = useStorage<User[]>("users");

	const [name, setName] = useState(prevName ?? "");
	const [sex, setSex] = useState<Sex>(prevSex ?? "male");
	const [weight, setWeight] = useState(prevWeight ?? "");
	const [height, setHeight] = useState(prevHeight ?? "");
	const [age, setAge] = useState(prevAge ?? "");

	const [activityLevel, setActivityLevel] = useState<User["activityLevel"]>(
		prevActivityLevel ?? "sedentary"
	);

	//active metabolic rate
	const activityLevelIndex = activityLevels[activityLevel].index;
	const calculateAMR = Math.floor(
		Number(activityLevelIndex) *
			calculateBMR({
				sex,
				weight: Number(weight),
				height: Number(height),
				age: Number(age),
			})
	);
	const handleSave = async () => {
		const newUser = {
			id: `${name}-${sex}-${weight}-${height}-${age}`,
			name,
			sex,
			weight,
			height,
			age,
			calculateAMR,
			activityLevel,
		};

		if (users && users?.length > 0) {
			const filteredUsers = users.filter((user) => user.id !== prevUserId);
			setValue([...filteredUsers, newUser]);
		} else {
			setValue([newUser]);
		}
		router.back();
	};

	return (
		<ScreenContainer>
			<Text>{t("settings.user.name")}</Text>
			<TextInput value={name} onChangeText={setName} />
			<Text>{t("settings.user.sex.title")}</Text>
			<SegmentedButtons
				value={sex}
				onValueChange={setSex as any}
				buttons={[
					{
						value: "male",
						label: t("settings.user.sex.male"),
					},
					{
						value: "female",
						label: t("settings.user.sex.female"),
					},
				]}
			/>
			<LabelInput
				title={t("settings.user.weight")}
				label={t("settings.user.kg")}
				onChange={setWeight}
				value={weight}
			/>
			<LabelInput
				title={t("settings.user.height")}
				label={t("settings.user.cm")}
				onChange={setHeight}
				value={height}
			/>
			<LabelInput
				title={t("settings.user.age")}
				label={t("settings.user.years")}
				onChange={setAge}
				value={age}
			/>
			<Accordion
				title={t("settings.user.levelOfActivity.title")}
				data={activityLevelsName}
				selected={activityLevel}
				setSelected={setActivityLevel}
			/>
			{!!calculateAMR && (
				<>
					<Text>
						{t("settings.user.caloriesPerDay", { calories: calculateAMR })}
					</Text>
					<Button onPress={handleSave} mode='contained'>
						{t("settings.user.save")}
					</Button>
				</>
			)}
		</ScreenContainer>
	);
};
