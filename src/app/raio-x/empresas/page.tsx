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
} from "@/components/raio-x/FormStep";

import {
  businessAssessmentModules,
  calculateBusinessScore,
} from "@/data/business-assessment";

export default function EmpresasRaioXPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", whatsapp: "" });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Dynamic steps based on the modules
  const modulesSteps = businessAssessmentModules.map((module) => ({
    id: module.id,
    label: module.id.toUpperCase(),
  }));

  // Add the final step
  const steps = [
    ...modulesSteps,
    { id: "finance_contact", label: "Finalizar" },
  ];

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStepIndex]);

  const updateAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const updateContact = (field: string, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  };

  const isCurrentStepValid = () => {
    if (currentStep.id === "finance_contact") return true;

    const module = businessAssessmentModules.find(
      (m) => m.id === currentStep.id,
    );
    if (!module) return true;

    // Check if all questions in the current module are answered
    return module.questions.every((q) => answers[q.id]);
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
      const scoreData = calculateBusinessScore(answers);

      let classification = "Cold";
      if (scoreData.finalScore >= 70) classification = "Hot";
      else if (scoreData.finalScore >= 40) classification = "Warm";

      let riskAnalysis = "Low";
      const irceScore = scoreData.normalizedScores["irce"] || 0;
      if (irceScore <= 30) riskAnalysis = "High";
      else if (irceScore <= 70) riskAnalysis = "Medium";

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData: {
            type: "business_expansion_assessment",
            contact,
            answers,
            scores: scoreData.normalizedScores,
          },
          result: {
            overallScore: scoreData.finalScore,
            scoreData,
            leadClassification: classification,
            riskAnalysis: riskAnalysis,
          },
        }),
      });

      setFinalScore(scoreData.finalScore);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    if (currentStep.id === "finance_contact") {
      return (
        <FormStep
          title="Finalização"
          description="Informe seus dados para receber o diagnóstico detalhado e a análise dos seus resultados."
          isActive={true}
        >
          <div className="space-y-4 mt-8">
            <TextInput
              value={contact.name}
              onChange={(v) => updateContact("name", v)}
              placeholder="Nome Completo"
            />
            <TextInput
              value={contact.email}
              onChange={(v) => updateContact("email", v)}
              placeholder="E-mail Corporativo"
              type="email"
            />
            <TextInput
              value={contact.whatsapp}
              onChange={(v) => updateContact("whatsapp", v)}
              placeholder="WhatsApp"
            />
          </div>
        </FormStep>
      );
    }

    const module = businessAssessmentModules.find(
      (m) => m.id === currentStep.id,
    );
    if (!module) return null;

    return (
      <FormStep
        title={module.title}
        description={module.description}
        isActive={true}
      >
        {module.questions.map((question) => (
          <FormField key={question.id} label={question.label} required>
            <RadioGroup
              value={answers[question.id] || ""}
              onChange={(v) => updateAnswer(question.id, v)}
              options={question.options}
            />
          </FormField>
        ))}
      </FormStep>
    );
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        router.push("/raio-x");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, router]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ProgressBar
            currentStep={currentStepIndex}
            totalSteps={steps.length}
            stepLabels={steps.map((s) => s.label)}
          />

          <div className="mt-8 bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-300">
            {renderStepContent()}

            <div className="flex justify-between mt-12 pt-8 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStepIndex === 0 || isSubmitting}
              >
                Voltar
              </Button>

              {currentStepIndex === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={
                    !contact.name ||
                    !contact.email ||
                    !contact.whatsapp ||
                    isSubmitting
                  }
                >
                  Solicitar Diagnóstico
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!isCurrentStepValid()}>
                  Próximo Passo
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {showSuccessModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl">
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Diagnóstico Enviado!
                </h3>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  Obrigado! Você receberá um e-mail com a análise detalhada em
                  instantes. Seu score final é{" "}
                  <span className="font-semibold text-[var(--brand-verde-escuro)]">
                    {finalScore}
                  </span>
                  .
                </p>
                <Button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push("/raio-x");
                  }}
                  className="w-full md:w-auto"
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
