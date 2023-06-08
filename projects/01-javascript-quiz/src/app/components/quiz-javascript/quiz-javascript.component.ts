import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '~/interfaces/questions.interface';
import { QuestionsService } from '~/services/questions.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-quiz-javascript',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule],
  templateUrl: './quiz-javascript.component.html',
})
export class QuizJavascriptComponent {
  @Input() currentQuestion!: Question;
  private _questionsService = inject(QuestionsService);

  selectAnswer(userSelectedAnswerIndex: number) {
    this._questionsService.selectAnswer(
      this.currentQuestion.id,
      userSelectedAnswerIndex
    );
  }

  getBackgroundColor(answerIndex: number) {
    const { userSelectedAnswerIndex, correctAnswer } = this.currentQuestion;
    if (userSelectedAnswerIndex === undefined) {
      return 'transparent';
    }
    if (
      answerIndex !== correctAnswer &&
      answerIndex !== userSelectedAnswerIndex
    ) {
      return 'transparent';
    }
    if (answerIndex === correctAnswer) {
      return 'green';
    } else {
      return 'red';
    }
  }
}
