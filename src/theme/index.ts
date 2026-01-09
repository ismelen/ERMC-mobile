import { colors } from './colors';
import { fonts, typography } from './fonts';
import { borderRadius, shadows, spacing } from './spacing';

export const theme = {
  colors,
  fonts,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;

export { borderRadius, colors, fonts, shadows, spacing, typography };

