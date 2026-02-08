export interface File {
  name: string;
  selected?: boolean;
  path: string;
  type?: string;
}

export interface Folder extends File {
  watching: boolean;
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
  cloudFolder?: string;
  merge: boolean;
  delete: boolean;
  outputDestionation: 'drive' | 'local';
}

export interface ConversionTask {
  data: Folder | File[];
  status: 'Done' | 'Waiting' | 'Converting';
  title?: string;
  author?: string;
  firstVolumeNum?: number;
  cloudToken?: string;
  cloudFolder?: string;
}

export interface StorageData {
  watchedFolder: Folder[];
  settings: ConversionSettings;
  googleCloudUserToken?: string;
}
