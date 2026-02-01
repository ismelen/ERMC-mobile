import { create } from 'zustand';
import { AuthService } from '../services/auth-service';
import { ConversionService } from '../services/conversion-service';
import { StorageService } from '../services/storage-service';
import { ConversionSettings, ConversionTask } from '../types';
import { useFolders } from './useFolders';

export const SETTINGS_KEY = 'settings';

interface State {
  settings?: ConversionSettings;
  convertingQueue: ConversionTask[];
  queue: ConversionTask[];
  loaded: boolean;
  converter?: ConversionService;

  init(): Promise<void>;

  setSettings(settings: ConversionSettings): void;
  startConversion(task: ConversionTask): Promise<void>;
}

export const useConversion = create<State>((set, get) => ({
  loaded: false,
  queue: [],
  convertingQueue: [],
  files: [],
  folders: [],
  watchedAmount: 0,

  async init() {
    if (get().loaded) return;

    let settings = await StorageService.GetAsync<ConversionSettings>(SETTINGS_KEY);

    if (!settings) {
      settings = {
        merge: false,
        delete: false,
        outputDestionation: 'local',
      } as ConversionSettings;
      StorageService.SetAsync(SETTINGS_KEY, settings);
    }

    set({
      settings,
      loaded: true,
      converter: new ConversionService(new AuthService()),
    });

    useFolders.getState().init();
  },

  setSettings(settings: ConversionSettings) {
    set({ settings: { ...settings } });
    StorageService.SetAsync(SETTINGS_KEY, settings);
  },

  async startConversion(task: ConversionTask) {
    get().converter?.convert(task, get().settings!);
  },
}));
