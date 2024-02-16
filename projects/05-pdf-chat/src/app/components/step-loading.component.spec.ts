import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepLoadingComponent } from './step-loading.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

describe('StepLoadingComponent', () => {
  let component: StepLoadingComponent;
  let fixture: ComponentFixture<StepLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loadingMessage should be "Loading..." by default', () => {
    expect(component.loadingMessage).toBe('Loading...');
  });

  it('should render "Processing data..." in UI', () => {
    const newMessage = 'Processing data...';
    component.loadingMessage = newMessage;
    fixture.detectChanges();

    const pDebug = fixture.debugElement.query(By.css('p'));
    const paragraph = pDebug.nativeElement as HTMLParagraphElement;

    expect(paragraph.textContent).toBe(newMessage);
  });
});

// isolated test
@Component({
  template: ` <app-step-loading [loadingMessage]="loadingMessage" /> `,
})
class TestComponent {
  loadingMessage = 'Mensajito...';
}

fdescribe('StepLoadingComponent in isolated TestComponent', () => {
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [StepLoadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should render loading message correctly', () => {
    const message = testComponent.loadingMessage;

    const pDebug = fixture.debugElement.query(By.css('p'));
    const paragraph = pDebug.nativeElement as HTMLParagraphElement;

    expect(paragraph.textContent).toBe(message);
  });
});
