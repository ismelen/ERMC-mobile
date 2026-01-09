export const colors = {
  // Primary colors
  primary: '#3ABAED',
  primaryDark: '#2A9FD6',
  primaryLight: '#5AC8F2',
  
  // Background colors
  background: '#F5F7FA',
  cardBackground: '#FFFFFF',
  
  // Text colors
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  
  // Border colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // File/Folder colors
  folderBlue: '#60A5FA',
  fileGray: '#D1D5DB',
  
  // Progress colors
  progressGreen: '#34D399',
  progressOrange: '#FB923C',
  
  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  
  // Icon colors
  iconGray: '#9CA3AF',
  iconDark: '#4B5563',
  
  // Disabled states
  disabled: '#D1D5DB',
  disabledText: '#9CA3AF',
} as const;

export type ColorKey = keyof typeof colors;
