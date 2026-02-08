import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      {/* <DriveFolderPickerModalRoot /> */}
    </GestureHandlerRootView>
  );
}
