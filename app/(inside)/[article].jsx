import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Moment from "moment";
import * as Linking from "expo-linking";

const ArticlePage = () => {
	const data = useLocalSearchParams();
	const router = useRouter();

	const goback = () => {
		router.back();
	};

	return (
		<SafeAreaView style={styles.container}>
			<Pressable style={styles.nav} onPress={goback}>
				<Ionicons name="arrow-back-sharp" size={32} color="black" />
			</Pressable>

			<ScrollView style={styles.content}>
				{/* {data.urlToImage && <Image style={styles.image} source={{ uri: data.urlToImage }}></Image>} */}

				<Text style={styles.title}>{data.title}</Text>
				<Text style={styles.date}>{Moment(data.publishedAt).format("YYYY/MM/DD HH:MM")}</Text>
				<Text style={styles.body}>{data.content}</Text>

				{data.url && (
					<Pressable onPress={() => Linking.openURL(data.url)}>
						<Text style={styles.btn}>Read Article</Text>
					</Pressable>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default ArticlePage;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: "#FFF2C5",
		display: "flex",
	},
	nav: {
		padding: 20,
	},
	content: {
		paddingLeft: 20,
		paddingRigh: 20,
		paddingBottom: 20,
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: 46,
		fontWeight: "200",
		paddingRight: 20,
	},
	body: {
		fontSize: 20,
		fontWeight: "200",
		paddingTop: 20,
		lineHeight: 30,
		marginRight: 20,
	},
	btn: {
		paddingTop: 20,
		fontSize: 20,
		fontWeight: "200",
		color: "#F7B801",
	},
	image: {
		width: "100%",
		height: 150,
		borderRadius: 20,
	},
	date: {
		fontSize: 16,
		fontWeight: "200",
		paddingTop: 10,
		opacity: 0.5,
	},
});
