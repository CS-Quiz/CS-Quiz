import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("🔥 middleware 실행중!");

  // ✅ 클라이언트에서 설정/삭제하는 쿠키 키와 일치시킴
  const token = req.cookies.has("accessToken");

  // 로그인 + 로그인 페이지
  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
