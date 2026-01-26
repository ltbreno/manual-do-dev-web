// Tipos para o formulário de Raio-X de Viagem (Agência)

// 1. MOTIVO E TIPO
export type TravelPurpose =
  | "leisure"       // Turismo / lazer
  | "shopping"      // Compras
  | "family"        // Visitar família ou amigos
  | "event"         // Evento, feira ou congresso
  | "corporate"     // Viagem corporativa / negócios
  | "education"     // Imersão, curso ou treinamento
  | "undefined";    // Ainda não defini

export type TravelType =
  | "personal"      // Pessoal
  | "professional"  // Profissional
  | "mixed";        // Um pouco dos dois

// 2. MOMENTO
export type CurrentStage =
  | "researching"   // Apenas pesquisando
  | "comparing"     // Comparando opções
  | "ready"         // Pronto para fechar
  | "urgent";       // Preciso viajar com urgência

export type DecisionMaker =
  | "me"            // Eu mesmo
  | "other"         // Outra pessoa
  | "shared";       // Decisão compartilhada

// 3. BUROCRACIA (VISTO)
export type VisaStatus =
  | "valid"         // Tenho visto válido
  | "expired"       // Visto vencido
  | "never_had"     // Nunca tive visto
  | "process"       // Em processo
  | "guidance";     // Preciso de orientação

// 4. GRUPO E PRAZO
export type TravelTimeline =
  | "30_days"       // Até 30 dias
  | "1_3_months"    // 1 a 3 meses
  | "3_6_months"    // 3 a 6 meses
  | "6_months_plus" // Mais de 6 meses
  | "undefined";    // Ainda não defini

export type PassengerCount =
  | "1"             // Apenas eu
  | "2"             // 2 pessoas
  | "3_4"           // 3–4 pessoas
  | "5_plus";       // 5 ou mais

// 5. INVESTIMENTO
export type BudgetPerPerson =
  | "under_1500"    // Até US$1.500
  | "1500_3000"     // US$1.500 – US$3.000
  | "3000_5000"     // US$3.000 – US$5.000
  | "over_5000"     // Acima de US$5.000
  | "undefined";    // Ainda não defini

// 6. PERFIL DE COMPRA
export type BuyingHabit =
  | "always_agency" // Sempre com agência
  | "sometimes_agency" // Às vezes com agência
  | "always_own"    // Sempre por conta própria
  | "first_trip";   // Primeira viagem

// 7. EXPECTATIVAS (Multi-select)
export type AgencyExpectation =
  | "ticket"        // Passagem
  | "ticket_hotel"  // Passagem + hotel
  | "complete_package" // Pacote completo
  | "visa_support"  // Suporte com visto
  | "custom_itinerary" // Roteiro personalizado
  | "trip_support"; // Acompanhamento durante a viagem

// 8. CONVERSÃO / CONTATO
export type ContactPreference =
  | "whatsapp"
  | "email"
  | "phone";

// Formulário Completo
export interface RaioXFormData {
  // 1. Motivo
  travelPurpose: TravelPurpose | "";
  travelType: TravelType | "";

  // 2. Momento
  currentStage: CurrentStage | "";
  decisionMaker: DecisionMaker | "";

  // 3. Visto
  visaStatus: VisaStatus | "";

  // 4. Grupo e Prazo
  travelTimeline: TravelTimeline | "";
  passengerCount: PassengerCount | "";

  // 5. Investimento
  budgetPerPerson: BudgetPerPerson | "";

  // 6. Hábito
  buyingHabit: BuyingHabit | "";

  // 7. Expectativas
  agencyExpectations: AgencyExpectation[];

  // 8. Contato
  contactPreference: ContactPreference | "";
  contact: {
    name: string;
    email: string;
    whatsapp: string;
    linkedin?: string; // Mantido opcional
  };
}

// Labels para exibição
export const TRAVEL_PURPOSE_LABELS: Record<TravelPurpose, string> = {
  leisure: "Turismo / lazer",
  shopping: "Compras",
  family: "Visitar família ou amigos",
  event: "Evento, feira ou congresso",
  corporate: "Viagem corporativa / negócios",
  education: "Imersão, curso ou treinamento",
  undefined: "Ainda não defini",
};

export const TRAVEL_TYPE_LABELS: Record<TravelType, string> = {
  personal: "Pessoal",
  professional: "Profissional",
  mixed: "Um pouco dos dois",
};

export const CURRENT_STAGE_LABELS: Record<CurrentStage, string> = {
  researching: "Apenas pesquisando",
  comparing: "Comparando opções",
  ready: "Pronto para fechar",
  urgent: "Preciso viajar com urgência",
};

export const DECISION_MAKER_LABELS: Record<DecisionMaker, string> = {
  me: "Eu mesmo",
  other: "Outra pessoa",
  shared: "Decisão compartilhada",
};

export const VISA_STATUS_LABELS: Record<VisaStatus, string> = {
  valid: "Tenho visto válido",
  expired: "Visto vencido",
  never_had: "Nunca tive visto",
  process: "Em processo",
  guidance: "Preciso de orientação",
};

export const TRAVEL_TIMELINE_LABELS: Record<TravelTimeline, string> = {
  "30_days": "Até 30 dias",
  "1_3_months": "1 a 3 meses",
  "3_6_months": "3 a 6 meses",
  "6_months_plus": "Mais de 6 meses",
  undefined: "Ainda não defini",
};

export const PASSENGER_COUNT_LABELS: Record<PassengerCount, string> = {
  "1": "Apenas eu",
  "2": "2 pessoas",
  "3_4": "3–4 pessoas",
  "5_plus": "5 ou mais",
};

export const BUDGET_PER_PERSON_LABELS: Record<BudgetPerPerson, string> = {
  under_1500: "Até US$1.500",
  "1500_3000": "US$1.500 – US$3.000",
  "3000_5000": "US$3.000 – US$5.000",
  over_5000: "Acima de US$5.000",
  undefined: "Ainda não defini",
};

export const BUYING_HABIT_LABELS: Record<BuyingHabit, string> = {
  always_agency: "Sempre com agência",
  sometimes_agency: "Às vezes com agência",
  always_own: "Sempre por conta própria",
  first_trip: "Primeira viagem",
};

export const AGENCY_EXPECTATION_LABELS: Record<AgencyExpectation, string> = {
  ticket: "Passagem",
  ticket_hotel: "Passagem + hotel",
  complete_package: "Pacote completo",
  visa_support: "Suporte com visto",
  custom_itinerary: "Roteiro personalizado",
  trip_support: "Acompanhamento durante a viagem",
};

// Resultado do Score (Adaptado)
export interface BusinessScore {
  category: string; // Ex: "Pacote Disney", "Compras Miami"
  score: number; // 0-100 relevância
  impact: "high" | "medium" | "low";
  description: string;
  recommendations: string[];
}

export interface RaioXResult {
  overallScore: number; // Readiness to buy
  businessScores: BusinessScore[];
  aiAnalysis: string;
  profileStrengths: string[];
  recommendations: string[];
  nextSteps: string[];
  
  // Classificação Comercial
  leadClassification?: "Hot" | "Warm" | "Cold";
  estimatedBudget?: string; // Ticket médio
}

