import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formData, overallScore } = await req.json();

    const MANUS_API_KEY = process.env.NEXT_PUBLIC_MANUS_AI_API_KEY || "sk-wonuJ4kvwESYGUa8tSmd609L7D5axuwYeCFBJuLkbzYaTz2DJCGKNv3oSMuS-5bhXr5zzbuHcP3AjBmjK2T2cE5tBkzJ";
    const BASE_URL = "https://api.manus.ai/v1/tasks"; // Native task endpoint as per docs

    const prompt = `
      Você é a Manus AI, um consultor estratégico de elite focado em escala de negócios e maturidade empresarial.
      Analise os seguintes dados de uma empresa que realizou um Diagnóstico de Raio-X:

      - Previsibilidade de Receita: ${formData.business.revenuePredictability}
      - Margem de Lucro: ${formData.business.profitMargin}
      - Dependência do Dono: ${formData.business.ownerDependence}
      - Ciclo de Vendas: ${formData.business.salesCycle}
      - Clareza de Métricas (CAC/LTV): ${formData.business.metricsClarity}
      - Concentração de Clientes: ${formData.business.clientConcentration}
      - Maturidade do Time: ${formData.business.teamMaturity}
      - Fluxo de Caixa / Reserva: ${formData.business.cashFlow}
      
      Score Geral de Maturidade: ${overallScore}/100

      Tarefa:
      Gere um relatório estratégico de alto nível, com tom profissional, encorajador e direto ao ponto.
      O relatório deve conter:
      1. Uma interpretação rápida do cenário atual baseado no score.
      2. Análise dos principais gargalos identificados.
      3. Um "Veredito da Manus AI" com a prioridade número 1 para os próximos 90 dias.
      
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
