import { create } from 'zustand';
import { FilesystemService } from '../services/filesystem-service';
import { StorageService } from '../services/storage-service';
import { ConversionSettings, ConversionTask, Folder } from '../types';

const WATCHED_FOLDERS_KEY = 'watchedFolders';
const USER_TOKEN_KEY = 'token';
const SETTINGS_KEY = 'settings';

interface State {
  watchedFolders: Folder[];
  folders: Folder[];
  files: File[];
  settings?: ConversionSettings;
  convertingQueue: ConversionTask[];
  queue: ConversionTask[];
  loaded: boolean;

  syncWatchedFolder(idx: number): Promise<void>;

  addFolder(): Promise<void>;
  removeFolder(idx: number, watched: boolean): void;

  addFiles(): Promise<void>;
  removeFile(idx: number): void;

  convertFolder(folder: Folder): Promise<void>;
  convertFiles(): Promise<void>;

  toggleFileSelect(idx: number): void;

  init(): Promise<void>;
}

export const useConversion = create<State>((set, get) => ({
  loaded: false,
  queue: [],
  convertingQueue: [],
  files: [],
  folders: [],
  watchedFolders: [],

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

    watchedFolders?.forEach((e) => (e.synchronized = false));

    set({
      watchedFolders,
      settings,
      loaded: true,
    });

    watchedFolders?.forEach((_, idx) => {
      get().syncWatchedFolder(idx);
    });
  },

  async syncWatchedFolder(idx: number) {
    const folders = get().watchedFolders;
    folders[idx] = await FilesystemService.readDirectory(folders[idx]);

    set({
      watchedFolders: folders,
    });
  },

  async addFolder() {},

  removeFolder(idx: number, watched: boolean) {},

  async addFiles() {},

  removeFile(idx: number) {},

  async convertFolder(folder: Folder) {},

  async convertFiles() {},

  toggleFileSelect(idx: number) {},
}));
