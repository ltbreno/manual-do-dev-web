import { NextResponse } from "next/server";
import pool, { ensureNewsletterSubscribersTableExists } from "@/lib/db";

export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json() as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    await ensureNewsletterSubscribersTableExists();
    const client = await pool.connect();
    try {
      await client.query(
        "INSERT INTO newsletter_subscribers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING",
        [email]
      );
      return NextResponse.json({ success: true }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
