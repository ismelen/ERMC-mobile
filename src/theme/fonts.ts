export const fonts = {
  // Font families
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
  
  // Font sizes
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
  },
  
  // Font weights
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Typography presets
export const typography = {
  h1: {
    fontSize: fonts.sizes.xxxl,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.xxxl * fonts.lineHeights.tight,
  },
  h2: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    lineHeight: fonts.sizes.xxl * fonts.lineHeights.tight,
  },
  h3: {
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.semiBold,
    lineHeight: fonts.sizes.xl * fonts.lineHeights.normal,
  },
  body: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.sizes.base * fonts.lineHeights.normal,
  },
  bodyLarge: {
    fontSize: fonts.sizes.md,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.sizes.md * fonts.lineHeights.normal,
  },
  bodySmall: {
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.sizes.sm * fonts.lineHeights.normal,
  },
  caption: {
    fontSize: fonts.sizes.xs,
    fontWeight: fonts.weights.regular,
    lineHeight: fonts.sizes.xs * fonts.lineHeights.normal,
  },
  button: {
    fontSize: fonts.sizes.base,
    fontWeight: fonts.weights.semiBold,
    lineHeight: fonts.sizes.base * fonts.lineHeights.tight,
  },
} as const;
