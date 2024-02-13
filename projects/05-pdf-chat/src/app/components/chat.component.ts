import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_STATUS_TYPES } from '../constants';
import { StoreService } from '../services/store.service';
import { StepUploadComponent } from './step-upload.component';
import { StepLoadingComponent } from './step-loading.component';
import { StepChatComponent } from './step-chat.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    StepUploadComponent,
    StepLoadingComponent,
    StepChatComponent,
  ],
  template: `
    @if (appStatus === appStatusTypes.INIT) {
      <app-step-upload />
    } @else if (appStatus === appStatusTypes.LOADING) {
      <app-step-loading />
    } @else if (appStatus === appStatusTypes.ERROR) {
      <div role="alert" class="alert">
        <div>
          <h3 class="font-bold">Something was wrong!</h3>
          <div class="text-xs">There is an error in the application</div>
        </div>
      </div>
    } @else if (appStatus === appStatusTypes.CHAT_MODE) {
      <app-step-chat />
    } @else {
      <div role="alert" class="alert alert-error">
        <div>
          <h3 class="font-bold">Invalid action</h3>
          <div class="text-xs">This app status is not recognized</div>
        </div>
      </div>
    }
  `,
})
export class ChatComponent {
  private _storeService = inject(StoreService);
  appStatusTypes = APP_STATUS_TYPES;

  get appStatus() {
    return this._storeService.appStatus();
  }
}
