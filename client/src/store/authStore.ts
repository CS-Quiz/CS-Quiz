import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useProfileStore } from "@/store/profileStore";
import { useQuizStore } from "./quizStore";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  wasLoggedOut: boolean; // ✅ 로그아웃 여부 플래그
  setToken: (token: string, refreshToken: string, expiresAt: number) => void;
  logout: () => void;
}

const { resetQuiz } = useQuizStore.getState();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      refreshToken: null,
      expiresAt: null,
      wasLoggedOut: false,

      setToken: (token, refreshToken, expiresAt) => {
        set({
          isAuthenticated: true,
          token,
          refreshToken,
          expiresAt,
          wasLoggedOut: false,
        });
      },

      logout: () => {
        const { wasLoggedOut } = useAuthStore.getState();
        useProfileStore.getState().clearProfile();

        set({
          isAuthenticated: false,
          token: null,
          refreshToken: null,
          expiresAt: null,
          wasLoggedOut: true,
        });

        if (!wasLoggedOut) {
          alert("로그아웃 되었습니다.");
        } else {
          return; // 이미 로그아웃 상태이므로 추가 알림은 하지 않음
        }

        if (typeof window !== "undefined") {
          // ✅ 혹시 남아있을 수 있는 키도 함께 정리
          localStorage.removeItem("accessToken");
          localStorage.removeItem("auth");
          localStorage.removeItem("profile");
          sessionStorage.clear();
          resetQuiz(true);
          sessionStorage.removeItem("battle-socket-store");
          window.location.href = "/login";
        }
      },
    }),
    {
      name: "auth",
    }
  )
);
