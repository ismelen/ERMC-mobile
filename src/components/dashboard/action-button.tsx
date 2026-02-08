import React, { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { colors } from '../../theme/colors';
import ChevronRightIcon from '../icons/chevron-right-icon';
import SText from '../shared/SText';

interface Props {
  onPress(): void;
  text: string;
  icon: (size: string, color: string) => ReactNode;
}

export default function ActionButton({ onPress, text, icon }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{ backgroundColor: colors.card, borderRadius: 14, padding: 14 }}
    >
      {icon('30px', colors.onCard)}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <SText
          style={{
            fontSize: 18,
            marginTop: 10,
          }}
        >
          {text}
        </SText>
        <ChevronRightIcon size="30px" color={colors.primary} />
      </View>
    </Pressable>
  );
}
