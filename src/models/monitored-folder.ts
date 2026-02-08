import { Source } from './source';
import { UploadSettings } from './upload';

export interface MonitoredFolder {
  source: Source;
  settings: UploadSettings;
}
