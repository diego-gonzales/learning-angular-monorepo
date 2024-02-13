import { Injectable, signal } from '@angular/core';
import { APP_STATUS_TYPES, AppStatus } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  #appStatus = signal<AppStatus>(APP_STATUS_TYPES.INIT);

  get appStatus() {
    return this.#appStatus.asReadonly();
  }

  setToLoadingAppStatus() {
    this.#appStatus.set(APP_STATUS_TYPES.LOADING);
  }

  setToChatModeAppStatus() {
    this.#appStatus.set(APP_STATUS_TYPES.CHAT_MODE);
  }

  setToErrorAppStatus() {
    this.#appStatus.set(APP_STATUS_TYPES.ERROR);
  }
}
