import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool, { ensureUsersTableExists } from "@/lib/db";
import { hashPassword, createSessionToken, SESSION_COOKIE, DISPLAY_COOKIE, SESSION_COOKIE_MAX_AGE } from "@/lib/auth";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json() as { name?: string; email?: string; password?: string };
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nome, e-mail e senha são obrigatórios" }, { status: 400 });
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }
    if (password.length < 8 || password.length > 100) {
      return NextResponse.json({ error: "A senha deve ter entre 8 e 100 caracteres" }, { status: 400 });
    }

    await ensureUsersTableExists();
    const passwordHash = await hashPassword(password);

    const client = await pool.connect();
    try {
      let userId: number;
      try {
        const result = await client.query(
          "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
          [name, email, passwordHash]
        );
        userId = result.rows[0].id;
      } catch (err: unknown) {
        const code = (err as { code?: string })?.code;
        if (code === "23505") {
          return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
        }
        throw err;
      }

      const token = await createSessionToken({ userId, name, email });
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_COOKIE_MAX_AGE,
        path: "/",
      });
      cookieStore.set(DISPLAY_COOKIE, JSON.stringify({ name }), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_COOKIE_MAX_AGE,
        path: "/",
      });

      return NextResponse.json({ success: true, user: { id: userId, name, email } }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
