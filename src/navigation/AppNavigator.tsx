import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  ConversionProgressScreen,
  ConversionSettingsScreen,
  ConverterDashboardScreen,
  PendingFilesScreen,
} from '../screens';

export type RootStackParamList = {
  ConverterDashboard: undefined;
  PendingFiles: undefined;
  ConversionSettings: undefined;
  ConversionProgress: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: '#F5F7FA' },
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ConverterDashboard"
        screenOptions={screenOptions}
      >
        <Stack.Screen
          name="ConverterDashboard"
          component={ConverterDashboardScreen}
        />
        <Stack.Screen
          name="PendingFiles"
          component={PendingFilesScreen}
        />
        <Stack.Screen
          name="ConversionSettings"
          component={ConversionSettingsScreen}
        />
        <Stack.Screen
          name="ConversionProgress"
          component={ConversionProgressScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
