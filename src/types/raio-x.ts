// Arquivo: src/types/raio-x.ts

// --- CAMADA 1: INTENÇÃO E PRAZO ---

export type ImmigrationGoal =
  | "tourism"       // Turismo / Visitas (Cai fora do fluxo principal se for só isso)
  | "business_temp" // Negócios temporários (B-1)
  | "study"         // Estudos (F-1)
  | "work_temp"     // Trabalho temporário (H-1B, O-1, P, etc enquadrados aqui inicialmente)
  | "permanent";    // Imigração permanente (Green Card)

export type Timeframe =
  | "immediate" // 0-3 meses
  | "short"     // 3-6 meses
  | "medium"    // 6-12 meses
  | "long"      // 12-24 meses
  | "idk";      // Ainda não tenho prazo

export type ImmigrationHistory =
  | "none"
  | "visa_denied"
  | "overstay"
  | "entry_denied"
  | "other";

// --- CAMADA 2: PERFIL PRINCIPAL ---

export type UserProfile =
  | "professional" // Profissional individual
  | "business"     // Empresário / Executivo
  | "investor"     // Investidor
  | "idk";         // Não sei

// --- CAMADA 3: DETALHAMENTO POR PERFIL ---

// PERFIL A: PROFISSIONAL (EB-1A / O-1 / EB-2 NIW)
export type EducationLevel =
  | "high_school"
  | "bachelors"
  | "masters_doctorate";

export type ExperienceYears =
  | "under_5"
  | "5_10"
  | "10_15"
  | "over_15";

// Critérios EB-1A / O-1
export type ProfessionalAchievement =
  | "prizes"          // Prêmios
  | "media"           // Mídia sobre você
  | "leadership"      // Liderança
  | "original_contribution" // Contribuição original
  | "scholarly_articles" // Artigos acadêmicos
  | "judging"         // Julgamento de outros
  | "high_salary"     // Salário alto
  | "none";

// PERFIL B: EMPRESÁRIO (L-1 / EB-1C)
export type CompanyRole =
  | "executive"
  | "manager"
  | "technical";

export type BusinessRelation =
  | "matrix_subsidiary" // Matriz/Filial
  | "controller_subsidiary" // Controladora/Subsidiária
  | "affiliate"        // Afiliada
  | "undefined";       // Ainda não definida

export type USCompanyStatus =
  | "exists"
  | "will_open"
  | "no";

// PERFIL C: INVESTIDOR (E-2 / EB-5)
export type InvestmentCapital =
  | "under_100k"
  | "100k_300k"
  | "300k_800k"
  | "over_800k";

export type ManagementRole =
  | "active"  // E-2 (gerir o negócio)
  | "passive"; // EB-5 (apenas investir)

export type LawfulFunds =
  | "yes"
  | "unsure";

// --- CAMADA 4: FINANCEIRO ---

export type FundingSource =
  | "self"
  | "company"
  | "family"
  | "other";

export type LegalBudgetParams =
  | "under_5k"
  | "5k_10k"
  | "10k_20k"
  | "over_20k";

// --- CAMADA FINAL: CONTATO ---

export type ConsultationInterest =
  | "yes_urgent"
  | "yes_normal"
  | "not_yet";

export interface ContactData {
  name: string;
  email: string;
  whatsapp: string;
  linkedin?: string;
}

// --- GLOBAL STATE DO FORMULÁRIO ---

export interface ImmigrationFormData {
  // Layer 1
  goal: ImmigrationGoal | "";
  timeframe: Timeframe | "";
  history: ImmigrationHistory | "";

  // Layer 2
  profile: UserProfile | "";

  // Layer 3 - Professional
  education?: EducationLevel;
  experience?: ExperienceYears;
  achievements?: ProfessionalAchievement[];
  niwLogic?: {
    impact: boolean | "unsure";
  };

  // Layer 3 - Business
  isBusinessOwner?: boolean;
  companyYears?: string; // <1, 1-3, 3+
  workedOneYearInLastThree?: boolean; // L-1 req
  currentRole?: CompanyRole;
  usEntityStatus?: USCompanyStatus;
  businessRelation?: BusinessRelation;

  // Layer 3 - Investor
  hasCapital?: boolean;
  capitalAmount?: InvestmentCapital;
  managementIntent?: ManagementRole;
  lawfulSource?: LawfulFunds;

  // Layer 4
  fundingSource: FundingSource | "";
  legalBudget: LegalBudgetParams | "";

  // Layer 5 - Conversão / Arquivos
  wantsAssessment: boolean;
  files?: File[]; // (Simulação, não persistido igual string)
  consultationInterest?: ConsultationInterest;

  contact: ContactData;
}

// --- RESULTADOS ---

export interface ImmigrationResult {
  overallScore: number;
  leadClassification: "Hot" | "Warm" | "Cold";
  recommendedVisas: string[]; // ex: ["EB-2 NIW", "O-1"]
  profileStrengths: string[];
  riskAnalysis: string;
  nextSteps: string[];
}
