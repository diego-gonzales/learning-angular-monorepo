import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #httpClient = inject(HttpClient);
  #storeService = inject(StoreService);

  askGemini(id: string, question: string) {
    return this.#httpClient
      .post<{ answer: string }>('/api/ask', { id, question })
      .pipe(
        catchError((error) => {
          this.#storeService.setToErrorAppStatus();
          return throwError(() => error);
        }),
      );
  }
}
