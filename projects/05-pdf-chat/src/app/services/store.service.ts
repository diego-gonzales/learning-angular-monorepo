import { Injectable, signal } from '@angular/core';
import { APP_STATUS_TYPES, AppStatus } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  appStatus = signal<AppStatus>(APP_STATUS_TYPES.INIT);
}
