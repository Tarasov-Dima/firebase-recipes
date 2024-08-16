import React from "react";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { View, StyleSheet } from "react-native";

// Function to calculate the path data for a segment of the pie chart
const getArcPath = (radius, startAngle, endAngle) => {
	const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
	const x1 = radius + radius * Math.cos((Math.PI / 180) * startAngle);
	const y1 = radius + radius * Math.sin((Math.PI / 180) * startAngle);
	const x2 = radius + radius * Math.cos((Math.PI / 180) * endAngle);
	const y2 = radius + radius * Math.sin((Math.PI / 180) * endAngle);

	return `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
};

const getLabelPosition = (radius, startAngle, endAngle) => {
	const angle = (startAngle + endAngle) / 2;
	const x = radius + (radius / 2) * Math.cos((Math.PI / 180) * angle);
	const y = radius + (radius / 2) * Math.sin((Math.PI / 180) * angle);
	return { x, y };
};

const PieChart = ({ data, radius = 100 }) => {
	let startAngle = 0;

	return (
		<View style={styles.container}>
			<Svg
				height={radius * 2}
				width={radius * 2}
				viewBox={`0 0 ${radius * 2} ${radius * 2}`}
			>
				{data.map((segment, index) => {
					const { percent, color, textColor } = segment;
					const endAngle = startAngle + (360 * percent) / 100;
					const pathData = getArcPath(radius, startAngle, endAngle);
					const labelPos = getLabelPosition(radius, startAngle, endAngle);
					startAngle = endAngle;

					return (
						<React.Fragment key={index}>
							<Path d={pathData} fill={color} strokeWidth={0} />
							<SvgText
								x={labelPos.x}
								y={labelPos.y}
								fontSize='14'
								fill={textColor}
								textAnchor='middle'
								alignmentBaseline='middle'
							>
								{`${percent}%`}
							</SvgText>
						</React.Fragment>
					);
				})}
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
});

export default PieChart;
