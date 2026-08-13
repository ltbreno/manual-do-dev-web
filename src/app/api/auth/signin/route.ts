import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool, { ensureUsersTableExists } from "@/lib/db";
import { verifyPasswordConstantTime, createSessionToken, SESSION_COOKIE, DISPLAY_COOKIE, SESSION_COOKIE_MAX_AGE } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json() as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    await ensureUsersTableExists();
    const client = await pool.connect();
    try {
      const result = await client.query(
        "SELECT id, name, email, password_hash FROM users WHERE email = $1",
        [email]
      );
      const user = result.rows[0] as { id: number; name: string; email: string; password_hash: string } | undefined;

      const isValid = await verifyPasswordConstantTime(password, user?.password_hash);
      if (!user || !isValid) {
        return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
      }

      const token = await createSessionToken({ userId: user.id, name: user.name, email: user.email });
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_COOKIE_MAX_AGE,
        path: "/",
      });
      cookieStore.set(DISPLAY_COOKIE, JSON.stringify({ name: user.name }), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_COOKIE_MAX_AGE,
        path: "/",
      });

      return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
