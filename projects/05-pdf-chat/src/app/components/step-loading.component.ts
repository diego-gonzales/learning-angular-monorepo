import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1 justify-center items-center">
      <span class="loading loading-dots loading-lg opacity-75"></span>
      <p class="opacity-75">Processing PDF...</p>
    </div>
  `,
})
export class StepLoadingComponent {}
