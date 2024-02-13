import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepUploadComponent } from './step-upload.component';

describe('StepUploadComponent', () => {
  let component: StepUploadComponent;
  let fixture: ComponentFixture<StepUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
