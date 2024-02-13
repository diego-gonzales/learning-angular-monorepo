import { Injectable, signal } from '@angular/core';
import { APP_STATUS_TYPES, AppStatus } from '../constants';
import { UploadResponse } from '../interfaces/upload-response.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #appStatus = signal<AppStatus>(APP_STATUS_TYPES.INIT);
  #appInfo = signal<UploadResponse>({
    url: '',
    pages: 0,
    public_id: '',
  });

  get appStatus() {
    return this.#appStatus.asReadonly();
  }

  get appInfo() {
    return this.#appInfo.asReadonly();
  }

  setToLoadingAppStatus() {
    this.#appStatus.set(APP_STATUS_TYPES.LOADING);
  }

  setToErrorAppStatus() {
    this.#appStatus.set(APP_STATUS_TYPES.ERROR);
  }

  setToChatModeAppStatus({ url, pages, public_id }: UploadResponse) {
    this.#appStatus.set(APP_STATUS_TYPES.CHAT_MODE);
    this.#appInfo.set({ url, pages, public_id });
  }
}
