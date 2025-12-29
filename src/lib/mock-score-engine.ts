import {
  RaioXFormData,
  RaioXResult,
  VisaScore,
  EducationLevel,
  EnglishLevel,
  InvestmentRange,
} from "@/types/raio-x";

// Pesos para cada categoria
const WEIGHTS = {
  education: 0.25,
  professional: 0.30,
  languages: 0.15,
  financial: 0.15,
  achievements: 0.15,
};

// Pontuação por nível de educação
const EDUCATION_SCORES: Record<EducationLevel, number> = {
  high_school: 10,
  technical: 25,
  bachelors: 45,
  masters: 70,
  doctorate: 90,
  post_doctorate: 100,
};

// Pontuação por nível de inglês
const ENGLISH_SCORES: Record<EnglishLevel, number> = {
  none: 0,
  basic: 20,
  intermediate: 45,
  advanced: 70,
  fluent: 90,
  native: 100,
};

// Pontuação por faixa de investimento
const INVESTMENT_SCORES: Record<InvestmentRange, number> = {
  none: 0,
  under_50k: 20,
  "50k_100k": 40,
  "100k_250k": 60,
  "250k_500k": 80,
  over_500k: 100,
};

function calculateEducationScore(data: RaioXFormData): number {
  let score = EDUCATION_SCORES[data.education.level];
  
  // Bonus para área STEM
  if (data.education.area === "stem") {
    score += 10;
  }
  
  // Bonus para publicações
  if (data.education.publications > 0) {
    score += Math.min(data.education.publications * 3, 15);
  }
  
  // Bonus para patentes
  if (data.education.patents > 0) {
    score += Math.min(data.education.patents * 5, 20);
  }
  
  return Math.min(score, 100);
}

function calculateProfessionalScore(data: RaioXFormData): number {
  let score = 0;
  
  // Anos de experiência (máximo 40 pontos)
  score += Math.min(data.professional.yearsExperience * 4, 40);
  
  // Cargo de gestão
  if (data.professional.isManager) {
    score += 15;
    // Bonus pelo tamanho da equipe
    score += Math.min(data.professional.teamSize, 15);
  }
  
  // Experiência internacional
  if (data.professional.hasInternationalExp) {
    score += 15;
  }
  
  // Prêmios
  if (data.professional.awards > 0) {
    score += Math.min(data.professional.awards * 5, 15);
  }
  
  return Math.min(score, 100);
}

function calculateLanguageScore(data: RaioXFormData): number {
  let score = ENGLISH_SCORES[data.languages.englishLevel];
  
  // Bonus para espanhol
  if (data.languages.spanishLevel !== "none") {
    score += ENGLISH_SCORES[data.languages.spanishLevel] * 0.1;
  }
  
  // Bonus para outros idiomas
  score += data.languages.otherLanguages.length * 3;
  
  return Math.min(score, 100);
}

function calculateFinancialScore(data: RaioXFormData): number {
  let score = INVESTMENT_SCORES[data.financial.investmentRange];
  
  // Bonus para negócio nos EUA
  if (data.financial.hasUSBusiness) {
    score += 20;
  }
  
  // Bonus para oferta de emprego
  if (data.financial.hasUSJobOffer) {
    score += 30;
  }
  
  return Math.min(score, 100);
}

function calculateAchievementsScore(data: RaioXFormData): number {
  let score = 0;
  
  // Palestras e apresentações
  score += Math.min(data.professional.speakingEngagements * 5, 25);
  
  // Publicações
  score += Math.min(data.education.publications * 5, 25);
  
  // Patentes
  score += Math.min(data.education.patents * 10, 30);
  
  // Prêmios
  score += Math.min(data.professional.awards * 5, 20);
  
  return Math.min(score, 100);
}

