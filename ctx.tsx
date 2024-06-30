import React, { createContext, useContext } from "react";
import { useStorageState } from "./useStorageState";
import { router } from "expo-router";
import FirebaseAuthService from "./FirebaseAuthService";

type AuthParams = {
	password: string;
	email: string;
};

const AuthContext = createContext<{
	signIn: ({ password, email }: AuthParams) => void;
	signUp: ({ password, email }: AuthParams) => void;
	signOut: () => void;
	user?: string | null | undefined;
	session?: string | null;
	isLoading: boolean;
}>({
	signIn: () => null,
	signUp: () => null,
	signOut: () => null,
	user: null,
	session: null,
	isLoading: false,
});

// This hook can be used to access the user info.
export const useSession = () => {
	const value = useContext(AuthContext);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error("useSession must be wrapped in a <SessionProvider />");
		}
	}

	return value;
};

export const SessionProvider = (props: React.PropsWithChildren) => {
	const [[isUserLoading, user], setUser] = useStorageState("user");

	return (
		<AuthContext.Provider
			value={{
				signIn: ({ email, password }) => {
					FirebaseAuthService.loginUser(email, password).then(
						(UserCredential) => {
							console.log("signIn");

							router.replace("/");

							setUser(UserCredential.user.email);
						}
					);
				},
				signUp: ({ email, password }) => {
					FirebaseAuthService.registerUser(email, password).then(() => {
						console.log("register");
						router.replace("/sign-in");

						setUser(null);
					});
				},
				signOut: () => {
					FirebaseAuthService.logoutUser()
						.then(() => {
							setUser(null);
							console.log("signOut");
							// router.replace("/sign-in");
						})
						.catch((error) => {
							console.log(error);
						});
				},
				user,
				isLoading: isUserLoading,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
