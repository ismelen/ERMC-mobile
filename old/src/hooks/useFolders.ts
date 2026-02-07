import { pickDirectory } from '@react-native-documents/picker';
import { create } from 'zustand';
import { FilesystemService } from '../services/filesystem-service';
import { StorageService } from '../services/storage-service';
import { Folder } from '../types';

interface State {
  isLoading: boolean;
  folders: Folder[];
  watchedAmount: number;

  init(): Promise<void>;

  syncWatchedFolder(idx: number): Promise<void>;
  addFolder(): Promise<void>;
  deleteFolder(idx: number, wathing: boolean): Promise<void>;
  toggleFolderWatching(idx: number, watching: boolean): Promise<void>;
}

const WATCHED_FOLDERS_KEY = 'watchedFolders';

export const useFolders = create<State>((set, get) => ({
  isLoading: false,
  folders: [],
  watchedAmount: 0,

  async init() {
    set({ isLoading: true });
    const watchedFolders = await StorageService.GetAsync<Folder[]>(WATCHED_FOLDERS_KEY);

    if (!watchedFolders) {
      return;
    }

    watchedFolders.forEach((e) => (e.synchronized = false));

    set({
      folders: watchedFolders,
      watchedAmount: watchedFolders?.length ?? 0,
      isLoading: false,
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
    set({ isLoading: true });
    try {
      // const dir = await openDocumentTree(true);
      const dir = await pickDirectory({
        requestLongTermAccess: true,
      });

      // await FS.StorageAccessFramework.createFileAsync(dir.uri, 'dummy', 'text/plain').catch(
      //   () => {}
      // );

      const newFolder = await FilesystemService.getDirectoryData(dir.uri);

      const folders = get().folders;
      set({ folders: [...folders, newFolder] });
    } catch (e: any) {
      console.warn(e as Error);
      alert('Shomething gone wrong!!');
    } finally {
      set({ isLoading: false });
    }
  },

  async toggleFolderWatching(idx: number, watching: boolean) {
    let folders = get().folders;
    const foldersCleaned = folders.filter((_, i) => i != idx);
    let watchedAmount = get().watchedAmount;

    if (watching) {
      const folder = folders[idx];
      folder.watching = !watching;

      folders = [...foldersCleaned, folder];
      watchedAmount--;
    } else {
      idx += get().watchedAmount;
      const folder = folders[idx];
      folder.watching = !watching;

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

  async deleteFolder(idx: number, watching: boolean) {
    if (!watching) {
      idx += get().watchedAmount;
    }

    const folders = [...get().folders.filter((_, i) => i != idx)];
    set({ folders: folders });

    if (watching) {
      set((s) => ({ watchedAmount: s.watchedAmount - 1 }));
      StorageService.SetAsync(
        WATCHED_FOLDERS_KEY,
        folders.filter((e) => e.watching)
      );
    }
  },
}));
