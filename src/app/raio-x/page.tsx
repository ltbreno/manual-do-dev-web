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
    if (formData.goal && formData.goal !== "permanent" && formData.goal !== "work_temp") {
      return [
        { id: "intention", label: "Intenção" },
        { id: "contact_exit", label: "Contato" }
      ];
    }

    const steps = [
      { id: "intention", label: "Intenção" },
      { id: "history", label: "Histórico" },
      { id: "profile", label: "Perfil" },
    ];

    if (formData.profile === "professional") {
      steps.push({ id: "professional_details", label: "Qualificação" });
      steps.push({ id: "professional_achievements", label: "Conquistas" });
      steps.push({ id: "professional_niw", label: "Impacto" });
    } else if (formData.profile === "business") {
      steps.push({ id: "business_details", label: "Empresa" });
      steps.push({ id: "business_role", label: "Atuação" });
    } else if (formData.profile === "investor") {
      steps.push({ id: "investor_details", label: "Investimento" });
      steps.push({ id: "investor_source", label: "Origem" });
    }

    steps.push({ id: "finance", label: "Financeiro" });
    steps.push({ id: "upload", label: "Anexos" });
    steps.push({ id: "contact", label: "Finalizar" });

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

  const updateDeepData = (parent: keyof ImmigrationFormData, child: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent] as any, [child]: value }
    }));
  }

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
            title="Objetivo da Imigração"
            description="Para começar, qual é seu principal objetivo nos EUA?"
            isActive={true}
          >
            <FormField label="Qual seu objetivo principal?" required>
              <RadioGroup
                value={formData.goal}
                onChange={(v) => updateData("goal", v)}
                options={[
                  { value: "permanent", label: "Morar legalmente (Green Card)", description: "Busco residência permanente." },
                  { value: "work_temp", label: "Trabalhar temporariamente", description: "Visto de trabalho temporário." },
                  { value: "business_temp", label: "Negócios / Reuniões", description: "Viagens a negócios pontuais." },
                  { value: "study", label: "Estudar", description: "Graduação, inglês ou pós." },
                  { value: "tourism", label: "Turismo / Férias", description: "Apenas visitar." },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "contact_exit":
        return (
          <FormStep
            title="Consulta Especializada"
            description="Este Raio-X é focado em processos de Green Card, mas podemos ajudar você consultivamente."
            isActive={true}
          >
            <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
              <p className="text-blue-800 text-sm">
                Para vistos de Turismo, Estudante ou Negócios rápidos, a análise automática não se aplica.
                Deixe seus dados para que nossa equipe entre em contato.
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

      case "history":
        return (
          <FormStep
            title="Histórico e Prazo"
            description="Entenda a viabilidade do seu perfil."
            isActive={true}
          >
            <FormField label="Em quanto tempo você pretende iniciar o processo?" required>
              <RadioGroup
                value={formData.timeframe}
                onChange={(v) => updateData("timeframe", v)}
                options={[
                  { value: "immediate", label: "Imediatamente (0-3 meses)" },
                  { value: "short", label: "Curto prazo (3-6 meses)" },
                  { value: "medium", label: "Médio prazo (6-12 meses)" },
                  { value: "long", label: "Longo prazo (+12 meses)" },
                  { value: "idk", label: "Ainda não sei" },
                ]}
              />
            </FormField>

            <FormField label="Você já teve algum problema com a imigração?" required>
              <RadioGroup
                value={formData.history}
                onChange={(v) => updateData("history", v)}
                options={[
                  { value: "none", label: "Não, nunca tive problemas" },
                  { value: "visa_denied", label: "Tive visto negado" },
                  { value: "overstay", label: "Fiquei mais tempo que o permitido (Overstay)" },
                  { value: "entry_denied", label: "Tive entrada recusada na fronteira" },
                  { value: "other", label: "Outro problema" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "profile":
        return (
          <FormStep
            title="Seu Perfil Profissional"
            description="Isso define qual categoria de visto se aplica a você."
            isActive={true}
          >
            <FormField label="Qual opção melhor descreve sua situação atual?" required>
              <RadioGroup
                value={formData.profile}
                onChange={(v) => updateData("profile", v)}
                options={[
                  { value: "professional", label: "Profissional / Especialista", description: "Tenho formação superior e carreira sólida (CLT ou Autônomo)." },
                  { value: "business", label: "Empresário / Executivo", description: "Sou dono de empresa ou executivo com cargo de gestão." },
                  { value: "investor", label: "Investidor", description: "Pretendo aportar capital próprio nos EUA." },
                  { value: "idk", label: "Ainda não sei definir" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "professional_details":
        return (
          <FormStep
            title="Qualificação Acadêmica"
            description="Detalhes sobre sua formação e experiência."
            isActive={true}
          >
            <FormField label="Qual sua área de atuação principal?" required>
              <SelectInput
                value={formData.fieldOfWork || ""}
                onChange={(v) => updateData("fieldOfWork", v)}
                options={[
                  { value: "stem", label: "Ciências / Tecnologia / Engenharia (STEM)" },
                  { value: "business", label: "Administração / Negócios / Finanças" },
                  { value: "arts", label: "Artes / Cultura / Design" },
                  { value: "athletics", label: "Esportes" },
                  { value: "other", label: "Outra" },
                ]}
              />
            </FormField>

            <FormField label="Qual sua formação mais alta?" required>
              <RadioGroup
                value={formData.education || ""}
                onChange={(v) => updateData("education", v)}
                options={[
                  { value: "masters_doctorate", label: "Mestrado ou Doutorado" },
                  { value: "bachelors", label: "Ensino Superior (Bacharelado)" },
                  { value: "high_school", label: "Ensino Médio / Técnico" },
                ]}
              />
            </FormField>

            <FormField label="Quantos anos de experiência na área?" required>
              <RadioGroup
                value={formData.experience || ""}
                onChange={(v) => updateData("experience", v)}
                options={[
                  { value: "over_15", label: "Mais de 15 anos" },
                  { value: "10_15", label: "10 a 15 anos" },
                  { value: "5_10", label: "5 a 10 anos" },
                  { value: "under_5", label: "Menos de 5 anos" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "professional_achievements":
        return (
          <FormStep
            title="Conquistas Profissionais"
            description="Itens cruciais para vistos de Habilidades Extraordinárias (O-1 / EB-1A)."
            isActive={true}
          >
            <FormField label="Marque os itens que se aplicam a você (Múltiplas opções):">
              <CheckboxGroup
                values={formData.achievements || []}
                onChange={(v) => updateData("achievements", v)}
                options={[
                  { value: "prizes", label: "Prêmios (Nacionais ou Internacionais)" },
                  { value: "media", label: "Mídia / Imprensa sobre seu trabalho" },
                  { value: "leadership", label: "Cargo de Liderança em empresa distinta" },
                  { value: "original_contribution", label: "Contribuição original relevante na área" },
                  { value: "scholarly_articles", label: "Artigos acadêmicos ou livros publicados" },
                  { value: "judging", label: "Julgamento do trabalho de outros" },
                  { value: "high_salary", label: "Remuneração significativamente alta" },
                  { value: "none", label: "Nenhum dos itens acima" },
                ]}
                columns={1}
              />
            </FormField>
          </FormStep>
        );

      case "professional_niw":
        return (
          <FormStep title="Impacto Nacional (NIW)" description="Para vistos EB-2 NIW." isActive={true}>
            <FormField label="Seu trabalho gera impacto que pode beneficiar os EUA?" required>
              <RadioGroup
                value={formData.niwLogic?.impact === true ? "yes" : formData.niwLogic?.impact === "unsure" ? "unsure" : ""}
                onChange={(v) => updateDeepData("niwLogic", "impact", v === "yes" ? true : "unsure")}
                options={[
                  { value: "yes", label: "Sim, de forma clara e comprovável" },
                  { value: "unsure", label: "Acho que sim, mas não sei comprovar" },
                  { value: "no", label: "Não tenho certeza" }
                ]}
              />
            </FormField>
          </FormStep>
        );

        <FormStep title="Dados da Empresa" description="Para vistos L-1 ou EB-1C." isActive={true}>
          <FormField label="Há quanto tempo sua empresa existe?" required>
            <SelectInput
              value={formData.companyYears || ""}
              onChange={(v) => updateData("companyYears", v)}
              options={[
                { value: "< 1 year", label: "Menos de 1 ano" },
                { value: "1-3 years", label: "1 a 3 anos" },
                { value: "3+ years", label: "Mais de 3 anos" },
              ]}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Número de funcionários diretos:" required>
              <SelectInput
                value={formData.employeeCount || ""}
                onChange={(v) => updateData("employeeCount", v)}
                options={[
                  { value: "under_5", label: "Menos de 5" },
                  { value: "5_20", label: "5 a 20" },
                  { value: "20_50", label: "20 a 50" },
                  { value: "over_50", label: "Mais de 50" },
                ]}
              />
            </FormField>

            <FormField label="Faturamento anual aproximado (USD):" required>
              <SelectInput
                value={formData.annualRevenue || ""}
                onChange={(v) => updateData("annualRevenue", v)}
                options={[
                  { value: "under_500k", label: "Até $500k" },
                  { value: "500k_1m", label: "$500k a $1M" },
                  { value: "1m_5m", label: "$1M a $5M" },
                  { value: "over_5m", label: "Acima de $5M" },
                ]}
              />
            </FormField>
          </div>

          <FormField label="Você trabalhou nela por pelo menos 1 ano contínuo nos últimos 3 anos?" required>
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

      case "business_role":
        return (
          <FormStep title="Sua Atuação" description="Mapeamento da função executiva." isActive={true}>
            <FormField label="Qual sua função principal?" required>
              <RadioGroup
                value={formData.currentRole || ""}
                onChange={(v) => updateData("currentRole", v)} // Cast simplifying
                options={[
                  { value: "executive", label: "Executiva (Decisões Estratégicas)" },
                  { value: "manager", label: "Gerencial (Gestão de Equipes)" },
                  { value: "technical", label: "Técnica / Operacional" },
                ]}
              />
            </FormField>
            <FormField label="Empresa relacionada nos EUA:" required>
              <RadioGroup
                value={formData.usEntityStatus || ""}
                onChange={(v) => updateData("usEntityStatus", v)}
                options={[
                  { value: "exists", label: "Já existe" },
                  { value: "will_open", label: "Será aberta (New Office)" },
                  { value: "no", label: "Não existe" }
                ]}
              />
            </FormField>
            <FormField label="Relação entre as empresas:" required>
              <SelectInput
                value={formData.businessRelation || ""}
                onChange={(v) => updateData("businessRelation", v)}
                options={[
                  { value: "matrix_subsidiary", label: "Matriz / Filial" },
                  { value: "controller_subsidiary", label: "Controladora / Subsidiária" },
                  { value: "affiliate", label: "Afiliadas (Mesmos sócios)" },
                  { value: "undefined", label: "Ainda não definida" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "investor_details":
        return (
          <FormStep title="Perfil de Investimento" description="E-2 vs EB-5" isActive={true}>
            <FormField label="Qual capital disponível para investimento?" required>
              <RadioGroup
                value={formData.capitalAmount || ""}
                onChange={(v) => updateData("capitalAmount", v)}
                options={[
                  { value: "under_100k", label: "Até US$ 100 mil" },
                  { value: "100k_300k", label: "US$ 100k - US$ 300k" },
                  { value: "300k_800k", label: "US$ 300k - US$ 800k" },
                  { value: "over_800k", label: "Acima de US$ 800k" },
                ]}
              />
            </FormField>

            <FormField label="Liquidez dos recursos:" required>
              <SelectInput
                value={formData.liquidityStatus || ""}
                onChange={(v) => updateData("liquidityStatus", v)}
                options={[
                  { value: "liquid", label: "Líquido (Dinheiro / Ações)" },
                  { value: "illiquid_easy", label: "Imóveis (Fácil venda)" },
                  { value: "illiquid_hard", label: "Imóveis Rurais / Empresas Fechadas" },
                ]}
              />
            </FormField>

            <FormField label="Intenção de Gestão:" required>
              <RadioGroup
                value={formData.managementIntent || ""}
                onChange={(v) => updateData("managementIntent", v)}
                options={[
                  { value: "active", label: "Ativa (Quero gerir o negócio dia-a-dia)" },
                  { value: "passive", label: "Passiva (Apenas investir capital)" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "investor_source":
        return (
          <FormStep title="Origem dos Recursos" description="Requisito fundamental para qualquer visto de investidor." isActive={true}>
            <FormField label="O capital tem origem lícita e comprovável?" required>
              <RadioGroup
                value={formData.lawfulSource || ""}
                onChange={(v) => updateData("lawfulSource", v)}
                options={[
                  { value: "yes", label: "Sim, origem 100% declarada" },
                  { value: "unsure", label: "Não tenho certeza / Parcialmente" }
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "finance":
        return (
          <FormStep title="Capacidade Financeira" description="Planejamento para o processo." isActive={true}>
            <FormField label="Quem costeará o processo?" required>
              <SelectInput
                value={formData.fundingSource}
                onChange={(v) => updateData("fundingSource", v)}
                options={[
                  { value: "self", label: "Recursos Próprios" },
                  { value: "company", label: "Empresa Patrocinadora" },
                  { value: "family", label: "Família" },
                ]}
              />
            </FormField>
            <FormField label="Orçamento estimado para custos legais:" required>
              <RadioGroup
                value={formData.legalBudget}
                onChange={(v) => updateData("legalBudget", v)}
                options={[
                  { value: "under_5k", label: "Até US$ 5.000" },
                  { value: "5k_10k", label: "US$ 5.000 - US$ 10.000" },
                  { value: "10k_20k", label: "US$ 10.000 - US$ 20.000" },
                  { value: "over_20k", label: "Acima de US$ 20.000" },
                ]}
              />
            </FormField>
          </FormStep>
        );

      case "upload":
        return (
          <FormStep title="Documentação (Opcional)" description="Anexe seu CV ou LinkedIn para uma análise mais precisa. (Simulação)" isActive={true}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <p className="text-gray-500 font-medium">Clique para fazer upload do seu CV ou Portfolio</p>
              <p className="text-xs text-gray-400 mt-2">(PDF, DOCX ou JPG)</p>
            </div>
            <div className="mt-4">
              <TextInput
                value={formData.contact?.linkedin || ""}
                onChange={(v) => updateContact("linkedin", v)}
                placeholder="URL do LinkedIn (Opcional)"
              />
            </div>
          </FormStep>
        );

      case "contact":
        return (
          <FormStep title="Seus Dados" description="Para receber o resultado da análise." isActive={true}>
            <div className="space-y-4">
              <TextInput
                value={formData.contact.name}
                onChange={(v) => updateContact("name", v)}
                placeholder="Nome Completo"
              />
              <TextInput
                value={formData.contact.email}
                onChange={(v) => updateContact("email", v)}
                placeholder="Seu melhor e-mail"
                type="email"
              />
              <TextInput
                value={formData.contact.whatsapp}
                onChange={(v) => updateContact("whatsapp", v)}
                placeholder="WhatsApp com DDD"
              />
              <FormField label="Interesse em Consulta com Advogado:" required>
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
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Ao finalizar, você concorda em receber o contato de nossa equipe especializada.
                Seus dados estão seguros.
              </p>
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
