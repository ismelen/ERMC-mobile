import mime from 'mime';
import { copyToCache } from '../../modules/file-handler';
import { Cloud } from '../models/cloud';
import { UploadSettings } from '../models/upload';

export class MangaConvertService {
  public static async convert(paths: string[], settings: UploadSettings) {
    try {
      const form = new FormData();

      for (let path of paths) {
        const name = decodeURIComponent(path).split('/').pop();
        if (!name) {
          alert(`Error with file: ${path}`);
          return;
        }
        const cachePath = await copyToCache(path, name);

        form.append('files', {
          name: name,
          type: mime.getType(cachePath),
          uri: cachePath,
        } as unknown as Blob);
      }

      form.append('profile', 'KoCC'); //TODO: request to user
      form.append('format', 'epub');
      form.append('author', settings.author ?? '');
      form.append('title', settings.title ?? '');
      form.append('merge', settings.mergeFiles.toString());
      form.append('firstVolumeNum', (settings.initialVolume ?? 1).toString());

      if (settings.cloud) {
        const cloud = await Cloud.instance();
        if (!cloud.check()) {
          alert('No cloud data, converting in local');
        } else {
          form.append('cloudFolder', cloud.getFolderId());
          form.append('cloudToken', cloud.getToken());
        }
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_CONVERTER_API_URL}/manga/convert`, {
        body: form,
        method: 'POST',
      });

      
      const json = await response.json();
      if (!response.ok) {
        alert(json.error);
      }
      console.log(json);
    } catch (e) {
      const msg = (e as Error).message;
      alert(msg);
      console.log(msg);
    }
  }
}
