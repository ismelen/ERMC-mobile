import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DriveFolderPickerModalRoot from '../src/components/google-drive-picker-modal';
import { theme } from '../src/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      <DriveFolderPickerModalRoot />
    </GestureHandlerRootView>
  );
}
