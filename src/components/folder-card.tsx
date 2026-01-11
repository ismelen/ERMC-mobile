import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { theme } from '../theme';
import { DeleteIcon, EyeIcon, MonitorizedFolderIcon } from '../theme/icons';
import { Folder } from '../types';

interface Props {
  folder: Folder;
  onPress(): void;
  onDelete(): void;
  onToggleWatch(): void;
}

export default function FolderCard({ folder, onPress, onDelete, onToggleWatch }: Props) {
  const iconColor = folder.watching ? theme.colors.primary : theme.colors.textMuted;

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginTop: 15,
        backgroundColor: theme.colors.white,
        borderRadius: 18,
        padding: 12,
        width: 'auto',
        borderColor: theme.colors.border,
        borderWidth: 2,
      }}
    >
      {/** Header */}
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            backgroundColor: iconColor + '20',
            aspectRatio: 1,
            padding: 12,
            borderRadius: 12,
          }}
        >
          <MonitorizedFolderIcon color={iconColor} size="35px" />
        </View>
        <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }}>
          <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 20, lineHeight: 24 }}>
            {folder.name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 16, color: theme.colors.textMuted, lineHeight: 18 }}
          >
            {folder.path}
          </Text>
        </View>
        <Pressable style={{ padding: 3 }} onPress={onToggleWatch}>
          <EyeIcon
            size="26px"
            color={folder.watching ? theme.colors.primary : theme.colors.textGray}
          />
        </Pressable>
      </View>

      {/** Info */}
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 12,
          gap: 12,
        }}
      >
        <ExtraInfoCard
          label="STATUS"
          text={`${folder.pendingFilesAmount} pending`}
          textColor={theme.colors.primary}
        />
        <ExtraInfoCard label="STORAGE" text={folder.size} textColor="#000" />
      </View>
      <View style={{ backgroundColor: theme.colors.border, height: 1, marginTop: 12 }} />

      {/** Monitorized data */}
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 12,
          alignItems: 'center',
          paddingHorizontal: 3,
        }}
      >
        <Text style={{ flex: 1, color: theme.colors.textMuted }}>
          Last sync: {folder.lastSync?.toDateString()}
        </Text>
        <Pressable onPress={onDelete} style={{ padding: 3 }}>
          <DeleteIcon color={theme.colors.textGray} size="24px" />
        </Pressable>
      </View>
    </Pressable>
  );
}

function ExtraInfoCard(props: { label: string; text: string; textColor: string }) {
  return (
    <View
      style={{ backgroundColor: theme.colors.cardMuted, borderRadius: 8, padding: 10, flex: 1 }}
    >
      <Text style={{ color: theme.colors.textGray, fontWeight: 'bold', fontSize: 16 }}>
        {props.label}
      </Text>
      <Text style={{ color: props.textColor, fontWeight: 'bold', fontSize: 14 }}>{props.text}</Text>
    </View>
  );
}
