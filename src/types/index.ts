export interface Folder {
  id: string;
  name: string;
  path: string;
  status: 'monitoring' | 'idle';
  filesCount: number;
  storageUsed: string;
  lastSync?: string;
}

export interface File {
  id: string;
  name: string;
  size: string;
  status: 'ready' | 'processing' | 'complete' | 'error';
  selected?: boolean;
}

export interface ConversionSettings {
  outputFilename: string;
  author: string;
  startingVolumeNumber: number;
  mergeIntoSingleFile: boolean;
  deleteLocalSourceAfterUpload: boolean;
  outputDestination: 'googleDrive' | 'localStorage';
}

export interface ConversionTask {
  id: string;
  name: string;
  fileName: string;
  progress: number;
  status: 'active' | 'complete' | 'ready';
  sourceFile?: string;
}

export type TabType = 'watched' | 'individual';

export type NavigationScreen = 
  | 'ConverterDashboard'
  | 'PendingFiles'
  | 'ConversionSettings'
  | 'ConversionProgress';
