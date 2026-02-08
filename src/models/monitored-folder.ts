import { Source } from './source';
import { UploadSettings } from './upload';

export interface MonitoredFolder {
  source: Source;
  pendingPaths: string[];
  autoUpload: boolean;
  settings: UploadSettings;
}
