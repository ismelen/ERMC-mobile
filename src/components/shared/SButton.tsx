import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export default function SButton({ children, style }: Props) {
  return <View style={[styles.button, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
});
