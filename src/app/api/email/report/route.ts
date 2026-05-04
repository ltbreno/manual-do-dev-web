import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import pool, { ensureLeadsTableExists } from "@/lib/db";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import WeeklyReportEmail from "@/emails/WeeklyReportEmail";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await ensureLeadsTableExists();
    const client = await pool.connect();

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekStart = weekAgo.toLocaleDateString("pt-BR");
    const weekEnd = now.toLocaleDateString("pt-BR");

    try {
      const [totals, pipeline, topLeads] = await Promise.all([
        client.query(`
          SELECT
            COUNT(*) FILTER (WHERE created_at >= $1)::int AS total_new,
            COUNT(*) FILTER (WHERE created_at >= $1 AND classification = 'Hot')::int AS total_hot,
            COUNT(*) FILTER (WHERE status = 'hired')::int AS total_hired
          FROM leads
        `, [weekAgo]),
        client.query(`
          SELECT COALESCE(status, 'new') AS status, COUNT(*)::int AS count
          FROM leads GROUP BY status ORDER BY count DESC
        `),
        client.query(`
          SELECT name, email, score, classification, created_at
          FROM leads
          WHERE classification = 'Hot' AND (status IS NULL OR status NOT IN ('hired', 'lost'))
          ORDER BY score DESC LIMIT 5
        `),
      ]);

      const stats = totals.rows[0];

      const html = await render(
        WeeklyReportEmail({
          weekStart,
          weekEnd,
          totalNew: stats.total_new,
          totalHot: stats.total_hot,
          totalHired: stats.total_hired,
          pipeline: pipeline.rows,
          topLeads: topLeads.rows,
        })
      );

      const { data, error } = await getResend().emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `📊 Relatório Semanal — ${weekStart} a ${weekEnd}`,
        html,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ id: data?.id, success: true });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
