import { NextResponse } from "next/server";
import pool, { ensureLeadsTableExists } from "@/lib/db";

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
      return NextResponse.json({ id: res.rows[0].id }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
