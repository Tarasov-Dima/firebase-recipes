import { Ingredient } from "@/types";

type GroupAndSortByCategoryParams = {
	ingredients: Ingredient[];
	selectedIngredients: number[];
};

export const groupAndSortByCategory = ({
	ingredients,
	selectedIngredients,
}: GroupAndSortByCategoryParams) => {
	// Group ingredients by category
	const groupedCategories = ingredients.reduce((sections, ingredient) => {
		const { category } = ingredient;
		const section = sections.find((section) => section.title === category.name);
		if (section) {
			section.data.push(ingredient);
		} else {
			sections.push({ title: category.name, data: [ingredient] });
		}
		return sections;
	}, [] as { title: string; data: Ingredient[] }[]);

	// Move selected ingredients to the bottom within each category
	groupedCategories.forEach((section) => {
		section.data.sort((a, b) => {
			const isSelectedA = selectedIngredients.includes(a.id);
			const isSelectedB = selectedIngredients.includes(b.id);
			return isSelectedA === isSelectedB ? 0 : isSelectedA ? 1 : -1;
		});
	});

	// Move fully selected categories to the bottom
	const allSelectedCategories = groupedCategories.filter((section) =>
		section.data.every((item) => selectedIngredients.includes(item.id))
	);
	const partiallySelectedCategories = groupedCategories.filter(
		(section) =>
			!section.data.every((item) => selectedIngredients.includes(item.id))
	);

	// Return partially selected categories first, fully selected categories last
	return [...partiallySelectedCategories, ...allSelectedCategories];
};
