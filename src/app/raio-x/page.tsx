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
  TRAVEL_PURPOSE_LABELS,
  TRAVEL_TYPE_LABELS,
  CURRENT_STAGE_LABELS,
  DECISION_MAKER_LABELS,
  VISA_STATUS_LABELS,
  TRAVEL_TIMELINE_LABELS,
  PASSENGER_COUNT_LABELS,
  BUDGET_PER_PERSON_LABELS,
  BUYING_HABIT_LABELS,
  AGENCY_EXPECTATION_LABELS,
  TravelPurpose,
  TravelType,
  CurrentStage,
  DecisionMaker,
  VisaStatus,
  TravelTimeline,
  PassengerCount,
  BudgetPerPerson,
  BuyingHabit,
  AgencyExpectation,
  ContactPreference,
  } from "@/types/raio-x";
import {
  getDefaultFormData,
  calculateRaioXResult,
} from "@/lib/mock-score-engine";

const STEP_LABELS = [
  "O Motivo",
  "O Momento",
  "Burocracia",
  "O Grupo",
  "Investimento",
  "Perfil",
  "Expectativas",
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
          estimatedBudget: result.estimatedBudget, // Passando o novo campo
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
                Viagem
              </span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg">
              Descubra o roteiro ideal para sua próxima aventura nos EUA.
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
            
            {/* BLOCO 1: O MOTIVO */}
            <FormStep
              title="O Motivo da Viagem"
              description="Vamos entender o objetivo para personalizar sua experiência."
              isActive={currentStep === 0}
            >
              <FormField
                label="Qual é o principal motivo da sua viagem aos EUA?"
                required
              >
                <RadioGroup
                  value={formData.travelPurpose}
                  onChange={(v) => updateData("travelPurpose", v as TravelPurpose)}
                  options={createOptions(TRAVEL_PURPOSE_LABELS)}
                />
              </FormField>

              {formData.travelPurpose && (
                <FormField label="Essa viagem é principalmente:" required>
                  <RadioGroup
                    value={formData.travelType}
                    onChange={(v) => updateData("travelType", v as TravelType)}
                    options={createOptions(TRAVEL_TYPE_LABELS)}
                  />
                </FormField>
              )}
            </FormStep>

            {/* BLOCO 2: O MOMENTO */}
            <FormStep
              title="O Momento Atual"
              description="Em que fase da jornada você está?"
              isActive={currentStep === 1}
            >
              <FormField
                label="Em que estágio você está hoje?"
                required
              >
                <RadioGroup
                  value={formData.currentStage}
                  onChange={(v) => updateData("currentStage", v as CurrentStage)}
                  options={createOptions(CURRENT_STAGE_LABELS)}
                />
              </FormField>

              <FormField
                label="Quem toma a decisão final dessa viagem?"
                required
              >
                <RadioGroup
                  value={formData.decisionMaker}
                  onChange={(v) => updateData("decisionMaker", v as DecisionMaker)}
                  options={createOptions(DECISION_MAKER_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 3: BUROCRACIA (VISTO) */}
            <FormStep
              title="Status do Visto"
              description="Para garantir que você possa embarcar sem problemas."
              isActive={currentStep === 2}
            >
              <FormField
                label="Qual é sua situação atual de visto americano?"
                required
              >
                <RadioGroup
                  value={formData.visaStatus}
                  onChange={(v) => updateData("visaStatus", v as VisaStatus)}
                  options={createOptions(VISA_STATUS_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 4: O GRUPO */}
            <FormStep
              title="Logística da Viagem"
              description="Detalhes sobre quando e com quem você vai."
              isActive={currentStep === 3}
            >
              <FormField label="Quando você pretende viajar?" required>
                <RadioGroup
                  value={formData.travelTimeline}
                  onChange={(v) => updateData("travelTimeline", v as TravelTimeline)}
                  options={createOptions(TRAVEL_TIMELINE_LABELS)}
                />
              </FormField>

              <FormField label="Quantas pessoas viajarão?" required>
                <RadioGroup
                  value={formData.passengerCount}
                  onChange={(v) => updateData("passengerCount", v as PassengerCount)}
                  options={createOptions(PASSENGER_COUNT_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 5: O INVESTIMENTO */}
            <FormStep
              title="Investimento"
              description="Para oferecer opções dentro da sua realidade."
              isActive={currentStep === 4}
            >
              <FormField
                label="Qual faixa de investimento você considera confortável (por pessoa)?"
                required
              >
                <RadioGroup
                  value={formData.budgetPerPerson}
                  onChange={(v) => updateData("budgetPerPerson", v as BudgetPerPerson)}
                  options={createOptions(BUDGET_PER_PERSON_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 6: PERFIL DE COMPRA */}
            <FormStep
              title="Perfil de Compra"
              description="Como você costuma organizar suas viagens?"
              isActive={currentStep === 5}
            >
              <FormField label="Você costuma comprar suas viagens como?" required>
                <RadioGroup
                  value={formData.buyingHabit}
                  onChange={(v) => updateData("buyingHabit", v as BuyingHabit)}
                  options={createOptions(BUYING_HABIT_LABELS)}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 7: EXPECTATIVAS */}
            <FormStep
              title="Expectativas com a Agência"
              description="O que você espera do nosso serviço? (Selecione todos que se aplicam)"
              isActive={currentStep === 6}
            >
              <FormField label="O que você espera da agência?" required>
                <CheckboxGroup
                  values={formData.agencyExpectations}
                  onChange={(v) =>
                    updateData("agencyExpectations", v as AgencyExpectation[])
                  }
                  options={createOptions(AGENCY_EXPECTATION_LABELS)}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* BLOCO 8: CONTATO */}
            <FormStep
              title="Finalizar Raio-X"
              description="Receba sua análise personalizada."
              isActive={currentStep === 7}
            >
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
                    placeholder="Email Pessoal"
                    type="email"
                  />
                  <TextInput
                    value={formData.contact.whatsapp}
                    onChange={(v) => updateContact("whatsapp", v)}
                    placeholder="WhatsApp / Telefone"
                  />
                </div>
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
                  {isSubmitting ? "Gerando Análise..." : "Finalizar Raio-X"}
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
