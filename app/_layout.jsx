import { Stack } from "expo-router";
import { NewsProvider } from "./context/NewsContext";

const StackLayout = () => {
	return (
		<NewsProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
				<Stack.Screen name="(inside)/home" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
			</Stack>
		</NewsProvider>
	);
};

export default StackLayout;
