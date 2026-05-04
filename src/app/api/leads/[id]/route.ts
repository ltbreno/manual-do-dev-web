import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import pool from "@/lib/db";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import StatusFollowUpEmail from "@/emails/StatusFollowUpEmail";

const STATUS_WITH_EMAIL = new Set(["contacted", "meeting", "hired"]);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json() as Record<string, unknown>;
    const allowed = ["status", "classification", "legal_risk"];
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
      return NextResponse.json({ error: "Nenhum campo válido para atualizar" }, { status: 400 });
    }
    values.push(id);
    const client = await pool.connect();
    try {
      const result = await client.query(
        `UPDATE leads SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
        values
      );
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
      }
      const updated = result.rows[0];

      // Trigger follow-up email when status changes to a meaningful stage
      const newStatus = body.status as string | undefined;
      if (newStatus && STATUS_WITH_EMAIL.has(newStatus) && updated.email) {
        const html = await render(
          StatusFollowUpEmail({ name: updated.name || "Empresário", status: newStatus, score: updated.score })
        );
        const subjects: Record<string, string> = {
          contacted: "Nossa equipe vai entrar em contato em breve 📬",
          meeting: "Sua reunião está confirmada 📅",
          hired: "Bem-vindo ao Manual do Brasileiro! 🎉",
        };
        getResend().emails.send({
          from: FROM_EMAIL,
          to: updated.email,
          subject: subjects[newStatus] ?? "Atualização do seu processo",
          html,
        }).catch(console.error);
      }

      return NextResponse.json(updated);
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
      const result = await client.query("DELETE FROM leads WHERE id = $1 RETURNING id", [id]);
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
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
