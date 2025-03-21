"use client";
import { useState } from "react";
import { useGetActiveBattleRooms } from "@/lib/api/battle/useGetActiveBattleRooms";
import { useGetMyActiveBattleRoom } from "@/lib/api/battle/useGetMyActiveBattleRoom";
import CreateBattleRoomModal from "./_components/CreateBattleRoomModal";
import ParticipantList from "./_components/ParticipantList";
import BattleRoomCard from "./_components/BattleRoomCard";
import Button from "../_components/Button";

/** ✅ 메인 배틀 페이지 */
const BattlesPage: React.FC = () => {
  const {
    data: activeRoomsData,
    isLoading: isActiveRoomsLoading,
    refetch,
  } = useGetActiveBattleRooms();
  const { data: myBattleRoomData, isLoading: isMyBattleRoomLoading } =
    useGetMyActiveBattleRoom();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-sub-background min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto space-y-6">
        {/* 헤더 */}
        <div className="bg-primary text-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">퀴즈 대결</h2>
            <p className="text-md mt-2">
              빠르게 문제를 풀고 승리를 차지하세요!
            </p>
          </div>
          <Button
            variant="danger"
            size="medium"
            className="mt-4 sm:mt-0"
            onClick={() => setIsModalOpen(true)}
          >
            새 대결 만들기
          </Button>
        </div>

        {/* 내 활성 배틀룸 */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold border-b-2 border-primary pb-2">
            내 진행 중인 배틀
          </h2>
          {isMyBattleRoomLoading ? (
            <p className="text-center py-4 text-gray-500">로딩 중...</p>
          ) : myBattleRoomData?.data ? (
            <>
              <BattleRoomCard room={myBattleRoomData.data} />
              <ParticipantList
                participants={myBattleRoomData.data.participants}
              />
            </>
          ) : (
            <p className="text-center py-4 text-gray-500">
              현재 진행 중인 배틀이 없습니다.
            </p>
          )}
        </div>

        {/* 활성화된 배틀룸 목록 */}
        <div className="bg-card p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold border-b-2 border-primary pb-2">
              활성화된 대결
            </h2>
            <Button variant="outline" size="small" onClick={refetch}>
              새로고침
            </Button>
          </div>

          {isActiveRoomsLoading ? (
            <p className="text-center py-4 text-gray-500">로딩 중...</p>
          ) : activeRoomsData?.data?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeRoomsData.data.map((room) => (
                <BattleRoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">
              현재 활성화된 대결이 없습니다.
            </p>
          )}
        </div>
      </div>

      {/* 🔹 배틀룸 생성 모달 추가 */}
      <CreateBattleRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default BattlesPage;
