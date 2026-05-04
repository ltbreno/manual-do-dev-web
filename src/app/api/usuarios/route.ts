import { NextResponse } from "next/server";
import pool, { ensureAdminUsersTableExists } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureAdminUsersTableExists();
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM admin_users ORDER BY created_at DESC");
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureAdminUsersTableExists();
    const body = await req.json() as { name?: string; email?: string; role?: string };
    const { name, email, role = "viewer" } = body;
    if (!name || !email) {
      return NextResponse.json({ error: "Nome e email são obrigatórios" }, { status: 400 });
    }
    const client = await pool.connect();
    try {
      const result = await client.query(
        "INSERT INTO admin_users (name, email, role) VALUES ($1, $2, $3) RETURNING *",
        [name, email, role]
      );
      return NextResponse.json(result.rows[0], { status: 201 });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
