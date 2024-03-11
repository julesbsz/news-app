import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const CameraPage = () => {
	const router = useRouter();

	const [type, setType] = useState(CameraType.back);
	const [hasPermission, setHasPermission] = useState(null);
	const [cameraRef, setCameraRef] = useState(null);

	function toggleCameraType() {
		setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
	}

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef) {
			const photo = await cameraRef.takePictureAsync();

			if (photo.uri === undefined) {
				return;
			}

			try {
				await AsyncStorage.setItem("picture", photo.uri);
			} catch (error) {
				console.error(error);
			}

			router.back();
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)}>
				<View>
					<View>
						<TouchableOpacity style={styles.buttonFlip} onPress={toggleCameraType}>
							<MaterialIcons name="flip-camera-ios" size={32} color="#FFF2C5" />
						</TouchableOpacity>
					</View>
					<View>
						<TouchableOpacity style={styles.button} onPress={takePicture}>
							<MaterialIcons name="radio-button-on" size={60} color="white" />
						</TouchableOpacity>
					</View>
				</View>
			</Camera>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		position: "absolute",
		top: 520,
		left: "50%",
		marginLeft: -30,
	},
	buttonFlip: {
		position: "absolute",
		top: 540,
		marginLeft: 20,
	},
	container: {
		flex: 1,
		marginBottom: 125,
	},
	camera: {
		flex: 1,
	},
});
export default CameraPage;
