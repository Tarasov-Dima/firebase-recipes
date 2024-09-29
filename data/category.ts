export const CategoryID = {
	Dairy: 1,
	BakingSupplies: 2,
	Fruits: 3,
	Meat: 4,
	Seafood: 5,
	Vegetables: 6,
	GrainsAndCereals: 7,
	NutsAndSeeds: 8,
	OilsAndFats: 9,
	CannedGoods: 10,
	SeasoningsAndSpices: 11,
	CondimentsAndSauces: 12,
	Eggs: 13,
	Household: 14,
} as const;

type CategoryIDType = (typeof CategoryID)[keyof typeof CategoryID];

export type CategoryKeysType = keyof typeof CategoryID;

export type Category = {
	id: number;
	name: string;
};

export const categories: { [key in CategoryIDType]: Category } = {
	[CategoryID.Dairy]: {
		id: 1,
		name: "Dairy",
	},
	[CategoryID.BakingSupplies]: {
		id: 2,
		name: "Baking Supplies",
	},
	[CategoryID.Fruits]: {
		id: 3,
		name: "Fruits",
	},
	[CategoryID.Meat]: {
		id: 4,
		name: "Meat",
	},
	[CategoryID.Seafood]: {
		id: 5,
		name: "Seafood",
	},
	[CategoryID.Vegetables]: {
		id: 6,
		name: "Vegetables",
	},
	[CategoryID.GrainsAndCereals]: {
		id: 7,
		name: "Grains and Cereals",
	},
	[CategoryID.NutsAndSeeds]: {
		id: 8,
		name: "Nuts and Seeds",
	},
	[CategoryID.OilsAndFats]: {
		id: 9,
		name: "Oils and Fats",
	},
	[CategoryID.CannedGoods]: {
		id: 10,
		name: "Canned Goods",
	},
	[CategoryID.SeasoningsAndSpices]: {
		id: 11,
		name: "Seasonings and Spices",
	},
	[CategoryID.CondimentsAndSauces]: {
		id: 12,
		name: "Condiments and Sauces",
	},
	[CategoryID.Eggs]: {
		id: 13,
		name: "Eggs",
	},
	[CategoryID.Household]: {
		id: 14,
		name: "Household Products",
	},
};

export const getCategoryByKey = (key: CategoryKeysType) => {
	const id = CategoryID[key];
	return categories[id];
};
