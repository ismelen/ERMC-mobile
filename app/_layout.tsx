import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EReaderProfilePickerModalRoot from '../src/components/modals/e-reader-profile-picker-modal';
import DriveFolderPickerModalRoot from '../src/components/modals/google-drive-picker-modal';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <DriveFolderPickerModalRoot />
      <EReaderProfilePickerModalRoot />
    </GestureHandlerRootView>
  );
}
