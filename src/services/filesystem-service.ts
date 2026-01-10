import { Directory } from 'expo-file-system';
import { Folder } from '../types';

export class FilesystemService {
  static async readDirectory(folder: Folder): Promise<Folder> {
    const dir = new Directory(folder.path);

    folder.size = this.formatBytes(dir.size ?? 0);
    folder.lastSync = new Date();
    folder.status = 'Pending';
    folder.synchronized = true;
    folder.pendingFilesAmount = dir.list().length - folder.lastFilesAmount;

    return folder;
  }

  static async getDirectoryData(uri: string): Promise<Folder> {
    const dir = new Directory(uri);
    const info = dir.info();

    const result: Folder = {
      name: dir.name,
      path: uri,
      size: this.formatBytes(dir.size ?? 0),
      status: 'Pending',
      synchronized: true,
      watching: false,
      lastSync: new Date(),
      pendingFilesAmount: info.files?.length ?? 0,
      lastFilesAmount: 0,
    };

    return result;
  }

  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024; // O usa 1000 si prefieres el sistema decimal
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    // Calculamos a qué índice de "sizes" corresponde
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Convertimos el valor y concatenamos la unidad
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
}
