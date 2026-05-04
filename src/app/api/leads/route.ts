import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import pool, { ensureLeadsTableExists } from "@/lib/db";
import { getResend, FROM_EMAIL, ADMIN_EMAIL } from "@/lib/resend";
import LeadRoadmapEmail from "@/emails/LeadRoadmapEmail";
import AdminNewLeadEmail from "@/emails/AdminNewLeadEmail";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await ensureLeadsTableExists();
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM leads ORDER BY created_at DESC");
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
    const body = await req.json() as unknown;
    if (typeof body !== "object" || body === null) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }
    interface Contact { name?: string; email?: string; whatsapp?: string; linkedin?: string }
    interface FormDataMinimal { contact: Contact; company?: string; files?: Array<{ name?: string; type?: string }>; [k: string]: unknown }
    interface ResultMinimal { overallScore?: number; leadClassification?: string; riskAnalysis?: string; [k: string]: unknown }
    const b = body as { formData?: unknown; result?: unknown };
    const formData = b?.formData as FormDataMinimal | undefined;
    const result = b?.result as ResultMinimal | undefined;

    if (!formData || !result || !formData.contact) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    await ensureLeadsTableExists();
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO leads (
          name, email, whatsapp, company, business_data, score, ai_analysis, classification, legal_risk, uploaded_files
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `;
      const filesField = Array.isArray(formData.files)
        ? JSON.stringify(
            formData.files.map((f: unknown) => {
              const o = f as Record<string, unknown>;
              return { name: typeof o.name === "string" ? o.name : "", type: typeof o.type === "string" ? o.type : "" };
            })
          )
        : null;
      const values = [
        formData.contact.name || null,
        formData.contact.email || null,
        formData.contact.whatsapp || null,
        formData.company || null,
        JSON.stringify(formData),
        result.overallScore || 0,
        "",
        result.leadClassification || null,
        result.riskAnalysis || null,
        filesField,
      ];
      const res = await client.query(query, values);

      // Fire emails without blocking the response
      const leadEmail = formData.contact.email;
      const leadName = formData.contact.name || "Empresário";
      const score = result.overallScore || 0;
      const classification = result.leadClassification || "Cold";
      const riskLevel = result.riskAnalysis || "Low";
      const scores = (formData as Record<string, unknown>).scores as Record<string, number> ?? {};

      if (leadEmail) {
        const [roadmapHtml, adminHtml] = await Promise.all([
          render(LeadRoadmapEmail({ name: leadName, score, classification, riskLevel, scores })),
          render(AdminNewLeadEmail({ name: leadName, email: leadEmail, whatsapp: formData.contact.whatsapp || "", score, classification, riskLevel, scores })),
        ]);

        await Promise.allSettled([
          getResend().emails.send({
            from: FROM_EMAIL,
            to: leadEmail,
            subject: `Seu Roadmap de Expansão para os EUA — Score ${score}`,
            html: roadmapHtml,
          }),
          getResend().emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `🔥 Novo Lead: ${leadName} — Score ${score} (${classification})`,
            html: adminHtml,
          }),
        ]);
      }

      return NextResponse.json({ id: res.rows[0].id }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
