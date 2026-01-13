import { NextResponse } from "next/server";
import pool, { ensureLeadsTableExists } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { formData, overallScore } = await req.json();

    const MANUS_API_KEY = process.env.NEXT_PUBLIC_MANUS_AI_API_KEY || "sk-wonuJ4kvwESYGUa8tSmd609L7D5axuwYeCFBJuLkbzYaTz2DJCGKNv3oSMuS-5bhXr5zzbuHcP3AjBmjK2T2cE5tBkzJ";
    const BASE_URL = "https://api.manus.ai/v1/tasks"; // Native task endpoint as per docs

    const prompt = `
      Você é a Manus AI, um consultor especialista em imigração, vistos de negócios (EUA/Europa) e internacionalização de carreiras para brasileiros.
      Analise os seguintes dados do perfil profissional/empresarial para avaliar a viabilidade de vistos e expatriação:

      Nome/Empresa: ${formData.contact?.company || formData.contact?.name || "N/A"}
      
      Dados Financeiros e Estruturais:
      - Previsibilidade de Receita: ${formData.business.revenuePredictability}
      - Margem de Lucro: ${formData.business.profitMargin}
      - Dependência do Dono: ${formData.business.ownerDependence}
      - Ciclo de Vendas: ${formData.business.salesCycle}
      - Clareza de Métricas: ${formData.business.metricsClarity}
      - Concentração de Clientes: ${formData.business.clientConcentration}
      - Maturidade do Time: ${formData.business.teamMaturity}
      - Fluxo de Caixa / Reserva: ${formData.business.cashFlow}
      
      Score Geral de Maturidade do Negócio: ${overallScore}/100

      Tarefa:
      Gere um DIAGNÓSTICO DE VIABILIDADE PARA VISTOS E INTERNACIONALIZAÇÃO.
      O tom deve ser técnico porém acessível, focado em quem deseja empreender fora, investir ou aplicar para vistos de talentos (EB-2 NIW, O-1, etc).
      
      O relatório deve conter:
      1. **Análise de Perfil para Imigração**: Como a situação atual do negócio fortalece ou enfraquece uma aplicação de visto (ex: capacidade de investimento demonstrada, estabilidade financeira para vistos de investidor ou habilidades extraordinárias para vistos de talento).
      2. **Cenários de Vistos Possíveis**: Baseado nos dados, quais caminhos parecem mais viáveis? (Ex: L-1 para expansão, E-2 se tiver passaporte europeu/tratado, EB-2 NIW se for profissional de destaque, Vistos de Nômade, etc).
      3. **Pontos de Atenção**: O que precisa melhorar no negócio/perfil para não ter um visto negado (ex: "Baixa previsibilidade de receita pode ser um alerta para oficiais de imigração").
      4. **Veredito Manus AI**: O próximo passo prático (Top Priority) para o projeto de internacionalização nos próximos 90 dias.
      
      Use formatação Markdown (negritos, títulos, listas).
      Responda em Português do Brasil.
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
    const maxRetries = 30; // 30 retries * 2 seconds = 60 seconds max
    let retries = 0;

    while (status !== "completed" && status !== "error" && retries < maxRetries) {
      // Wait 2 seconds before polling
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pollResponse = await fetch(`${BASE_URL}/${taskId}`, {
        method: "GET",
        headers: {
          "API_KEY": MANUS_API_KEY,
        },
      });

      if (!pollResponse.ok) {
        console.error("Manus AI Polling Error:", await pollResponse.text());
        break;
      }

      const pollData = await pollResponse.json();
      status = pollData.status;

      if (status === "completed") {
        // Based on docs, output is an array of messages
        const messages = pollData.output || [];
        aiAnalysis = messages
          .map((m: { content?: string }) => m.content || "")
          .join("\n\n") || "Análise concluída. Verifique o painel da Manus AI.";
      } else if (status === "error") {
        throw new Error("Manus AI task failed with error status");
      }

      retries++;
    }

    if (!aiAnalysis && retries >= maxRetries) {
      aiAnalysis = "A análise está levando mais tempo que o esperado. Você será notificado assim que o relatório estiver pronto no seu dashboard da Manus AI.";
    }

    // SAVE LEAD TO POSTGRES
    try {
      await ensureLeadsTableExists();
      const client = await pool.connect();
      try {
        await client.query(
          `INSERT INTO leads (name, email, whatsapp, company, business_data, score, ai_analysis) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            formData.contact?.name || "",
            formData.contact?.email || "",
            formData.contact?.whatsapp || "",
            formData.contact?.company || "",
            JSON.stringify(formData.business),
            overallScore,
            aiAnalysis
          ]
        );
        console.log("Lead saved successfully");
      } finally {
        client.release();
      }
    } catch (dbError) {
      console.error("Failed to save lead to DB:", dbError);
      // We don't fail the request if DB fails, as the user still wants their analysis
    }

    return NextResponse.json({ aiAnalysis });
  } catch (error) {
    console.error("API Route Error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
