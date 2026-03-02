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
    SelectInput,
} from "@/components/raio-x/FormStep";

import {
    ImmigrationFormData,
} from "@/types/raio-x";
import {
    getDefaultImmigrationData,
} from "@/lib/immigration-score-engine";

export default function ViagensRaioXPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<ImmigrationFormData>({
        ...getDefaultImmigrationData(),
        goal: "tourism",
    });
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        { id: "travel_intent", label: "Objetivo" },
        { id: "history", label: "Histórico" },
        { id: "ties", label: "Vínculos" },
        { id: "financial", label: "Financeiro" },
        { id: "contact", label: "Finalizar" },
    ];

    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStepIndex]);

    const updateData = <K extends keyof ImmigrationFormData>(field: K, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value as ImmigrationFormData[K] }));
    };

    const updateDeepData = (
        parent: keyof ImmigrationFormData,
        child: string,
        value: unknown
    ) => {
        setFormData((prev) => ({
            ...prev,
            [parent]: { ...(prev[parent] as Record<string, unknown>), [child]: value },
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
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData, type: "travel_assessment" }),
            });

            alert("Solicitação enviada! Nossa equipe entrará em contato com a análise preliminar para seu visto temporário.");
            router.push("/raio-x");
        } catch (error) {
            console.error(error);
            alert("Erro ao processar. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep.id) {
            case "travel_intent":
                return (
                    <FormStep
                        title="Perfil de Viagem"
                        description="Qual seu plano nos Estados Unidos?"
                        isActive={true}
                    >
                        <FormField label="Qual seu principal objetivo?" required>
                            <RadioGroup
                                value={formData.goal}
                                onChange={(v) => updateData("goal", v)}
                                options={[
                                    { value: "tourism", label: "Turismo / Férias" },
                                    { value: "business_temp", label: "Negócios Temporários (B-1)" },
                                    { value: "study", label: "Estudos / Intercâmbio (F-1/J-1)" },
                                ]}
                            />
                        </FormField>

                        {formData.goal === "study" && (
                            <FormField label="Qual nível de estudo pretende cursar?" required>
                                <SelectInput
                                    value={formData.tempVisaDetails?.studyLevel || ""}
                                    onChange={(v) => updateDeepData("tempVisaDetails", "studyLevel", v)}
                                    options={[
                                        { value: "language", label: "Curso de Inglês" },
                                        { value: "undergrad", label: "Graduação / Faculdade" },
                                        { value: "grad", label: "Pós-graduação / Mestrado" },
                                    ]}
                                />
                            </FormField>
                        )}

                        {formData.goal === "business_temp" && (
                            <FormField label="Qual a natureza dos negócios?" required>
                                <TextInput
                                    value={formData.tempVisaDetails?.businessNature || ""}
                                    onChange={(v) => updateDeepData("tempVisaDetails", "businessNature", v)}
                                    placeholder="Ex: Reuniões, Feiras, Prospecção"
                                />
                            </FormField>
                        )}
                    </FormStep>
                );

            case "history":
                return (
                    <FormStep
                        title="Histórico Imigratório"
                        description="Informações sobre vistos anteriores."
                        isActive={true}
                    >
                        <FormField label="Você já teve algum visto americano negado?" required>
                            <RadioGroup
                                value={formData.history === "visa_denied" ? "yes" : "no"}
                                onChange={(v) => updateData("history", v === "yes" ? "visa_denied" : "none")}
                                options={[
                                    { value: "no", label: "Não, nunca tive negativa" },
                                    { value: "yes", label: "Sim, já tive visto negado" },
                                ]}
                            />
                        </FormField>
                        <FormField label="Já visitou os Estados Unidos anteriormente?" required>
                            <RadioGroup
                                value={formData.history === "none" ? "yes" : "no"} // Simplificado para o exemplo
                                onChange={() => { }}
                                options={[
                                    { value: "yes", label: "Sim, já estive lá" },
                                    { value: "no", label: "Não, seria a primeira vez" },
                                ]}
                            />
                        </FormField>
                    </FormStep>
                );

            case "ties":
                return (
                    <FormStep
                        title="Vínculos com o Brasil"
                        description="Fator crucial para aprovação de visto de não-imigrante."
                        isActive={true}
                    >
                        <FormField label="Você possui vínculos fortes (Trabalho, Imóveis, Família)?" required>
                            <RadioGroup
                                value={formData.tempVisaDetails?.hasHomeTies ? "yes" : "no"}
                                onChange={(v) => updateDeepData("tempVisaDetails", "hasHomeTies", v === "yes")}
                                options={[
                                    { value: "yes", label: "Sim, possuo vínculos sólidos" },
                                    { value: "no", label: "Meus vínculos são limitados no momento" },
                                ]}
                            />
                        </FormField>
                        <FormField label="Qual sua situação ocupacional atual?" required>
                            <SelectInput
                                options={[
                                    { value: "employed", label: "Empregado via CLT" },
                                    { value: "business_owner", label: "Empresário / Autônomo" },
                                    { value: "student", label: "Estudante" },
                                    { value: "retired", label: "Aposentado" },
                                    { value: "none", label: "Desempregado" },
                                ]}
                                onChange={() => { }}
                                value=""
                            />
                        </FormField>
                    </FormStep>
                );

            case "financial":
                return (
                    <FormStep
                        title="Capacidade Financeira"
                        description="Como você pretende custear sua viagem?"
                        isActive={true}
                    >
                        <FormField label="Você possui recursos para custear toda a estadia?" required>
                            <RadioGroup
                                value={formData.tempVisaDetails?.financialSupport ? "yes" : "no"}
                                onChange={(v) => updateDeepData("tempVisaDetails", "financialSupport", v === "yes")}
                                options={[
                                    { value: "yes", label: "Sim, recursos próprios" },
                                    { value: "no", label: "Terei um patrocinador (Sponsor)" },
                                ]}
                            />
                        </FormField>
                        <FormField label="Quanto tempo pretende ficar nos EUA?" required>
                            <RadioGroup
                                value={formData.tempVisaDetails?.durationOfStay || ""}
                                onChange={(v) => updateDeepData("tempVisaDetails", "durationOfStay", v)}
                                options={[
                                    { value: "days", label: "Poucos dias (até 15)" },
                                    { value: "weeks", label: "Semanas (até 4)" },
                                    { value: "months", label: "Meses (até 6)" },
                                ]}
                            />
                        </FormField>
                    </FormStep>
                );

            case "contact":
                return (
                    <FormStep
                        title="Finalizar Solicitação"
                        description="Receba sua análise por e-mail e WhatsApp."
                        isActive={true}
                    >
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
                        </div>
                        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100 italic text-sm text-amber-800">
                            * Vistos temporários exigem uma análise minuciosa de intenção de não-imigrante. Um de nossos especialistas entrará em contato.
                        </div>
                    </FormStep>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />

            <main className="flex-grow pt-24 pb-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <ProgressBar
                        current={currentStepIndex + 1}
                        total={steps.length}
                        label={currentStep.label}
                    />

                    <div className="mt-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
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
                                >
                                    Enviar Dados
                                </Button>
                            ) : (
                                <Button onClick={handleNext}>
                                    Próximo Passo
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
