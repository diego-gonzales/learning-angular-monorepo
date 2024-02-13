import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-step-upload',
  standalone: true,
  imports: [CommonModule, DropzoneModule],
  template: `
    @if (!acceptedFile()) {
      <dropzone
        class="h-20 flex flex-wrap"
        [config]="config()"
        message="Drag here your PDF"
        (processing)="onProcessing($event)"
        (error)="onUploadError()"
        (success)="onUploadSuccess()"
      />
    }
  `,
})
export class StepUploadComponent {
  private _storeService = inject(StoreService);
  acceptedFile = signal<File | null>(null);
  config = signal<DropzoneConfigInterface>({
    url: 'https://httpbin.org/post',
    method: 'POST',
    clickable: true,
    maxFiles: 1,
    acceptedFiles: 'application/pdf',
    previewsContainer: false,
  });

  onProcessing(file: File) {
    if (!file) return;
    this.acceptedFile.set(file);
    this._storeService.setToLoadingAppStatus();
  }

  onUploadError() {
    this._storeService.setToErrorAppStatus();
  }

  onUploadSuccess() {
    this._storeService.setToChatModeAppStatus();
  }
}
