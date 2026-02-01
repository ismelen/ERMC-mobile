import { listFiles } from 'react-native-scoped-storage';
import { copyToCache } from '../../modules/file-handler';
import { useGoogleDrivePicker } from '../components/google-drive-picker-modal';
import { SETTINGS_KEY } from '../hooks/useConversion';
import { ConversionSettings, ConversionTask, File, Folder } from '../types';
import { AuthService } from './auth-service';
import { StorageService } from './storage-service';

export class ConversionService {
  public constructor(private authService: AuthService) {}

  static adjustPath(path: string): string {
    const parts = path.split(':');
    const tail = parts.pop();
    return parts.join(':') + encodeURIComponent(`:${tail}`);
  }

  async getFolder(settings: ConversionSettings): Promise<string | undefined> {
    if (settings.cloudFolder) return settings.cloudFolder;
    return await useGoogleDrivePicker.getState().show((await this.authService.getToken())!);
  }

  async convert(task: ConversionTask, settings: ConversionSettings) {
    try {
      const form = new FormData();

      form.append('profile', 'KoCC');
      form.append('format', 'epub');
      form.append('author', task.author ?? '');
      form.append('title', task.title ?? '');
      form.append('merge', settings.merge.toString());
      form.append('firstVolumeNum', (task.firstVolumeNum ?? 0).toString());

      if (settings.outputDestionation === 'drive') {
        const token = await this.authService.getToken();
        if (!token) {
          alert("Can't get Google Session");
          return;
        }
        const folder = await this.getFolder(settings);
        if (!folder) {
          alert("Can't get cloud folder");
          return;
        }
        settings.cloudFolder = folder;
        StorageService.SetAsync(SETTINGS_KEY, settings);
        form.append('cloudFolder', folder!);
        form.append('cloudToken', token!);
      }

      let files: File[];
      const isFolder = (task.data as Folder).pendingFilesAmount !== undefined;

      if (isFolder) {
        const path = (task.data as Folder).path;
        const correctPath = ConversionService.adjustPath(path);
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
        // TODO: Copy to cache not working with single files
        const path = await copyToCache(file.path, file.name);

        form.append('files', {
          name: file.name,
          type: file.type,
          uri: path,
        } as unknown as Blob);
      }

      let response = await fetch(`${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/convert`, {
        body: form,
        method: 'POST',
      });

      // if (!response.ok) return;

      const json = await response.json();
      console.log(json);
    } catch (e: any) {
      console.log(e as Error);
    }
  }
}
