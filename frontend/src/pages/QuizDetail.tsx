import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const tagsData = [
  {
    tag: "자료구조",
    quizzes: [
      { id: 101, title: "배열", progress: 60 },
      { id: 102, title: "연결 리스트", progress: 40 },
    ],
  },
  {
    tag: "네트워크",
    quizzes: [
      { id: 103, title: "TCP/IP", progress: 80 },
      { id: 104, title: "HTTP 프로토콜", progress: 30 },
    ],
  },
  {
    tag: "운영체제",
    quizzes: [
      { id: 105, title: "프로세스와 스레드", progress: 90 },
    ],
  },
];

const quizData = [
  {
    id: 101,
    category: "데이터베이스 > 정규화",
    question: "Q1. 다음 중 SQL 데이터베이스의 정규화(Normalization)에 대한 설명으로 가장 적절한 것은?",
    options: [
      "A) 정규화는 데이터베이스의 속도를 높이기 위해 테이블을 결합하는 과정이다.",
      "B) 정규화는 데이터 중복을 최소화하고 데이터 무결성을 유지하는 과정이다.",
      "C) 정규화는 모든 테이블에 최소한 하나 이상의 중복 데이터를 포함해야 하는 원칙이다.",
      "D) 정규화는 데이터의 접근 속도를 높이기 위해 모든 테이블을 하나로 합치는 과정이다.",
    ],
    correctAnswer: 1, 
  },
  {
    id: 102,
    category: "네트워크 > TCP vs UDP",
    question: "Q1. TCP와 UDP의 주요 차이점은 무엇인가?",
    options: [
      "A) TCP는 연결지향적이고 UDP는 비연결지향적이다.",
      "B) UDP는 신뢰성이 높은 프로토콜이다.",
      "C) TCP는 데이터 순서를 보장하지 않는다.",
      "D) UDP는 흐름 제어 및 혼잡 제어 기능을 포함한다.",
    ],
    correctAnswer: 0,
  },
];

const QuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = quizData.find((q) => q.id === Number(quizId));

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered] = useState(false);
  const [expandedTag, setExpandedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (!quiz) {
    return <div className="text-center text-lg text-red-500">퀴즈를 찾을 수 없습니다.</div>;
  }

  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };


  // 태그 클릭 시 아코디언 열기/닫기
  const toggleTag = (tag: string) => {
    setExpandedTag(expandedTag === tag ? null : tag);
  };

  // 검색 적용
  const filteredTags = tagsData
    .map((tagItem) => ({
      ...tagItem,
      quizzes: tagItem.quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(
      (tagItem) =>
        tagItem.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tagItem.quizzes.length > 0
    );

  return (
    <div className="h-screen flex">
      {/* 좌측 사이드바 */}
      <div className="w-1/5 p-4 bg-gray-100">
        {/* 검색창 */}
        <div className="relative mb-4">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="태그 또는 퀴즈 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border-b border-gray-400 focus:ring-0 focus:outline-none"
          />
        </div>

        {/* 태그 & 퀴즈 목록 */}
        <div className="space-y-4">
          {filteredTags.map((tagItem) => (
            <div key={tagItem.tag}>
              {/* 태그 버튼 */}
              <div
                className="flex justify-between items-center text-sm font-semibold cursor-pointer p-2 rounded-lg hover:bg-gray-200"
                onClick={() => toggleTag(tagItem.tag)}
              >
                <span>{tagItem.tag}</span>
                {expandedTag === tagItem.tag ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              
              {/* 퀴즈 리스트 */}
              {expandedTag === tagItem.tag && (
                <div className="ml-4 mt-2 space-y-2">
                  {tagItem.quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className={`flex items-center justify-between cursor-pointer p-2 rounded-lg ${
                        Number(quizId) === quiz.id ? "text-blue-500 font-semibold" : "text-gray-700"
                      } hover:bg-gray-200`}
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                    >
                      <span>{quiz.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-300 h-2 rounded-full">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${quiz.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">{quiz.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 중앙 퀴즈 영역 */}
      <div className="flex-1 p-8">
        <h1 className="text-xl font-semibold mb-6">{quiz.question}</h1>

        {/* 선택지 */}
        <div className="space-y-3">
          {quiz.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={isAnswered}
              className={`w-full text-left px-4 py-2 transition ${
                selectedAnswer === index ? "text-red-700" : "text-gray-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* 체점하기 버튼 */}
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-3xl">
            채점하기
          </button>
        </div>
      </div>

      {/* 우측 사이드바 */}
      <div className="w-1/5 p-4 bg-gray-100">
        <h2 className="font-semibold mb-4">문제 풀이 현황</h2>
        <div className="flex items-center gap-2">
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
          </div>
          <span className="text-xs">60%</span>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;
