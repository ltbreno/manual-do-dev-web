import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// NOTE: does not import from "@/lib/auth" — that module pulls in "node:crypto"
// for password hashing, which is unavailable in the Edge runtime this file runs in.
const SESSION_COOKIE = "session_token";

function getAuthSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET || "dev-only-insecure-auth-secret-do-not-use-in-production";
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes
  if (path.startsWith("/admin")) {
    // Allow access to login page
    if (path === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token");

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect /conta routes (end-user account area)
  if (path.startsWith("/conta")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }
    try {
      await jwtVerify(token, getAuthSecret());
    } catch {
      return NextResponse.redirect(new URL("/entrar", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/conta/:path*"],
};
