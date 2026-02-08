import React, { Children, ReactNode } from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';
import SDivider from './SDivider';

interface Props {
  children?: ReactNode;
  footer?: ReactNode;
}

export default function SColumn<T>({ children, footer }: Props) {
  const childrens = Children.toArray(children);

  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 14, overflow: 'hidden' }}>
      {childrens.map((e, i) => (
        <View key={i}>
          {i !== 0 && <SDivider />}
          <Wrapper>{e}</Wrapper>
        </View>
      ))}
      {footer && childrens.length !== 0 && <SDivider />}
      {footer && <Wrapper>{footer}</Wrapper>}
    </View>
  );
}

interface WrapperProps {
  children?: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
    >
      {children}
    </View>
  );
}
