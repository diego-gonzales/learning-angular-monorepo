import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #httpClient = inject(HttpClient);
  #storeService = inject(StoreService);

  askGemini(question: string) {
    return this.#httpClient.post('/api/ask', { question }).pipe(
      delay(2000),
      catchError((error) => {
        this.#storeService.setToErrorAppStatus();
        return throwError(() => error);
      }),
    );
  }
}
