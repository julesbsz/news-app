import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import { Chip } from "@rneui/themed";
import { NewsContext } from "../context/NewsContext";

const ChipsListComponent = () => {
	const { getNewsByCategories, loading } = useContext(NewsContext);

	const [chips, setChips] = useState([
		{
			title: "Business",
			type: "outline",
			buttonStyle: styles.chip,
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
		{
			title: "Entertainment",
			type: "outline",
			buttonStyle: styles.chip,
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
		{
			title: "General",
			type: "outline",
			buttonStyle: styles.chip,
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
		{
			title: "Health",
			type: "outline",
			buttonStyle: styles.chip,
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
		{
			title: "Science",
			type: "outline",
			buttonStyle: styles.chip,
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
		{
			title: "Sports",
			type: "outline",
			buttonStyle: styles.chip,
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
		{
			title: "Technology",
			type: "outline",
			buttonStyle: [styles.chip],
			titleStyle: styles.chipTitle,
			isSelected: false,
		},
	]);

	const handlePress = (chip, index) => () => {
		const newChips = chips.map((c, i) => ({
			...c,
			isSelected: i === index,
			buttonStyle: i === index ? [styles.chip, styles.chip__selected] : styles.chip,
		}));
		setChips(newChips);

		const selectedChips = newChips.filter((chip) => chip.isSelected).map((chip) => chip.title);
		getNewsByCategories(selectedChips.toString());
	};

	return (
		<ScrollView horizontal={true} style={styles.list}>
			{chips.map((chip, index) => (
				<Chip key={index} {...chip} onPress={handlePress(chip, index)} />
			))}
		</ScrollView>
	);
};

export default ChipsListComponent;

const styles = StyleSheet.create({
	list: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
	chip: {
		borderColor: "#FFF2C5",
		borderWidth: 2,
		marginEnd: 10,
	},
	chipTitle: {
		color: "#FFF2C5",
	},
	chip__selected: {
		backgroundColor: "#FFF2C575",
	},
});

// TODO: remove searchbar text when clicking on a chip
// TODO: deselect chip when searching using searchbar