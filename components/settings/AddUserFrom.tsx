import { calculateBMR, type Sex } from "@/utils/calculateBMR";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { LabelInput } from "./LabelInput";
import { Picker } from "@react-native-picker/picker";

const indexOfActivity = {
	sedentary: "1.2",
	lightlyActive: "1.375",
	moderatelyActive: "1.55",
	active: "1.725",
	extremelyActive: "1.9",
};

export const AddUserForm = () => {
	const [sex, setSex] = useState<Sex>("male");
	const [weight, setWeight] = useState("");
	const [height, setHeight] = useState("");
	const [age, setAge] = useState("");
	const [activityLevel, setActivityLevel] = useState(indexOfActivity.sedentary);

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

	return (
		<View>
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
			{!!calculateAMR && <Text>You need {calculateAMR} calories per day</Text>}
		</View>
	);
};
