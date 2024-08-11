import { type Ingredient } from "@/types";
import React from "react";
import { DataTable } from "react-native-paper";

type IngredientsProps = {
	rowItems: Ingredient[];
};

export const IngredientsView = ({ rowItems }: IngredientsProps) => {
	const renderRows = () => {
		return rowItems.map(({ id, name, amount }) => (
			<DataTable.Row key={id}>
				<DataTable.Cell>{name}</DataTable.Cell>
				<DataTable.Cell numeric>
					{Math.round(amount.number)} {amount.type}
				</DataTable.Cell>
			</DataTable.Row>
		));
	};
	return (
		<DataTable>
			<DataTable.Header>
				<DataTable.Title>Ingredients</DataTable.Title>
				<DataTable.Title numeric>Amount</DataTable.Title>
			</DataTable.Header>
			{renderRows()}
		</DataTable>
	);
};
