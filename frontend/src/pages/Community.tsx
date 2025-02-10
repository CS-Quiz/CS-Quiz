import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const Community = () => {
  const navigate = useNavigate();
  const currentUser = "김덕배"; // 현재 로그인한 사용자

  const [questions, setQuestions] = useState([
    { id: 1, title: "자료구조 질문입니다!", author: "김덕배", date: "2025-02-02" },
    { id: 2, title: "네트워크 관련 질문 있어요.", author: "박유저", date: "2025-02-01" },
    { id: 3, title: "운영체제 개념 정리 질문", author: "이유저", date: "2025-01-30" },
    { id: 4, title: "데이터베이스 성능 튜닝에 대한 질문", author: "최유저", date: "2025-01-28" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // 검색 기능
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* 제목 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-blue-600">질문방</h1>

        {/* 검색창 */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="제목 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 focus:ring-0 focus:outline-none"
          />
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4"></div>

      {/* 테이블 */}
      <div className="w-full">
        <table className="w-full text-left">
          {/* 테이블 헤더 */}
          <thead>
            <tr className="bg-gray-200 text-gray-600 rounded-lg">
              <th className="p-4 rounded-tl-lg">제목</th>
              <th className="p-4">작성자</th>
              <th className="p-4">날짜</th>
              <th className="p-4 rounded-tr-lg"></th>
            </tr>
          </thead>

          <tbody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <tr
                  key={question.id}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/community/${question.id}`)}
                >
                  <td className="p-4">{question.title}</td>
                  <td className="p-4 flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                    {question.author}
                  </td>
                  <td className="p-4">{question.date}</td>
                  <td className="p-4 flex justify-end gap-4">
       
                    {question.author === currentUser && (
                      <>
                        <button 
                          className="text-gray-500 hover:text-blue-500"
                          onClick={(e) => {
                          e.stopPropagation(); 
                        }}>
                          <FaEdit />
                        </button>
                        <button
                          className="text-gray-500 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            setQuestions(questions.filter((q) => q.id !== question.id));
                          }}
                        >
                          <FaTrash />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  검색된 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Community;
