export type Sex = "male" | "female";

export type User = {
	name: string;
	sex: Sex;
	weight: string;
	height: string;
	age: string;
	activityLevel: string;
	calculateAMR: number;
};
