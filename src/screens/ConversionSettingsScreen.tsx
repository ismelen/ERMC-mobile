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
import { Button, Input, Switch } from '../components';
import { theme } from '../theme';
import { ConversionSettings } from '../types';

type RootStackParamList = {
  ConverterDashboard: undefined;
  PendingFiles: undefined;
  ConversionSettings: undefined;
  ConversionProgress: undefined;
};

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'ConversionSettings'>;
};

export const ConversionSettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [settings, setSettings] = useState<ConversionSettings>({
    outputFilename: 'The Great Adventure',
    author: 'J. R. Artist',
    startingVolumeNumber: 1,
    mergeIntoSingleFile: true,
    deleteLocalSourceAfterUpload: false,
    outputDestination: 'googleDrive',
  });

  const handleBack = () => {
    navigation.goBack();
  };

  const handleStartConversion = () => {
    navigation.navigate('ConversionProgress');
  };

  const handleDestinationSelect = (destination: 'googleDrive' | 'localStorage') => {
    setSettings({ ...settings, outputDestination: destination });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.iconDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Conversion Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Metadata</Text>
          
          <Input
            label="Output Filename"
            value={settings.outputFilename}
            onChangeText={(text) => setSettings({ ...settings, outputFilename: text })}
            placeholder="Enter output filename"
          />

          <Input
            label="Author"
            value={settings.author}
            onChangeText={(text) => setSettings({ ...settings, author: text })}
            placeholder="Enter author name"
          />

          <View style={styles.volumeContainer}>
            <Input
              label="Starting Volume Number"
              value={settings.startingVolumeNumber.toString()}
              onChangeText={(text) =>
                setSettings({ ...settings, startingVolumeNumber: parseInt(text) || 1 })
              }
              keyboardType="numeric"
              placeholder="1"
              containerStyle={styles.volumeInput}
            />
            <TouchableOpacity style={styles.hashButton}>
              <Ionicons name="grid-outline" size={20} color={theme.colors.iconGray} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Processing Options</Text>
          
          <Switch
            label="Merge into single file"
            description="Makes into one single file rather than a folder"
            value={settings.mergeIntoSingleFile}
            onValueChange={(value) =>
              setSettings({ ...settings, mergeIntoSingleFile: value })
            }
          />

          <Switch
            label="Delete local source after upload"
            description="Save device space after cloud sync"
            value={settings.deleteLocalSourceAfterUpload}
            onValueChange={(value) =>
              setSettings({ ...settings, deleteLocalSourceAfterUpload: value })
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Output Destination</Text>
          
          <View style={styles.destinationContainer}>
            <TouchableOpacity
              style={[
                styles.destinationCard,
                settings.outputDestination === 'googleDrive' && styles.destinationCardActive,
              ]}
              onPress={() => handleDestinationSelect('googleDrive')}
              activeOpacity={0.7}
            >
              <View style={styles.destinationIconContainer}>
                <Ionicons name="cloud-outline" size={32} color={theme.colors.primary} />
              </View>
              <Text style={styles.destinationText}>Google Drive</Text>
              {settings.outputDestination === 'googleDrive' && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.destinationCard,
                settings.outputDestination === 'localStorage' && styles.destinationCardActive,
              ]}
              onPress={() => handleDestinationSelect('localStorage')}
              activeOpacity={0.7}
            >
              <View style={styles.destinationIconContainer}>
                <Ionicons name="phone-portrait-outline" size={32} color={theme.colors.primary} />
              </View>
              <Text style={styles.destinationText}>Local Storage</Text>
              {settings.outputDestination === 'localStorage' && (
                <View style={styles.checkmark}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Start Conversion"
          onPress={handleStartConversion}
          icon={<Ionicons name="play" size={20} color={theme.colors.white} />}
        />
        <Text style={styles.footerNote}>10 FILES PENDING PROCESSING</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.base,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.body,
    fontWeight: theme.fonts.weights.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
  },
  volumeInput: {
    flex: 1,
  },
  hashButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  destinationContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  destinationCard: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  destinationCardActive: {
    borderColor: theme.colors.primary,
  },
  destinationIconContainer: {
    marginBottom: theme.spacing.sm,
  },
  destinationText: {
    ...theme.typography.bodySmall,
    fontWeight: theme.fonts.weights.semiBold,
    color: theme.colors.textPrimary,
  },
  checkmark: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
  },
  footer: {
    paddingHorizontal: theme.spacing.base,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  footerNote: {
    ...theme.typography.caption,
    color: theme.colors.textTertiary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    letterSpacing: 0.5,
  },
});
