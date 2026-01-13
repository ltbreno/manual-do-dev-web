"use client";

import { useState, useEffect, useRef } from "react";
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
} from "@/components/raio-x/FormStep";
import {
  RaioXFormData,
  VISA_PURPOSE_LABELS,
  INTENT_LABELS,
  TIMELINE_LABELS,
  CONSULTED_LAWYER_LABELS,
  IMMIGRATION_ISSUE_LABELS,
  EDUCATION_LEVEL_LABELS,
  EXPERIENCE_YEARS_LABELS,
  ACHIEVEMENT_LABELS,
  IMPACT_CLAIM_LABELS,
  FUNDING_SOURCE_LABELS,
  INVESTMENT_BUDGET_LABELS,
  VisaPurpose,
  Intent,
  Timeline,
  ConsultedLawyer,
  ImmigrationIssue,
  EducationLevel,
  ExperienceYears,
  Achievement,
  ImpactClaim,
  FundingSource,
  InvestmentBudget,
  WillingToConsult,
  ContactPreference,
} from "@/types/raio-x";
import {
  getDefaultFormData,
  calculateRaioXResult,
} from "@/lib/mock-score-engine";

const STEP_LABELS = [
  "Objetivo",
  "Prazo",
  "Histórico",
  "Profissional",
  "Conquistas",
  "Financeiro",
  "Documentos",
  "Contato",
];

