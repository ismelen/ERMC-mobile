import { Directory } from 'expo-file-system';
import { Folder } from '../types';

export class FilesystemService {
  static async readDirectory(folder: Folder): Promise<Folder> {
    const dir = new Directory(folder.path);
    const files = dir.list();

    const size = dir.size;
    if (size !== null) {
      folder.size = size << 20; // Bytes to MB
    }

    folder.lastSync = new Date();
    folder.status = 'Pending';
    folder.pendingFileNames = files
      .map((e) => (!folder.lastFileNames.includes(e.name) ? e.name : null))
      .filter((e) => e !== null);
    folder.synchronized = true;

    return folder;
  }
}
