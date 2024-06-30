import { View } from "react-native";
import { LoginForm } from "@/components/LoginForm";
import { Button } from "@rneui/base";
import FirebaseAuthService from "@/FirebaseAuthService";

export default function SignIn() {
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
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<LoginForm />
			<Button
				type='clear'
				title='sign in with google'
				onPress={handleLoginWithGoogle}
			/>
		</View>
	);
}
