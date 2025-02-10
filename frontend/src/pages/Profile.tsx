import { useState } from "react";
import { FaEdit, FaTimes, FaSave, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({
    name: "김덕배",
    email: "naver@naver.com",
    nickname: "김덕",
    points: 10,
    solvedProblems: [16],
    profileImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const [newProfileImage, setNewProfileImage] = useState(user.profileImage);
  const [weekOffset, setWeekOffset] = useState(0);

  // 프로필 이미지 수정
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) return;
    
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfileImage(imageUrl);
    }
  };

  // 프로필 저장 
  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      nickname: newNickname,
      profileImage: newProfileImage,
    }));
    setIsEditing(false);
  };

  // 프로필수정 취소 
  const handleCancel = () => {
    setNewNickname(user.nickname);
    setNewProfileImage(user.profileImage);
    setIsEditing(false);
  };

  // 현재 날짜를 기준으로 주간 단위 계산
  const getWeekRange = (offset: number) => {
    const now = new Date();
    now.setDate(now.getDate() + offset * 7);
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  return (
    <div className="flex p-8 gap-8">
      {/* 왼쪽 사이드바 */}
      <div className="w-1/4 bg-gray-100 p-6 rounded-lg relative">
        {/* 수정 버튼 or 저장/취소 버튼 */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="text-gray-500 opacity-80 hover:opacity-100 flex items-center gap-1 text-sm transition-opacity"
              >
                <FaTimes className="text-gray-500 opacity-80 hover:opacity-100" />
                <span className="opacity-80 hover:opacity-100">취소</span>
              </button>
              <button
                onClick={handleSave}
                className="text-blue-600 opacity-80 hover:opacity-100 flex items-center gap-1 text-sm transition-opacity"
              >
                <FaSave className="text-blue-600 opacity-80 hover:opacity-100" />
                <span className="opacity-80 hover:opacity-100">저장</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-600 opacity-80 hover:opacity-100 flex items-center gap-1 text-sm transition-opacity"
            >
              <FaEdit className="text-gray-600 opacity-80 hover:opacity-100" />
              수정
            </button>
          )}
        </div>

        {/* 프로필 */}
        <div className="flex items-center gap-4 mt-4">
          {/* 프로필 이미지 */}
          <label className={`relative ${isEditing ? "cursor-pointer" : "cursor-default"}`}>
            {isEditing && <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />}
            <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center">
              {newProfileImage ? (
                <img src={newProfileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-sm">+</span>
              )}
            </div>
          </label>

          {/* 닉네임 & 포인트 */}
          <div className="flex flex-col">
            {isEditing ? (
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="border border-gray-300 p-1 rounded"
              />
            ) : (
              <h2 className="text-lg font-semibold">{user.nickname}</h2>
            )}
            <p className="text-gray-500 text-sm">Points {user.points}</p>
          </div>
        </div>

        {/* 프로필 정보 */}
        <div className="mt-6 space-y-2">
          <div>
            <p className="text-xs text-gray-500">이름</p>
            <p className="text-sm">{user.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">이메일</p>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>

        {/* 틀린 문제 목록 */}
        <div className="mt-6">
          <h3 className="text-blue-500 font-semibold mb-2">틀린 문제</h3>
          <div className="bg-white p-4 rounded-lg shadow space-y-1">
            {user.solvedProblems.map((problem, index) => (
              <p key={index} className="text-gray-600"># {problem}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 리포트 정보 */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Report: <span className="text-blue-600">Week</span>
          </h1>
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <button onClick={() => setWeekOffset(weekOffset - 1)}>
              <FaChevronLeft className="text-gray-500" />
            </button>
            <span className="text-sm text-gray-600">{getWeekRange(weekOffset)}</span>
            <button onClick={() => setWeekOffset(weekOffset + 1)}>
              <FaChevronRight className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* 태그별 통계창 */}
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">태그별 통계창</h3>
        </div>

        {/* 하루에 푼 문제 수 */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">하루에 푼 문제 수</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
