import { Sex } from "@/types/user";

// Constants for BMR calculation
const BMR_CONSTANT1 = 10; // Constant multiplier for weight in kg
const BMR_CONSTANT2 = 6.25; // Constant multiplier for height in cm
const BMR_CONSTANT3 = 5; // Constant multiplier for age in years
const BMR_CONSTANT4_MEN = 5; // Constant addition for men
const BMR_CONSTANT4_WOMEN = 161; // Constant subtraction for women

type BMRProps = {
	weight: number; //kg
	height: number; //cm
	age: number; //years
};

type CalculateBMRProps = {
	sex: Sex;
} & BMRProps;

// Function to calculate Basal Metabolic Rate (BMR) for men
export const calculateBMRMen = ({ weight, height, age }: BMRProps) => {
	// return 66 + 13.7 * weight + 5 * height - 6.8 * age;

	return (
		BMR_CONSTANT1 * weight +
		BMR_CONSTANT2 * height -
		BMR_CONSTANT3 * age +
		BMR_CONSTANT4_MEN
	);
};

// Function to calculate Basal Metabolic Rate (BMR) for women
export const calculateBMRWomen = ({ weight, height, age }: BMRProps) => {
	// return 655 + 9.6 * weight + 1.8 * height - 4.7 * age;

	return (
		BMR_CONSTANT1 * weight +
		BMR_CONSTANT2 * height -
		BMR_CONSTANT3 * age -
		BMR_CONSTANT4_WOMEN
	);
};

export const calculateBMR = ({
	sex,
	weight,
	height,
	age,
}: CalculateBMRProps) => {
	if (!sex || !weight || !height || !age) {
		return 0;
	}
	if (sex === "male") {
		return calculateBMRMen({ weight, height, age });
	}
	return calculateBMRWomen({ weight, height, age });
};
