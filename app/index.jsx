import { View, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
// import { useContext } from "react";
// import { AuthContext } from "./context/AuthContext";

const InitialLayout = () => {
	const [initialized, setInitialized] = useState(false);
	// const { initialized } = useContext(AuthContext);

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
