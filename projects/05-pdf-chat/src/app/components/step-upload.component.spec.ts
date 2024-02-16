import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUploadComponent } from './step-upload.component';
import { StoreService } from '../services/store.service';
import { By } from '@angular/platform-browser';

fdescribe('StepUploadComponent', () => {
  let component: StepUploadComponent;
  let fixture: ComponentFixture<StepUploadComponent>;
  let storeService: StoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepUploadComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dropzone component', () => {
    const dropzoneDebug = fixture.debugElement.query(By.css('dropzone'));
    expect(dropzoneDebug).toBeTruthy();
  });

  it('onProcessing should call setToLoadingAppStatus', () => {
    spyOn(storeService, 'setToLoadingAppStatus');

    component.onProcessing(new File([''], 'filename'));

    expect(storeService.setToLoadingAppStatus).toHaveBeenCalledTimes(1);
  });

  it('onUploadError should call setToErrorAppStatus', () => {
    spyOn(storeService, 'setToErrorAppStatus');

    component.onUploadError({});

    expect(storeService.setToErrorAppStatus).toHaveBeenCalledTimes(1);
  });

  it('onUploadSuccess should call setToChatModeAppStatus', () => {
    const eventMock = [null, { url: 'url', pages: 1, id: 'id' }];

    spyOn(storeService, 'setToChatModeAppStatus');

    component.onUploadSuccess(eventMock);

    expect(storeService.setToChatModeAppStatus).toHaveBeenCalledWith(
      eventMock[1]!,
    );
  });

  it('onUploadSuccess should not call setToChatModeAppStatus if event is null', () => {
    spyOn(storeService, 'setToChatModeAppStatus');

    component.onUploadSuccess(null);

    expect(storeService.setToChatModeAppStatus).not.toHaveBeenCalled();
  });
});
