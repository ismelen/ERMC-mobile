import * as FS from 'expo-file-system/legacy';
import { Source } from '../models/source';

export class FilesystemService {
  static async getMonitorizedFolder(dir: string): Promise<[Source, string[]]> {
    const files = await FS.StorageAccessFramework.readDirectoryAsync(dir);

    const source: Source = {
      name: decodeURIComponent(dir).split('/').pop() ?? 'ERROR',
      path: dir,
    };

    return [source, files];
  }
  // static async readDirectory(folder: Source): Promise<Source> {
  //   const files = await FS.StorageAccessFramework.readDirectoryAsync(folder.path);

  //   folder.lastSync = new Date();
  //   folder.status = 'Pending';
  //   folder.synchronized = true;
  //   folder.pendingFilesAmount = files.length - folder.lastFilesAmount;

  //   return folder;
  // }

  // static async getDirectoryData(dir: string): Promise<Source> {
  //   const files = await FS.StorageAccessFramework.readDirectoryAsync(dir);

  //   const result: Source = {
  //     name: decodeURIComponent(dir).split('/').pop() ?? 'Error',
  //     path: dir,
  //     status: 'Pending',
  //     synchronized: true,
  //     watching: false,
  //     lastSync: new Date(),
  //     pendingFilesAmount: files?.length ?? 0,
  //     lastFilesAmount: 0,
  //   };

  //   return result;
  // }

  // static formatBytes(bytes: number): string {
  //   if (bytes === 0) return '0 Bytes';

  //   const k = 1024; // O usa 1000 si prefieres el sistema decimal
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  //   // Calculamos a qué índice de "sizes" corresponde
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));

  //   // Convertimos el valor y concatenamos la unidad
  //   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  // }
}
