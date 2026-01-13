import pool from "@/lib/db";
import { ensureLeadsTableExists } from "@/lib/db";
import LeadsDashboardClient from "@/components/admin/LeadsDashboardClient";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getLeads() {
  await ensureLeadsTableExists();
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM leads ORDER BY created_at DESC');
    return result.rows;
  } catch (e) {
    console.error("Error fetching leads:", e);
    return [];
  } finally {
    client.release();
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return <LeadsDashboardClient initialLeads={leads} />;
}
