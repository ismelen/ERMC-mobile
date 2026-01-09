import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../theme';
import { File } from '../types';

interface FileItemProps {
  file: File;
  onSelect?: (id: string) => void;
  selected?: boolean;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onSelect, selected }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect?.(file.id)}
      activeOpacity={0.7}
    >
      <View style={styles.checkbox}>
        <Ionicons
          name={selected ? 'checkbox' : 'square-outline'}
          size={24}
          color={selected ? theme.colors.primary : theme.colors.iconGray}
        />
      </View>

      <View style={styles.iconContainer}>
        <Ionicons name="folder" size={24} color={theme.colors.folderBlue} />
        <Ionicons
          name="document"
          size={16}
          color={theme.colors.fileGray}
          style={styles.fileIcon}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {file.name}
        </Text>
        <Text style={styles.size}>{file.size} · Ready to convert</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.base,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  checkbox: {
    marginRight: theme.spacing.md,
  },
  iconContainer: {
    position: 'relative',
    marginRight: theme.spacing.md,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileIcon: {
    position: 'absolute',
    right: -4,
    bottom: -2,
  },
  content: {
    flex: 1,
  },
  name: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    fontWeight: theme.fonts.weights.medium,
    marginBottom: 2,
  },
  size: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
});
