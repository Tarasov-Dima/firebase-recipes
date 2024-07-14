import { View } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import Food from "../../../assets/images/food.jpg";
import { Link } from "expo-router";
const DATA = [
	{
		title: "First Item",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nam ducimus labore quia. Dicta blanditiis non neque cum, excepturi sapiente repellat dolorem exercitationem suscipit modi similique, eaque, perferendis tempore quo.",
	},
	{
		title: "Second Item",
		description:
			"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nam ducimus labore quia. Dicta blanditiis non neque cum, excepturi sapiente repellat dolorem exercitationem suscipit modi similique, eaque, perferendis tempore quo.",
	},
];

const PlansTab = () => {
	const renderItem = ({ item }) => {
		return (
			<Card>
				<Card.Title title={item.title} />
				<Card.Content>
					<Text>{item.description}</Text>
				</Card.Content>
				<Card.Cover source={Food} />
				<Link
					href={{
						pathname: "/plans/menu",
						params: { id: item.title },
					}}
					asChild
				>
					<Button>See menu</Button>
				</Link>
			</Card>
		);
	};
	return (
		<FlashList
			data={DATA}
			renderItem={renderItem}
			estimatedItemSize={200}
			contentContainerStyle={{ padding: 12 }}
			ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
		/>
	);
};

export default PlansTab;
