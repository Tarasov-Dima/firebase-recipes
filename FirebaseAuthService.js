import { auth } from "./FirebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signIn
} from "firebase/auth";

const registerUser = (email, password) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
	return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
	return auth.signOut();
};

const loginWithGoogle = () => {
	const provider = new GoogleAuthProvider();

	return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
	onAuthStateChanged(auth, (user) => {
		handleAuthChange(user);
	});
};

const resetUserPassword = (email) => {
	return sendPasswordResetEmail(auth, email);
};

const FirebaseAuthService = {
	registerUser,
	loginUser,
	logoutUser,
	resetUserPassword,
	loginWithGoogle,
	subscribeToAuthChanges,
};

export default FirebaseAuthService;
