// Tipos para o formulário de Tipos de Visto EUA

// BLOCO 1 - OBJETIVO REAL
export type VisaPurpose =
  | "tourism"
  | "business"
  | "study"
  | "work"
  | "immigration";

export type Intent =
  | "permanent"
  | "temporary_work"
  | "evaluate";

// BLOCO 2 - PRAZO E PRIORIDADE
export type Timeline =
  | "immediate" // 0-3 meses
  | "short"     // 3-6 meses
  | "medium"    // 6-12 meses
  | "long"      // 12-24 meses
  | "undefined";

export type ConsultedLawyer =
  | "yes_second_opinion"
  | "no_first_time"
  | "yes_no_progress";

// BLOCO 3 - HISTÓRICO IMIGRATÓRIO
export type ImmigrationIssue =
  | "none"
  | "denial"
  | "overstay"
  | "entry_denied"
  | "deportation"
  | "other";

// BLOCO 4 - PERFIL PROFISSIONAL
export type EducationLevel =
  | "high_school"
  | "bachelors"
  | "grad_school";

export type ExperienceYears =
  | "under_5"
  | "5_10"
  | "10_15"
  | "over_15";

// BLOCO 5 - PROVAS OBJETIVAS
export type Achievement =
  | "prizes"
  | "media"
  | "leadership"
  | "impact_projects"
  | "publications"
  | "judging"
  | "high_salary"
  | "none";

export type ImpactClaim =
  | "clear_impact"
  | "potential_impact"
  | "unsure";

// BLOCO 6 - CAPACIDADE FINANCEIRA
export type FundingSource =
  | "self"
  | "company"
  | "family"
  | "investor";

export type InvestmentBudget =
  | "under_5k"
  | "5k_10k"
  | "10k_15k"
  | "over_15k";

// BLOCO 8 - CONVERSÃO
export type WillingToConsult =
  | "yes_asap"
  | "yes_later"
  | "no";

export type ContactPreference =
  | "name"
  | "email"
  | "whatsapp";

// Formulário Completo
export interface RaioXFormData {
  // BLOCO 1
  visaPurpose: VisaPurpose | "";
  intent: Intent | "";
  
  // BLOCO 2
  timeline: Timeline | "";
  consultedLawyer: ConsultedLawyer | "";

  // BLOCO 3
  immigrationIssues: ImmigrationIssue[];
  immigrationIssueDetails?: string;

  // BLOCO 4
  educationLevel: EducationLevel | "";
  fieldOfWork: string;
  experienceYears: ExperienceYears | "";

  // BLOCO 5
  achievements: Achievement[];
  impactClaim: ImpactClaim | "";

  // BLOCO 6
  fundingSource: FundingSource | "";
  investmentBudget: InvestmentBudget | "";

  // BLOCO 7 - Documentos (Simplificado para metadados por enquanto)
  wantsToUpload: boolean;
  uploadedFiles?: { name: string; type: string }[];

  // BLOCO 8 & Contato
  willingToConsult: WillingToConsult | "";
  contactPreference: ContactPreference | "";
  contact: {
    name: string;
    email: string;
    whatsapp: string;
    linkedin?: string;
  };
}

// Labels para exibição (Mapeamento)
export const VISA_PURPOSE_LABELS: Record<VisaPurpose, string> = {
  tourism: "Turismo / visitas ocasionais",
  business: "Negócios temporários (reuniões, eventos)",
  study: "Estudos (idiomas, universidade)",
  work: "Trabalho temporário com empresa americana",
  immigration: "Imigração permanente (Green Card)",
};

export const INTENT_LABELS: Record<Intent, string> = {
  permanent: "Morar permanentemente nos EUA",
  temporary_work: "Trabalhar por alguns anos e depois decidir",
  evaluate: "Apenas avaliar possibilidades futuras",
};

export const TIMELINE_LABELS: Record<Timeline, string> = {
  immediate: "Imediatamente (0–3 meses)",
  short: "Curto prazo (3–6 meses)",
  medium: "Médio prazo (6–12 meses)",
  long: "Longo prazo (12–24 meses)",
  undefined: "Ainda não tenho prazo definido",
};

export const CONSULTED_LAWYER_LABELS: Record<ConsultedLawyer, string> = {
  yes_second_opinion: "Sim, e quero uma segunda opinião",
  no_first_time: "Não, esta é minha primeira análise",
  yes_no_progress: "Já conversei, mas não avancei",
};

export const IMMIGRATION_ISSUE_LABELS: Record<ImmigrationIssue, string> = {
  none: "Nunca",
  denial: "Visto negado",
  overstay: "Overstay (ficou além do permitido)",
  entry_denied: "Entrada negada na fronteira",
  deportation: "Processo de remoção/deportação",
  other: "Outro",
};

export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  high_school: "Ensino médio / técnico",
  bachelors: "Ensino superior (bacharelado)",
  grad_school: "Pós-graduação (MBA, mestrado ou doutorado)",
};

export const EXPERIENCE_YEARS_LABELS: Record<ExperienceYears, string> = {
  under_5: "Menos de 5 anos",
  "5_10": "5–10 anos",
  "10_15": "10–15 anos",
  over_15: "Mais de 15 anos",
};

export const ACHIEVEMENT_LABELS: Record<Achievement, string> = {
  prizes: "Prêmios ou reconhecimentos relevantes",
  media: "Reportagens ou matérias sobre você",
  leadership: "Cargo de liderança ou papel crítico",
  impact_projects: "Projetos de impacto comprovado",
  publications: "Publicações acadêmicas ou patentes",
  judging: "Julgamento do trabalho de outros",
  high_salary: "Remuneração acima da média",
  none: "Nenhum dos itens acima",
};

export const IMPACT_CLAIM_LABELS: Record<ImpactClaim, string> = {
  clear_impact: "Sim, de forma clara e mensurável",
  potential_impact: "Sim, mas ainda não sei como demonstrar",
  unsure: "Não tenho certeza",
};

export const FUNDING_SOURCE_LABELS: Record<FundingSource, string> = {
  self: "Recursos próprios",
  company: "Empresa / patrocinador",
  family: "Família",
  investor: "Investidor / sócio",
};

export const INVESTMENT_BUDGET_LABELS: Record<InvestmentBudget, string> = {
  under_5k: "Até US$ 5.000",
  "5k_10k": "US$ 5.000 – US$ 10.000",
  "10k_15k": "US$ 10.000 – US$ 15.000",
  over_15k: "Acima de US$ 15.000",
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
  // Novos campos para o dossiê do advogado
  leadClassification?: "Hot" | "Warm" | "Cold";
  legalRisk?: "High" | "Medium" | "Low";
}

export interface VisaScore {
  visaCode: string;
  visaType: string;
  score: number;
  compatibility: "high" | "medium" | "low";
  strengths: string[];
  improvements: string[];
  requirements: string[];
}
