"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import {
  ScoreCircle,
  VisaCard,
  RecommendationsList,
} from "@/components/raio-x/ScoreResult";
import { RaioXResult } from "@/types/raio-x";

export default function ResultadoPage() {
  const router = useRouter();
  const [result, setResult] = useState<RaioXResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar resultado do sessionStorage
    const savedResult = sessionStorage.getItem("raioXResult");
    
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      // Se não houver resultado, redirecionar para o formulário
      router.push("/raio-x");
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[var(--brasil-azul)] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[var(--muted-foreground)]">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getScoreMessage = (score: number) => {
    if (score >= 70) {
      return {
        title: "Excelente potencial!",
        message: "Seu perfil tem alta compatibilidade com várias opções de visto.",
        color: "text-[var(--brasil-verde)]",
      };
    }
    if (score >= 50) {
      return {
        title: "Bom potencial!",
        message: "Você tem boas chances, com algumas melhorias estratégicas.",
        color: "text-[var(--brasil-azul)]",
      };
    }
    if (score >= 30) {
      return {
        title: "Potencial moderado",
        message: "Existem caminhos possíveis, mas requerem preparação adicional.",
        color: "text-[var(--brasil-amarelo-dark)]",
      };
    }
    return {
      title: "Construindo seu perfil",
      message: "Recomendamos fortalecer alguns pontos antes de iniciar o processo.",
      color: "text-red-500",
    };
  };

  const scoreMessage = getScoreMessage(result.overallScore);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Result */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brasil-verde)]/10 border border-[var(--brasil-verde)]/20 rounded-full mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[var(--brasil-verde)]" />
              <span className="text-sm font-medium text-[var(--brasil-verde)]">
                Diagnóstico Completo
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 animate-slide-up">
              Seu Raio-X de{" "}
              <span className="text-brasil-gradient">Imigração</span>
            </h1>

            <p className="text-lg text-[var(--muted-foreground)] mb-8 animate-slide-up delay-100">
              Aqui está uma análise detalhada do seu potencial de imigração para os EUA
            </p>

            {/* Main Score */}
            <div className="flex flex-col items-center gap-4 animate-slide-up delay-200">
              <ScoreCircle score={result.overallScore} size="lg" />
              <div className="text-center">
                <h2 className={`text-2xl font-bold ${scoreMessage.color}`}>
                  {scoreMessage.title}
                </h2>
                <p className="text-[var(--muted-foreground)] max-w-md">
                  {scoreMessage.message}
                </p>
              </div>
            </div>
          </section>

          {/* Profile Strengths */}
          {result.profileStrengths.length > 0 && (
            <section className="mb-12 animate-slide-up delay-300">
              <div className="bg-gradient-to-r from-[var(--brasil-verde)]/10 via-[var(--brasil-azul)]/10 to-[var(--brasil-amarelo)]/10 rounded-2xl p-6 border border-[var(--card-border)]">
                <h3 className="text-lg font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-[var(--brasil-verde)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  Pontos Fortes do Seu Perfil
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.profileStrengths.map((strength, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white dark:bg-[var(--neutral-800)] rounded-full text-sm font-medium text-[var(--foreground)] border border-[var(--card-border)]"
                    >
                      ✓ {strength}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Visa Compatibility */}
          <section className="mb-12">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[var(--brasil-azul)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Compatibilidade por Tipo de Visto
            </h3>

            <div className="space-y-4">
              {result.visaScores.map((visa, index) => (
                <VisaCard key={visa.visaCode} visa={visa} rank={index + 1} />
              ))}
            </div>
          </section>

          {/* Recommendations and Next Steps */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <RecommendationsList
              title="Recomendações"
              items={result.recommendations}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              }
              iconColor="text-[var(--brasil-amarelo-dark)]"
            />

            <RecommendationsList
              title="Próximos Passos"
              items={result.nextSteps}
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              }
              iconColor="text-[var(--brasil-azul)]"
            />
          </section>

          {/* CTA Section */}
          <section className="bg-[var(--brasil-azul)] rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Pronto para dar o próximo passo?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Nosso time pode conectar você com advogados especializados para
              avaliar seu caso em detalhes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[var(--brasil-amarelo)] text-[var(--brasil-azul-dark)] hover:bg-[var(--brasil-amarelo-light)]"
                rightIcon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                }
              >
                Falar com Especialista
              </Button>
              <Link href="/raio-x">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Refazer Diagnóstico
                </Button>
              </Link>
            </div>
          </section>

          {/* Share Section */}
          <section className="mt-8 text-center">
            <p className="text-sm text-[var(--muted)] mb-3">
              Compartilhe seu resultado
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Meu Raio-X de Imigração",
                      text: `Meu score de imigração é ${result.overallScore}/100! Faça o seu também.`,
                      url: window.location.origin,
                    });
                  }
                }}
                className="p-3 rounded-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] hover:bg-[var(--brasil-azul)] hover:text-white transition-colors"
                aria-label="Compartilhar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  const text = `Meu score de imigração é ${result.overallScore}/100! Minha melhor opção é o visto ${result.topVisa.visaCode}. Faça o seu Raio-X gratuito: ${window.location.origin}`;
                  navigator.clipboard.writeText(text);
                  alert("Copiado para a área de transferência!");
                }}
                className="p-3 rounded-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] hover:bg-[var(--brasil-verde)] hover:text-white transition-colors"
                aria-label="Copiar link"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

