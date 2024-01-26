import React, { useContext } from "react";
import { FlatList } from "react-native";
import { NewsContext } from "../context/NewsContext";
import NewsCardComponent from "../components/NewsCard";

const NewsList = () => {
	const { news } = useContext(NewsContext);

	return <FlatList scrollEnabled={false} numColumns={1} data={news} renderItem={({ item }) => <NewsCardComponent data={item} />} keyExtractor={(item) => item.url} />;
};

export default NewsList;
