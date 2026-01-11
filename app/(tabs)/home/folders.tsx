import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import FolderCard from '../../../src/components/folder-card';
import { useConversion } from '../../../src/hooks/useConversion';
import { theme } from '../../../src/theme';
import { AddFolderIcon } from '../../../src/theme/icons';
import { Folder } from '../../../src/types';

export default function Folders() {
  const folders = useConversion((s) => s.folders);
  const removeFolder = useConversion((s) => s.removeFolder);
  const toggleWatchFolder = useConversion((s) => s.toggleWatchFolder);

  const watched: Folder[] = [];
  const nonWatched: Folder[] = [];
  folders.forEach((value) => {
    if (value.watching) {
      watched.push(value);
      return;
    }
    nonWatched.push(value);
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 15 }}>
      {/** Header */}
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Monitored Folders</Text>
            <Text style={{ fontSize: 14, color: theme.colors.textMuted }}>
              Monitoring {watched.length} locations
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              backgroundColor: theme.colors.primary + '20',
              paddingHorizontal: 10,
              height: 30,
              borderRadius: 9999,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: theme.colors.primary,
                borderRadius: 9999,
              }}
            />
            <Text
              style={{
                color: theme.colors.primary,
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              LIVE
            </Text>
          </View>
        </View>

        {/** Monitored folders */}
        {watched.map((e, idx) => (
          <FolderCard
            key={idx}
            folder={e}
            onPress={() => {
              router.push({
                pathname: '/converter-page',
              });
            }}
            onDelete={() => removeFolder(idx, true)}
            onToggleWatch={(value) => toggleWatchFolder(idx, true)}
          />
        ))}

        {/** Rest folders */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }}>Selected Folders</Text>
        {nonWatched.map((e, idx) => (
          <FolderCard
            key={idx}
            folder={e}
            onPress={() => {
              router.push({
                pathname: '/converter-page',
                params: {
                  data: JSON.stringify(folders[idx]),
                  type: 'folder',
                },
              });
            }}
            onDelete={() => removeFolder(idx, false)}
            onToggleWatch={(value) => toggleWatchFolder(idx, false)}
          />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
      <Pressable
        onPress={useConversion.getState().addFolder}
        style={{
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 20,
          gap: 15,
        }}
      >
        <AddFolderIcon color={theme.colors.white} size="30px" />
        <Text
          style={{
            color: theme.colors.white,
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          Add Folder
        </Text>
      </Pressable>
    </GestureHandlerRootView>
  );
}
