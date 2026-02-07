import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../src/theme';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: theme.colors.background,
          },
          tabBarPosition: 'top',
        }}
        tabBar={({ state, navigation, descriptors }) => (
          <View
            style={{
              marginTop: insets.top + 30,
              marginHorizontal: 15,
              backgroundColor: '#eeeff2',
              borderRadius: 12,
              padding: 6,
              flexDirection: 'row',
            }}
          >
            {Object.entries(descriptors).map(([key, descriptor], idx) => {
              const isSelected = idx === state.index;

              return (
                <Pressable
                  key={key}
                  onPress={() => navigation.navigate(descriptor.route.name)}
                  style={{
                    flex: 1,
                    borderRadius: 8,
                    paddingVertical: 8,
                    backgroundColor: isSelected ? theme.colors.white : 'transparent',
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      fontWeight: 'medium',
                    }}
                  >
                    {descriptor.options.title}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}
      >
        <Tabs.Screen
          name="folders"
          options={{
            title: 'Folders',
          }}
        />
        <Tabs.Screen
          name="files"
          options={{
            title: 'Individual Files',
          }}
        />
      </Tabs>
    </>
  );
}
