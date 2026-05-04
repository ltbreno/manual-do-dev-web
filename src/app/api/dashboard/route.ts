import { NextResponse } from "next/server";
import pool, { ensureLeadsTableExists } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureLeadsTableExists();
    const client = await pool.connect();
    try {
      const [totals, monthly, byClassification, byStatus] = await Promise.all([
        client.query(`
          SELECT
            COUNT(*)::int                                                      AS total,
            COUNT(*) FILTER (WHERE classification = 'Hot')::int               AS hot,
            COUNT(*) FILTER (WHERE status = 'hired')::int                     AS hired,
            COUNT(*) FILTER (WHERE legal_risk = 'High')::int                  AS high_risk,
            COUNT(*) FILTER (WHERE created_at >= date_trunc('month', now()))::int AS this_month
          FROM leads
        `),
        client.query(`
          SELECT
            to_char(date_trunc('month', created_at), 'Mon/YY') AS month,
            COUNT(*)::int AS count
          FROM leads
          WHERE created_at >= now() - INTERVAL '6 months'
          GROUP BY date_trunc('month', created_at)
          ORDER BY date_trunc('month', created_at)
        `),
        client.query(`
          SELECT classification, COUNT(*)::int AS count
          FROM leads
          WHERE classification IS NOT NULL
          GROUP BY classification
        `),
        client.query(`
          SELECT COALESCE(status, 'new') AS status, COUNT(*)::int AS count
          FROM leads
          GROUP BY status
        `),
      ]);

      return NextResponse.json({
        stats: totals.rows[0],
        monthly: monthly.rows,
        byClassification: byClassification.rows,
        byStatus: byStatus.rows,
      });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
