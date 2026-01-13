import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const VALID_USER = process.env.ADMIN_USER || "admin";
  const VALID_PASS = process.env.ADMIN_PASSWORD || "admin123";

  if (username === VALID_USER && password === VALID_PASS) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
