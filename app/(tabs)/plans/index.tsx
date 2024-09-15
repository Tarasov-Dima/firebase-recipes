import { View } from "react-native";
import { Text, Card } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";

const DATA = [
	{
		title: "Basic plan",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nam ducimus labore quia. Dicta blanditiis non neque cum, excepturi sapiente repellat dolorem exercitationem suscipit modi similique, eaque, perferendis tempore quo.",
	},
	{
		title: "Second Item",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nam ducimus labore quia. Dicta blanditiis non neque cum, excepturi sapiente repellat dolorem exercitationem suscipit modi similique, eaque, perferendis tempore quo.",
	},
];

type Item = {
	title: string;
	description: string;
};

const renderItem = ({ item }: { item: Item }) => {
	return (
		<Link
			href={{
				pathname: "../plans/menu",
				params: { id: item.title },
			}}
			asChild
		>
			<Card>
				<Card.Title title={item.title} />
				<Card.Content>
					<Text>{item.description}</Text>
				</Card.Content>
			</Card>
		</Link>
	);
};

const PlansTab = () => {
	return (
		<FlashList
			data={DATA}
			renderItem={renderItem}
			estimatedItemSize={200}
			contentContainerStyle={{ padding: 16 }}
			ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
		/>
	);
};

export default PlansTab;
