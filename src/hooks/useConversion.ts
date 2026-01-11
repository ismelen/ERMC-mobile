import { pick, pickDirectory } from '@react-native-documents/picker';
import { create } from 'zustand';
import { FilesystemService } from '../services/filesystem-service';
import { StorageService } from '../services/storage-service';
import { ConversionSettings, ConversionTask, File, Folder } from '../types';

const WATCHED_FOLDERS_KEY = 'watchedFolders';
const USER_TOKEN_KEY = 'token';
const SETTINGS_KEY = 'settings';

interface State {
  watchedAmount: number;
  folders: Folder[];
  files: File[];
  settings?: ConversionSettings;
  convertingQueue: ConversionTask[];
  queue: ConversionTask[];
  loaded: boolean;

  syncWatchedFolder(idx: number): Promise<void>;
  addFolder(): Promise<void>;
  removeFolder(idx: number, watched: boolean): void;
  toggleWatchFolder(idx: number, isBeingWatched: boolean): void;

  addFiles(): Promise<void>;
  removeFile(idx: number): void;
  toggleFileSelect(idx: number, value: boolean): void;
  selectAllFiles(): void;

  init(): Promise<void>;

  setSettings(settings: ConversionSettings): void;
}

export const useConversion = create<State>((set, get) => ({
  loaded: false,
  queue: [],
  convertingQueue: [],
  files: [],
  folders: [],
  watchedAmount: 0,

  async init() {
    if (this.loaded) return;

    let [watchedFolders, userToken, settings] = await Promise.all([
      StorageService.GetAsync<Folder[]>(WATCHED_FOLDERS_KEY),
      StorageService.GetSecureAsync(USER_TOKEN_KEY),
      StorageService.GetAsync<ConversionSettings>(SETTINGS_KEY),
    ]);

    if (!settings) {
      settings = {
        mergeInVolumes: false,
        deleteSrcAfterUpload: false,
        outputDestionation: 'local',
      } as ConversionSettings;
      StorageService.SetAsync(SETTINGS_KEY, {
        ...settings,
        googleCloudUserToken: userToken,
      });
    }
    settings.googleCloudUserToken = userToken;

    (watchedFolders ?? []).forEach((e) => (e.synchronized = false));

    set({
      folders: watchedFolders ?? [],
      settings,
      loaded: true,
      watchedAmount: watchedFolders?.length ?? 0,
    });

    watchedFolders?.forEach((_, idx) => {
      get().syncWatchedFolder(idx);
    });
  },

  async syncWatchedFolder(idx: number) {
    const folders = get().folders;
    folders[idx] = await FilesystemService.readDirectory(folders[idx]);

    set({
      folders: [...folders],
    });
  },

  async addFolder() {
    try {
      const result = await pickDirectory({ requestLongTermAccess: false });
      const newFolder = await FilesystemService.getDirectoryData(result.uri);

      const folders = get().folders;
      set({ folders: [...folders, newFolder] });
    } catch {}
  },

  removeFolder(idx: number, watched: boolean) {
    if (!watched) {
      idx += get().watchedAmount;
    }

    const folders = [...get().folders.filter((_, i) => i != idx)];
    set({ folders: folders });
    if (watched) {
      set((s) => ({ watchedAmount: s.watchedAmount - 1 }));
      StorageService.SetAsync(
        WATCHED_FOLDERS_KEY,
        folders.filter((e) => e.watching)
      );
    }
  },

  async addFiles() {
    try {
      const results = await pick({
        mode: 'open',
        allowMultiSelection: true,
        requestLongTermAccess: false,
      });

      const newFiles: File[] = [];
      for (var file of results) {
        newFiles.push({
          name: file.name ?? '',
          size: FilesystemService.formatBytes(file.size ?? 0),
          selected: true,
        });
      }
      newFiles.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
      );
      set((s) => ({ files: [...s.files, ...newFiles] }));
    } catch {}
  },

  removeFile(idx: number) {
    const files = get().files;
    set({ files: [...files.filter((_, i) => i !== idx)] });
  },

  toggleFileSelect(idx: number, value: boolean) {
    const files = get().files;
    files[idx].selected = value;

    set({ files: [...files] });
  },

  selectAllFiles() {
    const files = get().files;
    files.forEach((e) => (e.selected = true));
    set({ files: [...files] });
  },

  setSettings(settings: ConversionSettings) {
    set({ settings: { ...settings } });
    StorageService.SetAsync(SETTINGS_KEY, settings);
  },

  toggleWatchFolder(idx: number, isBeingWatched: boolean) {
    let folders = get().folders;
    const foldersCleaned = folders.filter((_, i) => i != idx);
    let watchedAmount = get().watchedAmount;

    if (isBeingWatched) {
      const folder = folders[idx];
      folder.watching = !isBeingWatched;

      folders = [...foldersCleaned, folder];
      watchedAmount--;
    } else {
      idx += get().watchedAmount;
      const folder = folders[idx];
      folder.watching = !isBeingWatched;

      folders = [folder, ...foldersCleaned];
      watchedAmount++;
    }

    set({
      folders: folders,
      watchedAmount: watchedAmount,
    });
    
    StorageService.SetAsync(
      WATCHED_FOLDERS_KEY,
      folders.filter((e) => e.watching)
    );
  },
}));
