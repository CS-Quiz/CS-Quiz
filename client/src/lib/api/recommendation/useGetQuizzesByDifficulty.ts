import httpClient from "../httpClient";
import { useQuery } from "@tanstack/react-query";
import { QuizDifficultyType } from "@/lib/types/quiz";
import { QuizType } from "@/lib/types/quiz";
import { RecommendedQuizType } from "@/lib/types/recommended";

export const useGetQuizzesByDifficulty = (
  difficulty: QuizDifficultyType,
  limit: number = 5
) => {
  return useQuery({
    queryKey: ["quizzes-by-difficulty", difficulty],
    queryFn: async (): Promise<CommonApiResponse<RecommendedQuizType[]>> => {
      const { data } = await httpClient.get(
        `/recommendations/difficulty/${difficulty}`,
        { params: { limit } }
      );
      return data;
    },
    enabled: !!difficulty,
  });
};
