export type Sex = "male" | "female";

export type User = {
	id: string;
	name: string;
	sex: Sex;
	weight: string;
	height: string;
	age: string;
	calculateAMR: number;
	activity: {
		level: string;
		index: string;
	};
};
