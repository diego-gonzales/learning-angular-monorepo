import { Injectable, signal } from '@angular/core';
import { APP_STATUS_TYPES, AppStatus } from '../constants';
import { UploadResponse } from '../interfaces/upload-response.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #appStatus = signal<AppStatus>(APP_STATUS_TYPES.CHAT_MODE);
  #appInfo = signal<UploadResponse>({
    url: 'https://res.cloudinary.com/midudev/image/upload/v1706810969/pdf/khiice5vqnr1gcn1pmtq.pdf',
    pages: 4,
    id: 'c1a098ffcb49079c8180b18c7b15229a',
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

  setToChatModeAppStatus({ url, pages, id }: UploadResponse) {
    this.#appStatus.set(APP_STATUS_TYPES.CHAT_MODE);
    this.#appInfo.set({ url, pages, id });
  }
}
