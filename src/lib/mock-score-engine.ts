import {
  RaioXFormData,
  RaioXResult,
  BusinessScore,
} from "@/types/raio-x";

export function calculateRaioXResult(data: RaioXFormData): RaioXResult {
  // Initialize scores
  let eb1Score = 0; // Extraordinary Ability
  let eb2NiwScore = 0; // National Interest Waiver
  let o1Score = 0;   // Extraordinary Ability (Non-immigrant)
  let eb3Score = 0; // Skilled Worker
  let eb5Score = 0;  // Investor

  // --- LOGIC ENGINE ---

  // 1. LEAD SCORING (HOT/WARM/COLD)
  let leadScoreStr: "Hot" | "Warm" | "Cold" = "Cold";
  
  const isPermanent = data.visaPurpose === "immigration" || data.intent === "permanent";
  const urgentTimeline = data.timeline === "immediate" || data.timeline === "short";
  const hasMoney = data.investmentBudget === "10k_15k" || data.investmentBudget === "over_15k";
  
  if (isPermanent && urgentTimeline && hasMoney) {
    leadScoreStr = "Hot";
  } else if (isPermanent && (urgentTimeline || hasMoney)) {
    leadScoreStr = "Warm";
  } else {
    leadScoreStr = "Cold";
  }

  // 2. LEGAL RISK
  let legalRisk: "High" | "Medium" | "Low" = "Low";
  if (data.immigrationIssues.includes("deportation") || data.immigrationIssues.includes("entry_denied")) {
    legalRisk = "High";
  } else if (data.immigrationIssues.includes("overstay") || data.immigrationIssues.includes("denial")) {
    legalRisk = "Medium";
  }

  // 3. VISA SCORING

  // EB-1 & O-1 (Extraordinary Ability)
  // Based on Achievements
  const majorAchievements = data.achievements.filter(a => 
    ["prizes", "media", "leadership", "impact_projects", "high_salary"].includes(a)
  ).length;

  if (majorAchievements >= 3) {
    eb1Score += 80;
    o1Score += 90;
  } else if (majorAchievements >= 1) {
    eb1Score += 40;
    o1Score += 60;
  }

  if (data.educationLevel === "grad_school") {
    eb2NiwScore += 30;
    eb1Score += 10;
  } else if (data.educationLevel === "bachelors") {
    eb2NiwScore += 10;
    eb3Score += 30;
  }

  if (data.experienceYears === "over_15") {
    eb2NiwScore += 20;
    o1Score += 10;
  } else if (data.experienceYears === "10_15") {
    eb2NiwScore += 10;
  }

  // Impact Claim for NIW
  if (data.impactClaim === "clear_impact") {
    eb2NiwScore += 40;
  } else if (data.impactClaim === "potential_impact") {
    eb2NiwScore += 20;
  }

  // Investment
  if (data.fundingSource === "investor" || data.investmentBudget === "over_15k") {
    eb5Score += 40; // Still low because EB5 needs 800k+, but this is relative
  }

  // Cap scores
  const cap = (n: number) => Math.min(100, Math.max(0, n));
  eb1Score = cap(eb1Score);
  eb2NiwScore = cap(eb2NiwScore);
  o1Score = cap(o1Score);
  eb3Score = cap(eb3Score);
  eb5Score = cap(eb5Score);

  const scores: BusinessScore[] = [
    {
      category: "Habilidades Extraordinárias (EB-1A)",
      score: eb1Score,
      impact: eb1Score > 70 ? "high" : "low",
      description: "Green Card para quem está no topo de sua área de atuação.",
      recommendations: ["Coletar evidências documentais de prêmios e mídia"],
    },
    {
      category: "Interesse Nacional (EB-2 NIW)",
      score: eb2NiwScore,
      impact: eb2NiwScore > 70 ? "high" : "low",
      description: "Green Card para profissionais cujo trabalho beneficia os EUA.",
      recommendations: ["Definir proposta de empreendimento ou plano profissional nos EUA"],
    },
    {
      category: "Visto O-1 (Habilidades Extraordinárias)",
      score: o1Score,
      impact: o1Score > 70 ? "high" : "low",
      description: "Visto temporário de trabalho para talentos (similar ao EB-1).",
      recommendations: ["Buscar um empregador ou agente nos EUA para peticionar"],
    },
    {
      category: "Trabalhador Qualificado (EB-3)",
      score: eb3Score,
      impact: eb3Score > 70 ? "high" : "low",
      description: "Green Card via oferta de emprego (Sponsor).",
      recommendations: ["Buscar oferta de emprego (Job Offer) válida"],
    },
  ];

  const overallScore = Math.max(eb1Score, eb2NiwScore, o1Score, eb3Score, eb5Score);

  const profileStrengths = [];
  if (eb1Score > 60) profileStrengths.push("Perfil de Destaque / Habilidades Extraordinárias");
  if (eb2NiwScore > 60) profileStrengths.push("Potencial de Interesse Nacional (NIW)");
  if (legalRisk === "Low") profileStrengths.push("Histórico Imigratório Limpo");
  
  const nextSteps = [
    "Consulta Jurídica Especializada",
    "Análise de Currículo Detalhada",
  ];

  if (data.wantsToUpload) nextSteps.push("Revisão de Documentos enviados");

  return {
    overallScore,
    businessScores: scores,
    aiAnalysis: "", 
    profileStrengths,
    recommendations: ["Prepare seu CV em formato americano", "Reúna cartas de recomendação"],
    nextSteps,
    leadClassification: leadScoreStr,
    legalRisk: legalRisk
  };
}

export function getDefaultFormData(): RaioXFormData {
  return {
    visaPurpose: "",
    intent: "",
    timeline: "",
    consultedLawyer: "",
    immigrationIssues: [],
    educationLevel: "",
    fieldOfWork: "",
    experienceYears: "",
    achievements: [],
    impactClaim: "",
    fundingSource: "",
    investmentBudget: "",
    wantsToUpload: false,
    uploadedFiles: [],
    willingToConsult: "",
    contactPreference: "",
    contact: {
      name: "",
      email: "",
      whatsapp: "",
      linkedin: "",
    },
  };
}
