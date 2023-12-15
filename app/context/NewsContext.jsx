import { View, Text, Alert } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";

export const NewsContext = createContext({
	initialized: false,
	news: [],
});

export const NewsProvider = ({ children }) => {
	const [initialized, setInitialized] = useState(false);
	const [news, setNews] = useState([]);

	const router = useRouter();

	const getLatestNews = async () => {
		const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0dc356910f984efd834364469460c604`);
		const json = await response.json();
		if (json.status !== "error") {
			setNews(json.articles);
			router.replace("(inside)/home");
		} else {
			displayAlert("Error", "An error occured while fetching news.");
		}
	};

	const displayAlert = (title, message) => {
		Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });
	};

	useEffect(() => {
		getLatestNews();
		setInitialized(true);
	}, []);

	return <NewsContext.Provider value={{ initialized, news }}>{children}</NewsContext.Provider>;
};
