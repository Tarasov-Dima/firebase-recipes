import { useEffect, useCallback, useState } from "react";
import { setStorageItemAsync, getStorageItemAsync } from "./storageService";
import { User } from "./types";

export const useStorage = <T>(key: string) => {
	const [data, setData] = useState<T | null>();
	const [loading, setLoading] = useState(true);

	const fetchStorageItem = useCallback(async () => {
		setLoading(true);
		const storedValue = await getStorageItemAsync(key);
		setData(storedValue);
		setLoading(false);
	}, [key]);

	useEffect(() => {
		fetchStorageItem();
	}, [fetchStorageItem]);

	const setValue = useCallback(
		(value: any) => {
			setData(value);
			setStorageItemAsync(key, value);
		},
		[key]
	);

	return { data, loading, setValue, refetch: fetchStorageItem };
};
