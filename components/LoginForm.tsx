import React from "react";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import FirebaseAuthService from "@/FirebaseAuthService";
import { Platform } from "react-native";
import { Card, Divider, TextInput, Button } from "react-native-paper";

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
			{/* <Card.Title>Log In</Card.Title> */}
			<Divider />
			<Controller
				control={control}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						placeholder='email'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						// errorMessage={errors.email && "This is required"}
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
					<TextInput
						placeholder='password'
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						// errorMessage={errors.password && "This is required"}
						secureTextEntry
					/>
				)}
				name='password'
			/>
			<Button onPress={handleSubmit(signIn)}>LOG IN</Button>
			<Button onPress={() => router.replace("/sign-up")}>Sign Up</Button>
			{Platform.OS === "web" && (
				<Button onPress={handleLoginWithGoogle}>sign in with google</Button>
			)}
		</Card>
	);
};
