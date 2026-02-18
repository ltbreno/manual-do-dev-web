import {
    ImmigrationFormData,
    ImmigrationResult,
} from "@/types/raio-x";

export function calculateImmigrationScore(data: ImmigrationFormData): ImmigrationResult {
    let overallScore = 0;
    let leadClassification: "Hot" | "Warm" | "Cold" = "Cold";
    const recommendedVisas: string[] = [];
    const profileStrengths: string[] = [];
    let riskAnalysis = "Baixo Risco";
    const nextSteps: string[] = ["Agendar Consulta Inicial"];

    // 0. GATEKEEPER (Camada 0)
    // Se o objetivo não for permanente/trabalho longo, o score é irrelevante, mas calculamos compatibilidade
    if (data.goal !== "permanent" && data.goal !== "work_temp") {
        const strengths = [];
        if (data.tempVisaDetails?.hasHomeTies) strengths.push("Vínculos Fortes no País de Origem");
        if (data.tempVisaDetails?.financialSupport) strengths.push("Capacidade Financeira Comprovada");

        return {
            overallScore: 0,
            leadClassification: "Cold",
            recommendedVisas: [],
            profileStrengths: strengths,
            riskAnalysis: data.tempVisaDetails?.hasHomeTies
                ? "Perfil de Não-Imigrante com baixos riscos de negativa por falta de vínculos."
                : "Atenção: Vistos temporários exigem prova de intenção de retorno (vínculos).",
            nextSteps: ["Consultoria para Vistos de Não-Imigrante"]
        };
    }

    // 1. ANÁLISE DE RISCO (Camada 1)
    if (data.history === "visa_denied" || data.history === "overstay" || data.history === "entry_denied") {
        riskAnalysis = "Alto Risco (Histórico Imigratório Adverso)";
        overallScore -= 30;
    } else if (data.history === "other") {
        riskAnalysis = "Médio Risco (Requer Análise Detalhada)";
        overallScore -= 10;
    }

    // 2. TIMELINE (Camada 1)
    if (data.timeframe === "immediate" || data.timeframe === "short") {
        overallScore += 15;
        profileStrengths.push("Decisor Imediato");
    }

    // 3. ANÁLISE POR PERFIL (Camada 2 & 3)

    // --- PERFIL A: PROFISSIONAL (EB-1A / O-1 / EB-2 NIW) ---
    if (data.profile === "professional") {
        let professionalScore = 0;
        let isNiwCandidate = false;
        let isEb1Candidate = false;

        // Educação (Q5)
        if (data.education === "masters_doctorate") {
            professionalScore += 30;
            profileStrengths.push("Alta Qualificação Acadêmica (Mestrado/Doutorado)");
            isNiwCandidate = true;
        } else if (data.education === "bachelors") {
            professionalScore += 15;
            if (data.experience === "over_15" || data.experience === "10_15") {
                profileStrengths.push("Bacharelado + Experiência Relevante (Advanced Degree Equiv)");
                isNiwCandidate = true;
            }
        }

        // Experiência (Q6)
        if (data.experience === "over_15") professionalScore += 20;
        else if (data.experience === "10_15") professionalScore += 15;
        else if (data.experience === "5_10") professionalScore += 10;

        // Critérios EB-1A / O-1 (Q7)
        const achievements = data.achievements || [];
        const achievementCount = achievements.filter(a => a !== "none").length;

        if (achievementCount >= 3) {
            professionalScore += 45;
            profileStrengths.push("Perfil de Habilidades Extraordinárias (3+ critérios)");
            isEb1Candidate = true;
        } else if (achievementCount >= 1) {
            professionalScore += 15;
            profileStrengths.push("Destaque Profissional (Critérios USCIS)");
        }

        // Impacto NIW (Q8)
        if (data.niwLogic?.impact === true) {
            professionalScore += 25;
            profileStrengths.push("Impacto e Interesse Nacional Comprovável");
            isNiwCandidate = true;
        } else if (data.niwLogic?.impact === "unsure") {
            professionalScore += 10;
        }

        // Área de Atuação (Q6.1) [NEW]
        if (data.fieldOfWork === "stem") {
            professionalScore += 15;
            profileStrengths.push("Área STEM Prioritária");
        } else if (data.fieldOfWork === "business") {
            professionalScore += 5;
        }

        // Recomendações
        if (isEb1Candidate) {
            recommendedVisas.push("EB-1A (Residência Permanente por Habilidades Extraordinárias)");
            recommendedVisas.push("O-1 (Visto de Não-Imigrante de Talento)");
        }
        if (isNiwCandidate) {
            recommendedVisas.push("EB-2 NIW (National Interest Waiver)");
        }

        if (!isEb1Candidate && !isNiwCandidate && data.education === "high_school") {
            recommendedVisas.push("EB-3 (Carece de Job Offer / Sponsor)");
            riskAnalysis = "Risco Moderado por dependência de oferta de trabalho";
        }

        if (professionalScore > 0) {
            overallScore += professionalScore;
        }
    }

    // --- PERFIL B: EMPRESÁRIO / EXECUTIVO (L-1A -> EB-1C) ---
    if (data.profile === "business") {
        let businessScore = 0;
        let isL1Candidate = false;

        // Empresa Ativa (Q10)
        if (data.companyYears === "3+ years") businessScore += 20;
        else if (data.companyYears === "1-3 years") businessScore += 10;

        // Regra de 1 ano (Q11)
        if (data.workedOneYearInLastThree) {
            businessScore += 25;
            isL1Candidate = true;
            profileStrengths.push("Elegibilidade para Transferência Multinacional");
        } else {
            riskAnalysis += " | Falta requisito de 1 ano em 3 na matriz/afiliada";
        }

        // Função (Q12)
        if (data.currentRole === "executive" || data.currentRole === "manager") {
            businessScore += 20;
            profileStrengths.push("Papel de Liderança Estratégica");
        } else {
            isL1Candidate = false;
            riskAnalysis += " | Cargo não classificado como Executivo/Gerente para L-1A";
        }

        // Entidade EUA & Relação (Q13, Q14)
        if (data.usEntityStatus === "exists") {
            businessScore += 15;
            if (data.businessRelation && data.businessRelation !== "undefined") {
                profileStrengths.push("Estrutura Corporativa Estabelecida");
            }
        }

        // Dados Operacionais (Q14.1, Q14.2) [NEW]
        if (data.employeeCount === "over_50" || data.employeeCount === "20_50") {
            businessScore += 15;
            profileStrengths.push("Empresa com Robustez de Equipe");
        }

        if (data.annualRevenue === "over_5m" || data.annualRevenue === "1m_5m") {
            businessScore += 15;
            profileStrengths.push("Faturamento Relevante");
        }

        // Novos Critérios Extra [NEW]
        if (data.businessExpansionPlan) {
            businessScore += 10;
            profileStrengths.push("Plano de Expansão Definido");
        }
        if (data.multinationalLink) {
            businessScore += 15;
            profileStrengths.push("Vínculo Multinacional Ativo");
        } else {
            riskAnalysis += " | Risco de perda de vínculo multinacional (L-1/EB-1C)";
        }

        // Recomendações
        if (isL1Candidate) {
            if (data.usEntityStatus === "exists") {
                recommendedVisas.push("L-1A (Visto de Transferência)");
                if (data.companyYears === "3+ years") {
                    recommendedVisas.push("EB-1C (Green Card para Executivos Multinacionais)");
                }
            } else {
                recommendedVisas.push("L-1A New Office");
            }
        }

        overallScore += businessScore;
    }

    // --- PERFIL C: INVESTIDOR (E-2 / EB-5) ---
    if (data.profile === "investor") {
        let investorScore = 0;

        // Valor (Q16)
        if (data.capitalAmount === "over_800k") {
            investorScore += 50;
            profileStrengths.push("Capital compatível com EB-5 (Residência Direta)");
            recommendedVisas.push("EB-5");
        } else if (data.capitalAmount === "300k_800k" || data.capitalAmount === "100k_300k") {
            investorScore += 30;
            profileStrengths.push("Capital compatível com E-2 (Visto de Investidor)");
            recommendedVisas.push("E-2 (Requer Cidadania de País com Tratado)");
        }

        // Gestão (Q17)
        if (data.managementIntent === "active") {
            investorScore += 15;
            profileStrengths.push("Intenção de Gestão Ativa (Favorável E-2)");
        } else if (data.capitalAmount !== "over_800k") {
            riskAnalysis += " | Gestão passiva requer capital de EB-5 ($800k+)";
        }

        // Liquidez (Q18.1) [NEW]
        if (data.liquidityStatus === "liquid") {
            investorScore += 15;
            profileStrengths.push("Alta Liquidez para Investimento");
        } else if (data.liquidityStatus === "illiquid_easy") {
            investorScore += 5;
        }

        // Origem (Q18)
        if (data.lawfulSource === "yes") {
            investorScore += 20;
            profileStrengths.push("Recursos com Origem Declarada");
        } else {
            riskAnalysis = "ALTO RISCO: Origem de fundos é impeditivo se não comprovável";
            overallScore -= 40;
        }

        // Novos Critérios Extra [NEW]
        if (data.citizenshipTreatyCountry) {
            investorScore += 15;
            profileStrengths.push("Cidadania com Tratado (E-2 eligible)");
        }
        if (data.jobCreationIntent) {
            investorScore += 20;
            profileStrengths.push("Potencial de Geração de Empregos (EB-5)");
        }

        overallScore += investorScore;
    }

    // 4. CAPACIDADE FINANCEIRA E CONVERSÃO (Camada 4)
    if (data.legalBudget === "over_20k") overallScore += 20;
    else if (data.legalBudget === "10k_20k") overallScore += 10;
    else if (data.legalBudget === "under_5k") overallScore -= 10;

    if (data.consultationInterest === "yes_urgent") overallScore += 10;

    // Ajuste Final de Classificação
    if (overallScore >= 75) leadClassification = "Hot";
    else if (overallScore >= 50) leadClassification = "Warm";
    else leadClassification = "Cold";

    overallScore = Math.min(100, Math.max(0, overallScore));

    return {
        overallScore,
        leadClassification,
        recommendedVisas: Array.from(new Set(recommendedVisas)), // Unique
        profileStrengths,
        riskAnalysis,
        nextSteps
    };
}

export function getDefaultImmigrationData(): ImmigrationFormData {
    return {
        goal: "",
        timeframe: "",
        history: "",
        profile: "",
        fundingSource: "",
        legalBudget: "",
        wantsAssessment: false,
        contact: { name: "", email: "", whatsapp: "" },
    };
}
