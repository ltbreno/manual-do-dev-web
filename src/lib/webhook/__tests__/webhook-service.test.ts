import { LeadWebhookPayloadMapper } from "../payload-mapper";
import { LeadWebhookService } from "../webhook-service";
import { IWebhookSender, LeadWebhookPayload, WebhookConfig, WebhookDispatchResult } from "../types";

/**
 * Remetente Mock para testes de unidade (Princípio LSP / DIP).
 */
class MockWebhookSender implements IWebhookSender {
  public lastPayload?: LeadWebhookPayload;
  public lastConfig?: WebhookConfig;
  public shouldFail = false;

  public async send(payload: LeadWebhookPayload, config: WebhookConfig): Promise<WebhookDispatchResult> {
    this.lastPayload = payload;
    this.lastConfig = config;

    if (this.shouldFail) {
      return {
        success: false,
        statusCode: 500,
        error: "Internal Server Error Simulado",
      };
    }

    return {
      success: true,
      statusCode: 200,
      responseBody: JSON.stringify({ status: "success" }),
    };
  }
}

async function runTests() {
  console.log("=== INICIANDO TESTES DO WEBHOOK SERVICE ===");

  // Teste 1: Payload Mapper
  const mapper = new LeadWebhookPayloadMapper();
  const sampleFormData = {
    contact: {
      name: "Maria Oliveira",
      email: "maria@empresa.com",
      whatsapp: "+5511988887777",
    },
    company: "Empresa Exemplo",
    goal: "permanent",
    timeframe: "immediate",
    profile: "business",
    files: [{ name: "doc1.pdf", type: "application/pdf" }],
  };

  const sampleResult = {
    overallScore: 92,
    leadClassification: "Hot",
    riskAnalysis: "Low",
  };

  const payload = mapper.mapToPayload(99, sampleFormData, sampleResult);

  if (payload.event !== "lead.created") throw new Error("Evento deve ser 'lead.created'");
  if (payload.data.id !== 99) throw new Error("ID do lead incorreto");
  if (payload.data.contact.name !== "Maria Oliveira") throw new Error("Nome do contato incorreto");
  if (payload.data.assessment.score !== 92) throw new Error("Score da avaliação incorreto");
  if (payload.data.files.length !== 1) throw new Error("Quantidade de arquivos incorreta");

  console.log("✅ Teste 1 (Payload Mapper): Sucesso!");

  // Teste 2: Injeção de Dependência e Envio do Service
  const mockSender = new MockWebhookSender();
  const service = new LeadWebhookService(mockSender, mapper);

  const resSuccess = await service.dispatchLead(100, sampleFormData, sampleResult);

  if (!resSuccess.success) throw new Error("Envio deveria ter retornado sucesso");
  if (mockSender.lastPayload?.data.id !== 100) throw new Error("Payload do mock incorreto");
  if (mockSender.lastConfig?.targetUrl !== "https://onbridge.com.br/webhook/manual-do-brasileiro") {
    throw new Error("URL de destino padrão incorreta");
  }

  console.log("✅ Teste 2 (LeadWebhookService com MockSender): Sucesso!");

  // Teste 3: Tratamento de Falha no Envio
  mockSender.shouldFail = true;
  const resFail = await service.dispatchLead(101, sampleFormData, sampleResult);

  if (resFail.success) throw new Error("Envio deveria ter retornado erro");
  if (resFail.statusCode !== 500) throw new Error("Código de status deve ser 500");

  console.log("✅ Teste 3 (Tratamento de erro no webhook): Sucesso!");
  console.log("=== TODOS OS TESTES PASSARAM COM SUCESSO! ===");
}

runTests().catch((err) => {
  console.error("❌ FALHA NOS TESTES:", err);
  process.exit(1);
});
