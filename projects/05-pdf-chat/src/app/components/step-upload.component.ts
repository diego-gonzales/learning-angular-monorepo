import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { StoreService } from '../services/store.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-step-upload',
  standalone: true,
  imports: [CommonModule, DropzoneModule],
  template: `
    <dropzone
      class="h-20 flex flex-wrap"
      [config]="config()"
      message="Drag here your PDF"
      (processing)="onProcessing($event)"
      (error)="onUploadError($event)"
      (success)="onUploadSuccess($event)"
    />
  `,
})
export class StepUploadComponent {
  private _apiUrl = environment.apiUrl;
  private _storeService = inject(StoreService);
  config = signal<DropzoneConfigInterface>({
    url: `${this._apiUrl}/api/upload-pdf`,
    method: 'POST',
    clickable: true,
    maxFiles: 1,
    maxFilesize: 1,
    acceptedFiles: 'application/pdf',
    previewsContainer: false,
    timeout: 360000, // 6 minutes
  });

  onProcessing(file: File) {
    if (!file) return;
    this._storeService.setToLoadingAppStatus();
  }

  onUploadError(event: any) {
    console.log(event);
    this._storeService.setToErrorAppStatus();
  }

  onUploadSuccess(event: any) {
    const { url, pages, id } = event[1];
    this._storeService.setToChatModeAppStatus({ url, pages, id });
  }
}
