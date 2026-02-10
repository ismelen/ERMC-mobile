import { pickDirectory } from '@react-native-documents/picker';
import { create } from 'zustand';
import { MonitoredFolder } from '../models/monitored-folder';
import { UploadSettings } from '../models/upload';
import { FilesystemService } from '../services/filesystem-service';
import { MangaConvertService } from '../services/manga-convert-service';
import { StorageService } from '../services/storage-service';

interface State {
  folders: MonitoredFolder[];
  loading: boolean;
  fetchMonitoredFolders(): Promise<void>;
  addFolder(): Promise<void>;
  deleteFolder(idx: number): Promise<void>;
  updateFolderSettings(settings: UploadSettings, idx: number): Promise<void>;
  updateFolder(folder: MonitoredFolder, idx: number): Promise<void>;
  autoUpload(): Promise<void>;
}

const FOLDERS = 'folders_key';

export const useMonitoredFolders = create<State>((set, get) => ({
  folders: [],
  loading: false,

  async fetchMonitoredFolders() {
    const monitoredFolders = await StorageService.GetAsync<MonitoredFolder[]>(FOLDERS);
    if (!monitoredFolders) return;

    for (let folder of monitoredFolders) {
      const source = await FilesystemService.getMonitorizedFolder(folder.source.path);
      if (!folder.uploaded || (folder.source.children?.length ?? 0) === 0) {
        folder.source = source;
        folder.uploaded = false;
        continue;
      }

      const oldPaths = new Set(folder.source.children);

      folder.source.children = source.children?.filter((path) => !oldPaths.has(path));
    }

    StorageService.SetAsync(FOLDERS, monitoredFolders);

    set({ folders: monitoredFolders });
  },

  async addFolder() {
    const dir = await pickDirectory({
      requestLongTermAccess: true,
    });
    const folder = await FilesystemService.getMonitorizedFolder(dir.uri);
    const settings = UploadSettings.default(folder.name, '');
    const newFolders = [
      ...get().folders,
      {
        source: folder,
        settings: settings,
        uploaded: false,
      },
    ];
    set({ folders: newFolders });
    StorageService.SetAsync(FOLDERS, newFolders);
  },

  async deleteFolder(idx: number) {
    let folders = get().folders;
    folders = folders.filter((_, i) => i !== idx);

    set({ folders: [...folders] });
    StorageService.SetAsync(FOLDERS, folders);
  },

  async updateFolderSettings(settings: UploadSettings, idx: number) {
    const folders = get().folders;
    folders[idx].settings = settings;

    set({ folders: [...folders] });
    StorageService.SetAsync(FOLDERS, folders);
  },

  async updateFolder(folder: MonitoredFolder, idx: number) {
    const folders = get().folders;
    folders[idx] = folder;

    set({ folders: [...folders] });
    StorageService.SetAsync(FOLDERS, folders);
  },

  async autoUpload() {
    const folders = get().folders;
    set({ loading: true });

    for (let folder of folders) {
      if (!folder.settings.autoUpload) continue;
      const request = await MangaConvertService.convert(folder.source.children!, folder.settings);
      if (!request) continue;

      folder.settings.initialVolume! += request?.times.length;
      if (folder.settings.deleteFilesAfterUpload) {
        folder.source.children = [];
      }
      folder.uploaded = true;
    }

    await StorageService.SetAsync(FOLDERS, folders);

    set({ loading: false, folders: [...folders] });
  },
}));



