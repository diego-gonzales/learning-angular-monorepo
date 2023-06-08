import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '~/services/questions.service';
import { QuizJavascriptComponent } from '../quiz-javascript/quiz-javascript.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    QuizJavascriptComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './game.component.html',
})
export class GameComponent {
  private _questionsService = inject(QuestionsService);

  currentQuestionNumber = this._questionsService.currentQuestionNumber;
  questions = this._questionsService.questions;
  currentQuestion = computed(
    () => this.questions()[this.currentQuestionNumber()]
  );

  goToNextQuestionNumber() {
    this._questionsService.goToNextQuestionNumber();
  }

  goToPreviousQuestionNumber() {
    this._questionsService.goToPreviousQuestionNumber();
  }
}