function calculateVisaCompatibility(data: RaioXFormData, visaType: string): VisaScore {
  const educationScore = calculateEducationScore(data);
  const professionalScore = calculateProfessionalScore(data);
  const languageScore = calculateLanguageScore(data);
  const financialScore = calculateFinancialScore(data);
  const achievementsScore = calculateAchievementsScore(data);
  
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];
  const requirements: string[] = [];
  
  switch (visaType) {
    case "EB-1":
      requirements.push(
        "Reconhecimento internacional na área",
        "Evidências de habilidade extraordinária",
        "Documentação extensiva de conquistas"
      );
      
      // EB-1 prioriza conquistas e educação
      score = (
        achievementsScore * 0.4 +
        educationScore * 0.3 +
        professionalScore * 0.2 +
        languageScore * 0.1
      );
      
      if (data.education.level === "doctorate" || data.education.level === "post_doctorate") {
        strengths.push("Alto nível educacional favorece a aplicação");
      } else {
        improvements.push("Considere buscar titulação acadêmica adicional");
      }
      
      if (data.education.publications >= 3) {
        strengths.push("Publicações demonstram expertise na área");
      } else {
        improvements.push("Aumente seu número de publicações acadêmicas");
      }
      
      if (data.professional.awards >= 2) {
        strengths.push("Prêmios reconhecem sua excelência");
      } else {
        improvements.push("Busque reconhecimentos formais na sua área");
      }
      break;
      
    case "EB-2 NIW":
      requirements.push(
        "Grau avançado ou habilidade excepcional",
        "Trabalho de interesse nacional para os EUA",
        "Benefício substancial para os EUA"
      );
      
      // EB-2 NIW equilibra educação e experiência
      score = (
        educationScore * 0.35 +
        professionalScore * 0.30 +
        achievementsScore * 0.20 +
        languageScore * 0.15
      );
      
      if (data.education.level === "masters" || data.education.level === "doctorate") {
        strengths.push("Grau avançado atende requisito básico");
      } else if (data.professional.yearsExperience >= 10) {
        strengths.push("Experiência profissional pode substituir grau avançado");
      } else {
        improvements.push("Mestrado ou 10+ anos de experiência são recomendados");
      }
      
      if (data.education.area === "stem" || data.education.area === "health") {
        strengths.push("Área de atuação tem alta demanda nos EUA");
      }
      break;
      
    case "EB-3":
      requirements.push(
        "Oferta de emprego de empresa americana",
        "Labor Certification (PERM)",
        "Mínimo de graduação ou 2 anos de experiência"
      );
      
      // EB-3 prioriza oferta de emprego
      score = (
        financialScore * 0.40 +
        educationScore * 0.25 +
        professionalScore * 0.25 +
        languageScore * 0.10
      );
      
      if (data.financial.hasUSJobOffer) {
        strengths.push("Oferta de emprego é requisito principal cumprido");
        score += 20;
      } else {
        improvements.push("Busque uma oferta de emprego de empresa americana");
        score -= 20;
      }
      
      if (data.education.level !== "high_school") {
        strengths.push("Qualificação educacional atende requisitos");
      }
      break;
      
    case "O-1":
      requirements.push(
        "Habilidade extraordinária comprovada",
        "Reconhecimento nacional ou internacional",
        "Continuar trabalhando na área de expertise"
      );
      
      // O-1 é similar ao EB-1 mas temporário
      score = (
        achievementsScore * 0.35 +
        professionalScore * 0.30 +
        educationScore * 0.20 +
        languageScore * 0.15
      );
      
      if (data.professional.speakingEngagements >= 3) {
        strengths.push("Palestras demonstram reconhecimento na área");
      } else {
        improvements.push("Participe de mais conferências como palestrante");
      }
      
      if (data.professional.awards >= 1) {
        strengths.push("Prêmios comprovam excelência");
      }
      break;
      
    case "L-1":
      requirements.push(
        "Trabalhar na mesma empresa há pelo menos 1 ano",
        "Ser transferido para filial/matriz nos EUA",
        "Cargo executivo, gerencial ou conhecimento especializado"
      );
      
      // L-1 prioriza experiência gerencial
      score = (
        professionalScore * 0.45 +
        educationScore * 0.20 +
        financialScore * 0.20 +
        languageScore * 0.15
      );
      
      if (data.professional.isManager && data.professional.teamSize >= 5) {
        strengths.push("Experiência gerencial qualifica para L-1A");
        score += 15;
      } else if (data.professional.yearsExperience >= 5) {
        strengths.push("Conhecimento especializado pode qualificar para L-1B");
      } else {
        improvements.push("Busque posição gerencial ou especialize-se mais");
      }
      
      if (data.professional.hasInternationalExp) {
        strengths.push("Experiência internacional é vantagem");
      }
      break;
      
    case "E-2":
      requirements.push(
        "Investimento substancial em negócio nos EUA",
        "Negócio deve gerar empregos",
        "Nacionalidade de país com tratado (Brasil tem)"
      );
      
      // E-2 prioriza capacidade financeira
      score = (
        financialScore * 0.50 +
        professionalScore * 0.25 +
        educationScore * 0.15 +
        languageScore * 0.10
      );
      
      if (data.financial.investmentRange === "over_500k" || 
          data.financial.investmentRange === "250k_500k") {
        strengths.push("Capital de investimento adequado");
        score += 15;
      } else if (data.financial.investmentRange === "100k_250k") {
        strengths.push("Capital pode ser suficiente para negócios menores");
      } else {
        improvements.push("Acumule mais capital para investimento");
        score -= 15;
      }
      
      if (data.financial.hasUSBusiness) {
        strengths.push("Já tem negócio nos EUA estabelecido");
        score += 20;
      }
      break;
  }
  
  // Normalizar score
  score = Math.max(0, Math.min(100, Math.round(score)));
  
  // Determinar compatibilidade
  let compatibility: "high" | "medium" | "low";
  if (score >= 70) {
    compatibility = "high";
  } else if (score >= 40) {
    compatibility = "medium";
  } else {
    compatibility = "low";
  }
  
  const visaNames: Record<string, string> = {
    "EB-1": "Habilidade Extraordinária",
    "EB-2 NIW": "Interesse Nacional",
    "EB-3": "Trabalhador Qualificado",
    "O-1": "Habilidade Extraordinária (Temporário)",
    "L-1": "Transferência Intracompany",
    "E-2": "Investidor",
  };
  
  return {
    visaType: visaNames[visaType] || visaType,
    visaCode: visaType,
    score,
    compatibility,
    requirements,
    strengths,
    improvements,
  };
}

