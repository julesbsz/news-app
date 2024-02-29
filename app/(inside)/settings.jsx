import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, TextInput } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SettingsPage = () => {
	const [username, setUsername] = useState("Amazing User");
	const [isUsernameChanged, setIsUsernameChanged] = useState(false);
	const router = useRouter();

	const timerRef = useRef(null);
	const inputRef = useRef(null);

	const onUsernameEdit = (text) => {
		setUsername(text);
		setIsUsernameChanged(true);
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

	useEffect(() => {
		AsyncStorage.getItem("username").then((value) => {
			if (value) setUsername(value);
		});
	}, []);

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			if (isUsernameChanged) {
				AsyncStorage.setItem("username", username);
				displayToast("Username successfully updated");
			}
		}, 500);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [username, isUsernameChanged]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.nav}>
				<Pressable onPress={() => router.back()}>
					<Ionicons name="arrow-back-sharp" size={32} color="#FFF2C5" />
				</Pressable>
			</View>

			<View style={styles.profile}>
				<Image style={styles.pp} source={require("../../assets/pp.gif")} />
				<Pressable style={styles.username} onPress={() => inputRef.current?.focus()}>
					<TextInput ref={inputRef} style={styles.input} onChangeText={onUsernameEdit} value={username} />
					<FontAwesome name="pencil" size={24} color="white" />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default SettingsPage;

const styles = StyleSheet.create({
	container: {
		minHeight: "100%",
		width: "100%",
		backgroundColor: "#111111",
		display: "flex",
		alignItems: "center",
	},
	profile: {
		paddingTop: 0,
		width: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		gap: 20,
	},
	pp: {
		width: 150,
		height: 150,
		borderRadius: 100,
		resizeMode: "cover",
	},
	input: {
		color: "white",
		fontSize: 28,
		fontWeight: "bold",
	},
	username: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
		maxWidth: "80%",
	},
	nav: {
		padding: 20,
		width: "100%",
	},
});