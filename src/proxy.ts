import { NextResponse, type NextRequest } from "next/server";
import { isSameOriginRequest } from "@/lib/security/origin";

export function proxy(request: NextRequest) {
  if (!isSameOriginRequest(request.method, request.headers)) {
    return NextResponse.json(
      { ok: false, message: "Invalid origin." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const response = NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/api/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    response.headers.set("Cache-Control", "no-store");
  }
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/admin"],
};
