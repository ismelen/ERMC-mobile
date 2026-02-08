import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Source } from '../../models/source';
import { UploadSettings } from '../../models/upload';
import { FilesystemService } from '../../services/filesystem-service';
import { colors } from '../../theme/colors';
import SButton from '../shared/SButton';
import SColumn from '../shared/SColumn';
import SDivider from '../shared/SDivider';
import SText from '../shared/SText';
import STextField from '../shared/STextField';
import CloudField from './cloud-field';
import ConfigFilesList from './config-files-list';
import ConfigFolderCard from './config-folder-card';
import ConfigToggleField from './config-toogle-field';
import FilesOrFolderSelector from './files-or-folder-selector';

interface Props {
  isMonitored: boolean;
  initSources: Source[];
  settings: UploadSettings;
  onProcess(settings: UploadSettings, sources: Source[], filesMode: boolean): void;
}

export default function ConvertSettingsPage({
  isMonitored,
  initSources,
  settings,
  onProcess,
}: Props) {
  const [filesMode, setFilesMode] = useState(!isMonitored);
  const [sources, setSources] = useState<Source[]>(initSources);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Settings',
          headerTintColor: colors.primary,
          headerTitleStyle: {
            color: colors.white,
          },
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <SText style={styles.sectionTitle}>SOURCE</SText>
        {sources.length === 0 && (
          <FilesOrFolderSelector
            onFilesAdd={async () => {
              const files = await FilesystemService.pickFiles();
              setSources(files);
              setFilesMode(true);
            }}
            onFolderAdd={async () => {
              const folder = await FilesystemService.pickFolder();
              if (!folder) return;
              setSources([folder]);
              setFilesMode(false);
            }}
          />
        )}
        {sources.length !== 0 && filesMode && (
          <ConfigFilesList sources={sources} onChange={(srcs) => setSources(srcs)} />
        )}
        {sources.length !== 0 && !filesMode && (
          <ConfigFolderCard
            source={sources[0]}
            onChange={(src) => {
              if (!isMonitored) {
                setSources(src ? [src] : []);
                return;
              }

              onProcess(settings, [], filesMode);
            }}
            isMonitorized={isMonitored}
          />
        )}
        <SText style={styles.sectionTitle}>METADATA</SText>
        <SColumn removeCellPadding>
          <STextField
            label="Title"
            hint="Book Title"
            initial={settings.title}
            labelWidth={60}
            onChange={(value) => {
              settings.title = value;
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 3,
            }}
          />
          <STextField
            label="Author"
            hint="Author Name"
            initial={settings.author}
            labelWidth={60}
            onChange={(value) => {
              settings.author = value;
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 3,
            }}
          />
        </SColumn>
        <SText style={styles.sectionTitle}>CONFIGURATION</SText>
        <SColumn removeCellPadding>
          <STextField
            label="Intial Volume"
            hint="1"
            initial={settings.author}
            onChange={(value) => {
              settings.author = value;
            }}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 3,
            }}
            textAlign="right"
            keyboardType="number-pad"
          />
          <ConfigToggleField
            initial={settings.mergeFiles}
            label="Merge Files"
            onChange={(value) => (settings.mergeFiles = value)}
          />
          <ConfigToggleField
            initial={settings.deleteFilesAfterUpload}
            label="Delete files after upload"
            onChange={(value) => (settings.deleteFilesAfterUpload = value)}
          />
          <CloudField toCloud={settings.cloud} onChange={(dest) => (settings.cloud = dest)} />
          {isMonitored && (
            <ConfigToggleField
              initial={settings.autoUpload}
              label="Auto upload"
              onChange={(value) => (settings.autoUpload = value)}
            />
          )}
        </SColumn>
      </ScrollView>
      <SDivider />
      <SButton
        onPress={() => onProcess(settings, sources, filesMode)}
        style={{ marginVertical: 20, marginHorizontal: 20 }}
      >
        <SText style={{ fontSize: 18, fontWeight: '700' }}>Start Processing</SText>
      </SButton>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.onCard, marginBottom: 10, marginTop: 20 },
  label: { fontWeight: '500', fontSize: 16 },
});
