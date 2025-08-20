"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, expiresAt } = useAuthStore();

  const validSession =
    isAuthenticated && !!expiresAt && Date.now() < (expiresAt ?? 0);

  useEffect(() => {
    if (!validSession) {
      router.replace("/login");
    }
  }, [validSession, router]);

  if (!validSession) return null;
  return <>{children}</>;
}
