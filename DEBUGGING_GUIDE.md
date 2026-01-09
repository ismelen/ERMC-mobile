# Debugging Guide - React Native Errors

## How to Find the Exact Error

When you see an error in Expo Go on Android, you need to:

1. **Shake your device** or press `Ctrl+M` in the emulator to open the Developer Menu
2. Select **"Show Element Inspector"** or **"Toggle Element Inspector"**
3. Look at the **Red Error Screen** - it should show:
   - Error message
   - Stack trace
   - Component where the error occurred

## Common React Native Android Errors

### 1. "java.lang.String cannot be cast to java.lang.Boolean"
**Cause:** Using unsupported CSS properties or wrong value types
**Common culprits:**
- `gap` property (not supported)
- `letterSpacing` as string instead of number
- Inline style objects with wrong types

### 2. "Invariant Violation" or "Element type is invalid"
**Cause:** Import/export issues
**Fix:** Check all component imports

### 3. "Unable to resolve module"
**Cause:** Missing dependencies or wrong paths
**Fix:** Run `npm install` and check import paths

## Steps to Debug

1. **Check Metro Bundler** (terminal output)
   - Look for bundle errors
   - Check for warnings about deprecated components

2. **Check Device Logs**
   - In Expo Go, shake device → "Show Dev Menu" → "Debug Remote JS"
   - Open Chrome DevTools Console

3. **Simplify** 
   - Comment out components one by one to isolate the issue
   - Start with the screen that's failing

4. **Check Style Objects**
   - Inline styles should use StyleSheet.create()
   - Avoid object literals in style prop when possible

## Current Known Issues

✅ **FIXED:** `gap` property removed
⚠️ **PENDING:** Inline style objects - need to move to StyleSheet

## What Information to Provide

When reporting an error, please include:
1. **Exact error message** from the red screen
2. **Stack trace** (which component failed)
3. **What screen** you're trying to view
4. **Device/Emulator** information

## Quick Fix Checklist

- [ ] Restart Metro bundler (`npm start`)
- [ ] Clear Metro cache (`npm start -- --reset-cache`)
- [ ] Reinstall node_modules (`rm -rf node_modules && npm install`)
- [ ] Check for syntax errors (`npx tsc --noEmit`)
- [ ] Update Expo (`npx expo install`)
