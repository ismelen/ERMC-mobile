import { pickDirectory } from '@react-native-documents/picker';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AddCircleIcon } from '../old/src/theme/icons';
import ActionButton from '../src/components/dashboard/action-button';
import MonitoredFolderCard from '../src/components/dashboard/monitored-folder-card';
import BookIcon from '../src/components/icons/book-icon';
import ImageIcon from '../src/components/icons/image-icon';
import SColumn from '../src/components/shared/SColumn';
import SDivider from '../src/components/shared/SDivider';
import SText from '../src/components/shared/SText';
import { MonitoredFolder } from '../src/models/monitored-folder';
import { UploadSettings } from '../src/models/upload';
import { FilesystemService } from '../src/services/filesystem-service';
import { StorageService } from '../src/services/storage-service';
import { colors } from '../src/theme/colors';

const FOLDERS = 'folders_key';

export default function index() {
  const [folders, setFolders] = useState<MonitoredFolder[]>([]);

  const fetchMonitoredFolders = async () => {
    const monitoredFolders = await StorageService.GetAsync<MonitoredFolder[]>(FOLDERS);
    if (!monitoredFolders) return;

    setFolders(monitoredFolders);
  };

  useEffect(() => {
    fetchMonitoredFolders();
  }, []);

  const addFolderHanlder = async () => {
    const dir = await pickDirectory({
      requestLongTermAccess: true,
    });
    const [folder, pendingFiles] = await FilesystemService.getMonitorizedFolder(dir.uri);
    const settings = await UploadSettings.default(folder.name, '');
    const newFolders = [
      ...folders,
      {
        source: folder,
        pendingPaths: pendingFiles,
        autoUpload: false,
        settings: settings,
      },
    ];
    setFolders(newFolders);
    StorageService.SetAsync(FOLDERS, newFolders);
  };

  return (
    <View>
      <View style={[styles.padding]}>
        <SText style={[styles.title, { fontSize: 20 }]}>Dashboard</SText>
        <SText style={{ fontSize: 14, color: colors.onCard }}>CONVERSION HUB</SText>
      </View>
      <SDivider />
      <View style={[styles.padding, { gap: 14, paddingTop: 20 }]}>
        <ActionButton
          text="Convert Manga to EPUB"
          icon={(size, color) => <ImageIcon size={size} color={color} />}
          onPress={() => {}}
        />
        <ActionButton
          text="Convert Manga to EPUB"
          icon={(size, color) => <BookIcon size={size} color={color} />}
          onPress={() => {}}
        />
        <View style={[styles.monitoredTitle]}>
          <SText style={[styles.title, { fontSize: 18 }]}>FOLDER MONITOR</SText>
          <SText style={{ color: colors.onCard }}>LIVE</SText>
        </View>

        <SColumn
          footer={
            <Pressable style={[styles.addFolders]} onPress={addFolderHanlder}>
              <AddCircleIcon size="22px" color={colors.primary} />
              <SText style={{ color: colors.primary, fontWeight: '600', fontSize: 16 }}>
                Add Folder
              </SText>
            </Pressable>
          }
        >
          {folders.map((e, i) => (
            <MonitoredFolderCard key={i} folder={e} onPress={() => {}} />
          ))}
        </SColumn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontWeight: '500',
  },
  monitoredTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  addFolders: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
