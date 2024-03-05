import React, { useContext } from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { NewsContext } from "../context/NewsContext";
import NewsCardComponent from "../components/NewsCard";

const NewsList = ({ setCurrentPage, currentPage }) => {
	const { news } = useContext(NewsContext);

	const renderLoader = () => {
		return (
			<View style={styles.loader}>
				<ActivityIndicator size="large" color="#FFF2C5" />
			</View>
		);
	};

	const loadMoreItems = () => {
		console.log("Loading more items");
		setCurrentPage(currentPage + 1);
	};

	return <FlatList scrollEnabled={false} numColumns={1} data={news} ListFooterComponent={renderLoader} onEndReached={loadMoreItems} onEndReachedThreshold={0} renderItem={({ item }) => <NewsCardComponent data={item} />} keyExtractor={(item) => item.url} />;
};

const styles = StyleSheet.create({
	loader: {
		paddingVertical: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default NewsList;
