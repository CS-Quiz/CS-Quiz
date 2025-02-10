import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

const dummyData = [
  {
    id: 1,
    title: "자료구조",
    totalQuizzes: 8,
    subtopics: [
      { id: 101, title: "배열", progress: 100 },
      { id: 102, title: "연결 리스트", progress: 50 },
      { id: 103, title: "스택", progress: 30 },
      { id: 104, title: "큐", progress: 100 },
      { id: 105, title: "트리", progress: 60 },
      { id: 106, title: "힙", progress: 20 },
      { id: 107, title: "해시 테이블", progress: 10 },
    ],
  },
  {
    id: 2,
    title: "네트워크",
    totalQuizzes: 15,
    subtopics: [
      { id: 201, title: "TCP/IP", progress: 100 },
      { id: 202, title: "HTTP 프로토콜", progress: 40 },
    ],
  },
];

const Quiz = () => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const navigate = useNavigate(); 

  // 아코디언 토글
  const toggleAccordion = (id: number) => {
    setExpanded((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  // 퀴즈 클릭 시 
  const handleQuizClick = (quizId: number) => {
    navigate(`/quiz/${quizId}`);
  };

  // 모든 섹션 열기/닫기
  const toggleAll = () => {
    setExpanded((prev) => {
      if (prev.size === dummyData.length) {
        return new Set(); // 모두 닫기
      } else {
        return new Set(dummyData.map((topic) => topic.id)); // 모두 열기
      }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-blue-600">CS 퀴즈 도전하기</h1>

        {/* 모두 접기/모두 펼치기 버튼 */}
        <button
          onClick={toggleAll}
          className="border border-gray-300 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 flex items-center space-x-2"
        >
          <span>{expanded.size === dummyData.length ? "▲ 모두 접기" : "▼ 모두 펼치기"}</span>
        </button>
      </div>

      {/* 대단원 */}
      <div className="bg-white rounded-lg border border-gray-300">
        {dummyData.map((topic, topicIndex) => (
          <div key={topic.id}>
            <div
              className={`flex justify-between items-center py-3 px-4 cursor-pointer bg-gray-100 hover:bg-gray-200
                ${topicIndex === 0 ? "rounded-t-lg" : ""}  
                ${topicIndex === dummyData.length - 1 && !expanded.has(topic.id) ? "rounded-b-lg" : ""}
                border-b border-gray-300`}
              onClick={() => toggleAccordion(topic.id)}
            >
              <div className="flex items-center gap-2">
                {expanded.has(topic.id) ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
                <span className="text-gray-700 font-semibold">{`섹션 ${topic.id}. ${topic.title}`}</span>
              </div>
              <span className="text-gray-600 text-sm">{`${topic.totalQuizzes}개`}</span>
            </div>

            {/* 소단원 */}
            {expanded.has(topic.id) && topic.subtopics.length > 0 && (
              <div className="border-t border-gray-300">
                {topic.subtopics.map((sub) => (
                  <div
                    key={sub.id}
                    className={`flex justify-between items-center py-3 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100`}
                    onClick={() => handleQuizClick(sub.id)}
                  >
                    <div className="flex items-center space-x-2">
                      {sub.progress === 100 ? (
                        <FaCheckCircle className="text-blue-500" />
                      ) : (
                        <div className="w-4 h-4 border border-gray-400 rounded-full"></div>
                      )}
                      <span className="text-gray-700">{sub.title}</span>
                    </div>

                    {/* 진행률 바 */}
                    <div className="w-40 flex items-center gap-2">
                      <div className="w-full h-2 bg-gray-300 rounded-full relative">
                        <div
                          className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
                          style={{ width: `${sub.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-700 text-sm">{sub.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
