import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../theme';
import { ConversionTask } from '../types';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';

interface TaskItemProps {
  task: ConversionTask;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const getStatusColor = () => {
    if (task.status === 'complete') return theme.colors.progressGreen;
    if (task.status === 'active') return theme.colors.primary;
    return theme.colors.iconGray;
  };

  const getStatusIcon = () => {
    if (task.status === 'complete') return 'checkmark-circle';
    if (task.status === 'active') return 'sync';
    return 'radio-button-off';
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Ionicons name={getStatusIcon()} size={24} color={getStatusColor()} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{task.name}</Text>
          <Text style={styles.subtitle}>{task.fileName}</Text>
        </View>
        {task.status === 'active' && (
          <Text style={styles.percentage}>{task.progress}%</Text>
        )}
        {task.status === 'complete' && (
          <Text style={styles.statusText}>READY</Text>
        )}
      </View>

      {task.status === 'active' && (
        <ProgressBar progress={task.progress} color={getStatusColor()} />
      )}

      {task.sourceFile && (
        <Text style={styles.sourceText}>Source: {task.sourceFile}</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  title: {
    ...theme.typography.body,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  percentage: {
    ...theme.typography.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textPrimary,
  },
  statusText: {
    ...theme.typography.bodySmall,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.progressGreen,
    letterSpacing: 0.5,
  },
  sourceText: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    marginTop: theme.spacing.sm,
  },
});
