import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@rneui/themed";
import { Card } from "@rneui/base";
import { router } from "expo-router";
import { useSession } from "@/ctx";

export const RegisterForm = () => {
	const { signUp } = useSession();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Card>
			<Card.Title>Sign Up</Card.Title>
			<Card.Divider />
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						placeholder='email'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						errorMessage={errors.email && "This is required"}
					/>
				)}
				name='email'
			/>
			<Controller
				control={control}
				rules={{
					maxLength: 100,
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						placeholder='password'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						errorMessage={errors.password && "This is required"}
						secureTextEntry
					/>
				)}
				name='password'
			/>
			<Button onPress={handleSubmit(signUp)} title='SIGN UP' />
			<Button
				type='clear'
				title='Log In'
				onPress={() => router.replace("/sign-in")}
			/>
		</Card>
	);
};
