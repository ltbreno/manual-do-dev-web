import { NextResponse } from "next/server";
import pool, { ensureLeadsTableExists } from "@/lib/db";

interface ManusAIMessage {
  content?: string | unknown | unknown[];
  text?: string;
}

interface ManusAITaskResponse {
  status: string;
  output?: (ManusAIMessage | string)[];
}

export async function POST(req: Request) {
  try {
    const { formData, overallScore, classification, estimatedBudget } = await req.json();

    const MANUS_API_KEY = process.env.NEXT_PUBLIC_MANUS_AI_API_KEY || "sk-wonuJ4kvwESYGUa8tSmd609L7D5axuwYeCFBJuLkbzYaTz2DJCGKNv3oSMuS-5bhXr5zzbuHcP3AjBmjK2T2cE5tBkzJ";
    const BASE_URL = "https://api.manus.ai/v1/tasks";

    const prompt = `
      Você é um Consultor de Viagens Sênior especializado em experiências nos EUA (Disney, Nova York, Califórnia, Compras).
      Sua tarefa é fazer uma análise preliminar (Raio-X) de um potencial cliente de viagem.
      
      DADOS DO CLIENTE:
      - Nome: ${formData.contact.name}
      - Motivo: ${formData.travelPurpose} (Tipo: ${formData.travelType})
      - Estágio: ${formData.currentStage}
      - Decisor: ${formData.decisionMaker}
      - Status Visto: ${formData.visaStatus}
      - Grupo: ${formData.passengerCount} pessoas
      - Prazo: ${formData.travelTimeline}
      - Orçamento/Pessoa: ${formData.budgetPerPerson}
      - Hábito de Compra: ${formData.buyingHabit}
      - Expectativas: ${formData.agencyExpectations.join(", ")}
      
      SCORE COMERCIAL: ${overallScore}/100
      CLASSIFICAÇÃO: ${classification} (Hot/Warm/Cold)
      TICKET ESTIMADO: ${estimatedBudget}
      
      TAREFA:
      Gere um "Raio-X de Viagem" personalizado.
      
      O relatório deve conter:
      1. **Perfil do Viajante**: Resumo do estilo do cliente (ex: Econômico, Luxo, Família, Corporativo).
      2. **Sugestões de Destino/Roteiro**: Baseado no motivo (ex: se Compras, sugira Orlando/Miami; se Lazer Família, Disney).
      3. **Pontos de Atenção**: Ex: Visto vencido, prazo curto, orçamento apertado para o destino.
      4. **Estratégia de Venda**: O que oferecer para fechar (Pacote completo? Só aéreo? Consultoria?).
      5. **Próximo Passo**: Sugestão de abordagem para o vendedor.

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

      const pollData: ManusAITaskResponse = await pollResponse.json();
      status = pollData.status;

      if (status === "completed") {
        const messages = pollData.output || [];
        // Skip the first message (the prompt) and join the rest
        aiAnalysis = messages
          .slice(1) // Remove o prompt original da resposta
          .map((m: ManusAIMessage | string) => {
            if (typeof m === "string") return m;
            
            // 1. Try to extract from 'content'
            if (m.content) {
              if (typeof m.content === "string") return m.content;
              if (Array.isArray(m.content)) {
                return (m.content as any[])
                  .map((part: any) => 
                    typeof part === "string" ? part : (part.text || part.content || JSON.stringify(part))
                  )
                  .join("");
              }
              if (typeof m.content === "object") {
                const anyContent = m.content as any;
                return anyContent.text || anyContent.content || JSON.stringify(m.content);
              }
            }

            // 2. Try to extract from 'text'
            if (m.text && typeof m.text === "string") return m.text;

            // 3. Fallback to full object stringification
            return JSON.stringify(m);
          })
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
          `INSERT INTO leads (name, email, whatsapp, company, business_data, score, ai_analysis, classification, legal_risk, uploaded_files) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            formData.contact.name,
            formData.contact.email,
            formData.contact.whatsapp,
            "Travel Lead", // Using generic company for B2C travel
            JSON.stringify(formData),
            overallScore,
            aiAnalysis,
            classification,
            "Low", // Risk is not main factor in travel, default to Low
            JSON.stringify(formData.uploadedFiles || [])
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
