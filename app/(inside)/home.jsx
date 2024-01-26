import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, ScrollView, StatusBar, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsCardComponent from "../components/NewsCard";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const HomePage = () => {
	const { news } = useContext(NewsContext);

	useEffect(() => {});

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="light-content" />

			<ScrollView style={styles.content}>
				<View style={styles.nav}>
					<Pressable onPress={() => console.log("fav")}>
						<MaterialIcons name="favorite" size={32} color="#FFF2C5" />
					</Pressable>
					<Image style={styles.logo} source={require("../../assets/news-logo.png")} />
					<Pressable onPress={() => console.log("fav")}>
						<Ionicons name="settings-sharp" size={32} color="#FFF2C5" />
					</Pressable>
				</View>

				<FlatList scrollEnabled={false} numColumns={1} data={news} renderItem={({ item }) => <NewsCardComponent data={item} />} keyExtractor={(item) => item.url} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: "#111111",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
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
});
