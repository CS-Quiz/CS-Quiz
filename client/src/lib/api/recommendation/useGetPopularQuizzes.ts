import httpClient from "../httpClient";
import { useQuery } from "@tanstack/react-query";
import { RecommendedQuizType } from "./../../types/recommended";

export const useGetPopularQuizzes = (limit: number = 5) => {
  return useQuery({
    queryKey: ["popular-quizzes"],
    queryFn: async (): Promise<CommonApiResponse<RecommendedQuizType[]>> => {
      const { data } = await httpClient.get("/recommendations/popular", {
        params: { limit },
      });

      console.log("Popular quizzes data:", data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
