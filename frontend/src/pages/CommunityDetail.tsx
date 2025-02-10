import { useState } from "react";

const CommunityDetail = () => {
  const currentUser = "김덕배"; // 현재 로그인한 사용자

  // 게시글
  const post = {
    id: 1,
    title: "자료구조 질문입니다!",
    content: "배열과 연결 리스트의 차이를 알고 싶습니다. 어떤 경우에 배열을 쓰고, 어떤 경우에 연결 리스트를 쓰는 것이 좋을까요?",
    author: currentUser,
    date: "2025-02-01",
  };

  // 댓글
  const [comments, setComments] = useState([
    { id: 1, author: "박유저", content: "배열은 인덱스 접근이 빠르고, 연결 리스트는 삽입/삭제가 용이합니다.", date: "2025-02-01" },
    { id: 2, author: "이유저", content: "연결 리스트는 노드마다 참조값을 저장하기 때문에 메모리 효율이 떨어질 수도 있습니다.", date: "2025-02-01" },
    { id: 3, author: "김덕배", content: "답변 감사합니다! 정리가 잘 됐어요.", date: "2025-02-02" },
  ]);

  const [newComment, setNewComment] = useState("");

  // 댓글 추가
  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      author: currentUser,
      content: newComment,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD 형식
    };

    setComments([...comments, newCommentData]); // 댓글 추가
    setNewComment(""); // 입력 초기화
  };

  // Enter 키로 댓글 추가
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddComment();
  };

  return (
    <div className="p-8">
      {/* 제목 */}
      <h1 className="text-xl font-bold mb-2">{post.title}</h1>
      <div className="border-b border-gray-300 mb-6"></div>

      <div className="max-w-3xl mx-auto">
        {/* 게시글 */}
        <div className="relative bg-blue-600 text-white p-6 rounded-lg mb-6">
          <p className="mt-2">{post.content}</p>
          <div className="mt-4 flex justify-between items-center text-sm opacity-80">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>

          {/* 프로필 이미지 */}
          <div className="absolute top-3 -right-12 w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => {
            const isCurrentUser = comment.author === currentUser;
            return (
              <div key={comment.id} className={`relative flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                {/* 프로필 이미지 */}
                <div
                  className={`w-10 h-10 bg-gray-300 rounded-full absolute top-3 ${
                    isCurrentUser ? "-right-12" : "-left-12 mr-4"
                  }`}
                ></div>

                {/* 댓글 */}
                <div className={`w-full p-4 rounded-lg ${isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{comment.author}</span>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 댓글 입력창 */}
        <div className="mt-6 flex items-center gap-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 입력하세요..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={newComment.trim() === ""}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
