import {
  RaioXFormData,
  RaioXResult,
  BusinessScore,
  VISA_PURPOSE_LABELS,
  STAY_DURATION_LABELS,
  FINANCIAL_SUPPORT_LABELS,
  QUALIFICATIONS_LABELS,
  ENGLISH_PROFICIENCY_LABELS,
  VisaPurpose,
  StayDuration,
  FinancialSupport,
  Qualifications,
  EnglishProficiency,
} from "@/types/raio-x";

export function calculateRaioXResult(data: RaioXFormData): RaioXResult {
  const { business } = data; // Using 'business' prop for compatibility as renamed in Types

  // Initialize scores for different visa categories
  let b1b2Score = 0; // Tourism/Business
  let f1Score = 0;   // Student
  let h1bScore = 0;  // Work
  let eb5Score = 0;  // Investor
  let o1Score = 0;   // Extraordinary Ability

  // 1. Scoring based on Purpose
  if (business.visaPurpose === 'tourism' || business.visaPurpose === 'business') {
    b1b2Score += 50;
  } else if (business.visaPurpose === 'study') {
    f1Score += 50;
  } else if (business.visaPurpose === 'work') {
    h1bScore += 40;
    o1Score += 20;
  } else if (business.visaPurpose === 'investment_immigration') {
    eb5Score += 50;
    o1Score += 10;
  }

  // 2. Scoring based on Duration
  if (business.stayDuration === 'short_visit') {
    b1b2Score += 30;
  } else if (business.stayDuration === 'medium_stay') {
    f1Score += 20;
    b1b2Score += 10;
  } else if (business.stayDuration === 'long_stay') {
    h1bScore += 20;
    f1Score += 10;
    o1Score += 20;
  } else if (business.stayDuration === 'permanent_residence') {
    eb5Score += 30;
    o1Score += 30;
  }

  // 3. Scoring based on Support
  if (business.financialSupport === 'self_funded' || business.financialSupport === 'family_support') {
    b1b2Score += 20;
    f1Score += 20;
    eb5Score += 20; // Only if high capital, checked later
  } else if (business.financialSupport === 'employer_sponsor') {
    h1bScore += 40; // Critical for work visa
  } else if (business.financialSupport === 'scholarship_sponsor') {
    f1Score += 30;
  }

  // 4. Scoring based on Qualifications
  if (business.qualifications === 'bachelor_degree') {
    h1bScore += 20;
    f1Score += 10;
  } else if (business.qualifications === 'advanced_degree') {
    h1bScore += 40;
    o1Score += 30;
    eb5Score += 10; // Indirectly helps
  } else if (business.qualifications === 'specialized_skills') {
    o1Score += 60; // Critical for O1
  } else if (business.qualifications === 'investment_capital') {
    eb5Score += 60; // Critical for EB5
  }

  // 5. English Bonus
  if (business.englishProficiency === 'fluent' || business.englishProficiency === 'intermediate') {
    f1Score += 10;
    h1bScore += 10;
  }

  // Normalize scores (cap at 100)
  const cap = (n: number) => Math.min(100, Math.max(0, n));
  b1b2Score = cap(b1b2Score);
  f1Score = cap(f1Score);
  h1bScore = cap(h1bScore);
  eb5Score = cap(eb5Score);
  o1Score = cap(o1Score);

  const scores: BusinessScore[] = [
    {
      category: "Visto de Turista/Negócios (B1/B2)",
      score: b1b2Score,
      impact: b1b2Score > 70 ? "high" : "low",
      description: "Visto para viagens curtas a lazer ou negócios.",
      recommendations: ["Comprovar vínculos com o Brasil", "Demonstrar capacidade financeira"],
    },
    {
      category: "Visto de Estudante (F1)",
      score: f1Score,
      impact: f1Score > 70 ? "high" : "low",
      description: "Para estudos acadêmicos ou de idiomas.",
      recommendations: ["Obter aceitação em escola (I-20)", "Comprovar fundos para o período"],
    },
    {
      category: "Visto de Trabalho (H1B/L1)",
      score: h1bScore,
      impact: h1bScore > 70 ? "high" : "low",
      description: "Para profissionais qualificados com oferta de emprego.",
      recommendations: ["Buscar sponsor (empregador)", "Validar diploma nos EUA"],
    },
    {
      category: "Habilidades Extraordinárias (O1)",
      score: o1Score,
      impact: o1Score > 70 ? "high" : "low",
      description: "Para pessoas com destaque nacional/internacional em sua área.",
      recommendations: ["Reunir portfólio de imprensa/prêmios", "Cartas de recomendação de experts"],
    },
    {
      category: "Investidor (EB-5 / E2)",
      score: eb5Score,
      impact: eb5Score > 70 ? "high" : "low",
      description: "Imigração via investimento financeiro.",
      recommendations: ["Preparar comprovação de origem lícita dos fundos", "Avaliar projetos regionais"],
    },
  ];

  // Overall score is the Max score found, representing "Best Fit" probability
  const overallScore = Math.max(b1b2Score, f1Score, h1bScore, eb5Score, o1Score);

  const profileStrengths = [];
  if (b1b2Score > 80) profileStrengths.push("Alta chance para Turista");
  if (h1bScore > 80) profileStrengths.push("Perfil forte para Trabalho");
  if (eb5Score > 80) profileStrengths.push("Potencial Investidor");
  if (o1Score > 80) profileStrengths.push("Habilidades Extraordinárias Detectadas");

  const nextSteps = [
    "Agendar consulta com especialista",
    "Preparar documentação financeira",
    "Verificar validade do passaporte"
  ];
  
  // Custom next steps based on winner
  if (overallScore === h1bScore && h1bScore > 60) nextSteps.unshift("Atualizar LinkedIn em Inglês");
  if (overallScore === f1Score && f1Score > 60) nextSteps.unshift("Pesquisar escolas credenciadas (SEVP)");

  return {
    overallScore,
    businessScores: scores,
    aiAnalysis: "",
    profileStrengths,
    recommendations: ["Mantenha seus documentos organizados", "Seja honesto na entrevista consular"],
    nextSteps,
  };
}

export function getDefaultFormData(): RaioXFormData {
  return {
    business: {
      visaPurpose: "tourism",
      stayDuration: "short_visit",
      financialSupport: "self_funded",
      qualifications: "no_higher_education",
      englishProficiency: "none",
    },
    contact: {
      name: "",
      email: "",
      whatsapp: "",
      company: "",
    },
  };
}
