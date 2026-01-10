import React from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import FolderCard from '../../../src/components/folder-card';
import { useConversion } from '../../../src/hooks/useConversion';
import { theme } from '../../../src/theme';
import { AddFolderIcon } from '../../../src/theme/icons';

export default function Folders() {
  const monitoredFolders = useConversion((s) => s.watchedFolders);
  const folders = useConversion((s) => s.folders);

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 15 }}>
      {/** Header */}
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Monitored Folders</Text>
            <Text style={{ fontSize: 14, color: theme.colors.textMuted }}>
              Monitoring {monitoredFolders.length} locations
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
        {monitoredFolders.map((e, idx) => (
          <FolderCard key={idx} folder={e} onPress={() => {}} onDelete={() => {}} />
        ))}

        {/** Rest folders */}
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 25 }}>Selected Folders</Text>
        {folders.map((e, idx) => (
          <FolderCard key={idx} folder={e} onPress={() => {}} onDelete={() => {}} />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
      <View
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
      </View>
    </GestureHandlerRootView>
  );
}
