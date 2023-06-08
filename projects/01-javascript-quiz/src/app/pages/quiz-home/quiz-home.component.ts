import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JavascriptIconComponent } from '~/components/javascript-icon/javascript-icon.component';
import { GameComponent } from '~/components/game/game.component';
import { ResetComponent } from '~/components/reset/reset.component';
import { StartComponent } from '~/components/start/start.component';
import { QuestionsService } from '~/services/questions.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-quiz-home',
  standalone: true,
  imports: [
    CommonModule,
    JavascriptIconComponent,
    StartComponent,
    GameComponent,
    StartComponent,
    ResetComponent,
    MatButtonModule,
  ],
  templateUrl: './quiz-home.component.html',
})
export class QuizHomeComponent {
  private _questionsService = inject(QuestionsService);
  questions = this._questionsService.questions;
  currentQuestionNumber = this._questionsService.currentQuestionNumber;

  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  unansweredQuestions: number = 0;

  constructor() {
    effect(() => {
      // console.log(this.questions());
      this.countQuestions();
      this.saveDataInLocalStorage();
    });
  }

  getQuestions() {
    this._questionsService.getQuestions();
  }

  private countQuestions() {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.unansweredQuestions = 0;

    this.questions().forEach((q) => {
      if (q.userSelectedAnswerIndex === undefined) this.unansweredQuestions++;
      else if (q.isCorrectAnswer === true) this.correctAnswers++;
      else this.incorrectAnswers++;
    });
  }

  private saveDataInLocalStorage() {
    localStorage.setItem('questions', JSON.stringify(this.questions()));
    localStorage.setItem(
      'currentQuestionNumber',
      JSON.stringify(this.currentQuestionNumber())
    );
  }
}
