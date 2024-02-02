import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useRef } from "react";
import PagerView from "react-native-pager-view";

const OnBoardingPage = () => {
	const pagerRef = useRef(null);

	const nextPage = () => {
		pagerRef.current.setPage(1);
	};

	return (
		<PagerView ref={pagerRef} style={styles.wrapper} initialPage={0}>
			<View key="1" style={styles.slide}>
				<Image source={require("../../assets/newspaper.png")} style={styles.image} />
				<Text style={styles.title}>Keep up to date on the latest news</Text>
				<Text style={styles.description}>Get the latest news from around the world, all in one place.</Text>
				<Pressable onPress={nextPage}>
					<Text style={styles.button}>Next</Text>
				</Pressable>
			</View>

			<View key="2" style={styles.slide}>
				<Image source={require("../../assets/newspaper.png")} style={styles.image} />
				<Text style={styles.title}>Allow notifications on your device</Text>
				<Text style={styles.description}>Get notified when new articles are published.</Text>
				<Pressable>
					<Text style={styles.button}>Allow</Text>
				</Pressable>
			</View>
		</PagerView>
	);
};

export default OnBoardingPage;

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: "#111111",
		flex: 1,
	},
	slide: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "70%",
		height: "50%",
		resizeMode: "contain",
	},
	title: {
		color: "#FFF2C5",
		fontSize: 40,
		fontWeight: "200",
		textAlign: "center",
		paddingTop: 20,
		paddingRight: 20,
		paddingLeft: 20,
	},
	description: {
		fontSize: 20,
		fontWeight: "200",
		paddingTop: 20,
		lineHeight: 30,
		marginRight: 20,
		marginLeft: 20,
		color: "white",
		textAlign: "center",
	},
	button: {
		color: "black",
		backgroundColor: "#FFF2C5",
		fontSize: 20,
		textAlign: "center",
		marginTop: 20,
		paddingVertical: 15,
		paddingHorizontal: "30%",
		borderRadius: 10,
		overflow: "hidden",
	},
});
