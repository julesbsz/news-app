import { StyleSheet, Text, SafeAreaView, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import NewsCardComponent from "../components/NewsCard";
import { useIsFocused } from "@react-navigation/native";

const SavedArticlesPage = () => {
	const router = useRouter();
	const isFocused = useIsFocused();
	const [savedArticles, setSavedArticles] = useState([]);

	const getData = async () => {
		try {
			const savedArticles = await AsyncStorage.getItem("saved-articles");
			if (savedArticles !== null) {
				setSavedArticles(JSON.parse(savedArticles).reverse());
			}
		} catch (e) {
			displayAlert("Error", "There was an error getting your saved articles.");
		}
	};

	const displayAlert = (title, message) => {
		Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });
	};

	useEffect(() => {
		if (isFocused) {
			getData();
		}
	}, [isFocused]);

	// useEffect(() => {
	// 	getData();
	// }, []);

	return <SafeAreaView style={styles.container}>{savedArticles.length === 0 ? <Text style={styles.body}>You have no saved articles.</Text> : <FlatList scrollEnabled={true} numColumns={1} data={savedArticles} renderItem={({ item }) => <NewsCardComponent data={item} />} keyExtractor={(item) => item.url} />}</SafeAreaView>;
};

export default SavedArticlesPage;

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		backgroundColor: "#111111",
		display: "flex",
	},
	body: {
		fontSize: 20,
		fontWeight: "200",
		paddingTop: 50,
		lineHeight: 30,
		marginRight: 20,
		color: "#FFF2C5",
		textAlign: "center",
	},
});
