"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import Button from "./Button";
import TokenTimer from "./TokenTimer";
import httpClient from "@/lib/api/httpClient";

const LoginButton = () => {
  const pathname = usePathname();
  const { isAuthenticated, logout, setToken } = useAuthStore();
  const { userProfile } = useProfileStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleRefreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await httpClient.post("/oauth2/refresh", {
        refreshToken,
      });

      const {
        accessToken,
        refreshToken: newRefresh,
        expiresIn,
      } = response.data;

      if (accessToken) {
        const expiresAt = Date.now() + expiresIn * 1000;
        setToken(accessToken, newRefresh, expiresAt);

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", newRefresh);
        localStorage.setItem("expires_in", expiresAt.toString());

        alert("✅ 토큰이 갱신되었습니다.");
      }
    } catch (error) {
      alert("❌ 토큰 갱신에 실패했습니다.");
      console.error("토큰 갱신 실패:", error);
    }
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 로그인 페이지에서는 안 보이도록
  if (pathname === "/login") return null;

  return isAuthenticated ? (
    <div className="flex items-center relative">
      <TokenTimer />

      {/* 프로필 메뉴 */}
      <div className="relative" ref={menuRef}>
        <button onClick={() => setMenuOpen((prev) => !prev)} className="mx-3">
          <Image
            src={userProfile?.profileImage || "/images/default-avatar.png"}
            width={32}
            height={32}
            alt="Profile"
            className="rounded-full"
          />
        </button>

        {/* 드롭다운 */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            <Link
              href="/mypage"
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              🧑 마이페이지
            </Link>
            <button
              onClick={() => {
                handleRefreshToken();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              🔄 로그인 갱신하기
            </button>
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100"
            >
              🚪 로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Link href="/login">
      <Button variant="primary" className="text-white">
        로그인
      </Button>
    </Link>
  );
};

export default LoginButton;
