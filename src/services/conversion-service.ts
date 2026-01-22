import { listFiles } from 'react-native-scoped-storage';
import uuid from 'react-native-uuid';
import { copyToCache } from '../../modules/file-handler';
import { ConversionSettings, ConversionTask, File, Folder } from '../types';

export class ConversionService {
  static adjustPath(path: string): string {
    const parts = path.split(':');
    const tail = parts.pop();
    return parts.join(':') + encodeURIComponent(`:${tail}`);
  }

  static fixPath(path: string): string {
    const parts = path.split('/');
    const index = parts.findIndex((e) => e === 'tree');
    parts[index] = 'document';
    return parts.join('/');
  }

  static async convert(task: ConversionTask, settings: ConversionSettings) {
    const id = uuid.v4();
    try {
      let files: File[];
      const isFolder = (task.data as Folder).pendingFilesAmount !== undefined;
      if (isFolder) {
        const path = (task.data as Folder).path;
        const correctPath = this.adjustPath(path);
        const filesInfo = await listFiles(correctPath);
        files = filesInfo.map((e) => ({
          name: e.name,
          type: e.mime,
          // path: this.fixPath(path + `/${e.name}`),
          path: e.uri,
          // path: e.uri,
        }));
      } else {
        files = task.data as File[];
      }

      for (const file of files) {
        // await deleteFile(Paths.cache.uri + file.name);
        // const localFile = await createFile(Paths.cache.uri, file.name, file.type!);
        // if (!localFile) {
        //   console.warn('not created');
        //   return;
        // }
        // await copyFile(file.path, Paths.cache.uri, () => {});
        // const path = `file:///${localFile.uri}`;
        // console.log(file.path);
        // const localUri = encodeURI(FS.cacheDirectory + file.name);
        // await FS.StorageAccessFramework.copyAsync({
        //   from: encodeURI(file.path),
        //   to: localUri,
        // });

        const path = await copyToCache(file.path, file.name);

        const form = new FormData();
        form.append('file', {
          name: file.name,
          type: file.type,
          uri: path,
        } as unknown as Blob);

        // console.log(file.path);
        console.log(path, file.name, file.type);

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/upload/${id}`,
          {
            method: 'POST',
            body: form,
          }
        );

        const json = await response.json();
        console.log(json);
      }
    } catch (e: any) {
      console.warn(e as Error);
    }

    // for (const file of task.data) {
    //   const formData = new FormData();

    //   formData.append('file', {
    //     uri: file.path,
    //     type: file.type,
    //     name: file.name,
    //   } as unknown as Blob);

    //   try {
    //     const response = await fetch(
    //       `${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/upload/${id}`,
    //       {
    //         method: 'POST',
    //         body: formData,
    //       }
    //     );

    //     const json = await response.json();
    //     console.log(json);
    //   } catch (e: any) {
    //     console.warn(e as Error);
    //   }
    // }

    // formData.append('profile', 'KoCC'); // TODO: change to user choice
    // formData.append(
    //   'googleCloudFolder',
    //   settings.outputDestionation == 'drive' ? (settings.googleCloudFolderId ?? '') : ''
    // ); // TODO: Request to user
    // formData.append('author', task.author ?? '');
    // formData.append('title', task.outputFilename ?? '');
    // formData.append('merge', task.merge.toString());
    // formData.append('startVolumeCount', (task.startingVolumeNumber ?? 0).toString());

    // let files: File[] = [];

    // if (isFolder) {
    //   for (let file of (task.data as Folder).filesPath) {
    //     files.push({
    //       name: file.split('%2F').pop() || 'temp_file.cbz',
    //       path: file,
    //       type: mime.getType(file) || 'application/octet-stream',
    //     });
    //   }
    // } else {
    //   files = task.data as File[];
    // }

    // const id = uuid.v4();

    // for (const file of files) {
    //   const info = new FILE(file.path);

    //   const tempDir = FS.cacheDirectory + info.name;

    //   await FS.copyAsync({
    //     from: info.uri,
    //     to: tempDir,
    //   });

    //   try {
    //     FS.uploadAsync(`${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/upload/${id}`, tempDir, {
    //       httpMethod: 'POST',
    //       uploadType: FS.FileSystemUploadType.MULTIPART,
    //       fieldName: 'file',
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //     });
    //   } catch (e: any) {
    //     console.log(e as Error);
    //   }
    // }

    // try {
    //   const response = await fetch(`${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/convert`, {
    //     body: formData,
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });

    //   if (!response.ok) {
    //     console.log(await response.json());
    //     return;
    //   }

    //   const reader = response.body?.getReader();
    //   const decoder = new TextDecoder();

    //   while (true) {
    //     const { done, value } = await reader!.read();
    //     if (done) break;

    //     const data = decoder.decode(value, { stream: true });
    //     console.log(data);
    //   }
    // } catch (e: any) {
    //   console.log(e as Error);
    // }
  }
}
