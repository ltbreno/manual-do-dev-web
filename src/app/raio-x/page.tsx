"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/raio-x/ProgressBar";
import FormStep, {
  FormField,
  RadioGroup,
  TextInput,
  CheckboxGroup,
  SelectInput,
} from "@/components/raio-x/FormStep";

import {
  ImmigrationFormData,
  ImmigrationGoal,
  Timeframe,
  ImmigrationHistory,
  UserProfile,
  EducationLevel,
  ExperienceYears,
  ProfessionalAchievement,
  FundingSource,
  LegalBudgetParams,
} from "@/types/raio-x";
import {
  calculateImmigrationScore,
  getDefaultImmigrationData,
} from "@/lib/immigration-score-engine";

export default function RaioXPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ImmigrationFormData>(
    getDefaultImmigrationData()
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- STEPS CONFIGURATION ---
  // --- STEPS CONFIGURATION ---
  const getSteps = () => {
    // 0. Gatekeeper Check
    const isExitGoal =
      formData.goal === "tourism" ||
      formData.goal === "business_temp" ||
      formData.goal === "study";

    if (isExitGoal) {
      return [
        { id: "intention", label: "Intenção" },
        { id: "contact_exit", label: "Contato" },
      ];
    }

    const steps = [
      { id: "intention", label: "Intenção" }, // Q1, Q2, Q3
      { id: "profile", label: "Perfil" },     // Q4
    ];

    if (formData.profile === "professional") {
      steps.push({ id: "professional_details", label: "Qualificação" }); // Q5, Q6
      steps.push({ id: "professional_branch", label: "Foco" }); // [NEW] Q6.2

      if (formData.professionalPath === "eb1a_o1" || formData.professionalPath === "both") {
        steps.push({ id: "professional_achievements", label: "Conquistas" }); // Q7
      }

      if (formData.professionalPath === "eb2_niw" || formData.professionalPath === "both") {
        steps.push({ id: "professional_field", label: "Área" }); // Q6.1
        steps.push({ id: "professional_niw", label: "Impacto" }); // Q8
      }
    } else if (formData.profile === "business") {
      steps.push({ id: "business_details", label: "Empresa" }); // Q9, Q10, Q11
      steps.push({ id: "business_role", label: "Atuação" }); // Q12, Q13, Q14
      steps.push({ id: "business_operational", label: "Operação" }); // Q14.1, Q14.2
      steps.push({ id: "business_visa_specific", label: "Expansão" }); // [NEW] Extra layer Profile B
    } else if (formData.profile === "investor") {
      steps.push({ id: "investor_details", label: "Investimento" }); // Q15, Q16, Q17
      steps.push({ id: "investor_source", label: "Origem" }); // Q18
      steps.push({ id: "investor_liquidity", label: "Liquidez" }); // Q18.1
      steps.push({ id: "investor_visa_specific", label: "Elegibilidade" }); // [NEW] Extra layer Profile C
    }

    steps.push({ id: "finance", label: "Financeiro" }); // Q19, Q20
    steps.push({ id: "conversion", label: "Finalizar" }); // Q21, Q22 + Contact form

    return steps;
  };

  const steps = getSteps();
  const currentStep = steps[currentStepIndex] || steps[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  // --- HANDLERS ---

  const updateData = (field: keyof ImmigrationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDeepData = (
    parent: keyof ImmigrationFormData,
    child: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev[parent] as any), [child]: value },
    }));
  };

  const updateContact = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = calculateImmigrationScore(formData);

      // Save to Session Storage
      sessionStorage.setItem("immigrationResult", JSON.stringify(result));
      sessionStorage.setItem("immigrationFormData", JSON.stringify(formData));

      router.push("/raio-x/resultado");
    } catch (error) {
      console.error(error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER HELPERS ---

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "intention":
        return (
          <FormStep
            title="Intenção Imigratória"
            description="Vamos entender seus objetivos e histórico."
            isActive={true}
          >
            {/* Q1 */}
            <FormField label="1. Qual é seu principal objetivo com os EUA?" required>
              <RadioGroup
                value={formData.goal}
                onChange={(v) => updateData("goal", v)}
                options={[
                  { value: "tourism", label: "Turismo / visitas" },
                  { value: "business_temp", label: "Negócios temporários" },
                  { value: "study", label: "Estudos" },
                  { value: "work_temp", label: "Trabalho temporário" },
                  { value: "permanent", label: "Imigração permanente (Green Card)" },
                ]}
              />
            </FormField>

            {/* Gatekeeper: Only show Q2/Q3 if NOT exiting */}
            {(formData.goal === "permanent" || formData.goal === "work_temp") && (
              <>
                {/* Q2 */}
                <FormField
                  label="2. Em quanto tempo você pretende iniciar um processo de imigração?"
                  required
                >
                  <RadioGroup
                    value={formData.timeframe}
                    onChange={(v) => updateData("timeframe", v)}
                    options={[
                      { value: "immediate", label: "Imediatamente (0–3 meses)" },
                      { value: "short", label: "Curto prazo (3–6 meses)" },
                      { value: "medium", label: "Médio prazo (6–12 meses)" },
                      { value: "long", label: "Longo prazo (12–24 meses)" },
                      { value: "idk", label: "Ainda não tenho prazo" },
                    ]}
                  />
                </FormField>

                {/* Q3 */}
                <FormField
                  label="3. Você já teve algum problema com imigração dos EUA?"
                  required
                >
                  <RadioGroup
                    value={formData.history}
                    onChange={(v) => updateData("history", v)}
                    options={[
                      { value: "none", label: "Não" },
                      { value: "visa_denied", label: "Visto negado" },
                      { value: "overstay", label: "Overstay" },
                      { value: "entry_denied", label: "Entrada recusada" },
                      { value: "other", label: "Outro" },
                    ]}
                  />
                </FormField>
              </>
            )}
          </FormStep>
        );

      case "contact_exit":
        return (
          <FormStep
            title="Consulta Especializada"
            description="Este Raio-X é focado em processos de Green Card e Vistos de Trabalho."
            isActive={true}
          >
            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
              <p className="text-blue-800 text-sm">
                Para vistos de Turismo, Estudante ou Negócios rápidos, a análise
                automática não se aplica. Deixe seus dados para que nossa equipe
                entre em contato.
              </p>
            </div>
            <div className="space-y-4">
              <TextInput
                value={formData.contact.name}
                onChange={(v) => updateContact("name", v)}
                placeholder="Nome Completo"
              />
              <TextInput
                value={formData.contact.email}
                onChange={(v) => updateContact("email", v)}
                placeholder="E-mail"
                type="email"
              />
              <TextInput
                value={formData.contact.whatsapp}
                onChange={(v) => updateContact("whatsapp", v)}
                placeholder="WhatsApp"
              />
            </div>
          </FormStep>
        );

      case "profile":
        return (
          <FormStep
            title="Perfil Principal"
            description="Essa decisão define as próximas perguntas."
            isActive={true}
          >
            {/* Q4 */}
            <FormField label="4. Qual opção melhor descreve sua situação atual?" required>
              <RadioGroup
                value={formData.profile}
                onChange={(v) => updateData("profile", v)}
                options={[
                  {
                    value: "professional",
                    label: "Profissional individual",
                    description: "Empregado, autônomo, especialista.",
                  },
                  {
                    value: "business",
                    label: "Empresário / executivo",
                    description: "De empresa ativa.",
                  },
                  {
                    value: "investor",
                    label: "Investidor",
                    description: "Pretendo investir capital nos EUA.",
                  },
                  { value: "idk", label: "Ainda não sei" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      // --- BRANCH A: PROFESSIONAL ---

      case "professional_details":
        return (
          <FormStep
            title="Qualificação Profissional"
            description="Detalhes sobre sua formação e experiência."
            isActive={true}
          >
            {/* Q5 */}
            <FormField label="5. Qual sua formação mais alta?" required>
              <RadioGroup
                value={formData.education || ""}
                onChange={(v) => updateData("education", v)}
                options={[
                  { value: "high_school", label: "Ensino médio/técnico" },
                  { value: "bachelors", label: "Ensino superior" },
                  { value: "masters_doctorate", label: "Pós-graduação (MBA, mestrado ou doutorado)" },
                ]}
              />
            </FormField>

            {/* Q6 */}
            <FormField label="6. Quantos anos de experiência profissional você possui?" required>
              <RadioGroup
                value={formData.experience || ""}
                onChange={(v) => updateData("experience", v)}
                options={[
                  { value: "under_5", label: "< 5 anos" },
                  { value: "5_10", label: "5–10 anos" },
                  { value: "10_15", label: "10–15 anos" },
                  { value: "over_15", label: "15+ anos" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "professional_branch":
        return (
          <FormStep
            title="Escolha seu Caminho"
            description="Isso define quais critérios técnicos vamos validar."
            isActive={true}
          >
            <FormField label="6.2. Em qual categoria você acredita se encaixar melhor?" required>
              <RadioGroup
                value={formData.professionalPath || ""}
                onChange={(v) => updateData("professionalPath", v)}
                options={[
                  {
                    value: "eb1a_o1",
                    label: "Habilidades Extraordinárias (EB-1A / O-1)",
                    description: "Prêmios, mídia, liderança, alto salário."
                  },
                  {
                    value: "eb2_niw",
                    label: "Interesse Nacional (EB-2 NIW)",
                    description: "Mestrado/Doutorado ou 10+ anos de experiência com projeto de impacto."
                  },
                  {
                    value: "both",
                    label: "Não tenho certeza / Ambos",
                    description: "Avaliar todas as possibilidades."
                  },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "professional_field":
        return (
          <FormStep
            title="Área de Atuação"
            description="Isso ajuda a identificar o interesse nacional (NIW)."
            isActive={true}
          >
            {/* Q6.1 */}
            <FormField label="6.1. Qual sua principal área de atuação?" required>
              <SelectInput
                value={formData.fieldOfWork || ""}
                onChange={(v) => updateData("fieldOfWork", v)}
                options={[
                  { value: "stem", label: "STEM (Ciência, Tecnologia, Eng., Matemática)" },
                  { value: "business", label: "Negócios / Gestão" },
                  { value: "arts", label: "Artes / Cinema / Design" },
                  { value: "athletics", label: "Esportes / Atletismo" },
                  { value: "other", label: "Outros" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "professional_achievements":
        return (
          <FormStep
            title="Critérios Oficiais (EB-1A / O-1)"
            description="Marque os itens que se aplicam a você."
            isActive={true}
          >
            {/* Q7 */}
            <FormField label="7. Conquistas e Reconhecimento (Múltipla escolha):">
              <CheckboxGroup
                values={formData.achievements || []}
                onChange={(v) => updateData("achievements", v)}
                options={[
                  { value: "prizes", label: "Prêmios ou reconhecimentos relevantes" },
                  { value: "media", label: "Matérias ou reportagens sobre você" },
                  { value: "leadership", label: "Cargo de liderança ou papel crítico" },
                  { value: "original_contribution", label: "Projetos ou contribuições de impacto relevante" },
                  { value: "scholarly_articles", label: "Publicações acadêmicas ou técnicas" },
                  { value: "judging", label: "Julgamento do trabalho de outros" },
                  { value: "high_salary", label: "Remuneração acima da média" },
                  { value: "none", label: "Nenhum dos itens acima" },
                ]}
                columns={1}
              />
            </FormField>
          </FormStep>
        );

      case "professional_niw":
        return (
          <FormStep
            title="Interesse Nacional (NIW)"
            description="Avaliação de potencial para EB-2 NIW."
            isActive={true}
          >
            {/* Q8 */}
            <FormField label="8. Seu trabalho gera impacto que pode beneficiar os EUA?" required>
              <RadioGroup
                value={
                  formData.niwLogic?.impact === true
                    ? "yes"
                    : formData.niwLogic?.impact === "unsure"
                      ? "unsure"
                      : ""
                }
                onChange={(v) =>
                  updateDeepData(
                    "niwLogic",
                    "impact",
                    v === "yes" ? true : "unsure"
                  )
                }
                options={[
                  { value: "yes", label: "Sim, de forma clara e comprovável" },
                  { value: "unsure", label: "Sim, mas ainda não sei como comprovar" },
                  { value: "no", label: "Não tenho certeza" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      // --- BRANCH B: BUSINESS ---

      case "business_details":
        return (
          <FormStep
            title="Dados da Empresa"
            description="Para vistos L-1 ou EB-1C."
            isActive={true}
          >
            {/* Q9 */}
            <FormField label="9. Você é proprietário, sócio ou executivo de empresa fora dos EUA?" required>
              <RadioGroup
                value={formData.isBusinessOwner ? "yes" : "no"}
                onChange={(v) => updateData("isBusinessOwner", v === "yes")}
                options={[
                  { value: "yes", label: "Sim" },
                  { value: "no", label: "Não" },
                ]}
              />
            </FormField>

            {/* Q10 */}
            <FormField label="10. Essa empresa está ativa há quanto tempo?" required>
              <SelectInput
                value={formData.companyYears || ""}
                onChange={(v) => updateData("companyYears", v)}
                options={[
                  { value: "< 1 year", label: "< 1 ano" },
                  { value: "1-3 years", label: "1–3 anos" },
                  { value: "3+ years", label: "3+ anos" },
                ]}
              />
            </FormField>

            {/* Q11 */}
            <FormField label="11. Você trabalhou nessa empresa por pelo menos 1 ano nos últimos 3 anos?" required>
              <RadioGroup
                value={formData.workedOneYearInLastThree ? "yes" : "no"}
                onChange={(v) => updateData("workedOneYearInLastThree", v === "yes")}
                options={[
                  { value: "yes", label: "Sim" },
                  { value: "no", label: "Não" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "business_role":
        return (
          <FormStep title="Atuação e Estrutura" description="Detalhes da operação." isActive={true}>
            {/* Q12 */}
            <FormField label="12. Sua função principal é/era:" required>
              <RadioGroup
                value={formData.currentRole || ""}
                onChange={(v) => updateData("currentRole", v)}
                options={[
                  { value: "executive", label: "Executiva (Decisão estratégica)" },
                  { value: "manager", label: "Gerencial (Gestão de equipes/departamentos)" },
                  { value: "technical", label: "Técnica/operacional" },
                ]}
              />
            </FormField>

            {/* Q13 */}
            <FormField label="13. Existe ou existirá empresa relacionada nos EUA?" required>
              <RadioGroup
                value={formData.usEntityStatus || ""}
                onChange={(v) => updateData("usEntityStatus", v)}
                options={[
                  { value: "exists", label: "Já existe" },
                  { value: "will_open", label: "Será aberta" },
                  { value: "no", label: "Não" },
                ]}
              />
            </FormField>

            {/* Q14 */}
            <FormField label="14. Qual a relação entre as empresas?" required>
              <SelectInput
                value={formData.businessRelation || ""}
                onChange={(v) => updateData("businessRelation", v)}
                options={[
                  { value: "matrix_subsidiary", label: "Matriz / filial" },
                  { value: "controller_subsidiary", label: "Controladora / subsidiária" },
                  { value: "affiliate", label: "Afiliadas" },
                  { value: "undefined", label: "Ainda não definida" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "business_operational":
        return (
          <FormStep title="Dados Operacionais" description="Importante para L-1 e EB-1C." isActive={true}>
            {/* Q14.1 */}
            <FormField label="14.1. Qual o número aproximado de funcionários da sua empresa atual?" required>
              <RadioGroup
                value={formData.employeeCount || ""}
                onChange={(v) => updateData("employeeCount", v)}
                options={[
                  { value: "under_5", label: "Até 5 colaboradores" },
                  { value: "5_20", label: "5 a 20 colaboradores" },
                  { value: "20_50", label: "20 a 50 colaboradores" },
                  { value: "over_50", label: "Mais de 50 colaboradores" },
                ]}
              />
            </FormField>

            {/* Q14.2 */}
            <FormField label="14.2. Qual o faturamento anual aproximado da empresa?" required>
              <RadioGroup
                value={formData.annualRevenue || ""}
                onChange={(v) => updateData("annualRevenue", v)}
                options={[
                  { value: "under_500k", label: "Até US$ 500k" },
                  { value: "500k_1m", label: "US$ 500k – 1M" },
                  { value: "1m_5m", label: "US$ 1M – 5M" },
                  { value: "over_5m", label: "Acima de US$ 5M" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "business_visa_specific":
        return (
          <FormStep title="Expansão e Vínculo" description="Critérios para L-1 e EB-1C." isActive={true}>
            <FormField label="14.3. Existe a intenção de expandir e manter a operação nos EUA de forma contínua?" required>
              <RadioGroup
                value={formData.businessExpansionPlan ? "yes" : "no"}
                onChange={(v) => updateData("businessExpansionPlan", v === "yes")}
                options={[
                  { value: "yes", label: "Sim, há um plano de negócios/expansão" },
                  { value: "no", label: "Ainda não defini" },
                ]}
              />
            </FormField>

            <FormField label="14.4. A empresa no exterior continuará operando após sua transferência?" required>
              <RadioGroup
                value={formData.multinationalLink ? "yes" : "no"}
                onChange={(v) => updateData("multinationalLink", v === "yes")}
                options={[
                  { value: "yes", label: "Sim, as duas empresas coexistirão (Vínculo Multinacional)" },
                  { value: "no", label: "Não, pretendo fechar a original" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      // --- BRANCH C: INVESTOR ---

      case "investor_details":
        return (
          <FormStep
            title="Perfil de Investidor"
            description="E-2 vs EB-5."
            isActive={true}
          >
            {/* Q15 */}
            <FormField label="15. Você pretende investir capital próprio nos EUA?" required>
              <RadioGroup
                value={formData.hasCapital ? "yes" : "no"}
                onChange={(v) => updateData("hasCapital", v === "yes")}
                options={[
                  { value: "yes", label: "Sim" },
                  { value: "no", label: "Não" },
                ]}
              />
            </FormField>

            {/* Q16 */}
            <FormField label="16. Valor aproximado disponível para investimento:" required>
              <RadioGroup
                value={formData.capitalAmount || ""}
                onChange={(v) => updateData("capitalAmount", v)}
                options={[
                  { value: "under_100k", label: "Até US$ 100 mil" },
                  { value: "100k_300k", label: "US$ 100k – 300k" },
                  { value: "300k_800k", label: "US$ 300k – 800k" },
                  { value: "over_800k", label: "Acima de US$ 800k" },
                ]}
              />
            </FormField>

            {/* Q17 */}
            <FormField label="17. Você pretende atuar ativamente na gestão do negócio?" required>
              <RadioGroup
                value={formData.managementIntent || ""}
                onChange={(v) => updateData("managementIntent", v)}
                options={[
                  { value: "active", label: "Sim (Perfil E-2)" },
                  { value: "passive", label: "Não (Perfil EB-5)" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "investor_source":
        return (
          <FormStep title="Origem dos Recursos" description="Requisito fundamental." isActive={true}>
            {/* Q18 */}
            <FormField label="18. O capital tem origem lícita e comprovável?" required>
              <RadioGroup
                value={formData.lawfulSource || ""}
                onChange={(v) => updateData("lawfulSource", v)}
                options={[
                  { value: "yes", label: "Sim" },
                  { value: "unsure", label: "Não tenho certeza" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "investor_liquidity":
        return (
          <FormStep title="Liquidez e Disponibilidade" description="Fundamental para o EB-5." isActive={true}>
            {/* Q18.1 */}
            <FormField label="18.1. Qual a liquidez dos seus ativos para o investimento?" required>
              <RadioGroup
                value={formData.liquidityStatus || ""}
                onChange={(v) => updateData("liquidityStatus", v)}
                options={[
                  { value: "liquid", label: "Dinheiro em conta / Ações líquidas" },
                  { value: "illiquid_easy", label: "Imóveis urbanos / Fácil liquidação" },
                  { value: "illiquid_hard", label: "Fazendas / Empresas fechadas" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "investor_visa_specific":
        return (
          <FormStep title="Elegibilidade e Impacto" description="Detalhes cruciais para o investidor." isActive={true}>
            <FormField label="18.2. Você possui cidadania de algum país com tratado de comércio com os EUA?" required>
              <RadioGroup
                value={formData.citizenshipTreatyCountry ? "yes" : "no"}
                onChange={(v) => updateData("citizenshipTreatyCountry", v === "yes")}
                options={[
                  { value: "yes", label: "Sim (Ex: Itália, Espanha, Japão, etc.)" },
                  { value: "no", label: "Não / Apenas Brasileira" },
                ]}
              />
              <p className="mt-2 text-xs text-gray-500 italic">Precedente importante para o visto E-2.</p>
            </FormField>

            <FormField label="18.3. O investimento tem potencial para gerar pelo menos 10 empregos diretos?" required>
              <RadioGroup
                value={formData.jobCreationIntent ? "yes" : "no"}
                onChange={(v) => updateData("jobCreationIntent", v === "yes")}
                options={[
                  { value: "yes", label: "Sim (Perfil EB-5)" },
                  { value: "no", label: "Não ou incerto" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      // --- SHARED: FINANCE & CONVERSION ---

      case "finance":
        return (
          <FormStep
            title="Capacidade Financeira"
            description="Planejamento para o processo (vistos imigratórios têm custos legais e taxas)."
            isActive={true}
          >
            {/* Q19 */}
            <FormField label="19. Quem custeará o processo de imigração?" required>
              <SelectInput
                value={formData.fundingSource}
                onChange={(v) => updateData("fundingSource", v)}
                options={[
                  { value: "self", label: "Recursos próprios" },
                  { value: "company", label: "Empresa" },
                  { value: "family", label: "Família" },
                  { value: "other", label: "Outro" },
                ]}
              />
            </FormField>

            {/* Q20 */}
            <FormField
              label="20. Você estaria disposto(a) a investir aproximadamente quanto em honorários e custos legais?"
              required
            >
              <RadioGroup
                value={formData.legalBudget}
                onChange={(v) => updateData("legalBudget", v)}
                options={[
                  { value: "under_5k", label: "Até US$ 5.000" },
                  { value: "5k_10k", label: "US$ 5.000 – 10.000" },
                  { value: "10k_20k", label: "US$ 10.000 – 20.000" },
                  { value: "over_20k", label: "Acima de US$ 20.000" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "conversion":
        return (
          <FormStep
            title="Finalização"
            description="Seus dados para receber a análise."
            isActive={true}
          >
            {/* Q21 */}
            <FormField label="21. Deseja enviar currículo ou documentos para análise preliminar por IA?">
              <RadioGroup
                value={formData.wantsAssessment ? "yes" : "no"}
                onChange={(v) => updateData("wantsAssessment", v === "yes")}
                options={[
                  { value: "yes", label: "Sim" },
                  { value: "no", label: "Não" },
                ]}
              />
            </FormField>

            {formData.wantsAssessment && (
              <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                <p className="text-gray-500 font-medium">
                  Clique para fazer upload (CV / Portfólio / LinkedIn)
                </p>
                <div className="mt-2 text-xs text-gray-400">Simulação de Upload</div>
                <TextInput
                  value={formData.contact?.linkedin || ""}
                  onChange={(v) => updateContact("linkedin", v)}
                  placeholder="Ou cole aqui a URL do seu LinkedIn"
                />
              </div>
            )}

            {/* Q22 */}
            <FormField label="22. Caso haja viabilidade, você aceitaria conversar com um advogado licenciado?" required>
              <SelectInput
                value={formData.consultationInterest || ""}
                onChange={(v) => updateData("consultationInterest", v)}
                options={[
                  { value: "yes_urgent", label: "Sim, com urgência" },
                  { value: "yes_normal", label: "Sim, sem urgência" },
                  { value: "not_yet", label: "Ainda não" },
                ]}
              />
            </FormField>

            <div className="space-y-4 mt-6 border-t pt-6">
              <h4 className="font-semibold text-gray-700">Seus Dados de Contato</h4>
              <TextInput
                value={formData.contact.name}
                onChange={(v) => updateContact("name", v)}
                placeholder="Nome Completo"
              />
              <TextInput
                value={formData.contact.email}
                onChange={(v) => updateContact("email", v)}
                placeholder="E-mail"
                type="email"
              />
              <TextInput
                value={formData.contact.whatsapp}
                onChange={(v) => updateContact("whatsapp", v)}
                placeholder="WhatsApp"
              />
            </div>
          </FormStep>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
              Raio-X da <span className="text-[var(--brand-verde-escuro)]">Imigração</span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg">
              Diagnóstico jurídico preliminar para seu Visto Americano.
            </p>
          </div>

          <div className="mb-10">
            <ProgressBar
              currentStep={currentStepIndex}
              totalSteps={steps.length}
              stepLabels={steps.map(s => s.label)}
            />
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-lg">
            {renderStepContent()}

            <div className="flex justify-between mt-10 pt-6 border-t border-[var(--card-border)]">
              <Button variant="ghost" onClick={handleBack} disabled={currentStepIndex === 0}>
                {currentStepIndex === 0 ? "" : "Voltar"}
              </Button>

              {currentStepIndex < steps.length - 1 ? (
                <Button onClick={handleNext}>Próximo</Button>
              ) : (
                <Button variant="secondary" onClick={handleSubmit} isLoading={isSubmitting}>
                  Finalizar Análise
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
