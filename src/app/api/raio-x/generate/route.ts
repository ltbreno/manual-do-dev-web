import { NextResponse } from "next/server";
import pool, { ensureLeadsTableExists } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { formData, overallScore, classification, legalRisk } = await req.json();

    const MANUS_API_KEY = process.env.NEXT_PUBLIC_MANUS_AI_API_KEY || "sk-wonuJ4kvwESYGUa8tSmd609L7D5axuwYeCFBJuLkbzYaTz2DJCGKNv3oSMuS-5bhXr5zzbuHcP3AjBmjK2T2cE5tBkzJ";
    const BASE_URL = "https://api.manus.ai/v1/tasks";

    const prompt = `
      Você é um funcionário sênior de um renomado escritório de advocacia de imigração nos EUA.
      Sua tarefa é fazer a triagem inicial (Dossiê) de um lead baseado nos dados do formulário "Raio X".
      
      DADOS DO CANDIDATO:
      - Nome: ${formData.contact.name}
      - Objetivo: ${formData.visaPurpose} (${formData.intent})
      - Prazo: ${formData.timeline}
      - Histórico Imigratório: ${formData.immigrationIssues.join(", ")}
      - Formação: ${formData.educationLevel}
      - Área: ${formData.fieldOfWork}
      - Experiência: ${formData.experienceYears}
      - Conquistas/Provas: ${formData.achievements.join(", ")}
      - Impacto NIW: ${formData.impactClaim}
      - Investimento: ${formData.investmentBudget} (Custeio: ${formData.fundingSource})
      
      SCORE TÉCNICO: ${overallScore}/100
      CLASSIFICAÇÃO: ${classification}
      RISCO JURÍDICO: ${legalRisk}

      TAREFA:
      Gere um "Parecer Preliminar de Viabilidade" focado nos critérios EB-1, EB-2 NIW e O-1.
      
      O relatório deve conter:
      1. **Resumo do Perfil**: Uma análise executiva da força do candidato.
      2. **Mapeamento de Critérios**: Quais dos 10 critérios do EB-1 ou 3 pilares do NIW o candidato já parece atender.
      3. **Pontos de Atenção (Red Flags)**: Riscos jurídicos ou lacunas de evidência (ex: falta de prêmios, histórico de visto negado).
      4. **Estratégia Recomendada**: Qual visto deve ser o foco principal e qual o "gap" para a aprovação.
      5. **Próximo Passo para o Advogado**: Recomendação de como conduzir a consulta estratégica.

      Use formatação Markdown profissional. Responda em Português do Brasil.
    `.trim();

    // 1. Create the task
    const createResponse = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "API_KEY": MANUS_API_KEY,
      },
      body: JSON.stringify({
        prompt,
        agentProfile: "manus-1.6",
        taskMode: "chat",
      }),
    });

    if (!createResponse.ok) {
      const errorData = await createResponse.text();
      console.error("Manus AI Create Task Error:", errorData);
      throw new Error(`Failed to create Manus task: ${createResponse.statusText}`);
    }

    const taskData = await createResponse.json();
    const taskId = taskData.task_id;

    if (!taskId) {
      throw new Error("No task_id returned from Manus AI");
    }

    // 2. Poll for results
    let aiAnalysis = "";
    let status = "running";
    const maxRetries = 40; // 80 seconds max
    let retries = 0;

    while (status !== "completed" && status !== "error" && retries < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pollResponse = await fetch(`${BASE_URL}/${taskId}`, {
        method: "GET",
        headers: {
          "API_KEY": MANUS_API_KEY,
        },
      });

      if (!pollResponse.ok) break;

      const pollData = await pollResponse.json();
      status = pollData.status;

      if (status === "completed") {
        const messages = pollData.output || [];
        aiAnalysis = messages
          .map((m: { content?: string }) => m.content || "")
          .join("\n\n");
      } else if (status === "error") {
        throw new Error("Manus AI task failed");
      }

      retries++;
    }

    // SAVE LEAD TO POSTGRES
    try {
      await ensureLeadsTableExists();
      const client = await pool.connect();
      try {
        await client.query(
          `INSERT INTO leads (name, email, whatsapp, company, business_data, score, ai_analysis, classification, legal_risk) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            formData.contact.name,
            formData.contact.email,
            formData.contact.whatsapp,
            formData.fieldOfWork,
            JSON.stringify(formData),
            overallScore,
            aiAnalysis,
            classification,
            legalRisk
          ]
        );
      } finally {
        client.release();
      }
    } catch (dbError) {
      console.error("Failed to save lead:", dbError);
    }

    return NextResponse.json({ aiAnalysis });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
