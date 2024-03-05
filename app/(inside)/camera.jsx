import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";

const CameraPage = () => {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	function toggleCameraType() {
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} flashMode={true}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
						<MaterialIcons name="flip-camera-ios" size={32} color="#FFF2C5" />
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		backgroundColor: "transparent",
		flexDirection: "row",
		margin: 50,
	},
	button: {
		flex: 0.1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 18,
		color: "white",
	},
});

export default CameraPage;
