import { createContext, useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export const NotificationsContext = createContext({
	expoPushToken: "",
	notification: false,
	registerForPushNotificationsAsync: () => {},
});

export const NotificationsProvider = ({ children }) => {
	const router = useRouter();
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	async function registerForPushNotificationsAsync() {
		console.log("registerForPushNotificationsAsync...");

		let token;

		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		if (Device.isDevice) {
			console.log("Device is a physical device");
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			console.log(existingStatus);

			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
				console.log(finalStatus);
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			// Learn more about projectId:
			// https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
			try {
				token = (await Notifications.getExpoPushTokenAsync()).data;
				return token;
			} catch (error) {
				Alert.alert("Error", "Can't get notification token because you need to login using npx eas login", [{ text: "Pass", onPress: () => router.replace("(inside)/home") }], { cancelable: false });
				return false;
			}
		} else {
			Alert.alert("Error", "Must use physical device for Push Notifications", [{ text: "Pass", onPress: () => router.replace("(inside)/home") }], { cancelable: false });
		}

		return token;
	}

	useEffect(() => {
		// registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

		notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
			setNotification(notification);
		});

		responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log(response);
		});

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	return <NotificationsContext.Provider value={{ expoPushToken, notification, registerForPushNotificationsAsync }}>{children}</NotificationsContext.Provider>;
};

async function schedulePushNotification() {
	await Notifications.scheduleNotificationAsync({
		content: {
			title: "You've got mail! 📬",
			body: "Here is the notification body",
			data: { data: "goes here" },
		},
		trigger: { seconds: 2 },
	});
}