export default function RaioXPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RaioXFormData>(getDefaultFormData());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Efeito para scroll ao topo na mudança de etapa
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const totalSteps = STEP_LABELS.length;

  const updateData = <K extends keyof RaioXFormData>(
    field: K,
    value: RaioXFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateContact = (
    field: keyof RaioXFormData["contact"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleNext = () => {
    // Validação básica (opcional, pode ser mais rigorosa)
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 1. Calcular score base (regras)
      const result = calculateRaioXResult(formData);

      // 2. Simular API da Manus AI (ou chamar endpoint real)
      const response = await fetch("/api/raio-x/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          overallScore: result.overallScore,
          classification: result.leadClassification,
          legalRisk: result.legalRisk,
        }),
      });

      let aiAnalysis = "";
      if (response.ok) {
        const data = await response.json();
        aiAnalysis = data.aiAnalysis;
      }

      // 3. Atualizar e Salvar
      const finalResult = {
        ...result,
        aiAnalysis: aiAnalysis || result.aiAnalysis,
      };

      sessionStorage.setItem("raioXResult", JSON.stringify(finalResult));
      sessionStorage.setItem("raioXFormData", JSON.stringify(formData));

      router.push("/raio-x/resultado");
    } catch (error) {
      console.error("Erro ao processar:", error);
      alert("Houve um erro ao processar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Convertendo objetos de labels para arrays de opções
  const createOptions = (labels: Record<string, string>) =>
    Object.entries(labels).map(([value, label]) => ({ value, label }));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-2">
              Raio-X de{" "}
              <span className="text-[var(--brand-verde-escuro)]">
                Imigração
              </span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg">
              Análise preliminar de viabilidade para vistos americanos.
            </p>
          </div>

          <div className="mb-10">
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepLabels={STEP_LABELS}
            />
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 shadow-lg">
            {/* BLOCO 1: OBJETIVO */}
            <FormStep
              title="Objetivo Real"
              description="Vamos alinhar sua intenção com as leis americanas."
              isActive={currentStep === 0}
            >
              <FormField
                label="Qual é seu objetivo principal com os EUA?"
                required
              >
                <RadioGroup
                  value={formData.visaPurpose}
                  onChange={(v) => updateData("visaPurpose", v as VisaPurpose)}
                  options={createOptions(VISA_PURPOSE_LABELS)}
                />
              </FormField>

              {formData.visaPurpose && (
                <FormField label="Sua intenção de longo prazo é:" required>
                  <RadioGroup
                    value={formData.intent}
                    onChange={(v) => updateData("intent", v as Intent)}
                    options={createOptions(INTENT_LABELS)}
                  />
                </FormField>
              )}
            </FormStep>

            {/* BLOCO 2: PRAZO */}
            <FormStep
              title="Prazo e Urgência"
              description="Entender seu timing é crucial para a estratégia."
              isActive={currentStep === 1}
            >
              <FormField
                label="Em quanto tempo você pretende iniciar o processo?"
                required
              >
                <RadioGroup
                  value={formData.timeline}
                  onChange={(v) => updateData("timeline", v as Timeline)}
                  options={createOptions(TIMELINE_LABELS)}
                />
              </FormField>

              <FormField
                label="Você já conversou com algum advogado de imigração?"
                required
              >
                <RadioGroup
                  value={formData.consultedLawyer}
                  onChange={(v) =>
                    updateData("consultedLawyer", v as ConsultedLawyer)
                  }
                  options={createOptions(CONSULTED_LAWYER_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 3: HISTÓRICO */}
            <FormStep
              title="Histórico Imigratório"
              description="Precisamos identificar possíveis riscos jurídicos."
              isActive={currentStep === 2}
            >
              <FormField
                label="Você já teve algum problema com imigração?"
                required
              >
                <CheckboxGroup
                  values={formData.immigrationIssues}
                  onChange={(v) =>
                    updateData("immigrationIssues", v as ImmigrationIssue[])
                  }
                  options={createOptions(IMMIGRATION_ISSUE_LABELS)}
                />
              </FormField>

              {formData.immigrationIssues.includes("other") && (
                <FormField label="Conte um pouco mais sobre o ocorrido:">
                  <TextInput
                    value={formData.immigrationIssueDetails || ""}
                    onChange={(v) => updateData("immigrationIssueDetails", v)}
                    placeholder="Descreva brevemente..."
                  />
                </FormField>
              )}
            </FormStep>

            {/* BLOCO 4: PROFISSIONAL */}
            <FormStep
              title="Perfil Profissional"
              description="Sua carreira é a base para a maioria dos vistos de trabalho."
              isActive={currentStep === 3}
            >
              <FormField label="Qual sua formação mais alta?" required>
                <RadioGroup
                  value={formData.educationLevel}
                  onChange={(v) =>
                    updateData("educationLevel", v as EducationLevel)
                  }
                  options={createOptions(EDUCATION_LEVEL_LABELS)}
                />
              </FormField>

              <FormField label="Área principal de atuação:" required>
                <TextInput
                  value={formData.fieldOfWork}
                  onChange={(v) => updateData("fieldOfWork", v)}
                  placeholder="Ex: Engenharia Civil, Odontologia, TI..."
                />
              </FormField>

              <FormField label="Anos de experiência na área:" required>
                <RadioGroup
                  value={formData.experienceYears}
                  onChange={(v) =>
                    updateData("experienceYears", v as ExperienceYears)
                  }
                  options={createOptions(EXPERIENCE_YEARS_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 5: PROVAS OBJETIVAS */}
            <FormStep
              title="Evidências de Destaque"
              description="Para vistos de habilidades extraordinárias (EB-1, O-1)."
              isActive={currentStep === 4}
            >
              <FormField
                label="Você possui algum dos itens abaixo? (Marque todos)"
                required
              >
                <CheckboxGroup
                  values={formData.achievements}
                  onChange={(v) =>
                    updateData("achievements", v as Achievement[])
                  }
                  options={createOptions(ACHIEVEMENT_LABELS)}
                  columns={1}
                />
              </FormField>

              <FormField
                label="Seu trabalho gera impacto que pode beneficiar os EUA?"
                required
              >
                <RadioGroup
                  value={formData.impactClaim}
                  onChange={(v) => updateData("impactClaim", v as ImpactClaim)}
                  options={createOptions(IMPACT_CLAIM_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 6: FINANCEIRO */}
            <FormStep
              title="Capacidade Financeira"
              description="Para alinhar expectativas de investimento no processo."
              isActive={currentStep === 5}
            >
              <FormField label="Quem custeará o processo?" required>
                <RadioGroup
                  value={formData.fundingSource}
                  onChange={(v) =>
                    updateData("fundingSource", v as FundingSource)
                  }
                  options={createOptions(FUNDING_SOURCE_LABELS)}
                />
              </FormField>

              <FormField
                label="Investimento estimado disponível para o processo:"
                required
              >
                <RadioGroup
                  value={formData.investmentBudget}
                  onChange={(v) =>
                    updateData("investmentBudget", v as InvestmentBudget)
                  }
                  options={createOptions(INVESTMENT_BUDGET_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 7: DOCUMENTOS */}
            <FormStep
              title="Análise Documental"
              description="Use nossa IA para uma pré-análise do seu currículo."
              isActive={currentStep === 6}
            >
              <FormField label="Deseja anexar documentos agora para análise da IA?">
                <div className="flex gap-4 mb-4">
                  <Button
                    onClick={() => updateData("wantsToUpload", true)}
                    variant={formData.wantsToUpload ? "primary" : "outline"}
                  >
                    Sim, quero enviar
                  </Button>
                  <Button
                    onClick={() => updateData("wantsToUpload", false)}
                    variant={!formData.wantsToUpload ? "primary" : "outline"}
                  >
                    Não por enquanto
                  </Button>
                </div>
              </FormField>

              {formData.wantsToUpload && (
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const files = e.dataTransfer.files;
                      if (files && files.length > 0) {
                        const newFiles = Array.from(files).map((f) => ({
                          name: f.name,
                          type: f.type,
                        }));
                        updateData("uploadedFiles", [
                          ...(formData.uploadedFiles || []),
                          ...newFiles,
                        ]);
                      }
                    }}
                    className="p-8 border-2 border-dashed border-[var(--brand-verde-escuro)] border-opacity-30 rounded-xl text-center bg-[var(--brand-verde-escuro)] bg-opacity-5 hover:bg-opacity-10 transition-all cursor-pointer"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          const newFiles = Array.from(files).map((f) => ({
                            name: f.name,
                            type: f.type,
                          }));
                          updateData("uploadedFiles", [
                            ...(formData.uploadedFiles || []),
                            ...newFiles,
                          ]);
                        }
                      }}
                      accept=".pdf,.doc,.docx"
                    />
                    <svg
                      className="mx-auto h-12 w-12 text-[var(--brand-verde-escuro)]"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="mt-2 text-sm font-medium text-[var(--foreground)]">
                      Clique para selecionar ou arraste seu CV (PDF, DOC)
                    </p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                      Seu arquivo será analisado pela nossa IA
                    </p>
                  </div>

                  {formData.uploadedFiles &&
                    formData.uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        {formData.uploadedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-[var(--background)] border border-[var(--card-border)] rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <svg
                                className="h-5 w-5 text-[var(--brand-verde-escuro)]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <span className="text-sm font-medium truncate max-w-[200px]">
                                {file.name}
                              </span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newFiles = formData.uploadedFiles?.filter(
                                  (_, i) => i !== idx
                                );
                                updateData("uploadedFiles", newFiles);
                              }}
                              className="text-[var(--brand-verde-escuro)] hover:text-red-500 transition-colors"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                  <div className="relative py-2">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-[var(--card-border)]"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-[var(--card-bg)] px-2 text-sm text-[var(--muted-foreground)]">
                        OU
                      </span>
                    </div>
                  </div>

                  <FormField label="Cole o Link do seu perfil no LinkedIn:">
                    <TextInput
                      value={formData.contact.linkedin || ""}
                      onChange={(v) => updateContact("linkedin", v)}
                      placeholder="https://linkedin.com/in/seu-perfil"
                    />
                  </FormField>
                </div>
              )}
            </FormStep>

            {/* BLOCO 8: CONVERSÃO */}
            <FormStep
              title="Próximos Passos"
              description="Como podemos ajudar você a seguir em frente?"
              isActive={currentStep === 7}
            >
              <FormField
                label="Caso haja viabilidade, deseja falar com um advogado?"
                required
              >
                <RadioGroup
                  value={formData.willingToConsult}
                  onChange={(v) =>
                    updateData("willingToConsult", v as WillingToConsult)
                  }
                  options={[
                    { value: "yes_asap", label: "Sim, o quanto antes" },
                    { value: "yes_later", label: "Sim, mas sem urgência" },
                    { value: "no", label: "Ainda não" },
                  ]}
                />
              </FormField>

              <FormField label="Seus Dados de Contato" required>
                <div className="space-y-4">
                  <TextInput
                    value={formData.contact.name}
                    onChange={(v) => updateContact("name", v)}
                    placeholder="Nome Completo"
                  />
                  <TextInput
                    value={formData.contact.email}
                    onChange={(v) => updateContact("email", v)}
                    placeholder="Email Profissional"
                    type="email"
                  />
                  <TextInput
                    value={formData.contact.whatsapp}
                    onChange={(v) => updateContact("whatsapp", v)}
                    placeholder="WhatsApp / Telefone"
                  />
                </div>
              </FormField>

              <FormField label="Preferência de Contato" required>
                <RadioGroup
                  value={formData.contactPreference}
                  onChange={(v) =>
                    updateData("contactPreference", v as ContactPreference)
                  }
                  options={[
                    { value: "whatsapp", label: "WhatsApp" },
                    { value: "email", label: "Email" },
                    { value: "phone", label: "Ligação Telefônica" },
                  ]}
                  columns={3}
                />
              </FormField>
            </FormStep>

            {/* Navegação */}
            <div className="flex justify-between mt-10 pt-6 border-t border-[var(--card-border)]">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Voltar
              </Button>

              {currentStep < totalSteps - 1 ? (
                <Button onClick={handleNext}>Próximo</Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Gerando Dossiê..." : "Finalizar Análise"}
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
