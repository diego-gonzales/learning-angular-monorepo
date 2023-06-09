import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '~/interfaces/questions.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private http = inject(HttpClient);
  private _questions = signal<Question[]>([]);
  private _currentQuestionNumber = signal(0);

  get questions() {
    return this._questions.asReadonly();
  }

  get currentQuestionNumber() {
    return this._currentQuestionNumber.asReadonly();
  }

  constructor() {
    this.checkDataInLocalStorage();
  }

  private checkDataInLocalStorage() {
    const storagedQuestions = localStorage.getItem('questions');
    const storagedCurrentQuestionNumber = localStorage.getItem(
      'currentQuestionNumber'
    );

    if (storagedQuestions !== null && storagedCurrentQuestionNumber !== null) {
      this._questions.set(JSON.parse(storagedQuestions));
      this._currentQuestionNumber.set(
        JSON.parse(storagedCurrentQuestionNumber)
      );
    }
  }

  getQuestions() {
    this.http
      .get<Question[]>('assets/data.json')
      .pipe(
        map((resp) => {
          const questions = resp.sort(() => Math.random() - 0.5).slice(0, 10);
          return questions;
        })
      )
      .subscribe((resp) => {
        this._questions.set(resp);
      });
  }

  selectAnswer(questionID: number, userSelectedAnswerIndex: number) {
    const newQuestions: Question[] = structuredClone(this.questions());
    const questionIndex = newQuestions.findIndex((q) => q.id === questionID);
    const question = newQuestions[questionIndex];

    const isCorrectAnswer = question.correctAnswer === userSelectedAnswerIndex;

    question.userSelectedAnswerIndex = userSelectedAnswerIndex;
    question.isCorrectAnswer = isCorrectAnswer;

    this._questions.set(newQuestions);
  }

  goToNextQuestionNumber() {
    if (this.currentQuestionNumber() === this.questions().length - 1) return;
    this._currentQuestionNumber.update((currentValue) => currentValue + 1);
  }

  goToPreviousQuestionNumber() {
    if (this.currentQuestionNumber() === 0) return;
    this._currentQuestionNumber.update((currentValue) => currentValue - 1);
  }

  reset() {
    this._questions.set([]);
    this._currentQuestionNumber.set(0);
  }
}
