import httpClient from "../httpClient";
import { useQuery } from "@tanstack/react-query";
import { RecommendedQuizType } from "./../../types/recommended";

export const useGetPersonalizedQuizzes = (limit: number = 5) => {
  return useQuery({
    queryKey: ["personalized-quizzes"],
    queryFn: async (): Promise<CommonApiResponse<RecommendedQuizType[]>> => {
      const { data } = await httpClient.get("/recommendations/personalized");
      return data;
    },
  });
};
