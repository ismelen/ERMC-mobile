import { pickDirectory } from '@react-native-documents/picker';
import { create } from 'zustand';
import { MonitoredFolder } from '../models/monitored-folder';
import { UploadSettings } from '../models/upload';
import { FilesystemService } from '../services/filesystem-service';
import { StorageService } from '../services/storage-service';

interface State {
  folders: MonitoredFolder[];
  fetchMonitoredFolders(): Promise<void>;
  addFolder(): Promise<void>;
  deleteFolder(idx: number): Promise<void>;
  updateFolderSettings(settings: UploadSettings, idx: number): Promise<void>;
}

const FOLDERS = 'folders_key';

export const useMonitoredFolders = create<State>((set, get) => ({
  folders: [],

  async fetchMonitoredFolders() {
    const monitoredFolders = await StorageService.GetAsync<MonitoredFolder[]>(FOLDERS);
    if (!monitoredFolders) return;

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
}));
