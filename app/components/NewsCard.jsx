import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NewsCardComponent = ({ data }) => {
	const router = useRouter();

	const handlePress = () => {
		router.push({ pathname: `(inside)/${encodeURI(data.title)}`, params: data });
	};

	return (
		<Pressable style={[styles.container]} onPress={handlePress}>
			{data.urlToImage && <Image style={styles.image} source={{ uri: data.urlToImage }}></Image>}
			<Text style={styles.title}>{data.title}</Text>
			<Text>{data.description}</Text>
			<View style={styles.more}>
				<Text style={styles.moreText}>Learn more</Text>
				<Entypo name="chevron-small-right" size={24} color="black" />
			</View>
		</Pressable>
	);
};

export default NewsCardComponent;

const styles = StyleSheet.create({
	container: {
		padding: 20,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		width: "auto",
		borderRadius: 30,
		minHeight: 100,
		backgroundColor: "#FFF2C5",
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "300",
		marginBottom: 10,
	},
	more: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		size: 20,
	},
	moreText: {
		color: "black",
		fontWeight: "bold",
	},
});
