import { TagResponse } from "./tag";
import { QuizType } from "./quiz";
import { QuizDifficultyType } from "./quiz";

export interface RecommendedQuizType {
  id: number;
  title: string;
  quizType: QuizType;
  difficultyLevel: QuizDifficultyType;
  questionCount: number;
  attemptCount: number;
  avgScore: number;
  tags: TagResponse[];
  createdAt: string; // 또는 Date 타입으로 변환해도 OK
}
