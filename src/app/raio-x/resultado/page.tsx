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
            <Link href="/#como-funciona" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
              Como Funciona
            </Link>
            <Link href="/raio-x" className="text-gray-600 hover:text-green-700 transition-colors font-medium">
              Raio-X
            </Link>
          </nav>
          <Link href="/raio-x" className="hidden md:block">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Começar Diagnóstico
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
              O sistema operacional indispensável para a vida do brasileiro nos Estados Unidos.
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
              <li>
                <span className="text-gray-500 text-sm">
                  Comunidade{" "}
                  <span className="text-green-400">(em breve)</span>
                </span>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Manual do Brasileiro. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function ResultadoPage() {
  const router = useRouter();
  const [result, setResult] = useState<RaioXResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar resultado do sessionStorage
    const savedResult = sessionStorage.getItem("raioXResult");
    
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(parsedResult as RaioXResult);
      } catch (error) {
        console.error("Erro ao parsear resultado:", error);
        router.push("/raio-x");
        return;
      }
    } else {
      // Se não houver resultado, redirecionar para o formulário
      router.push("/raio-x");
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SimpleHeader />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <section className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-800">
                Diagnóstico Completo
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Seu Raio-X de{" "}
              <span className="text-green-600">Imigração</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Aqui está uma análise detalhada do seu potencial de imigração para os EUA
            </p>
          </section>

          {/* Score Principal */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 md:p-12 text-center">
              <div className="relative inline-block mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - result.overallScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{result.overallScore}</div>
                    <div className="text-sm text-gray-600">pontos</div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {result.overallScore >= 70
                  ? "Excelente Potencial!"
                  : result.overallScore >= 50
                  ? "Bom Potencial!"
                  : result.overallScore >= 30
                  ? "Potencial Moderado"
                  : "Potencial em Desenvolvimento"
                }
              </h2>

              <p className="text-gray-600 max-w-md mx-auto">
                {result.overallScore >= 70
                  ? "Seu perfil tem alta compatibilidade com várias opções de visto. Você está muito bem posicionado!"
                  : result.overallScore >= 50
                  ? "Você tem boas chances, com algumas melhorias estratégicas no seu perfil."
                  : result.overallScore >= 30
                  ? "Existem caminhos possíveis, mas será necessário um planejamento mais detalhado."
                  : "Recomendamos fortalecer alguns pontos antes de iniciar o processo de imigração."
                }
              </p>
            </div>
          </section>

          {/* Pontos Fortes */}
          {result.profileStrengths.length > 0 && (
            <section className="mb-12">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">💪</span>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">
                  Pontos Fortes do Seu Perfil
                </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.profileStrengths.map((strength, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-800 text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Compatibilidade por Tipo de Visto */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-purple-900">
              Compatibilidade por Tipo de Visto
            </h3>
              </div>

            <div className="space-y-4">
                {result.visaScores.slice(0, 6).map((visa, index) => (
                  <div key={visa.visaCode} className={`p-6 rounded-xl border-2 transition-all ${
                    index === 0 ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-white'
                  }`}>
                    {index === 0 && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-3">
                        🏆 Melhor Opção
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-grow">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{visa.visaType}</h4>
                        <p className="text-gray-600 text-sm mb-3">{visa.visaCode}</p>

                        {visa.strengths.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-green-700 mb-2">Pontos positivos:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {visa.strengths.slice(0, 2).map((strength, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-600 mt-1">•</span>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {visa.improvements.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-orange-700 mb-2">Oportunidades de melhoria:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {visa.improvements.slice(0, 2).map((improvement, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-orange-600 mt-1">•</span>
                                  {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="relative w-20 h-20">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="6"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="32"
                              fill="none"
                              stroke={
                                visa.compatibility === 'high' ? '#10b981' :
                                visa.compatibility === 'medium' ? '#f59e0b' : '#ef4444'
                              }
                              strokeWidth="6"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 32}`}
                              strokeDashoffset={`${2 * Math.PI * 32 * (1 - visa.score / 100)}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-bold text-gray-900">{visa.score}%</span>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          visa.compatibility === 'high'
                            ? 'bg-green-100 text-green-800'
                            : visa.compatibility === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {visa.compatibility === 'high' ? 'Alta' :
                           visa.compatibility === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                <h3 className="text-lg font-bold text-green-900">Próximos Passos</h3>
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
          <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">
              Pronto para dar o próximo passo?
            </h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Nosso time pode conectar você com advogados especializados para avaliar seu caso em detalhes e maximizar suas chances de sucesso.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-yellow-400 text-green-900 px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors font-semibold flex items-center gap-2">
                <span>💬</span>
                Falar com Especialista
              </button>
              <Link href="/raio-x">
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-700 transition-colors font-semibold">
                  Refazer Diagnóstico
                </button>
              </Link>
            </div>
          </section>

          {/* Compartilhar Resultado */}
          <section className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Compartilhe seu resultado
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: "Meu Raio-X de Imigração",
                      text: `Meu score de imigração é ${result.overallScore}/100! Faça o seu também.`,
                      url: window.location.origin,
                    });
                  } else {
                    navigator.clipboard.writeText(
                      `Meu score de imigração é ${result.overallScore}/100! Faça o seu Raio-X gratuito: ${window.location.origin}`
                    );
                    alert("Link copiado para a área de transferência!");
                  }
                }}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                title="Compartilhar"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Meu score de imigração é ${result.overallScore}/100! Minha melhor opção é o visto ${result.topVisa.visaCode}. Faça o seu Raio-X gratuito: ${window.location.origin}`
                  );
                  alert("Copiado para a área de transferência!");
                }}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                title="Copiar link"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}