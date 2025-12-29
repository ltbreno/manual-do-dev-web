import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Card, { CardContent } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[var(--background)]">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,var(--brasil-verde)_0%,transparent_40%)]" />
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,var(--brasil-azul)_0%,transparent_40%)]" />
              <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_80%,var(--brasil-amarelo)_0%,transparent_30%)]" />
            </div>
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brasil-verde)]/10 border border-[var(--brasil-verde)]/20 rounded-full mb-8 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-[var(--brasil-verde)] animate-pulse" />
                <span className="text-sm font-medium text-[var(--brasil-verde)]">
                  Diagnóstico de Imigração Gratuito
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
                <span className="text-[var(--foreground)]">O Sistema Operacional</span>
                <br />
                <span className="text-brasil-gradient">do Brasileiro nos EUA</span>
          </h1>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--muted-foreground)] mb-10 animate-slide-up delay-100">
                Sua jornada para os Estados Unidos começa aqui. Descubra seu potencial de
                imigração com nosso diagnóstico inteligente e gratuito.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                <Link href="/raio-x">
                  <Button size="lg" rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }>
                    Fazer Meu Raio-X Gratuito
                  </Button>
                </Link>
                <Link href="/#como-funciona">
                  <Button variant="outline" size="lg">
                    Como Funciona
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up delay-300">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--brasil-azul)]">6+</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">Tipos de Visto</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--brasil-verde)]">100%</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">Gratuito</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--brasil-amarelo)]">5min</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">Para Resultado</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-[var(--muted-foreground)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                Tudo que você precisa,{" "}
                <span className="text-brasil-gradient">em um só lugar</span>
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Um ecossistema completo para transformar seu sonho americano em realidade.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 - Raio-X */}
              <Card hover gradient className="group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brasil-azul)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    Raio-X de Imigração
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    Diagnóstico inteligente que analisa seu perfil e indica os melhores
                    caminhos de visto para você. Resultado em 5 minutos.
                  </p>
                  <Link
                    href="/raio-x"
                    className="inline-flex items-center gap-2 text-[var(--brasil-azul)] font-semibold group-hover:gap-3 transition-all"
                  >
                    Começar agora
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 2 - Comunidade */}
              <Card hover className="group relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--brasil-amarelo)]/20 text-[var(--brasil-amarelo-dark)] text-xs font-semibold rounded-full">
                  Em breve
                </div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brasil-verde)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    Comunidade & Mentoria
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    Conecte-se com brasileiros que já passaram pelo processo. Mentoria
                    de carreira e networking exclusivo.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[var(--muted)] font-semibold">
                    Disponível em breve
                  </span>
                </CardContent>
              </Card>

              {/* Feature 3 - Marketplace */}
              <Card hover className="group relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--brasil-amarelo)]/20 text-[var(--brasil-amarelo-dark)] text-xs font-semibold rounded-full">
                  Em breve
                </div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brasil-amarelo)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-[var(--brasil-azul-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    Marketplace Verificado
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    Advogados, contadores e prestadores de serviço com selo de qualidade
                    e avaliações reais da comunidade.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[var(--muted)] font-semibold">
                    Disponível em breve
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="como-funciona" className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                Como funciona o{" "}
                <span className="text-[var(--brasil-azul)]">Raio-X</span>
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Em poucos minutos, você terá clareza sobre suas opções de imigração.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--brasil-azul)] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Preencha o Formulário
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Responda perguntas sobre sua educação, experiência profissional,
                  idiomas e objetivos em 5 minutos.
                </p>
                {/* Connector */}
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--brasil-azul)] to-[var(--brasil-verde)]" />
              </div>

              {/* Step 2 */}
              <div className="relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--brasil-verde)] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Análise Inteligente
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Nosso sistema analisa seu perfil e compara com os requisitos
                  de cada tipo de visto disponível.
                </p>
                {/* Connector */}
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--brasil-verde)] to-[var(--brasil-amarelo)]" />
              </div>

              {/* Step 3 */}
              <div className="relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--brasil-amarelo)] text-[var(--brasil-azul-dark)] text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Receba seu Diagnóstico
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Veja seu score, compatibilidade por visto e um plano de ação
                  personalizado com próximos passos.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/raio-x">
                <Button size="lg">
                  Começar Meu Diagnóstico
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Visa Types Section */}
        <section className="py-20 md:py-32 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                Tipos de Visto que{" "}
                <span className="text-brasil-gradient">Analisamos</span>
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Cobrimos os principais caminhos de imigração para profissionais brasileiros.
          </p>
        </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {[
                {
                  code: "EB-1",
                  name: "Habilidade Extraordinária",
                  description: "Para profissionais com reconhecimento internacional em sua área.",
                  color: "var(--brasil-azul)",
                },
                {
                  code: "EB-2 NIW",
                  name: "Interesse Nacional",
                  description: "Para quem pode contribuir significativamente para os EUA.",
                  color: "var(--brasil-verde)",
                },
                {
                  code: "EB-3",
                  name: "Trabalhador Qualificado",
                  description: "Para profissionais com oferta de emprego de empresa americana.",
                  color: "var(--brasil-amarelo)",
                },
                {
                  code: "O-1",
                  name: "Habilidade Extraordinária",
                  description: "Visto temporário para talentos excepcionais em diversas áreas.",
                  color: "var(--brasil-azul)",
                },
                {
                  code: "L-1",
                  name: "Transferência Intracompany",
                  description: "Para executivos transferidos dentro de uma mesma empresa.",
                  color: "var(--brasil-verde)",
                },
                {
                  code: "E-2",
                  name: "Investidor",
                  description: "Para empreendedores que investem em negócio nos EUA.",
                  color: "var(--brasil-amarelo)",
                },
              ].map((visa, index) => (
                <Card key={index} hover className="group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                        style={{ backgroundColor: visa.color }}
                      >
                        {visa.code.split(" ")[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--foreground)]">
                          {visa.code}
                        </h3>
                        <p className="text-sm text-[var(--brasil-azul)] font-medium mb-1">
                          {visa.name}
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {visa.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--brasil-azul)]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,var(--brasil-verde)_0%,transparent_50%)]" />
              <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_0%_100%,var(--brasil-amarelo)_0%,transparent_50%)]" />
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para descobrir seu potencial?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Faça seu Raio-X de Imigração agora e descubra qual é o melhor
              caminho para você nos Estados Unidos.
            </p>
            <Link href="/raio-x">
              <Button
                size="lg"
                className="bg-[var(--brasil-amarelo)] text-[var(--brasil-azul-dark)] hover:bg-[var(--brasil-amarelo-light)] shadow-xl"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                Fazer Meu Raio-X Gratuito
              </Button>
            </Link>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
