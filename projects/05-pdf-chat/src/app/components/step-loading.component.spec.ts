import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLoadingComponent } from './step-loading.component';

describe('StepLoadingComponent', () => {
  let component: StepLoadingComponent;
  let fixture: ComponentFixture<StepLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
