import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function setStorageItemAsync(key: string, value: any) {
	if (Platform.OS === "web") {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				const stringValue = JSON.stringify(value);
				localStorage.setItem(key, stringValue);
			}
		} catch (e) {
			console.error("Local storage is unavailable:", e);
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			const stringValue = JSON.stringify(value);
			await SecureStore.setItemAsync(key, stringValue);
		}
	}
}

export async function getStorageItemAsync(key: string): Promise<any> {
	if (Platform.OS === "web") {
		try {
			const stringValue = localStorage.getItem(key);
			return stringValue ? JSON.parse(stringValue) : null;
		} catch (e) {
			console.error("Local storage is unavailable:", e);
			return null;
		}
	} else {
		try {
			const stringValue = await SecureStore.getItemAsync(key);
			return stringValue ? JSON.parse(stringValue) : null;
		} catch (e) {
			console.error("Secure storage is unavailable:", e);
			return null;
		}
	}
}
