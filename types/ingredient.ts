type AmountType = "g" | "ml" | undefined;

export type Ingredient = {
	id: number;
	name: string;
	amount: {
		number: string;
		type: AmountType;
	};
};
