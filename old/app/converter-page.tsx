import { Stack, useLocalSearchParams } from 'expo-router';
import React, { ReactNode, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, Text, View } from 'react-native';
import { ScrollView, Switch, TextInput } from 'react-native-gesture-handler';
import { useConversion } from '../src/hooks/useConversion';
import { theme } from '../src/theme';
import { FolderZipIcon, GoogleCloudUploadIcon } from '../src/theme/icons';
import { ConversionTask, File, Folder } from '../src/types';

export default function ConverterPage() {
  const settings = useConversion((s) => s.settings);
  const setSettings = useConversion((s) => s.setSettings);
  const startConversion = useConversion((s) => s.startConversion);
  const { data, type } = useLocalSearchParams();

  const [task, setTask] = useState<ConversionTask>({
    status: 'Waiting',
    data: [],
  });

  useEffect(() => {
    if (type === 'files') {
      setTask((s) => ({
        ...s,
        data: JSON.parse(data as string) as File[],
      }));
      return;
    }

    const f = JSON.parse(data as string) as Folder;
    setTask((s) => ({
      ...s,
      title: f.name,
      data: f,
    }));
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Conversion Settings',
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
      <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 15 }}>
          <Text style={{ fontWeight: 800, fontSize: 18, marginBottom: 15 }}>
            Processing options
          </Text>
          <View style={{ borderColor: theme.colors.border, borderWidth: 1, borderRadius: 12 }}>
            <ProcessingOption
              title="Merge into volumes"
              description="Combines multiple CBZ files into EPUB volumes"
              borderRadius="top"
              enabled={settings!.merge}
              toggleValue={(value) => {
                settings!.merge = value;
                setSettings(settings!);
              }}
            />
            <ProcessingOption
              title="Delete local source after upload"
              description="Save device space after cloud sync"
              borderRadius="bottom"
              enabled={settings!.delete}
              toggleValue={(value) => {
                settings!.delete = value;
                setSettings(settings!);
              }}
            />
          </View>
          {settings!.merge && (
            <>
              <Text style={{ fontWeight: 800, fontSize: 18, marginBottom: 5, marginTop: 30 }}>
                Metadata
              </Text>

              <Text style={{ fontSize: 16, marginTop: 10, color: theme.colors.textMuted }}>
                Output Filename
              </Text>
              <StyledTextInput
                value={task.title ?? ''}
                onChange={(value) => setTask((s) => ({ ...s, title: value }))}
              />

              <Text style={{ fontSize: 16, marginTop: 10, color: theme.colors.textMuted }}>
                Author
              </Text>
              <StyledTextInput
                value={task.author ?? ''}
                onChange={(value) => setTask((s) => ({ ...s, author: value }))}
              />

              <Text style={{ fontSize: 16, marginTop: 10, color: theme.colors.textMuted }}>
                Staring Volume Number
              </Text>
              <StyledTextInput
                value={task.firstVolumeNum ?? 0}
                onChange={(value) => setTask((s) => ({ ...s, firstVolumeNum: Number(value) }))}
              />
            </>
          )}

          <Text style={{ fontWeight: 800, fontSize: 18, marginBottom: 15, marginTop: 30 }}>
            Output Destination
          </Text>
          <OutputDestination
            value={settings!.outputDestionation}
            onChange={(value) => {
              settings!.outputDestionation = value;
              setSettings(settings!);
            }}
          />

          <Pressable
            onPress={() => startConversion(task)} // TODO: update folder data, save to local if watched, start conversion
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              paddingHorizontal: 20,
              marginTop: 50,
              marginBottom: 50,
              justifyContent: 'center',
              gap: 15,
            }}
          >
            <Text
              style={{
                color: theme.colors.white,
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Start Conversion
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

function OutputDestination(props: { value: string; onChange(value: 'drive' | 'local'): void }) {
  const types: { type: 'drive' | 'local'; title: string; icon: ReactNode }[] = [
    {
      title: 'Google Drive',
      type: 'drive',
      icon: <GoogleCloudUploadIcon size="40px" color={theme.colors.iconDisabled} />,
    },
    {
      title: 'Local Storage',
      type: 'local',
      icon: <FolderZipIcon size="40px" color={theme.colors.iconDisabled} />,
    },
  ];

  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      {types.map((type) => (
        <Pressable
          onPress={() => props.onChange(type.type)}
          key={type.type}
          style={{
            flex: 1,
            borderColor: type.type === props.value ? theme.colors.primary : theme.colors.border,
            backgroundColor:
              type.type === props.value ? theme.colors.primary + '10' : theme.colors.white,
            borderWidth: 2,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 15,
          }}
        >
          {type.icon}
          <Text style={{ fontSize: 16, fontWeight: 700 }}>{type.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function StyledTextInput<T>(props: { value: T; onChange(value: string): void }) {
  return (
    <View
      style={{
        borderColor: theme.colors.border,
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 2,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10,
        marginTop: 5,
      }}
    >
      <TextInput
        value={`${props.value}`}
        style={{
          color: '#000',
        }}
        cursorColor={theme.colors.primary}
        onChangeText={props.onChange}
        keyboardType={typeof props.value === 'number' ? 'number-pad' : 'default'}
      />
    </View>
  );
}

interface ProcessingOptionProps {
  enabled: boolean;
  title: string;
  description: string;
  borderRadius: 'top' | 'bottom' | undefined;
  toggleValue(value: boolean): void;
}

function ProcessingOption({
  title,
  description,
  enabled,
  borderRadius,
  toggleValue,
}: ProcessingOptionProps) {
  return (
    <Pressable
      onPress={() => toggleValue(!enabled)}
      style={[
        {
          backgroundColor: theme.colors.white,
          padding: 12,
          borderColor: theme.colors.border,
          borderWidth: 1,
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
        },
        borderRadius == 'top' && {
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        },
        borderRadius == 'bottom' && {
          borderBottomRightRadius: 12,
          borderBottomLeftRadius: 12,
        },
      ]}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text style={{ fontWeight: 800, fontSize: 16 }}>{title}</Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 14 }}>{description}</Text>
      </View>
      <Switch
        onValueChange={toggleValue}
        value={enabled}
        thumbColor={theme.colors.white}
        trackColor={{
          false: theme.colors.cardMuted,
          true: theme.colors.primary,
        }}
      />
    </Pressable>
  );
}
