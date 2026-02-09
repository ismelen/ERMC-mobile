import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ChevronRightIcon from '../../src/components/icons/chevron-right-icon';
import SColumn from '../../src/components/shared/SColumn';
import SText from '../../src/components/shared/SText';
import { Cloud } from '../../src/models/cloud';
import { colors } from '../../src/theme/colors';

export default function settings() {
  const [cloud, setCloud] = useState<Cloud | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Cloud.instance().then((value) => {
      setCloud(value);
      setLoading(false);
    });
  }, []);

  const refresh = () => {
    setLoading(true);
    setLoading(false);
  };

  if (loading) return <View></View>;

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
      <SText style={styles.sectionTitle}>CLOUD</SText>
      <SColumn>
        <CloudConfigField
          label="Account"
          value={cloud?.email}
          onPress={async () => {
            await cloud?.setAccount();
            refresh();
          }}
        />
        <CloudConfigField
          label="Folder"
          value={cloud?.folderName}
          onPress={async () => {
            await cloud?.setFolder();
            refresh();
          }}
        />
      </SColumn>

      <SText style={styles.sectionTitle}>OPTIONS</SText>
    </View>
  );
}

interface CloudConfigFieldProps {
  label: string;
  onPress?(): void;
  value?: string;
}

function CloudConfigField({ label, value, onPress }: CloudConfigFieldProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <SText style={{ flex: 1, fontSize: 16, fontWeight: 500 }}>{label}</SText>
      <SText style={{ color: colors.onCard }}>{value}</SText>
      <ChevronRightIcon size="24px" color={colors.onCard} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { color: colors.onCard, marginBottom: 10, marginTop: 20 },
});
