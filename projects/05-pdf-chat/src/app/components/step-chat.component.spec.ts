import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepChatComponent } from './step-chat.component';

describe('StepChatComponent', () => {
  let component: StepChatComponent;
  let fixture: ComponentFixture<StepChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
