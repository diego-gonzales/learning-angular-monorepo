// Generated by https://quicktype.io

export interface Question {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswerIndex?: number;
  isCorrectAnswer?: boolean;
}
