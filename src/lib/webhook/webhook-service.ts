import {
  ILeadWebhookPayloadMapper,
  IWebhookSender,
  WebhookConfig,
  WebhookDispatchResult,
} from "./types";
import { LeadWebhookPayloadMapper } from "./payload-mapper";
import { FetchWebhookSender } from "./http-sender";

export const DEFAULT_WEBHOOK_URL = "https://onbridge.com.br/webhook/manual-do-brasileiro";

/**
 * Serviço de Orquestração de Webhook para Leads.
 * Segue os princípios Open/Closed (OCP) e Inversão de Dependência (DIP),
 * aceitando injeção do remetente e do mapeador.
 */
export class LeadWebhookService {
  private sender: IWebhookSender;
  private mapper: ILeadWebhookPayloadMapper;

  constructor(
    sender?: IWebhookSender,
    mapper?: ILeadWebhookPayloadMapper
  ) {
    this.sender = sender || new FetchWebhookSender();
    this.mapper = mapper || new LeadWebhookPayloadMapper();
  }

  /**
   * Dispara o webhook enviando os dados do lead formatados.
   */
  public async dispatchLead(
    leadId: number | string | null | undefined,
    formData: Record<string, unknown>,
    result: Record<string, unknown>
  ): Promise<WebhookDispatchResult> {
    try {
      const payload = this.mapper.mapToPayload(leadId, formData, result);

      const targetUrl =
        process.env.ONBRIDGE_WEBHOOK_URL ||
        process.env.LEAD_WEBHOOK_URL ||
        DEFAULT_WEBHOOK_URL;

      const secret = process.env.ONBRIDGE_WEBHOOK_SECRET || process.env.LEAD_WEBHOOK_SECRET;

      const config: WebhookConfig = {
        targetUrl,
        secret,
        timeoutMs: 8000,
      };

      const dispatchResult = await this.sender.send(payload, config);

      if (!dispatchResult.success) {
        console.error("[LeadWebhookService] Falha no disparo do webhook:", {
          targetUrl,
          error: dispatchResult.error,
          statusCode: dispatchResult.statusCode,
          responseBody: dispatchResult.responseBody,
        });
      } else {
        console.log("[LeadWebhookService] Webhook entregue com sucesso:", {
          targetUrl,
          statusCode: dispatchResult.statusCode,
          leadId,
        });
      }

      return dispatchResult;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro inesperado ao processar webhook";
      console.error("[LeadWebhookService] Erro fatal durante a execução:", message);
      return {
        success: false,
        error: message,
      };
    }
  }
}

// Instância singleton pronta para consumo
export const leadWebhookService = new LeadWebhookService();
