import { Stack } from "expo-router";

const StackLayout = () => {
	return (
		// <AuthProvider>
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false, headerBackVisible: false, gestureEnabled: false }} />
		</Stack>
		// </AuthProvider>
	);
};

export default StackLayout;
