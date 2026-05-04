import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json() as Record<string, unknown>;
    const allowed = ["name", "email", "role"];
    const updates: string[] = [];
    const values: unknown[] = [];
    let idx = 1;
    for (const key of allowed) {
      if (key in body) {
        updates.push(`${key} = $${idx++}`);
        values.push(body[key]);
      }
    }
    if (updates.length === 0) {
      return NextResponse.json({ error: "Nenhum campo válido" }, { status: 400 });
    }
    values.push(id);
    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE admin_users SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
        values
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }
      return NextResponse.json(result.rows[0]);
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await pool.connect();
    try {
      const result = await client.query(
        "DELETE FROM admin_users WHERE id = $1 RETURNING id",
        [id]
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
