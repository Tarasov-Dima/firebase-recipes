import { useEffect, useCallback, useState } from "react";
import { setStorageItemAsync, getStorageItemAsync } from "./storageService";
import { User } from "./types/user";

export function useStorage(key: string) {
	const [data, setData] = useState<User>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStorageItem = async () => {
			setLoading(true);
			const storedValue = await getStorageItemAsync(key);
			setData(storedValue);
			setLoading(false);
		};
		fetchStorageItem();
	}, [key]);

	const setValue = useCallback(
		(value: any) => {
			setData(value);
			setStorageItemAsync(key, value);
		},
		[key]
	);

	return { data, loading, setValue };
}
