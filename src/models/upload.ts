import { Cloud } from './cloud';
import { Source } from './source';

export interface Upload {
  sources: Source[];
  uploadSettings?: UploadSettings;
}

export class UploadSettings {
  constructor(
    public mergeFiles: boolean,
    public deleteFilesAfterUpload: boolean,
    public title?: string,
    public author?: string,
    public initialVolume?: number,
    public cloud?: Cloud
  ) {}

  static async default(name: string, author: string): Promise<UploadSettings> {
    return {
      mergeFiles: false,
      deleteFilesAfterUpload: false,
      title: name,
      author: author,
      cloud: await Cloud.instance(),
    };
  }
}
