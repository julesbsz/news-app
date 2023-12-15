import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

			<View style={styles.content}>
				<Text style={styles.title}>{data.title}</Text>
			</View>
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
		paddingRight: 20,
		display: "flex",
		flexDirection: "column",
	},
	title: {
		fontSize: 46,
		fontWeight: "200",
	},
});
