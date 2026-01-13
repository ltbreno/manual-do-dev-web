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
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,var(--brand-verde)_0%,transparent_40%)]" />
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,var(--brand-verde-escuro)_0%,transparent_40%)]" />
              <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_80%,var(--brand-bege)_0%,transparent_30%)]" />
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
              {/* Badges */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-verde)]/10 border border-[var(--brand-verde)]/20 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-verde)] animate-pulse" />
                  <span className="text-sm font-medium text-[var(--brand-verde)]">
                    Análise de Vistos com IA
                  </span>
                </div>
                <Link href="/raio-x" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-bege)]/20 border border-[var(--brand-bege)]/30 rounded-full hover:bg-[var(--brand-bege)]/30 transition-colors">
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-sm font-medium text-[var(--brand-bege-dark)]">
                    Quer morar ou visitar os EUA? Descubra suas chances!
                  </span>
                </Link>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
                <span className="text-[var(--foreground)]">O Caminho Mais Seguro</span>
                <br />
                <span className="text-brand-gradient">Para Seu Visto Americano</span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-[var(--muted-foreground)] mb-10 animate-slide-up delay-100">
                Sua jornada para os EUA começa aqui. Descubra qual visto você tem mais chances de aprovar
                com nosso diagnóstico inteligente.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                <Link href="/raio-x">
                  <Button size="lg" rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  }>
                    Fazer Análise Gratuita
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
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--brand-verde-escuro)]">5+</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">Tipos de Vistos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--brand-verde)]">IA</div>
                  <div className="text-sm text-[var(--muted-foreground)] mt-1">Análise Inteligente</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--brand-bege)]">2min</div>
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
                Tudo sobre sua imigração,{" "}
                <span className="text-brand-gradient">em um só lugar</span>
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Um ecossistema completo para transformar seu sonho americano em realidade.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Feature 1 - Raio-X */}
              <Card hover gradient className="group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-verde-escuro)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    Raio-X de Vistos
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    Diagnóstico inteligente que analisa seu perfil (Turismo, Estudos, Trabalho, Investimento).
                  </p>
                  <Link
                    href="/raio-x"
                    className="inline-flex items-center gap-2 text-[var(--brand-verde-escuro)] font-semibold group-hover:gap-3 transition-all"
                  >
                    Começar diagnóstico
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </CardContent>
              </Card>

              {/* Feature 2 - Comunidade */}
              <Card hover className="group relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--brand-bege)]/20 text-[var(--brand-bege-dark)] text-xs font-semibold rounded-full">
                  Em breve
                </div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-verde)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    Comunidade USA
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    Conecte-se com brasileiros que já estão lá. Networking e dicas reais.
                  </p>
                  <span className="inline-flex items-center gap-2 text-[var(--muted)] font-semibold">
                    Disponível em breve
                  </span>
                </CardContent>
              </Card>

              {/* Feature 3 - Marketplace */}
              <Card hover className="group relative">
                <div className="absolute top-4 right-4 px-3 py-1 bg-[var(--brand-bege)]/20 text-[var(--brand-bege-dark)] text-xs font-semibold rounded-full">
                  Em breve
                </div>
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-bege)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-[var(--brand-verde-escuro-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                    Serviços Verificados
                  </h3>
                  <p className="text-[var(--muted-foreground)] mb-6">
                    Advogados, Contadores e Despachantes com curadoria e selo de qualidade.
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
                Como funciona a{" "}
                <span className="text-[var(--brand-verde-escuro)]">Análise IA</span>
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Em poucos minutos, você terá um relatório completo sobre sua elegibilidade.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--brand-verde-escuro)] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Responda o Raio-X
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Conte sobre seu objetivo, duração da viagem e perfil profissional/financeiro.
                </p>
                {/* Connector */}
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--brand-verde-escuro)] to-[var(--brand-verde)]" />
              </div>

              {/* Step 2 */}
              <div className="relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--brand-verde)] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Processamento IA
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Nossa inteligência cruza seus dados com as regras atuais da Imigração Americana.
                </p>
                {/* Connector */}
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[var(--brand-verde)] to-[var(--brand-bege)]" />
              </div>

              {/* Step 3 */}
              <div className="relative text-center group">
                <div className="w-16 h-16 rounded-full bg-[var(--brand-bege)] text-[var(--brand-verde-escuro-dark)] text-2xl font-bold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  Resultado Instantâneo
                </h3>
                <p className="text-[var(--muted-foreground)]">
                  Receba seu score de aprovação e orientações passo a passo para o visto ideal.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/raio-x">
                <Button size="lg">
                  Começar Diagnóstico Agora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Business Dimensions Section REPLACED WITH VISA TYPES */}
        <section className="py-20 md:py-32 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4">
                Tipos de Vistos que{" "}
                <span className="text-brand-gradient">Analisamos</span>
              </h2>
              <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Cobrimos as principais categorias para quem quer visitar ou morar nos EUA.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {[
                {
                  code: "B1/B2",
                  name: "Turismo e Negócios",
                  description: "Para viagens curtas a lazer, compras ou reuniões de negócios.",
                  color: "var(--brand-verde-escuro)",
                },
                {
                  code: "F1",
                  name: "Estudante",
                  description: "Para cursos acadêmicos, inglês ou escolas profissionalizantes.",
                  color: "var(--brand-verde)",
                },
                {
                  code: "H1B",
                  name: "Trabalho Especializado",
                  description: "Para profissionais com formação superior e oferta de emprego.",
                  color: "var(--brand-bege)",
                },
                {
                  code: "EB-5",
                  name: "Investidor",
                  description: "Para quem deseja investir capital e gerar empregos nos EUA.",
                  color: "var(--brand-verde-escuro)",
                },
                {
                  code: "O-1",
                  name: "Habilidades Extraordinárias",
                  description: "Para destaques em ciências, artes, educação ou esportes.",
                  color: "var(--brand-verde)",
                },
                {
                  code: "L-1",
                  name: "Transferência",
                  description: "Para executivos sendo transferidos de empresas multinacionais.",
                  color: "var(--brand-bege)",
                },
              ].map((dim, index) => (
                <Card key={index} hover className="group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shrink-0"
                        style={{ backgroundColor: dim.color }}
                      >
                        {dim.code}
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--foreground)]">
                          {dim.name}
                        </h3>
                        <p className="text-sm text-[var(--brand-verde-escuro)] font-medium mb-1">
                          Categoria Comum
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                          {dim.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Exit Strategy Section REPLACED WITH IMMIGRATION DREAM */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-bege)]/10 via-transparent to-[var(--brand-verde)]/10" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-verde-escuro)]/10 rounded-full mb-6">
                  <span className="text-2xl">🌎</span>
                  <span className="text-sm font-semibold text-[var(--brand-verde-escuro)]">
                    Planejamento Migratório
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
                  Seu sonho americano, com{" "}
                  <span className="text-[var(--brand-verde)]">segurança</span>
                </h2>
                
                <p className="text-lg text-[var(--muted-foreground)] mb-6">
                  Muitos vistos são negados por falta de planejamento ou escolha da categoria errada.
                  Nossa IA ajuda você a identificar o caminho com maior probabilidade de sucesso.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand-verde)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[var(--brand-verde)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--foreground)]">
                      <strong>Evite negativas</strong> entendendo seus pontos fracos
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand-verde)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[var(--brand-verde)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--foreground)]">
                      <strong>Economize tempo</strong> focando no visto certo
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--brand-verde)]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[var(--brand-verde)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[var(--foreground)]">
                      <strong>Dicas personalizadas</strong> para sua entrevista
                    </span>
                  </li>
                </ul>
                
                <Link href="/raio-x">
                  <Button 
                    size="lg"
                    className="bg-[var(--brand-verde-escuro)] text-white hover:bg-[var(--brand-verde-escuro-dark)]"
                    rightIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    }
                  >
                    Avaliar Meu Perfil
                  </Button>
                </Link>
              </div>
              
              {/* Visual Card */}
              <div className="relative">
                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">✈️</div>
                    <h3 className="text-xl font-bold text-[var(--foreground)]">
                      Análise de Vistos EUA
                    </h3>
                    <p className="text-[var(--muted-foreground)] text-sm">
                      Gratuito • 2 minutos • Relatório IA
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-[var(--neutral-50)] dark:bg-[var(--neutral-800)] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-verde-escuro)] flex items-center justify-center text-white font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">Seus Objetivos</p>
                        <p className="text-sm text-[var(--muted)]">Turismo, Trabalho ou Estudo</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-[var(--neutral-50)] dark:bg-[var(--neutral-800)] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-verde)] flex items-center justify-center text-white font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">Análise de Perfil</p>
                        <p className="text-sm text-[var(--muted)]">Verificação de eligibilidade</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-[var(--neutral-50)] dark:bg-[var(--neutral-800)] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-bege)] flex items-center justify-center text-[var(--brand-verde-escuro-dark)] font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">Resultado</p>
                        <p className="text-sm text-[var(--muted)]">Suas melhores opções de visto</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--brand-verde)]/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--brand-bege)]/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--brand-verde-escuro)]">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_100%_0%,var(--brand-verde)_0%,transparent_50%)]" />
              <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(circle_at_0%_100%,var(--brand-bege)_0%,transparent_50%)]" />
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Pronto para planejar sua viagem?
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Faça seu Raio-X de Vistos agora e aumente suas chances de aprovação com nossa inteligência artificial.
            </p>
            <Link href="/raio-x">
              <Button
                size="lg"
                className="bg-[var(--brand-bege)] text-[var(--brand-verde-escuro-dark)] hover:bg-[var(--brand-bege-light)] shadow-xl"
                rightIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                }
              >
                Analisar Meu Perfil Grátis
              </Button>
            </Link>
        </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
