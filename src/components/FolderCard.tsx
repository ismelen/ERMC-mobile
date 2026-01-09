import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { Folder } from '../types';
import { Card } from './Card';

interface FolderCardProps {
  folder: Folder;
  onPress?: () => void;
  onMorePress?: () => void;
}

export const FolderCard: React.FC<FolderCardProps> = ({
  folder,
  onPress,
  onMorePress,
}) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="folder" size={20} color={theme.colors.folderBlue} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{folder.name}</Text>
            <Text style={styles.path}>{folder.path}</Text>
          </View>
          <TouchableOpacity onPress={onMorePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.iconGray} />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>STATUS</Text>
            <Text style={styles.statValue}>{folder.status === 'monitoring' ? 'Monitoring' : 'Idle'}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>STORAGE</Text>
            <Text style={styles.statValue}>{folder.storageUsed}</Text>
          </View>
        </View>

        {folder.lastSync && (
          <View style={styles.syncInfo}>
            <Ionicons name="time-outline" size={12} color={theme.colors.textTertiary} />
            <Text style={styles.syncText}>Last sync {folder.lastSync}</Text>
            <Ionicons name="cloud-done-outline" size={12} color={theme.colors.textTertiary} />
          </View>
        )}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    marginRight: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...theme.typography.body,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  path: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    gap: theme.spacing.xl,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  statValue: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.fonts.weights.medium,
  },
  syncInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  syncText: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    flex: 1,
  },
});
