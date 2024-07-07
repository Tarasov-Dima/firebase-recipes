import React from "react";
import { View } from "react-native";
import { Button, Icon, Input, Text } from "@rneui/themed";
import FirebaseFirestoreService from "../FirebaseFirestoreService";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { DatePickerInput } from "react-native-paper-dates";

export const AddEditRecipeForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			category: "",
			// publishedDate: new Date().toISOString().split("T")[0],
			publishedDate: "",
			directions: "",
			ingredients: [],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "ingredients",
	});

	const handleAddRecipe = async (newRecipe) => {
		FirebaseFirestoreService.createDocument("recipes", newRecipe)
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	const handleAppend = () => {
		append({ ingredient: "" });
	};

	return (
		<View>
			<Text> Add edits</Text>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						placeholder='Name'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
					/>
				)}
				name='name'
			/>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Picker selectedValue={value} onValueChange={onChange}>
						<Picker.Item
							label='Breads, sandwiches, and pizza'
							value='breadsSandwichesAndPizza'
						/>
						<Picker.Item label='Egs & breakfast' value='egsAndBreakfast' />
						<Picker.Item
							label='Desserts & Baked goods'
							value='dessertsAndBakedGoods'
						/>
						<Picker.Item label='Fish & seafood' value='fishAndSeafood' />
						<Picker.Item label='Vegetables' value='vegetables' />
					</Picker>
				)}
				name='category'
			/>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						placeholder='Directions'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						multiline={true}
						numberOfLines={4}
					/>
				)}
				name='directions'
			/>
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<DatePickerInput
						locale='pl'
						label='Publish Date:'
						value={value}
						onChange={onChange}
						inputMode='start'
					/>
				)}
				name='publishedDate'
			/>
			{fields.map((field, index) => (
				<Controller
					key={field.id}
					control={control}
					name={`ingredients.${index}.ingredient`}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							placeholder={`Ingredient ${index + 1}`}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							rightIcon={
								<Icon name='delete' size={20} onPress={() => remove(index)} />
							}
						/>
					)}
				/>
			))}
			<Button title='Append' onPress={handleAppend} />
			<Button title='Create Recipe' onPress={handleSubmit(handleAddRecipe)} />
		</View>
	);
};
