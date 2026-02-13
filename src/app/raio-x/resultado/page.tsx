"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImmigrationResult } from "@/types/raio-x";
import { ScoreCircle } from "@/components/raio-x/ScoreResult";

// Componente Header simplificado
function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <div className="absolute inset-0 bg-green-500 rounded-lg transform rotate-45" />
              <div className="absolute inset-1 bg-yellow-200 rounded-lg transform rotate-45" />
              <div className="absolute inset-2 bg-green-700 rounded-lg transform rotate-45 flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-sm transform -rotate-45">
                  MB
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg md:text-xl text-gray-900">
                Manual do{" "}
                <span className="text-green-600">Brasileiro</span>
              </span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
              Recursos
            </Link>
            <Link href="/raio-x" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
              Raio-X
            </Link>
          </nav>
          <Link href="/raio-x" className="hidden md:block">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Refazer Diagnóstico
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

// Componente Footer simplificado
function SimpleFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-green-500 rounded-lg transform rotate-45" />
                <div className="absolute inset-1 bg-yellow-200 rounded-lg transform rotate-45" />
                <div className="absolute inset-2 bg-green-700 rounded-lg transform rotate-45 flex items-center justify-center">
                  <span className="text-white font-bold text-xs transform -rotate-45">
                    MB
                  </span>
                </div>
              </div>
              <span className="font-bold text-lg">
                Manual do{" "}
                <span className="text-green-400">Brasileiro</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              O sistema operacional indispensável para o sucesso do empreendedor brasileiro.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/raio-x" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Raio-X de Imigração
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contato@manualdobrasileiro.com"
                  className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  contato@manualdobrasileiro.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-500 text-sm text-center">
            © {currentYear} Manual do Brasileiro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function ResultadoPage() {
  const router = useRouter();
  const [result, setResult] = useState<ImmigrationResult | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedResult = sessionStorage.getItem("immigrationResult");
      if (savedResult) {
        try {
          setResult(JSON.parse(savedResult));
        } catch {
          router.push("/raio-x");
        }
      } else {
        router.push("/raio-x");
      }
    }
  }, [router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Calculando seu diagnóstico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SimpleHeader />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-sm font-medium text-blue-800">
                Análise Preliminar
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seu Diagnóstico de{" "}
              <span className="text-green-600">Viabilidade Imigratória</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Com base nas suas respostas, analisamos sua compatibilidade com os principais vistos para os EUA.
            </p>
          </section>

          {/* Score Principal */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor"><path d="M100 0L200 100L100 200L0 100Z" /></svg>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                <ScoreCircle score={result.overallScore} size="lg" label="Índice Geral de Aprovação" />

                <div className="text-left space-y-4 max-w-md">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {result.leadClassification === "Hot" ? "Perfil Altamente Qualificado" :
                      result.leadClassification === "Warm" ? "Perfil com Potencial" :
                        "Perfil em Desenvolvimento"}
                  </h2>
                  <p className="text-gray-600">
                    Seu perfil apresenta indícios de elegibilidade. O próximo passo é entender a melhor estratégia jurídica para o seu caso.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {/* Risk Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${result.riskAnalysis.includes("Alto") ? "bg-red-100 text-red-700 border-red-200" : "bg-blue-50 text-blue-700 border-blue-200"}`}>
                      {result.riskAnalysis}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visas Recomendados */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-green-600">🏛️</span> Vistos Recomendados
            </h3>

            {result.recommendedVisas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {result.recommendedVisas.map((visa, i) => (
                  <div key={i} className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-gray-900">{visa}</span>
                      <span className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Categoria indicada para o seu perfil profissional e objetivos.
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-gray-50 rounded-xl border border-gray-200 text-center">
                <p className="text-gray-600">
                  Não identificamos uma categoria clara de visto com base nas respostas iniciais.
                  Recomendamos uma análise detalhada.
                </p>
              </div>
            )}
          </section>

          {/* Pontos Fortes e Próximos Passos */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold">💪</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Seus Pontos Fortes</h3>
              </div>
              <ul className="space-y-4">
                {result.profileStrengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700 font-medium">{str}</span>
                  </li>
                ))}
                {result.profileStrengths.length === 0 && (
                  <li className="text-gray-500 italic">Nenhum ponto forte específico destacado.</li>
                )}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-green-900">Próximos Passos</h3>
              </div>
              <ul className="space-y-4">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-200/50 text-green-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      {i + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Quer uma análise oficial?</h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto relative z-10">
              Transforme esse diagnóstico em um plano jurídico concreto. Fale com nossos especialistas licenciados.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-500 transition-all font-bold shadow-lg shadow-green-900/20 transform hover:-translate-y-1">
                Agendar Consultoria
              </button>
              <Link href="/raio-x">
                <button className="px-6 py-4 rounded-xl text-gray-300 hover:text-white transition-colors font-medium">
                  Refazer Teste
                </button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}