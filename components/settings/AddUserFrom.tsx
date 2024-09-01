import { calculateBMR } from "@/utils/calculateBMR";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { LabelInput } from "./LabelInput";
import { Picker } from "@react-native-picker/picker";

import { router, useLocalSearchParams } from "expo-router";
import { useStorage } from "@/useStorage";
import { Sex, User } from "@/types/user";
import { ScreenContainer } from "../ScreenContainer";

const indexOfActivity = {
	sedentary: "1.2",
	lightlyActive: "1.375",
	moderatelyActive: "1.55",
	active: "1.725",
	extremelyActive: "1.9",
} as const;

export const AddUserForm = () => {
	const {
		name: prevName,
		sex: prevSex,
		weight: prevWeight,
		height: prevHeight,
		age: prevAge,
		activityLevel: prevActivityLevel,
		id: prevUserId,
	} = useLocalSearchParams<User>();

	const { data: users, loading, setValue } = useStorage<User[]>("users");

	const [name, setName] = useState(prevName ?? "");
	const [sex, setSex] = useState<Sex>(prevSex ?? "male");
	const [weight, setWeight] = useState(prevWeight ?? "");
	const [height, setHeight] = useState(prevHeight ?? "");
	const [age, setAge] = useState(prevAge ?? "");
	const [activityLevel, setActivityLevel] = useState(
		prevActivityLevel ?? indexOfActivity.sedentary
	);

	//active metabolic rate
	const calculateAMR = Math.floor(
		Number(activityLevel) *
			calculateBMR({
				sex,
				weight: Number(weight),
				height: Number(height),
				age: Number(age),
			})
	);
	const handleSave = async () => {
		const index = (
			Object.keys(indexOfActivity) as (keyof typeof indexOfActivity)[]
		).find((key) => indexOfActivity[key] === activityLevel);

		const newUser = {
			id: `${name}-${sex}-${weight}-${height}-${age}`,
			name,
			sex,
			weight,
			height,
			age,
			calculateAMR,
			activity: {
				level: activityLevel,
				index,
			},
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
			<Text>Name</Text>
			<TextInput value={name} onChangeText={setName} />
			<Text>Sex</Text>
			<SegmentedButtons
				value={sex}
				onValueChange={setSex as any}
				buttons={[
					{
						value: "male",
						label: "Male",
					},
					{
						value: "female",
						label: "Female",
					},
				]}
			/>
			<LabelInput
				title='Weight, kg'
				label='kg'
				onChange={setWeight}
				value={weight}
			/>
			<LabelInput
				title='Height, cm'
				label='cm'
				onChange={setHeight}
				value={height}
			/>
			<LabelInput
				title='Age, years'
				label='years'
				onChange={setAge}
				value={age}
			/>
			<Text>Level of activity</Text>
			<Picker
				selectedValue={activityLevel}
				onValueChange={setActivityLevel}
				mode={"dialog"}
			>
				<Picker.Item
					label='Sedentary (little or no exercise)'
					value={indexOfActivity.sedentary}
				/>
				<Picker.Item
					label='Lightly active (exercise 1–3 days/week)'
					value={indexOfActivity.lightlyActive}
				/>
				<Picker.Item
					label='Moderately active (exercise 3–5 days/week)'
					value={indexOfActivity.moderatelyActive}
				/>
				<Picker.Item
					label='Active (exercise 6–7 days/week)'
					value={indexOfActivity.active}
				/>
				<Picker.Item
					label='Extremely active (hard exercise 6–7 days/week)'
					value={indexOfActivity.extremelyActive}
				/>
			</Picker>
			{!!calculateAMR && (
				<>
					<Text>{calculateAMR} calories per day</Text>
					<Button onPress={handleSave} mode='contained'>
						save
					</Button>
				</>
			)}
		</ScreenContainer>
	);
};
