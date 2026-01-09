# Compatibility Fix - React Native Gap Property

## Problem
When running the app on Android with Expo Go, the following error appeared:
```
java.lang.String cannot be cast to java.lang.Boolean
```

## Root Cause
The `gap` property in flexbox layouts is not supported in all versions of React Native. While it's a valid CSS property and works in React Native Web, it causes runtime errors on Android (and potentially iOS on older versions).

## Files Affected
- `src/components/Button.tsx`
- `src/components/FolderCard.tsx`
- `src/screens/PendingFilesScreen.tsx`
- `src/screens/ConversionSettingsScreen.tsx`
- `src/screens/ConversionProgressScreen.tsx`

## Solution
Replaced all `gap` properties with margin-based spacing:

### Before:
```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.md, // ❌ Not compatible
  },
});
```

### After:
```typescript
// Option 1: Add marginLeft/marginRight to child elements
<View style={styles.container}>
  <Component1 />
  <Component2 style={{ marginLeft: theme.spacing.md }} />
</View>

// Option 2: Wrap in View with margin
<View style={styles.container}>
  <View style={{ marginRight: theme.spacing.md }}>
    <Component1 />
  </View>
  <Component2 />
</View>
```

## Changes Made

### Button.tsx
- Removed `gap: theme.spacing.sm` from button styles
- Wrapped icon in View with `marginRight: theme.spacing.sm`

### FolderCard.tsx
- Removed `gap: theme.spacing.xl` from footer
- Added `marginLeft: theme.spacing.xl` to second stat View
- Removed `gap: theme.spacing.xs` from syncInfo
- Added `marginLeft: theme.spacing.xs` to text and icon elements

### PendingFilesScreen.tsx
- Removed `gap: theme.spacing.xs` from sourceType
- Added `marginLeft: theme.spacing.xs` to breadcrumb elements
- Removed `gap: theme.spacing.md` from footer
- Wrapped buttons in Views with flex and margin

### ConversionSettingsScreen.tsx
- Removed `gap: theme.spacing.sm` from volumeContainer
- Wrapped Input in View with flex and marginRight
- Removed `gap: theme.spacing.md` from destinationContainer
- Wrapped TouchableOpacity cards in Views with flex and margin

### ConversionProgressScreen.tsx
- Removed `gap: theme.spacing.xs` from folderInfo
- Added `marginLeft: theme.spacing.xs` to text elements

## Testing
✅ TypeScript compilation successful (`npx tsc --noEmit`)
✅ No runtime errors on Android
✅ Layout remains visually identical

## Best Practices Going Forward

**DO NOT USE:**
- `gap` property in StyleSheet

**USE INSTEAD:**
- `marginLeft`, `marginRight`, `marginTop`, `marginBottom`
- Wrap elements in container Views when needed
- Use padding on parent containers when appropriate

## Related Issues
- React Native doesn't support all CSS properties
- `gap` support was added in newer versions but is not universally available
- Always test on physical devices, not just web browser

## Commit
```
commit 4ccde6a
Fix: Remove gap property for React Native compatibility

- Replaced gap with margin-based spacing in all components
- Ensured Android compatibility with Expo Go
- Maintained visual consistency
```
