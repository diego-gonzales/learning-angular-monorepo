import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '~/services/questions.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './start.component.html',
})
export class StartComponent {
  private _questionsService = inject(QuestionsService);

  getQuestions() {
    this._questionsService.getQuestions();
  }
}
