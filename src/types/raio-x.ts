// Tipos para o formulário do Raio-X de Imigração

export type MaritalStatus = "single" | "married" | "divorced" | "widowed";

export type EducationLevel =
  | "high_school"
  | "technical"
  | "bachelors"
  | "masters"
  | "doctorate"
  | "post_doctorate";

export type EducationArea =
  | "stem" // Science, Technology, Engineering, Math
  | "business"
  | "health"
  | "arts"
  | "law"
  | "humanities"
  | "other";

export type EnglishLevel =
  | "none"
  | "basic"
  | "intermediate"
  | "advanced"
  | "fluent"
  | "native";

export type InvestmentRange =
  | "none"
  | "under_50k"
  | "50k_100k"
  | "100k_250k"
  | "250k_500k"
  | "over_500k";

export type Timeline =
  | "asap" // O mais rápido possível
  | "6_months"
  | "1_year"
  | "2_years"
  | "flexible";

export type VisaPreference =
  | "eb1"
  | "eb2_niw"
  | "eb3"
  | "o1"
  | "l1"
  | "e2"
  | "not_sure";

// Dados do Step 1 - Dados Pessoais
export interface PersonalData {
  age: number;
  maritalStatus: MaritalStatus;
  dependents: number;
  currentCountry: string;
}

// Dados do Step 2 - Educação
export interface EducationData {
  level: EducationLevel;
  area: EducationArea;
  institutionCountry: string;
  hasPostGrad: boolean;
  publications: number;
  patents: number;
}

// Dados do Step 3 - Experiência Profissional
export interface ProfessionalData {
  yearsExperience: number;
  currentRole: string;
  industry: string;
  isManager: boolean;
  teamSize: number;
  hasInternationalExp: boolean;
  awards: number;
  speakingEngagements: number;
}

// Dados do Step 4 - Idiomas
export interface LanguageData {
  englishLevel: EnglishLevel;
  spanishLevel: EnglishLevel;
  otherLanguages: string[];
}

// Dados do Step 5 - Situação Financeira
export interface FinancialData {
  investmentRange: InvestmentRange;
  hasUSBusiness: boolean;
  hasUSJobOffer: boolean;
  sponsorCompany: string;
}

// Dados do Step 6 - Objetivos
export interface ObjectivesData {
  visaPreference: VisaPreference;
  timeline: Timeline;
  primaryGoal: string;
  willingToStudy: boolean;
}

// Formulário completo
export interface RaioXFormData {
  personal: PersonalData;
  education: EducationData;
  professional: ProfessionalData;
  languages: LanguageData;
  financial: FinancialData;
  objectives: ObjectivesData;
}

// Resultado do Score
export interface VisaScore {
  visaType: string;
  visaCode: string;
  score: number; // 0-100
  compatibility: "high" | "medium" | "low";
  requirements: string[];
  strengths: string[];
  improvements: string[];
}

export interface RaioXResult {
  overallScore: number; // 0-100
  visaScores: VisaScore[];
  topVisa: VisaScore;
  profileStrengths: string[];
  recommendations: string[];
  nextSteps: string[];
}

// Estado do formulário
export interface FormState {
  currentStep: number;
  totalSteps: number;
  isComplete: boolean;
  data: Partial<RaioXFormData>;
}

// Labels para exibição
export const MARITAL_STATUS_LABELS: Record<MaritalStatus, string> = {
  single: "Solteiro(a)",
  married: "Casado(a)",
  divorced: "Divorciado(a)",
  widowed: "Viúvo(a)",
};

export const EDUCATION_LEVEL_LABELS: Record<EducationLevel, string> = {
  high_school: "Ensino Médio",
  technical: "Técnico",
  bachelors: "Graduação",
  masters: "Mestrado",
  doctorate: "Doutorado",
  post_doctorate: "Pós-Doutorado",
};

export const EDUCATION_AREA_LABELS: Record<EducationArea, string> = {
  stem: "STEM (Ciências, Tecnologia, Engenharia, Matemática)",
  business: "Negócios e Administração",
  health: "Saúde e Medicina",
  arts: "Artes e Design",
  law: "Direito",
  humanities: "Humanas e Sociais",
  other: "Outra área",
};

export const ENGLISH_LEVEL_LABELS: Record<EnglishLevel, string> = {
  none: "Não falo inglês",
  basic: "Básico",
  intermediate: "Intermediário",
  advanced: "Avançado",
  fluent: "Fluente",
  native: "Nativo",
};

export const INVESTMENT_RANGE_LABELS: Record<InvestmentRange, string> = {
  none: "Não tenho capital para investir",
  under_50k: "Menos de US$ 50.000",
  "50k_100k": "US$ 50.000 - US$ 100.000",
  "100k_250k": "US$ 100.000 - US$ 250.000",
  "250k_500k": "US$ 250.000 - US$ 500.000",
  over_500k: "Mais de US$ 500.000",
};

export const TIMELINE_LABELS: Record<Timeline, string> = {
  asap: "O mais rápido possível",
  "6_months": "Nos próximos 6 meses",
  "1_year": "Em 1 ano",
  "2_years": "Em 2 anos",
  flexible: "Flexível / Sem pressa",
};

export const VISA_PREFERENCE_LABELS: Record<VisaPreference, string> = {
  eb1: "EB-1 (Green Card - Habilidade Extraordinária)",
  eb2_niw: "EB-2 NIW (Green Card - Interesse Nacional)",
  eb3: "EB-3 (Green Card - Trabalhador Qualificado)",
  o1: "O-1 (Visto Temporário - Habilidade Extraordinária)",
  l1: "L-1 (Transferência Intracompany)",
  e2: "E-2 (Investidor)",
  not_sure: "Não sei / Quero descobrir",
};

