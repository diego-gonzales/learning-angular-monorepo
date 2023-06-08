import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsService } from '~/services/questions.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './reset.component.html',
})
export class ResetComponent {
  private _questionsService = inject(QuestionsService);

  resetGame() {
    this._questionsService.reset();
  }
}
