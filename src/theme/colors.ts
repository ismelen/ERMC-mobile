export const colors = {
  primary: '#2bbeee',
  background: '#f6f8f8',
  white: '#ffffff',
  iconDisabled: '#4c869a',
  border: '#f1f5f9',
  textMuted: '#787280',
  cardMuted: '#f8fbfb',
  textGray: '#aaa8ae',
} as const;

export type ColorKey = keyof typeof colors;
