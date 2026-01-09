import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="pending-files" />
        <Stack.Screen name="conversion-settings" />
        <Stack.Screen name="conversion-progress" />
      </Stack>
    </>
  );
}
