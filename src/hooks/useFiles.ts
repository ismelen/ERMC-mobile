import { pick } from '@react-native-documents/picker';
import { create } from 'zustand';
import { FilesystemService } from '../services/filesystem-service';
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
