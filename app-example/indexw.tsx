// import { View } from "react-native";
// import { Logout } from "@/components/Logout";
// import { useState } from "react";
// import FirebaseAuthService from "@/FirebaseAuthService";
// import { LoginForm } from "@/components/LoginForm";

// export default function Index() {
// 	const [user, setUser] = useState(null);

// 	FirebaseAuthService.subscribeToAuthChanges(setUser);

// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				justifyContent: "center",
// 			}}
// 		>
// 			{user ? <Logout user={user} /> : <LoginForm />}
// 		</View>
// 	);
// }
