import Checkbox from 'expo-checkbox';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { theme } from '../theme';
import { DeleteIcon, OpenBookIcon } from '../theme/icons';
import { File } from '../types';

interface Props {
  file: File;
  onToggleSelect(value: boolean): void;
  onDelete(): void;
}

export default function FileCard({ file, onToggleSelect, onDelete }: Props) {
  const iconColor = file.selected ? theme.colors.primary : theme.colors.textMuted;

  return (
    <Pressable
      onPress={() => onToggleSelect(!file.selected)}
      style={{
        marginTop: 5,
        borderColor: theme.colors.border,
        borderWidth: 2,
        flexDirection: 'row',
        gap: 10,
        padding: 12,
        backgroundColor: theme.colors.white,
        borderRadius: 18,
        alignItems: 'center',
      }}
    >
      {/** Switch */}
      <Checkbox
        style={{ marginHorizontal: 8 }}
        color={iconColor}
        value={file.selected}
        onValueChange={onToggleSelect}
      />
      {/** Icon */}
      <View style={{ backgroundColor: iconColor + '20', padding: 10, borderRadius: 8 }}>
        <OpenBookIcon size="26px" color={iconColor} />
      </View>
      {/** Title and Size */}
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ fontWeight: 900, fontSize: 16 }}>
          {file.name}
        </Text>
        <Text style={{ color: theme.colors.iconDisabled, fontWeight: 800, fontSize: 14 }}>
          {file.size}
        </Text>
      </View>
      {/** Delete */}
      <Pressable style={{ marginHorizontal: 8 }} onPress={onDelete}>
        <DeleteIcon size="26px" color={theme.colors.textMuted} />
      </Pressable>
    </Pressable>
  );
}
