import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { ChatService } from './chat.service';
import { StoreService } from './store.service';
import { environment } from '../../environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { chatInterceptor } from '../interceptors/chat.interceptor';

fdescribe('ChatService', () => {
  let chatService: ChatService;
  let storeService: StoreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([chatInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    chatService = TestBed.inject(ChatService);
    storeService = TestBed.inject(StoreService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(chatService).toBeTruthy();
  });

  describe('Test for "askGemini" method', () => {
    it('should return an "answer"', (doneFn: DoneFn) => {
      const mockAnswerResponse = { answer: 'This is an answer' };
      const id = 'fasdf23';
      const question = '¿De qué trata el texto?';

      spyOn(storeService, 'setToErrorAppStatus').and.callThrough();

      chatService.askGemini(id, question).subscribe((resp) => {
        expect(resp.answer).toBe(mockAnswerResponse.answer);
        doneFn();
      });

      const requestedUrl = `${environment.apiUrl}/api/ask`;
      const req = httpTestingController.expectOne(requestedUrl);
      req.flush(mockAnswerResponse);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ id, question });
      expect(storeService.setToErrorAppStatus).not.toHaveBeenCalled();
    });

    it('should call "setToErrorAppStatus" method from StoreService', (doneFn: DoneFn) => {
      const id = 'fasdf23';
      const question = '¿De qué trata el texto?';

      spyOn(storeService, 'setToErrorAppStatus');

      chatService.askGemini(id, question).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          doneFn();
        },
      });

      const requestedUrl = `${environment.apiUrl}/api/ask`;
      const req = httpTestingController.expectOne(requestedUrl);
      req.flush('Errorcito', {
        status: 400,
        statusText: 'Un errorcito ha ocurrido',
      });

      expect(storeService.setToErrorAppStatus).toHaveBeenCalledTimes(1);
    });
  });
});
