import { type Nutrients } from "@/types";
import React from "react";
import { DataTable } from "react-native-paper";

type NutrientsProps = {
	rowItems: Nutrients;
};

export const NutrientsView = ({ rowItems }: NutrientsProps) => {
	const renderRows = () => {
		return Object.entries(rowItems).map(([key, value]) => (
			<DataTable.Row key={key}>
				<DataTable.Cell>{key}</DataTable.Cell>
				<DataTable.Cell numeric>{value} g</DataTable.Cell>
			</DataTable.Row>
		));
	};

	return <DataTable>{renderRows()}</DataTable>;
};
