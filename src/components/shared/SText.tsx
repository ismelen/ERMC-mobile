import React, { ReactNode } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function SText({ style, children }: Props) {
  return (
    <Text
      style={[
        {
          color: colors.white,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
