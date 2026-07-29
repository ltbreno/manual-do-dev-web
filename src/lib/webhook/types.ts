/**
 * Contrato de dados e abstrações para o serviço de Webhook de Leads.
 * Segue os princípios Interface Segregation (ISP) e Dependency Inversion (DIP).
 */

export interface LeadContact {
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  linkedin?: string | null;
}

export interface LeadAssessment {
  score: number;
  classification: string | null;
  legalRisk: string | null;
  goal?: string | null;
  timeframe?: string | null;
  profile?: string | null;
}

export interface LeadFile {
  name: string;
  type: string;
}

export interface LeadWebhookPayload {
  event: "lead.created";
  timestamp: string;
  data: {
    id: number | string | null;
    source: string;
    contact: LeadContact;
    company: string | null;
    assessment: LeadAssessment;
    files: LeadFile[];
    formData: Record<string, unknown>;
  };
}

export interface WebhookDispatchResult {
  success: boolean;
  statusCode?: number;
  error?: string;
  responseBody?: string;
}

export interface WebhookConfig {
  targetUrl: string;
  secret?: string;
  timeoutMs?: number;
}

/**
 * Interface para Mapeamento de Payloads (SRP / ISP)
 */
export interface ILeadWebhookPayloadMapper {
  mapToPayload(
    leadId: number | string | null | undefined,
    formData: Record<string, unknown>,
    result: Record<string, unknown>
  ): LeadWebhookPayload;
}

/**
 * Interface para Envio de Webhooks (SRP / ISP / DIP)
 */
export interface IWebhookSender {
  send(payload: LeadWebhookPayload, config: WebhookConfig): Promise<WebhookDispatchResult>;
}
