import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, ScrollView, StatusBar, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsCardComponent from "../components/NewsCard";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchBar from "../components/SearchBar";
import NewsList from "../components/NewsList";
import ChipsList from "../components/ChipsList";

const HomePage = () => {
	const { news } = useContext(NewsContext);
	const router = useRouter();

	const [search, setSearch] = useState("");

	useEffect(() => {});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" />

			<ScrollView style={styles.content}>
				<View style={styles.nav}>
					<Pressable onPress={() => router.push("(inside)/savedArticles")}>
						<MaterialIcons name="favorite" size={32} color="#FFF2C5" />
					</Pressable>
					<Image style={styles.logo} source={require("../../assets/news-logo.png")} />
					<Pressable onPress={() => console.log("fav")}>
						<Ionicons name="settings-sharp" size={32} color="#FFF2C5" />
					</Pressable>
				</View>

				<SearchBar search={search} setSearch={setSearch} />
				<ChipsList setSearch={setSearch} search={search} />

				{!news || news.length <= 0 ? <Text style={styles.body}>No news found.</Text> : <NewsList />}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		minHeight: "100%",
		width: "100%",
		backgroundColor: "#111111",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	content: {
		width: "100%",
	},
	nav: {
		padding: 20,
		height: 80,
		backgroundColor: "#111111",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	logo: {
		width: "60%",
		height: "75%",
		resizeMode: "contain",
	},
	body: {
		width: "100%",
		fontSize: 20,
		fontWeight: "200",
		paddingTop: 50,
		lineHeight: 30,
		marginRight: 20,
		color: "#FFF2C5",
		textAlign: "center",
	},
});
