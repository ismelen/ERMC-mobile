export interface File {
  name: string;
  size: number;
  selected?: boolean;
}

export interface Folder extends File {
  watching: boolean;
  path: string;
  lastSync?: Date;
  synchronized: boolean;
  status: 'Pending' | 'Syncing...';
  lastFileNames: string[];
  pendingFileNames: string[];
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
  title: string;
  progression: number;
  isMulti: boolean;
  src?: string;
  status: 'Done' | 'Waiting' | 'Converting';
}

export interface StorageData {
  watchedFolder: Folder[];
  settings: ConversionSettings;
  googleCloudUserToken?: string;
}
