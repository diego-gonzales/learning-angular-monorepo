import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StoreService } from '../services/store.service';
import { ChatService } from '../services/chat.service';
import { StepLoadingComponent } from './step-loading.component';

@Component({
  selector: 'app-step-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StepLoadingComponent],
  template: `
    @if (imageUrls().length > 0) {
      <div class="h-[300px] carousel carousel-vertical rounded-box">
        @for (imageUrl of imageUrls(); track $index) {
          <div class="carousel-item h-full">
            <img [src]="imageUrl" />
          </div>
        }
      </div>
    }

    <form class="mt-2 mb-4" [formGroup]="form" (ngSubmit)="onSubmit()">
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
        @if (questionControl.invalid && !questionControl.pristine) {
          <div class="label">
            <span class="label-text-alt text-red-500">
              This field is required
            </span>
          </div>
        }
      </label>
    </form>

    @if (isLoading()) {
      <app-step-loading loadingMessage="Examining PDF..." />
    }

    @if (aiResponse() && !isLoading()) {
      <div class="text-left rounded-box p-4 bg-base-200 mt-4">
        <p>{{ aiResponse() }}</p>
      </div>
    }
  `,
})
export class StepChatComponent {
  private _storeService = inject(StoreService);
  private _chatService = inject(ChatService);
  private _formBuilder = inject(NonNullableFormBuilder);
  form = this._formBuilder.group({
    question: ['', Validators.required],
  });
  private numOfPagesToShow = computed(() => Math.min(this.appInfo.pages, 4));
  imageUrls = computed(() => this.getImagesToShow());
  isLoading = signal<boolean>(false);
  aiResponse = signal<string>('');

  onSubmit() {
    if (this.form.invalid || this.questionControl.value.trim() === '') {
      return;
    }

    this.isLoading.set(true);

    this._chatService
      .askGemini(this.appInfo.id, this.questionControl.value)
      .subscribe((resp) => {
        this.aiResponse.set(resp.answer);
        this.isLoading.set(false);
        this.form.reset();
      });
  }

  getImagesToShow() {
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
