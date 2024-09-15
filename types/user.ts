export type Sex = "male" | "female";

export const activityLevelsName = {
	sedentary: "Sedentary",
	lightlyActive: "Lightly active",
	moderatelyActive: "Moderately active",
	active: "Active",
	extremelyActive: "Extremely active",
} as const;

export type ActivityLevel = keyof typeof activityLevelsName;

export type User = {
	id: string;
	name: string;
	sex: Sex;
	weight: string;
	height: string;
	age: string;
	calculateAMR: number;
	activityLevel: ActivityLevel;
};
