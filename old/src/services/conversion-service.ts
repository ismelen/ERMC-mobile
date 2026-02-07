import { listFiles } from 'react-native-scoped-storage';
import { copyToCache } from '../../modules/file-handler';
import { ConversionSettings, ConversionTask, File, Folder } from '../types';

export class ConversionService {
  static adjustPath(path: string): string {
    const parts = path.split(':');
    const tail = parts.pop();
    return parts.join(':') + encodeURIComponent(`:${tail}`);
  }

  static async convert(task: ConversionTask, settings: ConversionSettings) {
    try {
      const form = new FormData();

      form.append('profile', 'KoCC'); // TODO: change to user choice
      form.append(
        'googleCloudFolder',
        settings.outputDestionation == 'drive' ? (settings.googleCloudFolderId ?? '') : ''
      ); // TODO: Request to user
      form.append('author', task.author ?? '');
      form.append('title', task.outputFilename ?? '');
      form.append('merge', task.merge.toString());
      form.append('startVolumeCount', (task.startingVolumeNumber ?? 0).toString());

      let files: File[];
      const isFolder = (task.data as Folder).pendingFilesAmount !== undefined;

      if (isFolder) {
        const path = (task.data as Folder).path;
        const correctPath = this.adjustPath(path);
        const filesInfo = await listFiles(correctPath);
        files = filesInfo.map((e) => ({
          name: e.name,
          type: e.mime,
          path: e.uri,
        }));
      } else {
        files = task.data as File[];
      }

      for (const file of files) {
        const path = await copyToCache(file.path, file.name);

        form.append('files', {
          name: file.name,
          type: file.type,
          uri: path,
        } as unknown as Blob);
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/convert`, {
        body: form,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        console.log(await response.json());
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const data = decoder.decode(value, { stream: true });
        console.log(data);
      }
    } catch (e: any) {
      console.warn(e as Error);
    }
  }
}
