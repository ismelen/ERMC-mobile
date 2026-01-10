export interface File {
  name: string;
  size: string;
  selected?: boolean;
}

export interface Folder extends File {
  watching: boolean;
  path: string;
  lastSync?: Date;
  synchronized: boolean;
  status: 'Pending' | 'Syncing...';
  lastFilesAmount: number;
  pendingFilesAmount: number;
  outputFilename?: string;
  author?: string;
  startingVolumeNumber?: number;
}

export interface ConversionSettings {
  outputPath?: string;
  googleCloudFolderId?: string;
  googleCloudUserToken?: string;
  mergeInVolumes: boolean;
  deleteSrcAfterUpload: boolean;
  outputDestionation: 'drive' | 'local';
}

export interface ConversionTask {
  data: Folder | File[];
  progression: number;
  delete: boolean;
  merge: boolean;
  src?: string;
  status: 'Done' | 'Waiting' | 'Converting';
  outputFilename?: string;
  author?: string;
  startingVolumeNumber?: number;
}

export interface StorageData {
  watchedFolder: Folder[];
  settings: ConversionSettings;
  googleCloudUserToken?: string;
}
