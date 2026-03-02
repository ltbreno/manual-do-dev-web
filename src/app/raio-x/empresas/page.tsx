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

export default function EmpresasRaioXPage() {
    const router = useRouter();
    const [formData, setFormData] = useState<ImmigrationFormData>({
        ...getDefaultImmigrationData(),
        profile: "business",
        goal: "permanent",
    });
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        { id: "business_core", label: "Empresa" },
        { id: "operational", label: "Operação" },
        { id: "us_role", label: "Atuação EUA" },
        { id: "expansion", label: "Expansão" },
        { id: "finance_contact", label: "Finalizar" },
    ];

    const currentStep = steps[currentStepIndex];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStepIndex]);

    const updateData = <K extends keyof ImmigrationFormData>(field: K, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value as ImmigrationFormData[K] }));
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
            // For now, we reuse the same API or a similar simulation
            await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ formData, type: "business_assessment" }),
            });

            alert("Diagnóstico empresarial enviado! Nossa equipe analisará a viabilidade do seu caso (L-1/EB-1C) e entrará em contato.");
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
            case "business_core":
                return (
                    <FormStep
                        title="Sua Empresa"
                        description="Conte-nos sobre sua operação atual fora dos EUA."
                        isActive={true}
                    >
                        <FormField label="Você é proprietário, sócio ou executivo de empresa ativa?" required>
                            <RadioGroup
                                value={formData.isBusinessOwner ? "yes" : "no"}
                                onChange={(v) => updateData("isBusinessOwner", v === "yes")}
                                options={[
                                    { value: "yes", label: "Sim, sou proprietário/sócio" },
                                    { value: "no", label: "Sou executivo contratado" },
                                ]}
                            />
                        </FormField>
                        <FormField label="Há quanto tempo a empresa está em atividade?" required>
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
                        <FormField label="Você trabalhou nela por pelo menos 1 ano nos últimos 3 anos?" required>
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

            case "operational":
                return (
                    <FormStep
                        title="Perfil Operacional"
                        description="Dados de robustez da empresa (importante para L-1/EB-1C)."
                        isActive={true}
                    >
                        <FormField label="Qual o faturamento anual aproximado (em USD)?" required>
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
                        <FormField label="Número aproximado de colaboradores/funcionários?" required>
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
                    </FormStep>
                );

            case "us_role":
                return (
                    <FormStep
                        title="Atuação nos EUA"
                        description="Como será sua jornada executiva em solo americano."
                        isActive={true}
                    >
                        <FormField label="Qual será sua função principal nos EUA?" required>
                            <RadioGroup
                                value={formData.currentRole || ""}
                                onChange={(v) => updateData("currentRole", v)}
                                options={[
                                    { value: "executive", label: "Executiva (Decisão estratégica)" },
                                    { value: "manager", label: "Gerencial (Gestão de equipes)" },
                                    { value: "technical", label: "Técnica ou Especializada" },
                                ]}
                            />
                        </FormField>
                        <FormField label="A empresa nos EUA já possui estrutura?" required>
                            <RadioGroup
                                value={formData.usEntityStatus || ""}
                                onChange={(v) => updateData("usEntityStatus", v)}
                                options={[
                                    { value: "exists", label: "Sim, já está aberta e operando" },
                                    { value: "will_open", label: "Ainda será aberta (Visto de New Office)" },
                                ]}
                            />
                        </FormField>
                    </FormStep>
                );

            case "expansion":
                return (
                    <FormStep
                        title="Planos & Vínculos"
                        description="Critérios técnicos de elegibilidade multinacional."
                        isActive={true}
                    >
                        <FormField label="Existe um plano de negócios para expansão contínua?" required>
                            <RadioGroup
                                value={formData.businessExpansionPlan ? "yes" : "no"}
                                onChange={(v) => updateData("businessExpansionPlan", v === "yes")}
                                options={[
                                    { value: "yes", label: "Sim, temos um plano estruturado" },
                                    { value: "no", label: "Ainda estamos em fase de estudo" },
                                ]}
                            />
                        </FormField>
                        <FormField label="A empresa brasileira continuará operando?" required>
                            <RadioGroup
                                value={formData.multinationalLink ? "yes" : "no"}
                                onChange={(v) => updateData("multinationalLink", v === "yes")}
                                options={[
                                    { value: "yes", label: "Sim, as duas empresas coexistirão" },
                                    { value: "no", label: "Não, pretendemos encerrar a original" },
                                ]}
                            />
                        </FormField>
                    </FormStep>
                );

            case "finance_contact":
                return (
                    <FormStep
                        title="Finalização"
                        description="Informe seus dados para receber o diagnóstico detalhado."
                        isActive={true}
                    >
                        <FormField label="Orçamento estimado para o projeto de imigração/expansão?" required>
                            <RadioGroup
                                value={formData.legalBudget || ""}
                                onChange={(v) => updateData("legalBudget", v)}
                                options={[
                                    { value: "under_5k", label: "Até US$ 5k" },
                                    { value: "5k_10k", label: "US$ 5k – 10k" },
                                    { value: "10k_20k", label: "US$ 10k – 20k" },
                                    { value: "over_20k", label: "Acima de US$ 20k" },
                                ]}
                            />
                        </FormField>
                        <div className="space-y-4 mt-8">
                            <TextInput
                                value={formData.contact.name}
                                onChange={(v) => updateContact("name", v)}
                                placeholder="Nome Completo"
                            />
                            <TextInput
                                value={formData.contact.email}
                                onChange={(v) => updateContact("email", v)}
                                placeholder="E-mail Corporativo"
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
                                    Solicitar Diagnóstico
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
