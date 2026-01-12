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
} from "@/components/raio-x/FormStep";
import {
  RaioXFormData,
  REVENUE_PREDICTABILITY_LABELS,
  PROFIT_MARGIN_LABELS,
  OWNER_DEPENDENCE_LABELS,
  SALES_CYCLE_LABELS,
  METRICS_CLARITY_LABELS,
  CLIENT_CONCENTRATION_LABELS,
  TEAM_MATURITY_LABELS,
  CASH_FLOW_LABELS,
  RevenuePredictability,
  ProfitMargin,
  OwnerDependence,
  SalesCycle,
  MetricsClarity,
  ClientConcentration,
  TeamMaturity,
  CashFlow,
} from "@/types/raio-x";
import { getDefaultFormData, calculateRaioXResult } from "@/lib/mock-score-engine";

const STEP_LABELS = [
  "Receita",
  "Lucratividade",
  "Operação",
  "Vendas",
  "Métricas",
  "Clientes",
  "Time",
  "Finanças",
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
      // 1. Calcular score base (métricas técnicas)
      const result = calculateRaioXResult(formData);

      // 2. Chamar API da Manus AI para análise real
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
      alert("Houve um erro ao gerar sua análise com a Manus AI. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const revenueOptions = Object.entries(REVENUE_PREDICTABILITY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const profitOptions = Object.entries(PROFIT_MARGIN_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const dependenceOptions = Object.entries(OWNER_DEPENDENCE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const salesOptions = Object.entries(SALES_CYCLE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const metricsOptions = Object.entries(METRICS_CLARITY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const clientOptions = Object.entries(CLIENT_CONCENTRATION_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const teamOptions = Object.entries(TEAM_MATURITY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const cashOptions = Object.entries(CASH_FLOW_LABELS).map(([value, label]) => ({
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
              Raio-X de <span className="text-[var(--brand-verde-escuro)]">Negócios</span>
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg">
              Descubra o nível de maturidade e potencial da sua empresa com análise da <span className="font-bold text-[var(--foreground)]">Manus AI</span>
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
            {/* Step 1 - Receita */}
            <FormStep
              title="Previsibilidade de Receita"
              description="Como está a saúde do seu faturamento?"
              isActive={currentStep === 0}
            >
              <FormField label="Como você descreve a previsibilidade da sua receita hoje?" required>
                <RadioGroup
                  value={formData.business.revenuePredictability}
                  onChange={(v) => updateBusiness("revenuePredictability", v as RevenuePredictability)}
                  options={revenueOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 2 - Lucratividade */}
            <FormStep
              title="Margem de Lucro"
              description="O quanto sobra no final do mês?"
              isActive={currentStep === 1}
            >
              <FormField label="Qual é a sua margem de lucro líquido média nos últimos 12 meses?" required>
                <RadioGroup
                  value={formData.business.profitMargin}
                  onChange={(v) => updateBusiness("profitMargin", v as ProfitMargin)}
                  options={profitOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 3 - Operação */}
            <FormStep
              title="Dependência do Dono"
              description="A empresa sobrevive sem você?"
              isActive={currentStep === 2}
            >
              <FormField label="Seu produto/serviço principal depende de você para ser entregue?" required>
                <RadioGroup
                  value={formData.business.ownerDependence}
                  onChange={(v) => updateBusiness("ownerDependence", v as OwnerDependence)}
                  options={dependenceOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 4 - Vendas */}
            <FormStep
              title="Ciclo de Vendas"
              description="Quanto tempo leva para fechar um negócio?"
              isActive={currentStep === 3}
            >
              <FormField label="Como é o seu Ciclo de Vendas (tempo entre primeiro contato e fechamento)?" required>
                <RadioGroup
                  value={formData.business.salesCycle}
                  onChange={(v) => updateBusiness("salesCycle", v as SalesCycle)}
                  options={salesOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 5 - Métricas */}
            <FormStep
              title="Métricas de Crescimento"
              description="Você domina seus números?"
              isActive={currentStep === 4}
            >
              <FormField label="Você tem clareza do seu CAC (Custo de Aquisição) e LTV (Lifetime Value)?" required>
                <RadioGroup
                  value={formData.business.metricsClarity}
                  onChange={(v) => updateBusiness("metricsClarity", v as MetricsClarity)}
                  options={metricsOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 6 - Clientes */}
            <FormStep
              title="Concentração de Clientes"
              description="Qual o risco da sua carteira?"
              isActive={currentStep === 5}
            >
              <FormField label="Como está distribuída sua receita entre os clientes?" required>
                <RadioGroup
                  value={formData.business.clientConcentration}
                  onChange={(v) => updateBusiness("clientConcentration", v as ClientConcentration)}
                  options={clientOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 7 - Time */}
            <FormStep
              title="Maturidade do Time"
              description="Quem toca o negócio no dia a dia?"
              isActive={currentStep === 6}
            >
              <FormField label="Qual o nível de autonomia da sua equipe?" required>
                <RadioGroup
                  value={formData.business.teamMaturity}
                  onChange={(v) => updateBusiness("teamMaturity", v as TeamMaturity)}
                  options={teamOptions}
                  columns={1}
                />
              </FormField>
            </FormStep>

            {/* Step 8 - Finanças */}
            <FormStep
              title="Saúde Financeira"
              description="Quanto tempo sua empresa sobrevive sem novas vendas?"
              isActive={currentStep === 7}
            >
              <FormField label="Qual a situação do seu fluxo de caixa e reserva?" required>
                <RadioGroup
                  value={formData.business.cashFlow}
                  onChange={(v) => updateBusiness("cashFlow", v as CashFlow)}
                  options={cashOptions}
                  columns={1}
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
                  {isSubmitting ? "Analisando com Manus AI..." : "Gerar Diagnóstico da IA"}
                </Button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              🔒 Seus dados empresariais são confidenciais e protegidos por IA
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


