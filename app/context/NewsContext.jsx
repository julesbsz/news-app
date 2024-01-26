import { View, Text, Alert } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";

export const NewsContext = createContext({
	initialized: false,
	news: [],
	loading: false,
	getNewsBySearch: () => {},
	getLatestNews: () => {},
});

export const NewsProvider = ({ children }) => {
	const [initialized, setInitialized] = useState(false);
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	const getLatestNews = async () => {
		setLoading(true);
		const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0dc356910f984efd834364469460c604`);
		const json = await response.json();
		if (json.status !== "error") {
			for (let i = 0; i < json.articles.length; i++) {
				if (!json.articles[i].content || !json.articles[i].urlToImage) {
					json.articles.splice(i, 1);
				}
			}
			setNews(json.articles);
			// router.replace("(inside)/home");
		} else {
			console.log(json);
			displayAlert("Error", "An error occured while fetching news.");
		}
		setLoading(false);
	};

	const getNewsBySearch = async (search) => {
		setLoading(true);
		const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(search)}&apiKey=0dc356910f984efd834364469460c604`);
		const json = await response.json();
		if (json.status !== "error") {
			for (let i = 0; i < json.articles.length; i++) {
				if (!json.articles[i].content || !json.articles[i].urlToImage) {
					json.articles.splice(i, 1);
				}
			}
			setNews(json.articles);
			// router.replace("(inside)/home");
		} else {
			console.log(json);
			displayAlert("Error", "An error occured while fetching news.");
		}
		setLoading(false);
	};

	const displayAlert = (title, message) => {
		Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });
	};

	useEffect(() => {
		getLatestNews().then(() => {
			router.replace("(inside)/home");
			setInitialized(true);
		});
	}, []);

	return <NewsContext.Provider value={{ initialized, news, getNewsBySearch, getLatestNews, loading }}>{children}</NewsContext.Provider>;
};
