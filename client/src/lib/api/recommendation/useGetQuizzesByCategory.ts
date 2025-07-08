import httpClient from "../httpClient";
import { useQuery } from "@tanstack/react-query";
import { RecommendedQuizType } from "@/lib/types/recommended";

export const useGetQuizzesByCategory = (tagId: number, limit: number = 5) => {
  return useQuery({
    queryKey: ["quizzes-by-category", tagId],
    queryFn: async (): Promise<CommonApiResponse<RecommendedQuizType[]>> => {
      const { data } = await httpClient.get(
        `/recommendations/category/${tagId}`,
        { params: { limit } }
      );
      return data;
    },
    enabled: !!tagId,
  });
};
