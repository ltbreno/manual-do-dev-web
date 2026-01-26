import {
  RaioXFormData,
  RaioXResult,
  BusinessScore,
} from "@/types/raio-x";

export function calculateRaioXResult(data: RaioXFormData): RaioXResult {
  // --- TRAVEL SCORE ENGINE ---

  // 1. LEAD SCORING (HOT/WARM/COLD)
  let leadScoreStr: "Hot" | "Warm" | "Cold" = "Cold";
  let overallScore = 30; // Base score

  // Factors for Hot:
  // - Ready to buy OR Urgent
  // - Budget established (> 3000)
  // - Decision maker is ME or SHARED
  
  const isUrgent = data.currentStage === "urgent";
  const isReady = data.currentStage === "ready";
  const hasBudget = data.budgetPerPerson === "3000_5000" || data.budgetPerPerson === "over_5000";
  const isDecider = data.decisionMaker === "me" || data.decisionMaker === "shared";
  const isBusiness = data.travelPurpose === "corporate" || data.travelType === "professional";

  if (isUrgent || (isReady && hasBudget && isDecider)) {
    leadScoreStr = "Hot";
    overallScore = 90;
  } else if (isReady || (hasBudget && isDecider) || data.currentStage === "comparing") {
    leadScoreStr = "Warm";
    overallScore = 65;
  } else {
    leadScoreStr = "Cold";
    overallScore = 40;
  }

  // Adjust overall score details
  if (data.visaStatus === "valid") overallScore += 10;
  if (data.buyingHabit === "always_agency") overallScore += 10;

  overallScore = Math.min(100, overallScore);

  // 2. PROFILE STRENGTHS & ESTIMATED BUDGET
  const profileStrengths: string[] = [];
  
  if (hasBudget) profileStrengths.push("Orçamento Confortável");
  if (isDecider) profileStrengths.push("Tomador de Decisão");
  if (data.visaStatus === "valid") profileStrengths.push("Visto Válido (Pronto para Embarcar)");
  if (data.buyingHabit === "always_agency") profileStrengths.push("Cliente de Agência (Valoriza Serviço)");
  if (isBusiness) profileStrengths.push("Viajante Corporativo");

  // Ticket Estimation
  // This is illustrative, a real logic would use average values from ranges
  let ticketEstimate = "A definir";
  if (data.budgetPerPerson === "under_1500") ticketEstimate = "Baixo (Econômico)";
  if (data.budgetPerPerson === "1500_3000") ticketEstimate = "Médio";
  if (data.budgetPerPerson === "3000_5000") ticketEstimate = "Alto";
  if (data.budgetPerPerson === "over_5000") ticketEstimate = "Premium / Luxo";

  // 3. RECOMMENDATIONS & BUSINESS SCORES
  const recommendations: string[] = [];
  const scores: BusinessScore[] = [];

  // Destination / Package Logic
  if (data.travelPurpose === "leisure") {
    if (data.passengerCount === "1" || data.passengerCount === "2") {
      recommendations.push("Pacotes de Lua de Mel ou Casal em Resorts");
      scores.push({
        category: "Pacote Romântico / Casal",
        score: 85,
        impact: "high",
        description: "Destinos paradisíacos ou cidades românticas.",
        recommendations: ["Oferecer upgrades de quarto", "Jantares inclusos"],
      });
    } else {
      recommendations.push("Pacotes Família (Disney, All-Inclusive)");
      scores.push({
        category: "Férias em Família",
        score: 90,
        impact: "high",
        description: "Foco em entretenimento infantil e conforto.",
        recommendations: ["Ingressos antecipados", "Seguro viagem familiar"],
      });
    }
  } else if (data.travelPurpose === "shopping") {
    recommendations.push("Roteiro de Compras (Outlets & Malls)");
    recommendations.push("Hotéis próximos a centros comerciais");
    scores.push({
      category: "Tour de Compras",
      score: 95,
      impact: "high",
      description: "Logística otimizada para compras.",
      recommendations: ["Aluguel de carro (SUV)", "Malas extras"],
    });
  } else if (data.travelPurpose === "corporate") {
    recommendations.push("Gestão de Viagem Corporativa eficiente");
    scores.push({
      category: "Business Travel",
      score: 80,
      impact: "medium",
      description: "Foco em praticidade e localização.",
      recommendations: ["Hotel próximo ao evento/reunião", "Transfer executivo"],
    });
  }

  // Support recommendations
  if (data.visaStatus !== "valid" && data.visaStatus !== "process") {
    recommendations.push("Priorizar Assessoria de Visto Americano");
  }

  if (data.agencyExpectations.includes("custom_itinerary")) {
    recommendations.push("Desenvolver Roteiro Personalizado Dia-a-Dia");
  }

  const nextSteps = [
    "Agendar Consultoria de Viagem (Videochamada)",
    "Enviar Cotações Preliminares",
  ];

  return {
    overallScore,
    businessScores: scores,
    aiAnalysis: "", 
    profileStrengths,
    recommendations: recommendations.slice(0, 5),
    nextSteps,
    leadClassification: leadScoreStr,
    estimatedBudget: ticketEstimate
  };
}

export function getDefaultFormData(): RaioXFormData {
  return {
    travelPurpose: "",
    travelType: "",
    currentStage: "",
    decisionMaker: "",
    visaStatus: "",
    travelTimeline: "",
    passengerCount: "",
    budgetPerPerson: "",
    buyingHabit: "",
    agencyExpectations: [],
    contactPreference: "",
    contact: {
      name: "",
      email: "",
      whatsapp: "",
      linkedin: "",
    },
  };
}

