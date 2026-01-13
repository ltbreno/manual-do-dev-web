import {
  RaioXFormData,
  RaioXResult,
  BusinessScore,
  RevenuePredictability,
  ProfitMargin,
  OwnerDependence,
  SalesCycle,
  MetricsClarity,
  REVENUE_PREDICTABILITY_LABELS,
  PROFIT_MARGIN_LABELS,
  OWNER_DEPENDENCE_LABELS,
  SALES_CYCLE_LABELS,
  METRICS_CLARITY_LABELS,
  ClientConcentration,
  TeamMaturity,
  CashFlow,
  CLIENT_CONCENTRATION_LABELS,
  TEAM_MATURITY_LABELS,
  CASH_FLOW_LABELS,
} from "@/types/raio-x";

// Pontuações para cada opção
const REVENUE_SCORES: Record<RevenuePredictability, number> = {
  unpredictable: 20,
  some_recurrence: 40,
  long_term_contracts: 60,
  solid_mrr: 85,
  growth_negative_churn: 100,
};

const PROFIT_SCORES: Record<ProfitMargin, number> = {
  negative_zero: 10,
  low: 30,
  healthy: 60,
  high: 85,
  exceptional: 100,
};

const DEPENDENCE_SCORES: Record<OwnerDependence, number> = {
  full_dependence: 10,
  helpers_needed: 30,
  team_supervision: 55,
  strategy_only: 85,
  independent_operation: 100,
};

const SALES_SCORES: Record<SalesCycle, number> = {
  long_unpredictable: 20,
  long_mapped: 45,
  medium: 70,
  fast: 90,
  immediate: 100,
};

const METRICS_SCORES: Record<MetricsClarity, number> = {
  dont_know: 0,
  concept_only: 25,
  unreliable_measurement: 50,
  monthly_tracking: 80,
  real_time_tracking: 100,
};

const CLIENT_SCORES: Record<ClientConcentration, number> = {
  high_risk: 15,
  moderate_risk: 40,
  diversified: 75,
  well_balanced: 90,
  fully_distributed: 100,
};

const TEAM_SCORES: Record<TeamMaturity, number> = {
  no_team: 10,
  junior_taskers: 35,
  middle_management: 60,
  autonomous_leads: 85,
  executive_board: 100,
};

const CASH_SCORES: Record<CashFlow, number> = {
  hand_to_mouth: 10,
  short_runway: 35,
  comfortable: 65,
  strong_reserve: 85,
  investment_ready: 100,
};

export function calculateRaioXResult(data: RaioXFormData): RaioXResult {
  const { business } = data;

  const scores: BusinessScore[] = [
    {
      category: "Previsibilidade de Receita",
      score: REVENUE_SCORES[business.revenuePredictability],
      impact: REVENUE_SCORES[business.revenuePredictability] < 50 ? "high" : "medium",
      description: REVENUE_PREDICTABILITY_LABELS[business.revenuePredictability],
      recommendations: getRevenueRecommendations(business.revenuePredictability),
    },
    {
      category: "Margem de Lucro",
      score: PROFIT_SCORES[business.profitMargin],
      impact: PROFIT_SCORES[business.profitMargin] < 50 ? "high" : "medium",
      description: PROFIT_MARGIN_LABELS[business.profitMargin],
      recommendations: getProfitRecommendations(business.profitMargin),
    },
    {
      category: "Dependência do Dono",
      score: DEPENDENCE_SCORES[business.ownerDependence],
      impact: DEPENDENCE_SCORES[business.ownerDependence] < 50 ? "high" : "medium",
      description: OWNER_DEPENDENCE_LABELS[business.ownerDependence],
      recommendations: getDependenceRecommendations(business.ownerDependence),
    },
    {
      category: "Ciclo de Vendas",
      score: SALES_SCORES[business.salesCycle],
      impact: SALES_SCORES[business.salesCycle] < 50 ? "medium" : "low",
      description: SALES_CYCLE_LABELS[business.salesCycle],
      recommendations: getSalesRecommendations(business.salesCycle),
    },
    {
      category: "Métricas (CAC/LTV)",
      score: METRICS_SCORES[business.metricsClarity],
      impact: METRICS_SCORES[business.metricsClarity] < 50 ? "high" : "medium",
      description: METRICS_CLARITY_LABELS[business.metricsClarity],
      recommendations: getMetricsRecommendations(business.metricsClarity),
    },
    {
      category: "Concentração de Clientes",
      score: CLIENT_SCORES[business.clientConcentration],
      impact: CLIENT_SCORES[business.clientConcentration] < 50 ? "high" : "medium",
      description: CLIENT_CONCENTRATION_LABELS[business.clientConcentration],
      recommendations: getClientRecommendations(business.clientConcentration),
    },
    {
      category: "Maturidade do Time",
      score: TEAM_SCORES[business.teamMaturity],
      impact: TEAM_SCORES[business.teamMaturity] < 50 ? "high" : "medium",
      description: TEAM_MATURITY_LABELS[business.teamMaturity],
      recommendations: getTeamRecommendations(business.teamMaturity),
    },
    {
      category: "Fluxo de Caixa",
      score: CASH_SCORES[business.cashFlow],
      impact: CASH_SCORES[business.cashFlow] < 50 ? "high" : "medium",
      description: CASH_FLOW_LABELS[business.cashFlow],
      recommendations: getCashRecommendations(business.cashFlow),
    },
  ];

  const overallScore = Math.round(
    scores.reduce((acc, s) => acc + s.score, 0) / scores.length
  );

  const profileStrengths = generateProfileStrengths(data);
  const recommendations = scores.flatMap(s => s.recommendations).slice(0, 5);
  const nextSteps = generateNextSteps(overallScore);
  const aiAnalysis = ""; // Será populado pela API real

  return {
    overallScore,
    businessScores: scores,
    aiAnalysis,
    profileStrengths,
    recommendations,
    nextSteps,
  };
}

