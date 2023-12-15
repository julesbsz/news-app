import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useContext } from "react";
import { NewsContext } from "./context/NewsContext";

// https://cdn.dribbble.com/userupload/4285953/file/original-8c3f02a1c13427d2726eb62b25504804.png?resize=752x

const InitialLayout = () => {
	const { initialized, news } = useContext(NewsContext);

	if (!initialized) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#FFF2C5" />
			</View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		height: "100%",
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#111111",
	},
});

export default InitialLayout;
