import { create } from 'zustand';
import { StorageService } from '../services/storage-service';
import { ConversionSettings, ConversionTask } from '../types';

const USER_TOKEN_KEY = 'token';
const SETTINGS_KEY = 'settings';

interface State {
  settings?: ConversionSettings;
  convertingQueue: ConversionTask[];
  queue: ConversionTask[];
  loaded: boolean;

  init(): Promise<void>;

  setSettings(settings: ConversionSettings): void;
}

export const useConversion = create<State>((set, get) => ({
  loaded: false,
  queue: [],
  convertingQueue: [],
  files: [],
  folders: [],
  watchedAmount: 0,

  async init() {
    if (this.loaded) return;

    let [userToken, settings] = await Promise.all([
      StorageService.GetSecureAsync(USER_TOKEN_KEY),
      StorageService.GetAsync<ConversionSettings>(SETTINGS_KEY),
    ]);

    if (!settings) {
      settings = {
        mergeInVolumes: false,
        deleteSrcAfterUpload: false,
        outputDestionation: 'local',
      } as ConversionSettings;
      StorageService.SetAsync(SETTINGS_KEY, {
        ...settings,
        googleCloudUserToken: userToken,
      });
    }
    settings.googleCloudUserToken = userToken;

    set({
      settings,
      loaded: true,
    });
  },

  setSettings(settings: ConversionSettings) {
    set({ settings: { ...settings } });
    StorageService.SetAsync(SETTINGS_KEY, settings);
  },
}));
