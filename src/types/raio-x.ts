// Tipos para o formulário do Raio-X de Negócios

export type RevenuePredictability =
  | "unpredictable"
  | "some_recurrence"
  | "long_term_contracts"
  | "solid_mrr"
  | "growth_negative_churn";

export type ProfitMargin =
  | "negative_zero"
  | "low"
  | "healthy"
  | "high"
  | "exceptional";

export type OwnerDependence =
  | "full_dependence"
  | "helpers_needed"
  | "team_supervision"
  | "strategy_only"
  | "independent_operation";

export type SalesCycle =
  | "long_unpredictable"
  | "long_mapped"
  | "medium"
  | "fast"
  | "immediate";

export type MetricsClarity =
  | "dont_know"
  | "concept_only"
  | "unreliable_measurement"
  | "monthly_tracking"
  | "real_time_tracking";

export type ClientConcentration =
  | "high_risk"
  | "moderate_risk"
  | "diversified"
  | "well_balanced"
  | "fully_distributed";

export type TeamMaturity =
  | "no_team"
  | "junior_taskers"
  | "middle_management"
  | "autonomous_leads"
  | "executive_board";

export type CashFlow =
  | "hand_to_mouth"
  | "short_runway"
  | "comfortable"
  | "strong_reserve"
  | "investment_ready";

// Formulário completo
export interface RaioXFormData {
  business: {
    revenuePredictability: RevenuePredictability;
    profitMargin: ProfitMargin;
    ownerDependence: OwnerDependence;
    salesCycle: SalesCycle;
    metricsClarity: MetricsClarity;
    clientConcentration: ClientConcentration;
    teamMaturity: TeamMaturity;
    cashFlow: CashFlow;
  };
}

// ... existing interfaces ...

export const CLIENT_CONCENTRATION_LABELS: Record<ClientConcentration, string> = {
  high_risk: "Um único cliente representa mais de 50% da receita",
  moderate_risk: "Meus 3 maiores clientes representam mais de 70% da receita",
  diversified: "O maior cliente não representa mais de 20% da receita",
  well_balanced: "Receita bem distribuída entre muitos clientes pequenos/médios",
  fully_distributed: "Nenhum cliente representa mais de 5% da receita (Pulverizado)",
};

export const TEAM_MATURITY_LABELS: Record<TeamMaturity, string> = {
  no_team: "Trabalho sozinho ou apenas com freelancers pontuais",
  junior_taskers: "Tenho equipe, mas são juniores e precisam de ordens o tempo todo",
  middle_management: "Tenho gerentes/lideranças, mas eu ainda tomo as decisões finais",
  autonomous_leads: "Meus líderes têm autonomia para gerir e decidir sobre suas áreas",
  executive_board: "Tenho um board executivo que gere a empresa sem minha intervenção",
};

export const CASH_FLOW_LABELS: Record<CashFlow, string> = {
  hand_to_mouth: "Vivo 'um mês de cada vez', sem reserva financeira",
  short_runway: "Tenho reserva para cobrir 1 a 2 meses de operação se as vendas pararem",
  comfortable: "Tenho reserva para 3 a 6 meses de operação",
  strong_reserve: "Tenho reserva para mais de 6 meses e reinvesto o lucro",
  investment_ready: "Fluxo de caixa extremamente positivo e reserva para grandes investimentos",
};

// Resultado do Score
export interface BusinessScore {
  category: string;
  score: number; // 0-100
  impact: "high" | "medium" | "low";
  description: string;
  recommendations: string[];
}

export interface RaioXResult {
  overallScore: number; // 0-100
  businessScores: BusinessScore[];
  aiAnalysis: string; // Resultado gerado pela IA (Manus AI)
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
export const REVENUE_PREDICTABILITY_LABELS: Record<
  RevenuePredictability,
  string
> = {
  unpredictable: "Totalmente imprevisível, dependo de vendas novas todo mês",
  some_recurrence:
    "Tenho alguma recorrência, mas a maior parte é venda pontual",
  long_term_contracts:
    "Tenho contratos de longo prazo, mas com alta rotatividade (churn)",
  solid_mrr: "Receita recorrente sólida (MRR) que cobre todos os custos fixos",
  growth_negative_churn:
    "Receita recorrente em crescimento e com churn negativo (upsell)",
};

export const PROFIT_MARGIN_LABELS: Record<ProfitMargin, string> = {
  negative_zero: "Negativa ou zero (breakeven)",
  low: "Baixa (1% a 5%)",
  healthy: "Saudável para o setor (6% a 15%)",
  high: "Alta (16% a 25%)",
  exceptional: "Excepcional (acima de 25%)",
};

export const OWNER_DEPENDENCE_LABELS: Record<OwnerDependence, string> = {
  full_dependence: "Sim, 100%. Se eu parar, a empresa para",
  helpers_needed: "Depende muito, mas tenho ajudantes",
  team_supervision: "Tenho equipe, mas preciso supervisionar cada detalhe",
  strategy_only: "A operação roda sem mim, atuo apenas na estratégia",
  independent_operation:
    "A empresa roda 100% sem minha presença física ou operacional",
};

export const SALES_CYCLE_LABELS: Record<SalesCycle, string> = {
  long_unpredictable: "Longo e imprevisível (> 6 meses)",
  long_mapped: "Longo, mas mapeado (3-6 meses)",
  medium: "Médio (1-3 meses)",
  fast: "Rápido (< 30 dias)",
  immediate: "Imediato / Transactional (Self-service ou Venda Direta)",
};

export const METRICS_CLARITY_LABELS: Record<MetricsClarity, string> = {
  dont_know: "Não sei o que são essas siglas",
  concept_only: "Sei o conceito, mas não meço",
  unreliable_measurement: "Meço esporadicamente, mas não confio nos números",
  monthly_tracking: "Acompanho mensalmente e o LTV é maior que o CAC",
  real_time_tracking: "Acompanho em tempo real e meu LTV é > 3x o CAC",
};
