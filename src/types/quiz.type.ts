export interface QuestionType {
  text: string;
  options: string[];
  keywords?: string[];
  correctAnswerIndex: number;
  author: any;
  _id: string;
}

export interface QuizType {
  _id: string;
  title: string;
  description: string;
  questions: QuestionType[];
  correctAnswerIndex: number;
}
