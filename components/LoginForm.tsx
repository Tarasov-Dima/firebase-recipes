import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@rneui/themed";
import { Card } from "@rneui/base";
import { router } from "expo-router";
import FirebaseAuthService from "@/FirebaseAuthService";
import { Platform } from "react-native";

export const LoginForm = () => {
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

	const signIn = ({ email, password }) => {
		FirebaseAuthService.loginUser(email, password).then((UserCredential) => {
			console.log("signIn");
		});
	};

	const handleLoginWithGoogle = () => {
		FirebaseAuthService.loginWithGoogle()
			.then(() => {
				console.log("login with google");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<Card>
			<Card.Title>Log In</Card.Title>
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
			<Button onPress={handleSubmit(signIn)} title='LOG IN' />
			<Button
				type='clear'
				title='Sign Up'
				onPress={() => router.replace("/sign-up")}
			/>
			{Platform.OS === "web" && (
				<Button
					type='clear'
					title='sign in with google'
					onPress={handleLoginWithGoogle}
				/>
			)}
		</Card>
	);
};
