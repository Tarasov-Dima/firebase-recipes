import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.FIREBASE_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.FIREBASE_PUBLIC_PROJECT_ID,
	storageBucket: process.env.FIREBASE_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_PUBLIC_APP_ID,
	measurementId: process.env.FIREBASE_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
