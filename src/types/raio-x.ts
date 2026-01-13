// Tipos para o formulário de Tipos de Visto EUA

export type VisaPurpose =
  | "tourism"
  | "business"
  | "study"
  | "work"
  | "investment_immigration";

export type StayDuration =
  | "short_visit"
  | "medium_stay"
  | "long_stay"
  | "permanent_residence";

export type FinancialSupport =
  | "self_funded"
  | "family_support"
  | "employer_sponsor"
  | "scholarship_sponsor";

export type Qualifications =
  | "no_higher_education"
  | "bachelor_degree"
  | "advanced_degree" // Masters/PhD
  | "specialized_skills" // Arts, Science, Athletics
  | "investment_capital"; // High net worth

export type EnglishProficiency =
  | "none"
  | "basic"
  | "intermediate"
  | "fluent";

// Formulário completo
export interface RaioXFormData {
  business: { // Keeping 'business' key for compatibility or renaming? better rename but might break other things. Let's keep structure but change content
    visaPurpose: VisaPurpose;
    stayDuration: StayDuration;
    financialSupport: FinancialSupport;
    qualifications: Qualifications;
    englishProficiency: EnglishProficiency;
  };
  contact: {
    name: string;
    email: string;
    whatsapp: string;
    company: string; // Maybe rename to "currentJob" or "background" but "company" is fine for form
  };
}

// Labels para exibição
export const VISA_PURPOSE_LABELS: Record<VisaPurpose, string> = {
  tourism: "Turismo e Lazer (Disney, Nova York, etc)",
  business: "Negócios (Reuniões, Conferências - sem remuneração nos EUA)",
  study: "Estudos (Universidade, Inglês, Curso Profissionalizante)",
  work: "Trabalho (Emprego com empresa americana)",
  investment_immigration: "Investimento ou Imigração (Greencard)",
};

export const STAY_DURATION_LABELS: Record<StayDuration, string> = {
  short_visit: "Curta Duração (Férias / até 3 meses)",
  medium_stay: "Média Duração (Intercâmbio / até 1 ano)",
  long_stay: "Longa Duração (Trabalho / Vários anos)",
  permanent_residence: "Residência Permanente (Morar para sempre)",
};

export const FINANCIAL_SUPPORT_LABELS: Record<FinancialSupport, string> = {
  self_funded: "Recursos Próprios (Tenho o dinheiro guardado)",
  family_support: "Suporte Familiar (Pais ou parentes pagam)",
  employer_sponsor: "Empregador (Empresa paga ou patrocina)",
  scholarship_sponsor: "Bolsa de Estudos / Outro Patrocínio",
};

export const QUALIFICATIONS_LABELS: Record<Qualifications, string> = {
  no_higher_education: "Ensino Médio ou Técnico",
  bachelor_degree: "Ensino Superior Completo (Bacharelado)",
  advanced_degree: "Pós-Graduação (Mestrado/Doutorado)",
  specialized_skills: "Habilidades Extraordinárias (Artes, Esportes, Ciências)",
  investment_capital: "Capital de Investimento (Tenho recursos para investir no país)",
};

export const ENGLISH_PROFICIENCY_LABELS: Record<EnglishProficiency, string> = {
  none: "Nenhum (Não falo nada)",
  basic: "Básico (Entendo o básico para viajar)",
  intermediate: "Intermediário (Consigo conversar e estudar)",
  fluent: "Fluente (Comunicação profissional)",
};

// Resultado do Score
export interface BusinessScore {
  category: string; // Ex: "Eligibilidade B1/B2", "Eligibilidade H1B"
  score: number; // 0-100 probability
  impact: "high" | "medium" | "low";
  description: string;
  recommendations: string[];
}

export interface RaioXResult {
  overallScore: number; // General visa readiness
  businessScores: BusinessScore[];
  aiAnalysis: string;
  profileStrengths: string[];
  recommendations: string[];
  nextSteps: string[];
}