function getRevenueRecommendations(val: RevenuePredictability): string[] {
  if (val === "unpredictable") return ["Implementar modelo de recorrência", "Diversificar canais de aquisição"];
  if (val === "some_recurrence") return ["Aumentar ticket médio da recorrência", "Reduzir dependência de vendas pontuais"];
  return ["Focar em redução de churn", "Otimizar expansão na base (Upsell)"];
}

function getProfitRecommendations(val: ProfitMargin): string[] {
  if (val === "negative_zero" || val === "low") return ["Revisar estrutura de custos fixos", "Precificação estratégica"];
  return ["Reinvestimento em growth", "Distribuição inteligente de dividendos"];
}

function getDependenceRecommendations(val: OwnerDependence): string[] {
  if (val === "full_dependence" || val === "helpers_needed") return ["Documentar processos (Playbooks)", "Contratar lideranças intermediárias"];
  return ["Focar 100% em visão de longo prazo", "Conselho consultivo"];
}

function getSalesRecommendations(val: SalesCycle): string[] {
  if (val === "long_unpredictable") return ["Implementar CRM", "Qualificação de leads mais rigorosa"];
  return ["Automação de vendas", "Otimização de funil de conversão"];
}

function getMetricsRecommendations(val: MetricsClarity): string[] {
  if (val === "dont_know" || val === "concept_only") return ["Instalar ferramentas de analytics", "Definir unit economics"];
  return ["Dashboard em tempo real", "Análise de coortes (cohort Analysis)"];
}

function getClientRecommendations(val: ClientConcentration): string[] {
  if (val === "high_risk" || val === "moderate_risk") return ["Implementar estratégia de diversificação de carteira", "Focar em aquisição de clientes menores para reduzir dependência"];
  return ["Trabalhar em expansão de conta (upsell)", "Fortalecer contratos de exclusividade parcial"];
}

function getTeamRecommendations(val: TeamMaturity): string[] {
  if (val === "no_team" || val === "junior_taskers") return ["Contratar primeira liderança técnica/operacional", "Mapear processos para delegação"];
  return ["Programas de stock options ou partnership", "Conselho consultivo estratégico"];
}

function getCashRecommendations(val: CashFlow): string[] {
  if (val === "hand_to_mouth" || val === "short_runway") return ["Redução imediata de custos não essenciais", "Antecipação de recebíveis ou busca de capital de giro"];
  return ["Fundo de reserva para oportunidades (M&A)", "Planejamento tributário agressivo (legal)"];
}

function generateProfileStrengths(data: RaioXFormData): string[] {
  const strengths: string[] = [];
  const { business } = data;

  if (REVENUE_SCORES[business.revenuePredictability] >= 80) strengths.push("Receita Recorrente Sólida");
  if (PROFIT_SCORES[business.profitMargin] >= 80) strengths.push("Margens Saudáveis/Altas");
  if (DEPENDENCE_SCORES[business.ownerDependence] >= 80) strengths.push("Operação Independente do Fundador");
  if (METRICS_SCORES[business.metricsClarity] >= 80) strengths.push("Domínio Total das Métricas");
  if (CLIENT_SCORES[business.clientConcentration] >= 80) strengths.push("Carteira de Clientes Pulverizada");
  if (TEAM_SCORES[business.teamMaturity] >= 80) strengths.push("Time de Gestão Autônomo");

  if (strengths.length === 0) strengths.push("Potencial de Escala");

  return strengths;
}

function generateNextSteps(score: number): string[] {
  if (score < 40) return ["Organização financeira", "Mapeamento de processos críticos", "Definição de modelo de vendas"];
  if (score < 70) return ["Escalar time de vendas", "Otimizar CAC", "Implementar rituais de gestão"];
  return ["Preparação para M&A ou Expansão", "Internacionalização", "Inovação de produto"];
}

export function getDefaultFormData(): RaioXFormData {
  return {
    business: {
      revenuePredictability: "some_recurrence",
      profitMargin: "healthy",
      ownerDependence: "team_supervision",
      salesCycle: "medium",
      metricsClarity: "concept_only",
      clientConcentration: "diversified",
      teamMaturity: "middle_management",
      cashFlow: "comfortable",
    },
    contact: {
      name: "",
      email: "",
      whatsapp: "",
      company: "",
    },
  };
}
