import { Nutrients } from "./nutrients";

type AmountType = "g" | "ml";

export type Ingredient = {
	// id: number;
	name: string;
	amount: {
		number: number;
		type?: AmountType;
	};
	nutrients_per_100g: Omit<Nutrients, "weight">;
	weight_per_unit?: number;
};
