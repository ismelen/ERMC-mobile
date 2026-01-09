import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Button, FolderCard, TabBar } from '../components';
import { theme } from '../theme';
import { Folder, TabType } from '../types';

type RootStackParamList = {
  ConverterDashboard: undefined;
  PendingFiles: undefined;
  ConversionSettings: undefined;
  ConversionProgress: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ConverterDashboard'>;
};

// Mock data
const mockFolders: Folder[] = [
  {
    id: '1',
    name: 'Weekly Shonen Jump',
    path: 'C:/Downloads/WSJ',
    status: 'monitoring',
    filesCount: 12,
    storageUsed: '1.2 GB Used',
    lastSync: '2hr ago',
  },
  {
    id: '2',
    name: 'Import Archive',
    path: 'E:/COMIC/Archive',
    status: 'idle',
    filesCount: 0,
    storageUsed: '850 MB Used',
  },
  {
    id: '3',
    name: 'Personal Drafts',
    path: 'C:/Work/Drafts',
    status: 'idle',
    filesCount: 0,
    storageUsed: '43 MB Used',
  },
];

export const ConverterDashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<TabType>('watched');

  const handleAddFolder = () => {
    // TODO: Implement
  };

  const handleSettings = () => {
    // TODO: Implement
  };

  const handleFolderPress = (folderId: string) => {
    navigation.navigate('PendingFiles');
  };

  const handleMorePress = (folderId: string) => {
    // TODO: Implement
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Converter Dashboard</Text>
        <TouchableOpacity onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color={theme.colors.iconDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            { key: 'watched', label: 'Watched Folders' },
            { key: 'individual', label: 'Individual Files' },
          ]}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Folders</Text>
          <Text style={styles.sectionCount}>{mockFolders.length} LIVE</Text>
        </View>

        {mockFolders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onPress={() => handleFolderPress(folder.id)}
            onMorePress={() => handleMorePress(folder.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Add Folder"
          onPress={handleAddFolder}
          icon={<Ionicons name="add" size={20} color={theme.colors.white} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
  },
  tabContainer: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.body,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  sectionCount: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: theme.fonts.weights.semiBold,
    letterSpacing: 0.5,
  },
  footer: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
});
