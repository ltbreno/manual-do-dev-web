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

    // 1. ANÁLISE DE RISCO (Camada 1)
    if (data.history === "visa_denied" || data.history === "overstay" || data.history === "entry_denied") {
        riskAnalysis = "Alto Risco (Requer Análise de Waiver/Perdão)";
        overallScore -= 20;
    } else if (data.history === "other") {
        riskAnalysis = "Médio Risco (Requer Análise Detalhada)";
        overallScore -= 10;
    }

    // 2. TIMELINE & URGÊNCIA (Camada 1)
    if (data.timeframe === "immediate" || data.timeframe === "short") {
        overallScore += 20;
        profileStrengths.push("Decisor Imediato");
    } else if (data.timeframe === "medium") {
        overallScore += 10;
    }

    // 3. ANÁLISE POR PERFIL (Camada 2 & 3)

    // --- PROFISSIONAL (EB-1A / EB-2 NIW / O-1) ---
    if (data.profile === "professional") {
        let professionalScore = 0;

        // Educação
        if (data.education === "masters_doctorate") {
            professionalScore += 30;
            profileStrengths.push("Alta Qualificação Acadêmica (Mestrado/Doutorado)");
            recommendedVisas.push("EB-2 NIW");
        } else if (data.education === "bachelors" && data.experience && data.experience !== "under_5") {
            professionalScore += 20;
            profileStrengths.push("Bacharelado + 5 anos de exp. (Advanced Degree equiv.)");
            recommendedVisas.push("EB-2 NIW");
        }

        // Habilidades Extraordinárias (EB-1A / O-1)
        const achievements = data.achievements || [];
        if (achievements.length >= 3) {
            professionalScore += 40;
            profileStrengths.push("Perfil de Habilidades Extraordinárias");
            recommendedVisas.unshift("EB-1A"); // Top priority
            recommendedVisas.push("O-1");
        } else if (achievements.length >= 1) {
            professionalScore += 10;
            profileStrengths.push("Destaque Profissional Evidenciado");
        }

        overallScore += professionalScore;
    }

    // --- EMPRESÁRIO (L-1 / EB-1C) ---
    if (data.profile === "business") {
        let businessScore = 0;

        if (data.companyYears !== "< 1 year" && data.companyYears /* Check validity simply implies valid if picked */) {
            // Simplificação lógica, assumindo que se chegou aqui tem empresa
        }

        if (data.currentRole === "executive" || data.currentRole === "manager") {
            businessScore += 20;
            profileStrengths.push("Experiência em Gestão/Executiva");
        }

        if (data.businessRelation === "parent_subsidiary" || data.businessRelation === "new_office") {
            businessScore += 30;
            profileStrengths.push("Potencial de Transferência Executiva (L-1)");
            recommendedVisas.push("L-1A");
            recommendedVisas.push("EB-1C");
        }

        overallScore += businessScore;
    }

    // --- INVESTIDOR (E-2 / EB-5) ---
    if (data.profile === "investor") {
        if (data.capitalAmount === "over_800k") {
            overallScore += 50;
            profileStrengths.push("Capital para EB-5 (Green Card Direto)");
            recommendedVisas.push("EB-5");
        } else if (data.capitalAmount === "300k_800k" || data.capitalAmount === "100k_300k") {
            if (data.managementIntent === "active") {
                overallScore += 30;
                profileStrengths.push("Investidor Operacional (E-2)");
                recommendedVisas.push("E-2");
            }
        }
    }

    // 4. CAPACIDADE FINANCEIRA (Camada 4)
    if (data.legalBudget === "over_20k" || data.legalBudget === "10k_20k") {
        overallScore += 20;
        profileStrengths.push("Orçamento Realista para Imigração");
        leadClassification = overallScore > 60 ? "Hot" : "Warm";
    } else if (data.legalBudget === "5k_10k") {
        overallScore += 10;
        leadClassification = overallScore > 50 ? "Warm" : "Cold";
    } else {
        leadClassification = "Cold";
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
        // Fields initialized as undefined implicitly or need explicit check
    };
}
