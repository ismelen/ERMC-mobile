import { Source } from './source';
import { UploadSettings } from './upload';

export interface Queue {
  sources: Source[];
  settings: UploadSettings;
  times: QueueTime[];
}

export interface QueueTime {
  path: string;
  endTime: Date;
}
