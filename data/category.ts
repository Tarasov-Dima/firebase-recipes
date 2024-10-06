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
	DairyAlternatives: 14,
	Herbs: 15,
	Household: 110,
} as const;

type CategoryIDType = (typeof CategoryID)[keyof typeof CategoryID];

export type CategoryKeysType = keyof typeof CategoryID;

export type Category = {
	id: number;
	name: string;
};

export const categories: { [key in CategoryIDType]: Category } = {
	[CategoryID.Dairy]: {
		id: CategoryID.Dairy,
		name: "Dairy",
	},
	[CategoryID.BakingSupplies]: {
		id: CategoryID.BakingSupplies,
		name: "Baking Supplies",
	},
	[CategoryID.Fruits]: {
		id: CategoryID.Fruits,
		name: "Fruits",
	},
	[CategoryID.Meat]: {
		id: CategoryID.Meat,
		name: "Meat",
	},
	[CategoryID.Seafood]: {
		id: CategoryID.Seafood,
		name: "Seafood",
	},
	[CategoryID.Vegetables]: {
		id: CategoryID.Vegetables,
		name: "Vegetables",
	},
	[CategoryID.GrainsAndCereals]: {
		id: CategoryID.GrainsAndCereals,
		name: "Grains and Cereals",
	},
	[CategoryID.NutsAndSeeds]: {
		id: CategoryID.NutsAndSeeds,
		name: "Nuts and Seeds",
	},
	[CategoryID.OilsAndFats]: {
		id: CategoryID.OilsAndFats,
		name: "Oils and Fats",
	},
	[CategoryID.CannedGoods]: {
		id: CategoryID.CannedGoods,
		name: "Canned Goods",
	},
	[CategoryID.SeasoningsAndSpices]: {
		id: CategoryID.SeasoningsAndSpices,
		name: "Seasonings and Spices",
	},
	[CategoryID.CondimentsAndSauces]: {
		id: CategoryID.CondimentsAndSauces,
		name: "Condiments and Sauces",
	},
	[CategoryID.Eggs]: {
		id: CategoryID.Eggs,
		name: "Eggs",
	},
	[CategoryID.DairyAlternatives]: {
		id: CategoryID.DairyAlternatives,
		name: "Dairy Alternatives",
	},
	[CategoryID.Herbs]: {
		id: CategoryID.Herbs,
		name: "Herbs",
	},
	[CategoryID.Household]: {
		id: CategoryID.Household,
		name: "Household Products",
	},
};

export const getCategoryByKey = (key: CategoryKeysType) => {
	const id = CategoryID[key];
	return categories[id];
};
