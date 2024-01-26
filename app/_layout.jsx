import { Stack } from "expo-router";
import { NewsProvider } from "./context/NewsContext";

const StackLayout = () => {
	return (
		<NewsProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="(inside)/home" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="(inside)/[article]" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />
				<Stack.Screen name="(inside)/savedArticles" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: true }} />
			</Stack>
		</NewsProvider>
	);
};

export default StackLayout;
