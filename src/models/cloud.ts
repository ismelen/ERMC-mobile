import { StorageService } from '../services/storage-service';

const CLOUD = 'cloud_key';

export class Cloud {
  private static _instance?: Cloud;

  constructor(
    private service: string,
    private email?: string,
    private accessToken?: string,
    private refreshToken?: string,
    private folderId?: string
  ) {}

  static async instance(): Promise<Cloud> {
    if (this._instance) return this._instance;
    const json = await StorageService.GetSecureAsync(CLOUD);

    if (!json) {
      return new Cloud('google');
    }

    return JSON.parse(json);
  }
}
