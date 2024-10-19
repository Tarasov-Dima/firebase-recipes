import { type Ingredient } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { DataTable, IconButton } from "react-native-paper";

type IngredientsProps = {
	rowItems: Ingredient[];
	onOpenBottomSheet: VoidFunction;
};

export const IngredientsView = ({
	rowItems,
	onOpenBottomSheet,
}: IngredientsProps) => {
	const { t } = useTranslation("translation", {
		keyPrefix: "screens",
	});

	const renderRows = () => {
		return rowItems.map(({ name, amount }) => (
			<DataTable.Row key={name}>
				<DataTable.Cell>{name}</DataTable.Cell>
				<DataTable.Cell numeric>
					{Math.round(amount.number)} {amount.type}
				</DataTable.Cell>
			</DataTable.Row>
		));
	};
	return (
		<>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>{t("plans.menu.ingredients.title")}</DataTable.Title>
					<DataTable.Title numeric>
						{t("plans.menu.ingredients.amount")}
					</DataTable.Title>
				</DataTable.Header>
				{renderRows()}
			</DataTable>
			<IconButton
				mode='contained'
				icon='basket-plus'
				onPress={onOpenBottomSheet}
				style={{ alignSelf: "flex-end" }}
			/>
		</>
	);
};
