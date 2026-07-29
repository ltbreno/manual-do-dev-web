import {
  ILeadWebhookPayloadMapper,
  LeadWebhookPayload,
  LeadContact,
  LeadAssessment,
  LeadFile,
} from "./types";

/**
 * Mapeador responsável exclusivamente por transformar dados recebidos
 * da aplicação no formato padronizado do Webhook (Princípio SRP).
 */
export class LeadWebhookPayloadMapper implements ILeadWebhookPayloadMapper {
  public mapToPayload(
    leadId: number | string | null | undefined,
    formData: Record<string, unknown>,
    result: Record<string, unknown>
  ): LeadWebhookPayload {
    const rawContact = (formData.contact || {}) as Record<string, unknown>;

    const contact: LeadContact = {
      name: typeof rawContact.name === "string" && rawContact.name.trim() !== "" ? rawContact.name : null,
      email: typeof rawContact.email === "string" && rawContact.email.trim() !== "" ? rawContact.email : null,
      whatsapp: typeof rawContact.whatsapp === "string" && rawContact.whatsapp.trim() !== "" ? rawContact.whatsapp : null,
      linkedin: typeof rawContact.linkedin === "string" && rawContact.linkedin.trim() !== "" ? rawContact.linkedin : null,
    };

    const assessment: LeadAssessment = {
      score: typeof result.overallScore === "number" ? result.overallScore : 0,
      classification: typeof result.leadClassification === "string" ? result.leadClassification : null,
      legalRisk: typeof result.riskAnalysis === "string" ? result.riskAnalysis : null,
      goal: typeof formData.goal === "string" ? formData.goal : null,
      timeframe: typeof formData.timeframe === "string" ? formData.timeframe : null,
      profile: typeof formData.profile === "string" ? formData.profile : null,
    };

    const rawFiles = Array.isArray(formData.files) ? formData.files : [];
    const files: LeadFile[] = rawFiles.map((fileItem: unknown) => {
      const f = (fileItem || {}) as Record<string, unknown>;
      return {
        name: typeof f.name === "string" ? f.name : "",
        type: typeof f.type === "string" ? f.type : "",
      };
    });

    const company = typeof formData.company === "string" && formData.company.trim() !== "" ? formData.company : null;

    return {
      event: "lead.created",
      timestamp: new Date().toISOString(),
      data: {
        id: leadId ?? null,
        source: "manual-do-dev-web",
        contact,
        company,
        assessment,
        files,
        formData,
      },
    };
  }
}
