import { Stack } from "expo-router";
import { NewsProvider } from "./context/NewsContext";
import { RootSiblingParent } from "react-native-root-siblings";
import { NotificationsProvider } from "./context/NotificationsContext";

const StackLayout = () => {
	return (
		<NewsProvider>
			<RootSiblingParent>
				<NotificationsProvider>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
						<Stack.Screen name="(inside)/onboarding" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
						<Stack.Screen name="(inside)/home" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
						<Stack.Screen name="(inside)/[article]" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />
						<Stack.Screen name="(inside)/settings" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />
						<Stack.Screen
							name="(inside)/savedArticles"
							options={{
								headerShown: true,
								headerBackVisible: true,
								gestureEnabled: true,
								headerStyle: {
									backgroundColor: "#111111",
									height: 80,
								},
								headerTintColor: "#FFF2C5",
								headerTitleStyle: {
									color: "#FFF2C5",
									fontWeight: "bold",
									fontSize: 20,
								},
								headerTitle: "Saved Articles",
							}}
						/>
					</Stack>
				</NotificationsProvider>
			</RootSiblingParent>
		</NewsProvider>
	);
};

export default StackLayout;
