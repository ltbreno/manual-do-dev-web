"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/raio-x/ProgressBar";
import FormStep, {
  FormField,
  RadioGroup,
  TextInput,
} from "@/components/raio-x/FormStep";
import {
  RaioXFormData,
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
import { getDefaultFormData, calculateRaioXResult } from "@/lib/mock-score-engine";

const STEP_LABELS = [
  "Objetivo",
  "Duração",
  "Financeiro",
  "Qualificação",
  "Idioma",
  "Seus Dados",
];

export default function RaioXPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RaioXFormData>(getDefaultFormData());

  const totalSteps = STEP_LABELS.length;

  const updateBusiness = (field: keyof RaioXFormData["business"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      business: { ...prev.business, [field]: value },
    }));
  };

  const updateContact = (field: keyof RaioXFormData["contact"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 1. Calcular score base (regras)
      const result = calculateRaioXResult(formData);

      // 2. Chamar API da Manus AI para análise real 
      // (Mantendo o endpoint existente, assumindo que ele aceita o JSON genérico)
      const response = await fetch("/api/raio-x/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          overallScore: result.overallScore,
        }),
      });

      if (!response.ok) throw new Error("Erro na análise da IA");

      const { aiAnalysis } = await response.json();
      
      // 3. Atualizar resultado com a análise real
      const finalResult = {
        ...result,
        aiAnalysis,
      };

      // Salvar no sessionStorage para a página de resultado
      sessionStorage.setItem("raioXResult", JSON.stringify(finalResult));
      sessionStorage.setItem("raioXFormData", JSON.stringify(formData));

      // Navegar para resultado
      router.push("/raio-x/resultado");
    } catch (error) {
      console.error("Erro ao gerar diagnóstico:", error);
      alert("Houve um erro ao gerar sua análise. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const purposeOptions = Object.entries(VISA_PURPOSE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const durationOptions = Object.entries(STAY_DURATION_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const supportOptions = Object.entries(FINANCIAL_SUPPORT_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const qualificationsOptions = Object.entries(QUALIFICATIONS_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const englishOptions = Object.entries(ENGLISH_PROFICIENCY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
              Descubra seu <span className="text-[var(--brand-verde-escuro)]">Visto Americano</span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg">
              Responda algumas perguntas e nossa IA analisará suas chances para diferentes tipos de vistos.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-10">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepLabels={STEP_LABELS}
            />
          </div>

          {/* Form Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-lg">
            {/* Step 1 - Objetivo */}
            <FormStep
              title="Objetivo da Viagem"
              description="Qual o motivo principal da sua ida aos EUA?"
              isActive={currentStep === 0}
            >
              <FormField label="Selecione o objetivo que mais se adequa:" required>
                <RadioGroup
                  value={formData.business.visaPurpose}
                  onChange={(v) => updateBusiness("visaPurpose", v as VisaPurpose)}
                  options={purposeOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 2 - Duração */}
            <FormStep
              title="Tempo de Permanência"
              description="Quanto tempo você pretende ficar?"
              isActive={currentStep === 1}
            >
              <FormField label="Selecione a duração estimada:" required>
                <RadioGroup
                  value={formData.business.stayDuration}
                  onChange={(v) => updateBusiness("stayDuration", v as StayDuration)}
                  options={durationOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 3 - Financeiro */}
            <FormStep
              title="Suporte Financeiro"
              description="Como a viagem será custeada?"
              isActive={currentStep === 2}
            >
              <FormField label="Quem pagará pelas despesas?" required>
                <RadioGroup
                  value={formData.business.financialSupport}
                  onChange={(v) => updateBusiness("financialSupport", v as FinancialSupport)}
                  options={supportOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 4 - Qualificação */}
            <FormStep
              title="Qualificação"
              description="Qual seu nível de formação ou destaque profissional?"
              isActive={currentStep === 3}
            >
              <FormField label="Selecione sua maior qualificação:" required>
                <RadioGroup
                  value={formData.business.qualifications}
                  onChange={(v) => updateBusiness("qualifications", v as Qualifications)}
                  options={qualificationsOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 5 - Idioma */}
            <FormStep
              title="Nível de Inglês"
              description="Como é sua comunicação em inglês?"
              isActive={currentStep === 4}
            >
              <FormField label="Seu nível atual:" required>
                <RadioGroup
                  value={formData.business.englishProficiency}
                  onChange={(v) => updateBusiness("englishProficiency", v as EnglishProficiency)}
                  options={englishOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 6 - Seus Dados */}
            <FormStep
              title="Receber Análise"
              description="Para onde devemos enviar o resultado detalhado?"
              isActive={currentStep === 5}
            >
              <FormField label="Nome Completo" required>
                <TextInput
                  value={formData.contact.name}
                  onChange={(v) => updateContact("name", v)}
                  placeholder="Seu nome"
                />
              </FormField>
              
              <FormField label="Email" required>
                <TextInput
                  value={formData.contact.email}
                  onChange={(v) => updateContact("email", v)}
                  placeholder="seu@email.com.br"
                  type="email"
                />
              </FormField>

              <FormField label="WhatsApp" required>
                <TextInput
                  value={formData.contact.whatsapp}
                  onChange={(v) => updateContact("whatsapp", v)}
                  placeholder="(11) 99999-9999"
                />
              </FormField>

              <FormField label="Ocupação Atual / Empresa">
                <TextInput
                  value={formData.contact.company}
                  onChange={(v) => updateContact("company", v)}
                  placeholder="Ex: Engenheiro de Software"
                />
              </FormField>
            </FormStep>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-[var(--card-border)]">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                leftIcon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                }
              >
                Voltar
              </Button>

              {currentStep < totalSteps - 1 ? (
                <Button
                  onClick={handleNext}
                  rightIcon={
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  }
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  rightIcon={
                    !isSubmitting ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : undefined
                  }
                >
                  {isSubmitting ? "Analisando..." : "Verificar Vistos"}
                </Button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              🔒 Seus dados são confidenciais e usados apenas para esta análise preliminar.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
