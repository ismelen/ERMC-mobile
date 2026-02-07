import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import FileCard from '../../../src/components/file-card';
import { useFiles } from '../../../src/hooks/useFiles';
import { theme } from '../../../src/theme';
import { AddCircleIcon, CircleArrowRightIcon } from '../../../src/theme/icons';

export default function Files() {
  const files = useFiles((s) => s.files);
  const addFiles = useFiles((s) => s.addFiles);
  const deleteFile = useFiles((s) => s.deleteFile);
  const toggleSelectFile = useFiles((s) => s.toggleSelectFile);
  const selectAllFiles = useFiles((s) => s.selectAllFiles);
  const selectedFilesAmount = files.filter((e) => e.selected).length;

  return (
    <GestureHandlerRootView style={{ flex: 1, paddingTop: 15 }}>
      {/** Header */}
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1 }}>Pending Files</Text>
          <Text style={{ color: theme.colors.textMuted }}>{selectedFilesAmount} selected</Text>
          <Pressable onPress={selectAllFiles}>
            <Text
              style={{ color: theme.colors.primary, fontWeight: 900, marginLeft: 5, fontSize: 14 }}
            >
              Select All
            </Text>
          </Pressable>
        </View>

        {files.map((e, idx) => (
          <FileCard
            file={e}
            key={idx}
            onToggleSelect={(value) => toggleSelectFile(idx, value)}
            onDelete={() => deleteFile(idx)}
          />
        ))}

        <View style={{ height: 80 }} />
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Pressable
          onPress={addFiles}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 15,
            paddingHorizontal: 20,
            gap: 15,
          }}
        >
          <AddCircleIcon color={theme.colors.white} size="30px" />
          <Text
            style={{
              color: theme.colors.white,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Add File
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            router.push({
              pathname: '/converter-page',
              params: {
                data: JSON.stringify(files),
                type: 'files',
              },
            });
          }}
          style={{
            backgroundColor: theme.colors.primary,
            borderRadius: 20,
            alignItems: 'center',
            padding: 15,
          }}
        >
          <CircleArrowRightIcon color={theme.colors.white} size="30px" />
        </Pressable>
      </View>
    </GestureHandlerRootView>
  );
}
