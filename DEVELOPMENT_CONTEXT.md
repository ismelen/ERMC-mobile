# Development Context - Converter Dashboard

## Current State

### Completed ✅
- ✅ Expo project initialized with TypeScript
- ✅ All dependencies installed
- ✅ Theme system created (colors, fonts, spacing)
- ✅ Type definitions for all data models
- ✅ 9 reusable components built and tested
- ✅ 4 main screens implemented with navigation
- ✅ React Navigation configured with Stack Navigator
- ✅ Git repository initialized with initial commit

### Pending Implementation 🚧

#### High Priority
1. **Backend Integration**
   - File upload API endpoints
   - Conversion processing API
   - Progress tracking via WebSocket or polling
   - Authentication system

2. **State Management**
   - Global state for user data
   - Conversion queue management
   - Settings persistence (AsyncStorage)

3. **Real Functionality for TODO Handlers**
   - `Dashboard > Add Folder` - Native file picker integration
   - `Dashboard > Settings` - Navigate to settings screen
   - `Dashboard > More Options` - Folder action menu (edit, delete, pause)
   - `PendingFiles > Add Files` - Native file picker
   - `Progress > Clear Completed` - Clear completed tasks from list
   - `Progress > Bottom Tabs` - Implement tab navigation

#### Medium Priority
4. **Additional Screens**
   - Settings screen (global app settings)
   - Library screen (view converted files)
   - File preview screen
   - User profile/account screen

5. **Enhanced Features**
   - File preview before conversion
   - Conversion presets (manga, comics, documents)
   - Batch conversion configuration
   - Conversion history and analytics

6. **UI/UX Improvements**
   - Loading states for async operations
   - Error handling and user feedback
   - Empty states (no folders, no files, etc.)
   - Success/error toast notifications
   - Pull-to-refresh on lists
   - Skeleton loaders

#### Low Priority
7. **Advanced Features**
   - Dark mode toggle
   - Multiple language support (i18n)
   - Accessibility improvements
   - Offline mode support
   - Cloud backup integration
   - Batch operations

## Architecture Decisions

### Why Stack Navigator?
- Provides native-style push/pop navigation
- Best for hierarchical screen flow
- Easy to add modal presentations later
- Good performance for small-medium apps

### Why No Bottom Tabs Yet?
- Current flow is linear: Dashboard → Files → Settings → Progress
- Bottom tabs placeholder shown in Progress screen for future expansion
- Can add Tab Navigator when Library and Settings screens are ready

### Component Architecture
- **Presentational Components:** In `src/components/` - pure, reusable, theme-aware
- **Screen Components:** In `src/screens/` - contain business logic and navigation
- **Theme System:** Centralized in `src/theme/` - easy to modify colors, spacing, fonts

### No State Management Library Yet
- Current app state is local to screens
- When backend is connected, consider:
  - **Redux Toolkit** - if complex state with many async operations
  - **Zustand** - if simpler state management needed
  - **React Query** - excellent for server state management

## File Organization Strategy

```
Components naming:
- PascalCase for component files (Button.tsx)
- Barrel exports via index.ts
- One component per file

Screens naming:
- <FeatureName>Screen.tsx pattern
- Screen name matches navigation route name
- Export from screens/index.ts

Theme:
- Separate files for colors, fonts, spacing
- Combined export in theme/index.ts
- Use `as const` for type safety
```

## Mock Data Locations

Currently using mock data in:
1. `ConverterDashboardScreen.tsx` - mockFolders array
2. `PendingFilesScreen.tsx` - mockFiles array
3. `ConversionProgressScreen.tsx` - mockActiveTasks, mockCompletedTasks

**Next Step:** Create a `src/data/mockData.ts` file and centralize all mock data.

## Navigation Flow

```
ConverterDashboard (Home)
  ↓ (Click folder)
PendingFiles
  ↓ (Select files + Continue)
ConversionSettings
  ↓ (Start Conversion)
ConversionProgress
  ↓ (Back navigation or bottom tabs)
[Future: Library, Settings, etc.]
```

## Known Issues / Limitations

1. **No Error Handling:** No error boundaries or try-catch blocks
2. **No Loading States:** Async operations would need loading indicators
3. **No Persistence:** Data is lost on app restart
4. **Mock Data Only:** All data is hardcoded, no API integration
5. **No Validation:** Forms don't validate user input
6. **No Authentication:** No user login or sessions
7. **Bottom Tabs Not Functional:** Placeholder in Progress screen

## Integration Points for Backend

### API Endpoints Needed

```typescript
// Folder Management
GET    /api/folders                    // List watched folders
POST   /api/folders                    // Add new folder
DELETE /api/folders/:id                // Remove folder
PUT    /api/folders/:id                // Update folder settings

// File Management
GET    /api/folders/:id/files          // Get files in folder
POST   /api/files                      // Add individual files
GET    /api/files/:id                  // Get file details

// Conversion
POST   /api/convert                    // Start conversion
GET    /api/convert/:id/status         // Get conversion status
GET    /api/convert/history            // Get conversion history
DELETE /api/convert/:id                // Cancel conversion

// Settings
GET    /api/settings                   // Get user settings
PUT    /api/settings                   // Update settings

// Authentication
POST   /api/auth/login                 // User login
POST   /api/auth/register              // User registration
POST   /api/auth/logout                // Logout
GET    /api/auth/me                    // Current user
```

### WebSocket Events for Real-Time Updates

```typescript
// Client → Server
'conversion:start'        // Start conversion
'conversion:pause'        // Pause conversion
'conversion:cancel'       // Cancel conversion

// Server → Client
'conversion:progress'     // Progress update { taskId, progress }
'conversion:complete'     // Task completed
'conversion:error'        // Error occurred
'folder:filesAdded'       // New files detected in watched folder
```

## Testing Strategy (When Ready)

1. **Unit Tests**
   - Test all components in isolation
   - Test utility functions and hooks
   - Use Jest + React Native Testing Library

2. **Integration Tests**
   - Test navigation flows
   - Test form submissions
   - Test state updates

3. **E2E Tests**
   - Use Detox for full app flows
   - Test critical paths (folder → files → convert → progress)

## Performance Considerations

- **FlatList vs ScrollView:** When lists grow, replace ScrollView with FlatList
- **Memoization:** Use React.memo for complex components
- **Image Optimization:** Use optimized image formats and sizes
- **Code Splitting:** Consider lazy loading screens if app grows

## Accessibility (A11y) Todo

- Add `accessibilityLabel` to all touchable elements
- Add `accessibilityHint` where helpful
- Ensure proper contrast ratios (already good)
- Test with screen readers
- Add form field labels for screen readers

## Next Steps Recommendation

1. **Create centralized mock data file**
2. **Implement Settings screen** (app settings, about, etc.)
3. **Add Library screen** (view converted files)
4. **Implement actual file picker** for Add Folder/Files
5. **Add toast notifications** for user feedback
6. **Create error boundaries**
7. **Add loading states** to all buttons
8. **Backend integration** - Start with folder and file APIs
9. **State management** - Add Zustand or Redux Toolkit
10. **Real-time updates** - WebSocket for conversion progress
