import {
    ImmigrationFormData,
    ImmigrationResult,
    UserProfile,
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
        return {
            overallScore: 0,
            leadClassification: "Cold",
            recommendedVisas: [],
            profileStrengths: [],
            riskAnalysis: "Perfil não imigratório (Turismo/Estudos/Negócios)",
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

    // --- PROFISSIONAL (EB-1A / EB-2 NIW / O-1) ---
    if (data.profile === "professional") {
        let professionalScore = 0;
        let isNiwCandidate = false;
        let isEb1Candidate = false;

        // Educação
        if (data.education === "masters_doctorate") {
            professionalScore += 25;
            profileStrengths.push("Alta Qualificação Acadêmica (Advanced Degree)");
            isNiwCandidate = true;
        } else if (data.education === "bachelors" && data.experience && data.experience !== "under_5") {
            professionalScore += 15;
            profileStrengths.push("Bacharelado + 5 anos de exp. (Advanced Degree equiv.)");
            isNiwCandidate = true;
        }

        // NIW Impact
        if (data.niwLogic?.impact === true) {
            professionalScore += 25;
            profileStrengths.push("Trabalho de Importância Nacional e Mérito Substancial");
            isNiwCandidate = true;
        }

        // Habilidades Extraordinárias (EB-1A / O-1)
        const achievements = data.achievements || [];
        const achievementCount = achievements.filter(a => a !== "none").length;

        if (achievementCount >= 3) {
            professionalScore += 40;
            profileStrengths.push("Habilidades Extraordinárias (3+ critérios atendidos)");
            isEb1Candidate = true;
        } else if (achievementCount >= 1) {
            professionalScore += 10;
            profileStrengths.push("Destaque Profissional Evidenciado");
        }

        // Recomendações Profissionais
        if (isEb1Candidate) {
            recommendedVisas.push("EB-1A");
            recommendedVisas.push("O-1");
        }
        if (isNiwCandidate) {
            recommendedVisas.push("EB-2 NIW");
        }

        // Caso tenha pouca qualificação
        if (!isNiwCandidate && !isEb1Candidate) {
            recommendedVisas.push("EB-3 (Carece de oferta de trabalho)");
            riskAnalysis = "Médio Risco (Dependência de Sponsor)";
        }

        overallScore += professionalScore;
    }

    // --- EMPRESÁRIO (L-1 / EB-1C) ---
    if (data.profile === "business") {
        let businessScore = 0;
        let isL1Candidate = false;

        // Regra de Ouro: 1 ano de trabalho nos últimos 3
        if (data.workedOneYearInLastThree) {
            businessScore += 20;
            profileStrengths.push("Elegibilidade Temporal (1 ano nos últimos 3)");
            isL1Candidate = true;
        } else {
            riskAnalysis += " | Inelegível L-1/EB-1C (Regra de 1 ano)";
            overallScore -= 20;
        }

        // Cargo Executivo/Gerencial
        if (data.currentRole === "executive" || data.currentRole === "manager") {
            businessScore += 15;
            profileStrengths.push("Atuação Executiva/Gerencial");
        } else {
            isL1Candidate = false; // L-1A exige gestão
        }

        // Relação entre empresas
        const validRelations = ["matrix_subsidiary", "controller_subsidiary", "affiliate"];
        if (data.businessRelation && validRelations.includes(data.businessRelation)) {
            businessScore += 15;
        }

        // Recomendações Empresariais
        if (isL1Candidate) {
            if (data.usEntityStatus === "exists") {
                recommendedVisas.push("L-1A (Renovação/Extensão)");
                if (data.companyYears === "3+ years") {
                    recommendedVisas.push("EB-1C (Green Card Direto)");
                    profileStrengths.push("Empresa Madura para EB-1C");
                    businessScore += 20;
                }
            } else if (data.usEntityStatus === "will_open") {
                recommendedVisas.push("L-1A (New Office)");
                profileStrengths.push("Projeto de Expansão (New Office)");
            }
        } else {
            // Se falhou no L-1, talvez E-2 se tiver capital? (Fluxo cruzado complexo, mantendo simples por enquanto)
            recommendedVisas.push("Análise de Business Plan Necessária");
        }

        overallScore += businessScore;
    }

    // --- INVESTIDOR (E-2 / EB-5) ---
    if (data.profile === "investor") {
        let investorScore = 0;

        // Origem dos fundos
        if (data.lawfulSource === "yes") {
            investorScore += 20;
        } else if (data.lawfulSource === "unsure") {
            riskAnalysis = "Alto Risco (Origem de Fundos não Comprovada)";
            overallScore -= 20;
        }

        // EB-5
        if (data.capitalAmount === "over_800k") {
            investorScore += 40;
            profileStrengths.push("Capital Compatível com EB-5");
            recommendedVisas.push("EB-5");
        }

        // E-2 (Tratado)
        // Nota: Assumimos cidadania de país tratado (Brasil não tem, mas muitos têm dupla cidadania. O form não pergunta isso ainda, assumindo foco geral)
        if (data.capitalAmount === "100k_300k" || data.capitalAmount === "300k_800k") {
            if (data.managementIntent === "active") {
                investorScore += 30;
                profileStrengths.push("Perfil Operacional para E-2 (Req. Cidadania de Tratado)");
                recommendedVisas.push("E-2");
            }
        }

        overallScore += investorScore;
    }

    // 4. CAPACIDADE FINANCEIRA (Camada 4)
    if (data.legalBudget === "over_20k") {
        overallScore += 20;
        leadClassification = overallScore > 65 ? "Hot" : "Warm";
    } else if (data.legalBudget === "10k_20k") {
        overallScore += 10;
        leadClassification = overallScore > 55 ? "Warm" : "Warm";
    } else if (data.legalBudget === "under_5k" || data.legalBudget === "5k_10k") {
        overallScore -= 10; // Orçamento pode ser impeditivo
        leadClassification = "Cold";
        riskAnalysis += " | Orçamento Limitado";
    }

    // Ajuste Final
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