function generateProfileStrengths(data: RaioXFormData): string[] {
  const strengths: string[] = [];
  
  if (data.education.level === "doctorate" || data.education.level === "post_doctorate") {
    strengths.push("Alta qualificação acadêmica");
  } else if (data.education.level === "masters") {
    strengths.push("Formação de pós-graduação");
  }
  
  if (data.education.area === "stem") {
    strengths.push("Área STEM com alta demanda nos EUA");
  }
  
  if (data.professional.yearsExperience >= 10) {
    strengths.push("Ampla experiência profissional");
  } else if (data.professional.yearsExperience >= 5) {
    strengths.push("Experiência profissional sólida");
  }
  
  if (data.professional.isManager) {
    strengths.push("Experiência em liderança e gestão");
  }
  
  if (data.professional.hasInternationalExp) {
    strengths.push("Experiência internacional");
  }
  
  if (data.languages.englishLevel === "fluent" || data.languages.englishLevel === "native") {
    strengths.push("Fluência em inglês");
  } else if (data.languages.englishLevel === "advanced") {
    strengths.push("Bom nível de inglês");
  }
  
  if (data.education.publications > 0) {
    strengths.push(`${data.education.publications} publicação(ões) acadêmica(s)`);
  }
  
  if (data.education.patents > 0) {
    strengths.push(`${data.education.patents} patente(s) registrada(s)`);
  }
  
  if (data.professional.awards > 0) {
    strengths.push(`${data.professional.awards} prêmio(s) ou reconhecimento(s)`);
  }
  
  if (data.financial.hasUSJobOffer) {
    strengths.push("Oferta de emprego nos EUA");
  }
  
  if (data.financial.hasUSBusiness) {
    strengths.push("Negócio estabelecido nos EUA");
  }
  
  return strengths;
}

function generateRecommendations(data: RaioXFormData, visaScores: VisaScore[]): string[] {
  const recommendations: string[] = [];
  const topVisa = visaScores[0];
  
  // Recomendação baseada no melhor visto
  recommendations.push(
    `Foque seus esforços no ${topVisa.visaCode} - você tem ${topVisa.score}% de compatibilidade`
  );
  
  // Recomendações de melhoria
  if (data.languages.englishLevel !== "fluent" && data.languages.englishLevel !== "native") {
    recommendations.push("Invista em melhorar seu inglês - impacta positivamente todos os processos");
  }
  
  if (data.education.publications === 0 && 
      (topVisa.visaCode === "EB-1" || topVisa.visaCode === "EB-2 NIW" || topVisa.visaCode === "O-1")) {
    recommendations.push("Considere publicar artigos ou papers na sua área de atuação");
  }
  
  if (!data.professional.hasInternationalExp) {
    recommendations.push("Busque experiências internacionais para fortalecer seu perfil");
  }
  
  if (data.professional.speakingEngagements === 0 && topVisa.visaCode === "O-1") {
    recommendations.push("Participe como palestrante em conferências da sua área");
  }
  
  // Recomendação financeira
  if (topVisa.visaCode === "E-2" && 
      data.financial.investmentRange !== "over_500k" && 
      data.financial.investmentRange !== "250k_500k") {
    recommendations.push("Para E-2, planeje acumular mais capital de investimento");
  }
  
  return recommendations;
}

