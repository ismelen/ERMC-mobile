import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { TaskItem } from '../src/components';
import { theme } from '../src/theme';
import { ConversionTask } from '../src/types';

// Mock data
const mockActiveTasks: ConversionTask[] = [
  {
    id: '1',
    name: 'The_Amazing_Spider_Man_01.epub',
    fileName: '245 MB · 6m:15s left',
    progress: 52,
    status: 'active',
  },
  {
    id: '2',
    name: 'Batman_Year_One.epub',
    fileName: 'Source: batman_yr1.cbz',
    progress: 13,
    status: 'active',
    sourceFile: 'batman_yr1.cbz',
  },
];

const mockCompletedTasks: ConversionTask[] = [
  {
    id: '3',
    name: 'Watchmen_Ch01.epub',
    fileName: 'Source: watchmen_chapter1.cbz',
    progress: 100,
    status: 'complete',
    sourceFile: 'watchmen_chapter1.cbz',
  },
  {
    id: '4',
    name: 'Saga_Vol_01.epub',
    fileName: 'Source: saga_v1.cbz',
    progress: 100,
    status: 'complete',
    sourceFile: 'saga_v1.cbz',
  },
  {
    id: '5',
    name: 'Sandman_Prologue.epub',
    fileName: 'Source: sandman_prologue.cbz',
    progress: 100,
    status: 'complete',
    sourceFile: 'sandman_prologue.cbz',
  },
];

export default function ConversionProgress() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleClear = () => {
    // TODO: Implement
  };

  const handleTabPress = (tab: string) => {
    // TODO: Implement
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.iconDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Conversion Progress</Text>
        <TouchableOpacity onPress={handleClear}>
          <Text style={styles.clearButton}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.folderInfoContainer}>
        <View style={styles.folderInfo}>
          <Ionicons name="folder" size={16} color={theme.colors.primary} />
          <Text style={[styles.folderText, styles.folderTextMargin]}>Folder: watching source</Text>
          <Text style={[styles.folderPath, styles.folderPathMargin]}>C:/Downloads/ComicX</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACTIVE TASKS</Text>
          {mockActiveTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RECENTLY COMPLETED</Text>
          {mockCompletedTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('home')}
        >
          <Ionicons name="home-outline" size={24} color={theme.colors.iconGray} />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('convert')}
        >
          <Ionicons name="swap-horizontal-outline" size={24} color={theme.colors.iconGray} />
          <Text style={styles.tabLabel}>Convert</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('library')}
        >
          <Ionicons name="albums-outline" size={24} color={theme.colors.iconGray} />
          <Text style={styles.tabLabel}>Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handleTabPress('settings')}
        >
          <Ionicons name="settings-outline" size={24} color={theme.colors.iconGray} />
          <Text style={styles.tabLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  clearButton: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: theme.fonts.weights.semiBold,
  },
  folderInfoContainer: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.base,
    paddingBottom: theme.spacing.md,
  },
  folderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  folderText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  folderPath: {
    ...theme.typography.bodySmall,
    color: theme.colors.textPrimary,
    fontWeight: theme.fonts.weights.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.base,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    fontWeight: theme.fonts.weights.semiBold,
    marginBottom: theme.spacing.md,
    letterSpacing: 0.5,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    ...theme.shadows.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xs,
  },
  tabLabel: {
    ...theme.typography.caption,
    color: theme.colors.iconGray,
    marginTop: theme.spacing.xs,
  },
  folderTextMargin: {
    marginLeft: theme.spacing.xs,
  },
  folderPathMargin: {
    marginLeft: theme.spacing.xs,
  },
});
