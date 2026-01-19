import { getDocumentAsync } from 'expo-document-picker';
import { create } from 'zustand';
import { File } from '../types';

interface State {
  isLoading: boolean;
  files: File[];

  addFiles(): Promise<void>;
  toggleSelectFile(idx: number, value: boolean): Promise<void>;
  selectAllFiles(): Promise<void>;
  deleteFile(idx: number): Promise<void>;
}

export const useFiles = create<State>((set, get) => ({
  isLoading: false,
  files: [],

  async addFiles() {
    set({ isLoading: true });
    try {
      const result = await getDocumentAsync({
        copyToCacheDirectory: false,
        multiple: true,
      });

      if (result.canceled) return;

      const newFiles: File[] = [];
      for (var file of result.assets) {
        newFiles.push({
          name: file.name ?? '',
          selected: true,
          path: file.uri,
          type: file.mimeType ?? 'application/octet-stream',
        });
      }
      newFiles.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
      );
      set((s) => ({ files: [...s.files, ...newFiles] }));
    } catch {
      alert('Something gone wrong!!');
    } finally {
      set({ isLoading: false });
    }
  },

  async deleteFile(idx: number) {
    const files = get().files;
    set({ files: [...files.filter((_, i) => i !== idx)] });
  },

  async toggleSelectFile(idx: number, value: boolean) {
    const files = get().files;
    files[idx].selected = value;

    set({ files: [...files] });
  },

  async selectAllFiles() {
    const files = get().files;
    files.forEach((e) => (e.selected = true));
    set({ files: [...files] });
  },
}));
