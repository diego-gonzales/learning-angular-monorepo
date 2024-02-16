import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { APP_STATUS_TYPES } from '../constants';
import { UploadResponse } from '../interfaces/upload-response.interface';

describe('StoreService', () => {
  let storeService: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    storeService = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(storeService).toBeTruthy();
  });

  it('should set "loading" app status', () => {
    storeService.setToLoadingAppStatus();
    expect(storeService.appStatus()).toBe(APP_STATUS_TYPES.LOADING);
  });

  it('should set "error" app status', () => {
    storeService.setToErrorAppStatus();
    expect(storeService.appStatus()).toBe(APP_STATUS_TYPES.ERROR);
  });

  it('should set "chat-mode" app status', () => {
    storeService.setToChatModeAppStatus({
      url: 'https://res.cloudinary.com/midudev/image/upload/v1706810969/pdf/khiice5vqnr1gcn1pmtq.pdf',
      pages: 4,
      id: 'c1a098ffcb49079c8180b18c7b15229a',
    });
    expect(storeService.appStatus()).toBe(APP_STATUS_TYPES.CHAT_MODE);
  });

  it('should set appInfo() value', () => {
    const newInfo: UploadResponse = {
      url: 'https://fake-url.com',
      pages: 3,
      id: 'uiwiqfahfdj123jfsd',
    };

    storeService.setToChatModeAppStatus(newInfo);

    expect(storeService.appInfo()).toEqual(newInfo);
  });
});
