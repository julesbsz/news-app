import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { NewsContext } from "../context/NewsContext";
import NewsCardComponent from "../components/NewsCard";

const HomePage = () => {
	const { news } = useContext(NewsContext);

	useEffect(() => {});

	return (
		<SafeAreaView style={styles.container}>
			<FlatList numColumns={1} data={news} renderItem={({ item }) => <NewsCardComponent data={item} />} keyExtractor={(item) => item.url} />
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
});
