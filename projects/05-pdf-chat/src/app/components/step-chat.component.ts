import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-step-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (imageUrls.length > 0) {
      <div class="h-[300px] carousel carousel-vertical rounded-box">
        @for (imageUrl of imageUrls(); track $index) {
          <div class="carousel-item h-full">
            <img [src]="imageUrl" />
          </div>
        }
      </div>
    }

    <form class="my-3" [formGroup]="form" (ngSubmit)="onSubmit()">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Ask a question about your PDF</span>
        </div>
        <input
          type="text"
          placeholder="What is the PDF about?"
          class="input input-bordered w-full"
          formControlName="question"
        />
        @if (questionControl.invalid && questionControl.touched) {
          <div class="label">
            <span class="label-text-alt text-red-500">
              This field is required
            </span>
          </div>
        }
      </label>
    </form>
  `,
})
export class StepChatComponent {
  private _storeService = inject(StoreService);
  private _formBuilder = inject(NonNullableFormBuilder);
  form = this._formBuilder.group({
    question: ['', Validators.required],
  });
  private numOfPagesToShow = computed(() => Math.min(this.appInfo.pages, 4));
  imageUrls = computed(() => this.getImagesToShow());

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Form submitted');
  }

  getImagesToShow() {
    console.log('getImagesToShow');
    return Array.from({ length: this.numOfPagesToShow() }, (_, i) => {
      const page = i + 1;
      return this.appInfo.url
        .replace('/upload/', `/upload/w_180,h_300,c_fill,pg_${page}/`)
        .replace('.pdf', '.jpg');
    });
  }

  get questionControl() {
    return this.form.controls.question;
  }

  get appInfo() {
    return this._storeService.appInfo();
  }
}
