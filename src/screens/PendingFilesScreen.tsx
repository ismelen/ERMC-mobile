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
import { Button, FileItem } from '../components';
import { theme } from '../theme';
import { File } from '../types';

type RootStackParamList = {
  ConverterDashboard: undefined;
  PendingFiles: undefined;
  ConversionSettings: undefined;
  ConversionProgress: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'PendingFiles'>;
};

// Mock data
const mockFiles: File[] = [
  {
    id: '1',
    name: 'Spider_Man_Vol_05.cbz',
    size: '245 MB',
    status: 'ready',
  },
  {
    id: '2',
    name: 'Gina_Piace_Ch0860.cbz',
    size: '187 MB',
    status: 'ready',
  },
  {
    id: '3',
    name: 'Berserk_Deluxe_Ed.cbz',
    size: '512 MB',
    status: 'ready',
  },
  {
    id: '4',
    name: 'Blue_Giant_v01.cbz',
    size: '156 MB',
    status: 'ready',
  },
  {
    id: '5',
    name: 'Naruto_3in1_Vol10.cbz',
    size: '336 MB',
    status: 'ready',
  },
];

export const PendingFilesScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectAll = () => {
    if (selectedFiles.size === mockFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(mockFiles.map((f) => f.id)));
    }
  };

  const handleFileSelect = (id: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedFiles(newSelected);
  };

  const handleAddFiles = () => {
    // TODO: Implement
  };

  const handleProceed = () => {
    navigation.navigate('ConversionSettings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.iconDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Converter Dashboard</Text>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="settings-outline" size={24} color={theme.colors.iconDark} />
        </TouchableOpacity>
      </View>

      <View style={styles.subHeader}>
        <View style={styles.sourceType}>
          <Ionicons name="folder" size={16} color={theme.colors.textSecondary} />
          <Text style={[styles.sourceTypeText, { marginLeft: theme.spacing.xs }]}>Watched Folders</Text>
          <Ionicons name="chevron-forward" size={16} color={theme.colors.textSecondary} style={{ marginLeft: theme.spacing.xs }} />
          <Text style={[styles.sourceTypeText, { marginLeft: theme.spacing.xs }]}>Individual Files</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Pending Files</Text>
        <TouchableOpacity onPress={handleSelectAll}>
          <Text style={styles.selectAllText}>
            {selectedFiles.size === mockFiles.length ? 'Deselect all' : 'Select all'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockFiles.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            selected={selectedFiles.has(file.id)}
            onSelect={handleFileSelect}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={{ flex: 1, marginRight: theme.spacing.md }}>
          <Button
            title="Add Files"
            onPress={handleAddFiles}
            variant="secondary"
            icon={<Ionicons name="add" size={20} color={theme.colors.primary} />}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Button
            title={`Continue (${selectedFiles.size})`}
            onPress={handleProceed}
            disabled={selectedFiles.size === 0}
          />
        </View>
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
  backButton: {
    marginRight: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  subHeader: {
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  sourceType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceTypeText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  listTitle: {
    ...theme.typography.body,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  selectAllText: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    fontWeight: theme.fonts.weights.semiBold,
  },
  content: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  addButton: {
    flex: 1,
  },
  continueButton: {
    flex: 2,
  },
});