function generateNextSteps(topVisa: VisaScore): string[] {
  const steps: string[] = [
    "Organize toda sua documentação profissional e acadêmica",
    "Colete cartas de recomendação de superiores e colegas",
  ];
  
  switch (topVisa.visaCode) {
    case "EB-1":
    case "O-1":
      steps.push("Documente todas as suas conquistas e reconhecimentos");
      steps.push("Busque evidências de citações e impacto do seu trabalho");
      steps.push("Consulte um advogado especializado em vistos de talento");
      break;
    case "EB-2 NIW":
      steps.push("Prepare um plano demonstrando benefício para os EUA");
      steps.push("Documente o impacto do seu trabalho na área");
      steps.push("Consulte um advogado especializado em NIW");
      break;
    case "EB-3":
      steps.push("Intensifique a busca por ofertas de emprego nos EUA");
      steps.push("Atualize seu LinkedIn e currículo para o mercado americano");
      steps.push("Considere trabalhar com uma agência de recrutamento");
      break;
    case "L-1":
      steps.push("Verifique se sua empresa tem presença nos EUA");
      steps.push("Converse com RH sobre possibilidade de transferência");
      steps.push("Documente seu conhecimento especializado ou função gerencial");
      break;
    case "E-2":
      steps.push("Elabore um plano de negócios sólido");
      steps.push("Pesquise oportunidades de investimento nos EUA");
      steps.push("Consulte um advogado especializado em vistos de investidor");
      break;
  }
  
  steps.push("Agende uma consulta com advogado de imigração para avaliar seu caso");
  
  return steps;
}

export function calculateRaioXResult(data: RaioXFormData): RaioXResult {
  const visaTypes = ["EB-1", "EB-2 NIW", "EB-3", "O-1", "L-1", "E-2"];
  
  // Calcular score para cada tipo de visto
  const visaScores = visaTypes
    .map(visa => calculateVisaCompatibility(data, visa))
    .sort((a, b) => b.score - a.score);
  
  const topVisa = visaScores[0];
  
  // Calcular score geral (média ponderada dos 3 melhores)
  const overallScore = Math.round(
    (visaScores[0].score * 0.5 + visaScores[1].score * 0.3 + visaScores[2].score * 0.2)
  );
  
  const profileStrengths = generateProfileStrengths(data);
  const recommendations = generateRecommendations(data, visaScores);
  const nextSteps = generateNextSteps(topVisa);
  
  return {
    overallScore,
    visaScores,
    topVisa,
    profileStrengths,
    recommendations,
    nextSteps,
  };
}

// Default data para mock/teste
export function getDefaultFormData(): RaioXFormData {
  return {
    personal: {
      age: 30,
      maritalStatus: "single",
      dependents: 0,
      currentCountry: "Brasil",
    },
    education: {
      level: "bachelors",
      area: "stem",
      institutionCountry: "Brasil",
      hasPostGrad: false,
      publications: 0,
      patents: 0,
    },
    professional: {
      yearsExperience: 5,
      currentRole: "",
      industry: "",
      isManager: false,
      teamSize: 0,
      hasInternationalExp: false,
      awards: 0,
      speakingEngagements: 0,
    },
    languages: {
      englishLevel: "intermediate",
      spanishLevel: "none",
      otherLanguages: [],
    },
    financial: {
      investmentRange: "none",
      hasUSBusiness: false,
      hasUSJobOffer: false,
      sponsorCompany: "",
    },
    objectives: {
      visaPreference: "not_sure",
      timeline: "1_year",
      primaryGoal: "",
      willingToStudy: true,
    },
  };
}

