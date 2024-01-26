import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Moment from "moment";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const ArticlePage = () => {
	const data = useLocalSearchParams();
	const router = useRouter();

	const [isSaved, setIsSaved] = useState(false);

	const goback = () => {
		router.back();
	};

	const checkIfSaved = async () => {
		try {
			const savedArticles = JSON.parse(await AsyncStorage.getItem("saved-articles"));

			if (savedArticles !== null) {
				for (let i = 0; i < savedArticles.length; i++) {
					if (savedArticles[i].url === data.url) {
						setIsSaved(true);
					}
				}
			}
		} catch (e) {
			console.log(e);
			displayAlert("Error", "There was an error getting your saved articles.");
		}
	};

	const saveArticle = async () => {
		try {
			const savedArticles = JSON.parse(await AsyncStorage.getItem("saved-articles"));
			if (savedArticles !== null) {
				await AsyncStorage.setItem("saved-articles", JSON.stringify([...savedArticles, data]));
			} else {
				await AsyncStorage.setItem("saved-articles", JSON.stringify([data]));
			}
			setIsSaved(true);
			displayToast("Article added to favorites");
		} catch (e) {
			console.log(e);
			displayAlert("Error", "There was an error saving your article.");
		}
	};

	const removeArticle = async () => {
		try {
			const savedArticles = JSON.parse(await AsyncStorage.getItem("saved-articles"));
			if (savedArticles !== null) {
				const newSavedArticles = savedArticles.filter((article) => article.url !== data.url);
				await AsyncStorage.setItem("saved-articles", JSON.stringify(newSavedArticles));
				setIsSaved(false);
				displayToast("Article removed from favorites");
			}
		} catch (e) {
			console.log(e);
			displayAlert("Error", "There was an error removing your article.");
		}
	};

	const displayToast = (message) => {
		Toast.show(message, {
			duration: Toast.durations.SHORT,
			position: Toast.positions.BOTTOM,
			shadow: false,
			animation: true,
			hideOnPress: true,
			delay: 0,
			backgroundColor: "#22bb33",
		});
	};

	const displayAlert = (title, message) => {
		Alert.alert(title, message, [{ text: "OK" }], { cancelable: false });
	};

	useEffect(() => {
		// AsyncStorage.clear();
		checkIfSaved();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			<View style={styles.nav}>
				<Pressable onPress={goback}>
					<Ionicons name="arrow-back-sharp" size={32} color="black" />
				</Pressable>

				<Pressable onPress={isSaved ? removeArticle : saveArticle}>
					<MaterialIcons name={isSaved ? "favorite" : "favorite-border"} size={32} color={isSaved ? "red" : "black"} />
				</Pressable>
			</View>

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
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
