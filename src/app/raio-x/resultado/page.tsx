"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RaioXResult } from "@/types/raio-x";

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
                  Raio-X de Negócios
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
  const [result] = useState<RaioXResult | null>(() => {
    if (typeof window === "undefined") return null;
    const savedResult = sessionStorage.getItem("raioXResult");
    if (savedResult) {
      try {
        return JSON.parse(savedResult) as RaioXResult;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (!result) {
      router.push("/raio-x");
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Calculando seu diagnóstico com Manus AI...</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

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
                Análise de Inteligência Artificial
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seu Diagnóstico de{" "}
              <span className="text-green-600">Viabilidade de Visto</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubra quais caminhos de imigração e vistos (EUA/Europa) estão mais alinhados com o momento atual do seu negócio e carreira.
            </p>
          </section>

          {/* Score Principal */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 md:p-12 text-center">
              <div className="relative inline-block mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.overallScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{result.overallScore}</div>
                    <div className="text-sm text-gray-600">Score de<br/>Aderência</div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Potencial Internacional: {
                  result.overallScore >= 80 ? "Alta Aderência" :
                  result.overallScore >= 60 ? "Viável com Ajustes" :
                  result.overallScore >= 40 ? "Em Preparação" : "Inicial"
                }
              </h2>
              
              <p className="text-xs text-gray-500 max-w-md mx-auto mt-2">
                *Este score representa a aderência do seu perfil aos critérios dos vistos analisados. Não é uma garantia de aprovação e deve ser validado por um advogado.
              </p>

              {/* Lead Classification & Risk - Client View */}
              {(result.leadClassification || result.legalRisk) && (
                <div className="flex justify-center gap-4 mt-6 flex-wrap">
                  {result.leadClassification && (
                    <div className={`px-4 py-2 rounded-lg font-bold border flex items-center gap-2 ${
                      result.leadClassification === "Hot" ? "bg-green-100 text-green-800 border-green-200" :
                      result.leadClassification === "Warm" ? "bg-blue-100 text-blue-800 border-blue-200" :
                      "bg-gray-100 text-gray-700 border-gray-200"
                    }`}>
                      {result.leadClassification === "Hot" ? (
                        <><span>🔥</span> Perfil Prioritário para Análise</>
                      ) : result.leadClassification === "Warm" ? (
                        <><span>⚡</span> Perfil Promissor</>
                      ) : (
                        <><span>🌱</span> Perfil em Desenvolvimento</>
                      )}
                    </div>
                  )}
                  {result.legalRisk && (
                    <div className={`px-4 py-2 rounded-lg font-bold border flex items-center gap-2 ${
                      result.legalRisk === "Low" ? "bg-blue-50 text-blue-700 border-blue-200" :
                      result.legalRisk === "Medium" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                      "bg-red-50 text-red-700 border-red-200"
                    }`}>
                       {result.legalRisk === "Low" ? (
                        <><span>🛡️</span> Baixo Histórico de Risco</>
                       ) : result.legalRisk === "Medium" ? (
                        <><span>⚠️</span> Pontos de Atenção no Histórico</>
                       ) : (
                        <><span>🔴</span> Alta Complexidade Jurídica</>
                       )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>



          {/* Métricas Detalhadas */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Nível de Compatibilidade</h3>
            <p className="text-sm text-gray-600 mb-6">
              Os percentuais indicam compatibilidade do seu histórico com os critérios de cada visto.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.businessScores.map((bs, i) => (
                <div key={i} className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-gray-900">{bs.category}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      bs.score >= 70 ? 'bg-green-100 text-green-700' :
                      bs.score >= 40 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {bs.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{bs.description}</p>
                  <div className="space-y-2">
                    {bs.recommendations.map((rec, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-green-500">•</span>
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recomendações e Próximos Passos */}
          <section className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">💡</span>
                </div>
                <h3 className="text-lg font-bold text-yellow-900">Recomendações</h3>
              </div>
              <ul className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-yellow-800 font-bold text-sm">{i + 1}</span>
                    </span>
                    <span className="text-gray-700 text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">🚀</span>
                </div>
                <h3 className="text-lg font-bold text-green-900">Plano Recomendado para seu Perfil</h3>
              </div>
              <ul className="space-y-3">
                {result.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-800 font-bold text-sm">{i + 1}</span>
                    </span>
                    <span className="text-gray-700 text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-3">Quer acelerar seu processo de Visto?</h3>
            <p className="text-white/90 mb-2 max-w-xl mx-auto">
              Perfis como o seu costumam se beneficiar de uma estratégia bem estruturada desde o início.
            </p>
            <p className="text-white/80 text-sm mb-6 max-w-xl mx-auto">
              Nossos especialistas podem ajudar a transformar esse diagnóstico em um plano de ação real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-semibold shadow-md">
                Consultoria Estratégica
              </button>
              <Link href="/raio-x">
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-700 transition-colors font-semibold">
                  Refazer Diagnóstico
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