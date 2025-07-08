import httpClient from "../httpClient";
import { useQuery } from "@tanstack/react-query";
import { RecommendedQuizType } from "../../types/recommended";

export const useGetDailyRecommendedQuizzes = (limit: number = 3) => {
  return useQuery({
    queryKey: ["daily-recommended-quizzes"],
    queryFn: async (): Promise<CommonApiResponse<RecommendedQuizType[]>> => {
      const { data } = await httpClient.get("/recommendations/daily-related");
      return data;
    },
  });
};
