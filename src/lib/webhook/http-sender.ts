import { IWebhookSender, LeadWebhookPayload, WebhookConfig, WebhookDispatchResult } from "./types";

/**
 * Cliente HTTP responsável exclusivamente pelo envio de requisições de webhook (Princípios SRP / LSP).
 */
export class FetchWebhookSender implements IWebhookSender {
  public async send(payload: LeadWebhookPayload, config: WebhookConfig): Promise<WebhookDispatchResult> {
    const timeoutMs = config.timeoutMs || 8000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "ManualDoDevWeb-Webhook/1.0",
      };

      if (config.secret) {
        headers["X-Webhook-Secret"] = config.secret;
        headers["Authorization"] = `Bearer ${config.secret}`;
      }

      const response = await fetch(config.targetUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timer);

      const responseText = await response.text().catch(() => "");

      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
          error: `HTTP Error ${response.status}: ${response.statusText}`,
          responseBody: responseText,
        };
      }

      return {
        success: true,
        statusCode: response.status,
        responseBody: responseText,
      };
    } catch (err: unknown) {
      clearTimeout(timer);
      const isAbort = err instanceof Error && err.name === "AbortError";
      const message = isAbort
        ? `Timeout de ${timeoutMs}ms excedido ao enviar webhook`
        : err instanceof Error
        ? err.message
        : "Erro desconhecido ao enviar webhook";

      return {
        success: false,
        error: message,
      };
    }
  }
}
