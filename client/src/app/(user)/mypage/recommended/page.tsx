"use client";
import { useState } from "react";
import { Activity } from "lucide-react";

import { useGetPopularQuizzes } from "@/lib/api/recommendation/useGetPopularQuizzes";
import { useGetPersonalizedQuizzes } from "@/lib/api/recommendation/useGetPersonalizedQuizzes";
import { useGetQuizzesByCategory } from "@/lib/api/recommendation/useGetQuizzesByCategory";
import { useGetQuizzesByDifficulty } from "@/lib/api/recommendation/useGetQuizzesByDifficulty";

import { SectionWrapper } from "../../_components/Dashboard";
import Skeleton from "@/app/_components/Skeleton";
import { QuizDifficultyType } from "@/lib/types/quiz";
import QuizCard from "@/app/quizzes/_components/QuizCard";
import QuizCardSkeleton from "@/app/quizzes/_components/QuizCardSkeleton";

const tabs = [
  { key: "popular", label: "인기순" },
  { key: "personalized", label: "개인화 추천" },
  { key: "category", label: "카테고리별" },
  { key: "difficulty", label: "난이도별" },
];

const RecommendationSection = () => {
  const [activeTab, setActiveTab] = useState("popular");

  // 원하는 기본값
  const selectedTagId = 1;
  const selectedDifficulty = QuizDifficultyType.BEGINNER;

  const { data: popular, isLoading: loadingPopular } = useGetPopularQuizzes();
  const { data: personalized, isLoading: loadingPersonalized } =
    useGetPersonalizedQuizzes();
  const { data: byCategory, isLoading: loadingCategory } =
    useGetQuizzesByCategory(selectedTagId);
  const { data: byDifficulty, isLoading: loadingDifficulty } =
    useGetQuizzesByDifficulty(selectedDifficulty);

  const getCurrentData = () => {
    switch (activeTab) {
      case "popular":
        return { data: popular?.data ?? [], isLoading: loadingPopular };
      case "personalized":
        return {
          data: personalized?.data ?? [],
          isLoading: loadingPersonalized,
        };
      case "category":
        return { data: byCategory?.data ?? [], isLoading: loadingCategory };
      case "difficulty":
        return { data: byDifficulty?.data ?? [], isLoading: loadingDifficulty };
      default:
        return { data: [], isLoading: false };
    }
  };

  const { data, isLoading } = getCurrentData();

  return (
    <SectionWrapper
      title="추천 퀴즈"
      icon={<Activity className="w-5 h-5" />}
      ariaLabel="추천 퀴즈 섹션"
    >
      <div className="flex gap-2 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1 text-sm rounded border ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "bg-white text-primary border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Skeleton />
      ) : data.length > 0 ? (
        <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <p className="text-muted">해당 조건의 퀴즈가 없습니다.</p>
      )}
    </SectionWrapper>
  );
};

export default RecommendationSection;
