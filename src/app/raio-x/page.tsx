"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/raio-x/ProgressBar";
import FormStep, {
  FormField,
  TextInput,
  SelectInput,
  RadioGroup,
  Checkbox,
  NumberStepper,
} from "@/components/raio-x/FormStep";
import {
  RaioXFormData,
  MARITAL_STATUS_LABELS,
  EDUCATION_LEVEL_LABELS,
  EDUCATION_AREA_LABELS,
  ENGLISH_LEVEL_LABELS,
  INVESTMENT_RANGE_LABELS,
  TIMELINE_LABELS,
  VISA_PREFERENCE_LABELS,
  MaritalStatus,
  EducationLevel,
  EducationArea,
  EnglishLevel,
  InvestmentRange,
  Timeline,
  VisaPreference,
} from "@/types/raio-x";
import { getDefaultFormData, calculateRaioXResult } from "@/lib/mock-score-engine";

const STEP_LABELS = [
  "Pessoal",
  "Educação",
  "Profissional",
  "Idiomas",
  "Financeiro",
  "Objetivos",
];

export default function RaioXPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RaioXFormData>(getDefaultFormData());

  const totalSteps = STEP_LABELS.length;

  const updatePersonal = (field: keyof RaioXFormData["personal"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateEducation = (field: keyof RaioXFormData["education"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      education: { ...prev.education, [field]: value },
    }));
  };

  const updateProfessional = (field: keyof RaioXFormData["professional"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      professional: { ...prev.professional, [field]: value },
    }));
  };

  const updateLanguages = (field: keyof RaioXFormData["languages"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      languages: { ...prev.languages, [field]: value },
    }));
  };

  const updateFinancial = (field: keyof RaioXFormData["financial"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      financial: { ...prev.financial, [field]: value },
    }));
  };

  const updateObjectives = (field: keyof RaioXFormData["objectives"], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      objectives: { ...prev.objectives, [field]: value },
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
    
    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Calcular resultado
    const result = calculateRaioXResult(formData);
    
    // Salvar no sessionStorage para a página de resultado
    sessionStorage.setItem("raioXResult", JSON.stringify(result));
    sessionStorage.setItem("raioXFormData", JSON.stringify(formData));
    
    // Navegar para resultado
    router.push("/raio-x/resultado");
  };

  // Converter labels para opções de select/radio
  const maritalStatusOptions = Object.entries(MARITAL_STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const educationLevelOptions = Object.entries(EDUCATION_LEVEL_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const educationAreaOptions = Object.entries(EDUCATION_AREA_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const englishLevelOptions = Object.entries(ENGLISH_LEVEL_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const investmentRangeOptions = Object.entries(INVESTMENT_RANGE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const timelineOptions = Object.entries(TIMELINE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const visaPreferenceOptions = Object.entries(VISA_PREFERENCE_LABELS).map(([value, label]) => ({
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
              Raio-X de <span className="text-[var(--brasil-azul)]">Imigração</span>
            </h1>
            <p className="text-[var(--muted-foreground)]">
              Preencha o formulário para descobrir seu potencial de imigração
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
            {/* Step 1 - Dados Pessoais */}
            <FormStep
              title="Dados Pessoais"
              description="Informações básicas sobre você"
              isActive={currentStep === 0}
            >
              <FormField label="Qual sua idade?" required>
                <TextInput
                  type="number"
                  value={formData.personal.age.toString()}
                  onChange={(v) => updatePersonal("age", parseInt(v) || 0)}
                  placeholder="Ex: 30"
                  min={18}
                  max={99}
                />
              </FormField>

              <FormField label="Estado civil" required>
                <RadioGroup
                  value={formData.personal.maritalStatus}
                  onChange={(v) => updatePersonal("maritalStatus", v as MaritalStatus)}
                  options={maritalStatusOptions}
                  columns={2}
                />
              </FormField>

              <FormField
                label="Quantos dependentes você tem?"
                hint="Filhos, cônjuge ou outros dependentes que iriam com você"
              >
                <NumberStepper
                  value={formData.personal.dependents}
                  onChange={(v) => updatePersonal("dependents", v)}
                  min={0}
                  max={10}
                  label="dependente(s)"
                />
              </FormField>

              <FormField label="Onde você mora atualmente?">
                <TextInput
                  value={formData.personal.currentCountry}
                  onChange={(v) => updatePersonal("currentCountry", v)}
                  placeholder="Ex: Brasil"
                />
              </FormField>
            </FormStep>

            {/* Step 2 - Educação */}
            <FormStep
              title="Formação Acadêmica"
              description="Suas qualificações educacionais"
              isActive={currentStep === 1}
            >
              <FormField label="Qual seu maior nível de formação?" required>
                <SelectInput
                  value={formData.education.level}
                  onChange={(v) => updateEducation("level", v as EducationLevel)}
                  options={educationLevelOptions}
                  placeholder="Selecione seu nível de formação"
                />
              </FormField>

              <FormField label="Área de formação" required>
                <RadioGroup
                  value={formData.education.area}
                  onChange={(v) => updateEducation("area", v as EducationArea)}
                  options={educationAreaOptions}
                  columns={2}
                />
              </FormField>

              <FormField
                label="País da instituição"
                hint="Onde você concluiu sua formação principal"
              >
                <TextInput
                  value={formData.education.institutionCountry}
                  onChange={(v) => updateEducation("institutionCountry", v)}
                  placeholder="Ex: Brasil"
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  label="Publicações acadêmicas"
                  hint="Artigos, papers, livros"
                >
                  <NumberStepper
                    value={formData.education.publications}
                    onChange={(v) => updateEducation("publications", v)}
                    min={0}
                    max={100}
                    label="publicação(ões)"
                  />
                </FormField>

                <FormField
                  label="Patentes"
                  hint="Patentes registradas"
                >
                  <NumberStepper
                    value={formData.education.patents}
                    onChange={(v) => updateEducation("patents", v)}
                    min={0}
                    max={50}
                    label="patente(s)"
                  />
                </FormField>
              </div>
            </FormStep>

            {/* Step 3 - Experiência Profissional */}
            <FormStep
              title="Experiência Profissional"
              description="Sua trajetória de carreira"
              isActive={currentStep === 2}
            >
              <FormField label="Anos de experiência profissional" required>
                <NumberStepper
                  value={formData.professional.yearsExperience}
                  onChange={(v) => updateProfessional("yearsExperience", v)}
                  min={0}
                  max={50}
                  label="ano(s)"
                />
              </FormField>

              <FormField label="Cargo atual">
                <TextInput
                  value={formData.professional.currentRole}
                  onChange={(v) => updateProfessional("currentRole", v)}
                  placeholder="Ex: Engenheiro de Software Sênior"
                />
              </FormField>

              <FormField label="Setor/Indústria">
                <TextInput
                  value={formData.professional.industry}
                  onChange={(v) => updateProfessional("industry", v)}
                  placeholder="Ex: Tecnologia, Saúde, Finanças"
                />
              </FormField>

              <FormField label="Você ocupa cargo de gestão/liderança?">
                <Checkbox
                  checked={formData.professional.isManager}
                  onChange={(v) => updateProfessional("isManager", v)}
                  label="Sim, sou gestor/líder de equipe"
                  description="Gerente, diretor, coordenador ou similar"
                />
              </FormField>

              {formData.professional.isManager && (
                <FormField label="Tamanho da equipe que você lidera">
                  <NumberStepper
                    value={formData.professional.teamSize}
                    onChange={(v) => updateProfessional("teamSize", v)}
                    min={1}
                    max={500}
                    label="pessoa(s)"
                  />
                </FormField>
              )}

              <FormField label="Experiência internacional">
                <Checkbox
                  checked={formData.professional.hasInternationalExp}
                  onChange={(v) => updateProfessional("hasInternationalExp", v)}
                  label="Tenho experiência internacional"
                  description="Trabalhou ou estudou fora do Brasil"
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Prêmios e reconhecimentos">
                  <NumberStepper
                    value={formData.professional.awards}
                    onChange={(v) => updateProfessional("awards", v)}
                    min={0}
                    max={50}
                    label="prêmio(s)"
                  />
                </FormField>

                <FormField label="Palestras/Apresentações">
                  <NumberStepper
                    value={formData.professional.speakingEngagements}
                    onChange={(v) => updateProfessional("speakingEngagements", v)}
                    min={0}
                    max={100}
                    label="palestra(s)"
                  />
                </FormField>
              </div>
            </FormStep>

            {/* Step 4 - Idiomas */}
            <FormStep
              title="Idiomas"
              description="Suas habilidades linguísticas"
              isActive={currentStep === 3}
            >
              <FormField label="Nível de Inglês" required>
                <RadioGroup
                  value={formData.languages.englishLevel}
                  onChange={(v) => updateLanguages("englishLevel", v as EnglishLevel)}
                  options={englishLevelOptions}
                  columns={2}
                />
              </FormField>

              <FormField label="Nível de Espanhol">
                <SelectInput
                  value={formData.languages.spanishLevel}
                  onChange={(v) => updateLanguages("spanishLevel", v as EnglishLevel)}
                  options={englishLevelOptions}
                  placeholder="Selecione seu nível"
                />
              </FormField>

              <FormField
                label="Outros idiomas"
                hint="Separe por vírgula"
              >
                <TextInput
                  value={formData.languages.otherLanguages.join(", ")}
                  onChange={(v) =>
                    updateLanguages(
                      "otherLanguages",
                      v.split(",").map((s) => s.trim()).filter(Boolean)
                    )
                  }
                  placeholder="Ex: Francês, Alemão, Mandarim"
                />
              </FormField>
            </FormStep>

            {/* Step 5 - Situação Financeira */}
            <FormStep
              title="Situação Financeira"
              description="Recursos disponíveis para o processo"
              isActive={currentStep === 4}
            >
              <FormField
                label="Capital disponível para investimento"
                required
                hint="Considere recursos próprios e de cônjuge"
              >
                <RadioGroup
                  value={formData.financial.investmentRange}
                  onChange={(v) => updateFinancial("investmentRange", v as InvestmentRange)}
                  options={investmentRangeOptions}
                  columns={2}
                />
              </FormField>

              <FormField label="Você já tem negócio nos EUA?">
                <Checkbox
                  checked={formData.financial.hasUSBusiness}
                  onChange={(v) => updateFinancial("hasUSBusiness", v)}
                  label="Sim, tenho negócio estabelecido nos EUA"
                  description="Empresa própria ou sociedade"
                />
              </FormField>

              <FormField label="Você tem oferta de emprego nos EUA?">
                <Checkbox
                  checked={formData.financial.hasUSJobOffer}
                  onChange={(v) => updateFinancial("hasUSJobOffer", v)}
                  label="Sim, tenho oferta de emprego"
                  description="Oferta formal de empresa americana"
                />
              </FormField>

              {formData.financial.hasUSJobOffer && (
                <FormField label="Nome da empresa patrocinadora">
                  <TextInput
                    value={formData.financial.sponsorCompany}
                    onChange={(v) => updateFinancial("sponsorCompany", v)}
                    placeholder="Ex: Google, Amazon, startup XYZ"
                  />
                </FormField>
              )}
            </FormStep>

            {/* Step 6 - Objetivos */}
            <FormStep
              title="Seus Objetivos"
              description="O que você busca nos EUA"
              isActive={currentStep === 5}
            >
              <FormField
                label="Qual tipo de visto te interessa mais?"
                hint="Se não souber, selecione 'Quero descobrir'"
              >
                <RadioGroup
                  value={formData.objectives.visaPreference}
                  onChange={(v) => updateObjectives("visaPreference", v as VisaPreference)}
                  options={visaPreferenceOptions}
                  columns={1}
                />
              </FormField>

              <FormField label="Qual seu prazo desejado?">
                <RadioGroup
                  value={formData.objectives.timeline}
                  onChange={(v) => updateObjectives("timeline", v as Timeline)}
                  options={timelineOptions}
                  columns={2}
                />
              </FormField>

              <FormField label="Qual seu principal objetivo nos EUA?">
                <TextInput
                  value={formData.objectives.primaryGoal}
                  onChange={(v) => updateObjectives("primaryGoal", v)}
                  placeholder="Ex: Crescer na carreira, abrir negócio, qualidade de vida"
                />
              </FormField>

              <FormField label="Disposição para estudar">
                <Checkbox
                  checked={formData.objectives.willingToStudy}
                  onChange={(v) => updateObjectives("willingToStudy", v)}
                  label="Estou disposto(a) a fazer cursos/certificações"
                  description="Para melhorar meu perfil de imigração"
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
                  {isSubmitting ? "Analisando..." : "Ver Meu Resultado"}
                </Button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              🔒 Seus dados são confidenciais e não serão compartilhados
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

