import { Participant } from "@/lib/types/battle";
import Image from "next/image";

interface Props {
  participants: Participant[] | null;
}

const BattleParticipantsList: React.FC<Props> = ({ participants }) => {
  const hasParticipants = (participants?.length ?? 0) > 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
      {hasParticipants ? (
        participants!.map((p) => (
          <div
            key={p.userId}
            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center border transition-all ${
              p.ready
                ? "border-green-500 bg-background"
                : "border-border bg-background"
            }`}
          >
            <Image
              src={p.profileImage || "/default-avatar.png"}
              alt={p.username}
              className="rounded-full"
              width={60}
              height={60}
              priority
            />
            <p className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold text-foreground text-center truncate max-w-[90%]">
              {p.username}
            </p>
            <p
              className={`mt-1 sm:mt-2 text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full tracking-wide text-center ${
                p.ready
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-gray-100 text-gray-500 border border-gray-300"
              }`}
            >
              {p.ready ? "✅ 준비 완료" : "⏳ 대기 중"}
            </p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-400 py-12 flex flex-col items-center min-h-full">
          <p className="text-md">아직 참가자가 없어요. 🕊️</p>
          <p className="text-sm text-gray-300 mt-1">
            누군가 들어올 때까지 기다려주세요!
          </p>
        </div>
      )}
    </div>
  );
};

export default BattleParticipantsList;
