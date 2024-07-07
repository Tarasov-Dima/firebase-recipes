import React from "react";
import { Button, Text, Card } from "@rneui/themed";
import FirebaseAuthService from "@/FirebaseAuthService";
import { AddEditRecipeForm } from "./AddEditRecipeForm";

export const Logout = ({ user }) => {
	const logout = () => {
		FirebaseAuthService.logoutUser().then(() => {
			console.log("logout");
		});
	};

	const handleSendResetPasswordEmail = () => {
		if (user && user.email) {
			FirebaseAuthService.resetUserPassword(user.email).then(() => {
				console.log("reset password");
			});
		}
	};

	return (
		<>
			<Card>
				<Card.Title>Logout</Card.Title>
				<Card.Divider />
				<Text>Hi {user.email}</Text>
				<Button title='Logout' onPress={logout} />
				<Button title='Reset password' onPress={handleSendResetPasswordEmail} />
			</Card>
			<AddEditRecipeForm />
		</>
	);
};
