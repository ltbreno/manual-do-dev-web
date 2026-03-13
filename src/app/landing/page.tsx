import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import HeroBannerCarousel from "@/components/landing/HeroBannerCarousel";

export const metadata = {
  title: "Manual do Brasileiro | Raio-X Imigração, Empresa e Viagens",
  description:
    "Diagnósticos inteligentes para imigração, expansão de empresas e viagens aos EUA. Receba clareza e próximos passos em poucos minutos.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative pt-16 md:pt-20 pb-16 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--background)]">
            <div className="absolute inset-0 opacity-35">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_15%,var(--brand-verde)_0%,transparent_45%)]" />
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_85%_25%,var(--brand-verde-escuro)_0%,transparent_45%)]" />
              <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_90%,var(--brand-bege)_0%,transparent_35%)]" />
            </div>
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />
          </div>

          <HeroBannerCarousel />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-verde)]/10 border border-[var(--brand-verde)]/20 text-[var(--brand-verde-escuro)] text-xs font-bold tracking-wider uppercase animate-fade-in">
                  Diagnóstico Inteligente
                </div>
                <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-tight animate-slide-up">
                  Decida seu próximo passo nos EUA{" "}
                  <span className="text-brand-gradient">com clareza</span>
                </h1>
                <p className="mt-5 text-lg md:text-xl text-[var(--muted-foreground)] max-w-xl animate-slide-up delay-100">
                  Imigração, expansão de empresas ou viagens: responda algumas perguntas e receba um
                  direcionamento objetivo com próximos passos.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-up delay-200">
                  <Link href="/raio-x">
                    <Button size="lg" rightIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    }>
                      Fazer meu Raio‑X
                    </Button>
                  </Link>
                  <Link href="#como-funciona">
                    <Button variant="outline" size="lg">
                      Ver como funciona
                    </Button>
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-slide-up delay-300">
                  {[
                    { t: "Imigração", i: "🛂" },
                    { t: "Empresa", i: "🏢" },
                    { t: "Viagens", i: "✈️" },
                    { t: "Plano de ação", i: "✅" },
                  ].map((item) => (
                    <div
                      key={item.t}
                      className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/70 backdrop-blur-sm px-4 py-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.i}</span>
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          {item.t}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-fade-in delay-200">
                <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xl overflow-hidden">
                  <div className="p-6 md:p-8 bg-brand-gradient text-white">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-white/80 text-sm font-medium">
                          Exemplo de entrega
                        </p>
                        <p className="text-2xl md:text-3xl font-bold">
                          Raio‑X em poucos minutos
                        </p>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2">
                        <span className="text-lg">🔎</span>
                        <span className="text-sm font-semibold">Personalizado</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 space-y-4">
                    {[
                      { d: "Imigração", t: "Rotas recomendadas e prioridades", tag: "Carreira" },
                      { d: "Empresa", t: "Estratégia de expansão e requisitos", tag: "Negócios" },
                      { d: "Viagens", t: "Perfil, vínculos e consistência", tag: "Temporário" },
                      { d: "Próximos passos", t: "Checklist e plano de execução", tag: "Ação" },
                    ].map((row) => (
                      <div
                        key={row.d}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--card-border)] bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] px-4 py-3"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[var(--muted-foreground)]">
                            {row.d}
                          </p>
                          <p className="font-semibold text-[var(--foreground)] truncate">
                            {row.t}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs font-semibold rounded-full bg-[var(--brand-verde)]/10 text-[var(--brand-verde-escuro)] px-3 py-1 border border-[var(--brand-verde)]/20">
                          {row.tag}
                        </span>
                      </div>
                    ))}

                    <div className="pt-2 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-[var(--card-border)] bg-white dark:bg-[var(--neutral-900)] p-4">
                        <p className="text-xs font-bold text-[var(--muted-foreground)]">
                          Score e orientação
                        </p>
                        <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
                          Resultado com contexto
                        </p>
                      </div>
                      <div className="rounded-2xl border border-[var(--card-border)] bg-white dark:bg-[var(--neutral-900)] p-4">
                        <p className="text-xs font-bold text-[var(--muted-foreground)]">
                          Checklist
                        </p>
                        <p className="mt-1 text-lg font-bold text-[var(--foreground)]">
                          Próximos passos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-2xl bg-[var(--brand-verde)]/25 blur-3xl" />
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-2xl bg-[var(--brand-bege)]/35 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="py-16 md:py-20 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] scroll-mt-24 md:scroll-mt-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                Um diagnóstico que{" "}
                <span className="text-brand-gradient">vira ação</span>
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Navegação clara, foco em valor e chamada direta para conversão.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  i: "🧠",
                  t: "Decisões com clareza",
                  d: "Escolha o caminho certo para imigração, empresa ou viagem com menos achismo.",
                },
                {
                  i: "🧾",
                  t: "Menos retrabalho",
                  d: "Estrutura, checklist e próximos passos para você avançar com consistência.",
                },
                {
                  i: "🗺️",
                  t: "Plano executável",
                  d: "Saia com um direcionamento que dá para colocar em prática imediatamente.",
                },
              ].map((item) => (
                <div
                  key={item.t}
                  className="p-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--brand-verde)]/15 flex items-center justify-center mb-5 text-[var(--brand-verde-escuro)] text-xl">
                    {item.i}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-[var(--foreground)]">
                    {item.t}
                  </h3>
                  <p className="text-[var(--muted-foreground)] leading-relaxed">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight">
                  Tudo que importa para o seu{" "}
                  <span className="text-[var(--brand-verde-escuro)]">objetivo nos EUA</span>
                </h2>
                <p className="mt-4 text-[var(--muted-foreground)] text-lg">
                  Em vez de abrir 20 abas, você organiza o essencial e avança com um plano.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      t: "Rota e estratégia",
                      d: "Imigração, empresa ou viagem: entenda opções, restrições e prioridades.",
                    },
                    {
                      t: "Consistência de perfil",
                      d: "Aumente coerência entre objetivo, histórico, evidências e próximos passos.",
                    },
                    {
                      t: "Checklist e evidências",
                      d: "Organize o que reunir e como apresentar de forma mais sólida.",
                    },
                    {
                      t: "Plano de execução",
                      d: "Sequência de ações para reduzir riscos e acelerar decisões.",
                    },
                  ].map((row) => (
                    <div
                      key={row.t}
                      className="flex items-start gap-4 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[var(--brand-verde-escuro)]/10 text-[var(--brand-verde-escuro)] flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <p className="font-bold text-[var(--foreground)]">
                          {row.t}
                        </p>
                        <p className="mt-1 text-[var(--muted-foreground)]">
                          {row.d}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-bege)]/25 border border-[var(--brand-bege)]/35 text-[var(--brand-verde-escuro)] text-xs font-bold tracking-wider uppercase">
                  O que você organiza
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    { t: "Objetivo e visto", i: "🧭" },
                    { t: "Evidências e documentos", i: "📎" },
                    { t: "Empresa e operação", i: "🏢" },
                    { t: "Vínculos e perfil", i: "🧩" },
                    { t: "Cronograma e próximos passos", i: "🗓️" },
                    { t: "Riscos e mitigação", i: "🛡️" },
                  ].map((card) => (
                    <div
                      key={card.t}
                      className="rounded-2xl border border-[var(--card-border)] bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{card.i}</span>
                        <p className="font-semibold text-[var(--foreground)]">
                          {card.t}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href="/raio-x">
                    <Button size="lg" className="w-full">
                      Começar meu Raio‑X agora
                    </Button>
                  </Link>
                  <p className="mt-3 text-xs text-[var(--muted-foreground)] text-center">
                    Escolha imigração, empresa ou viagens e siga o fluxo em poucos passos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="py-16 md:py-20 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)] scroll-mt-24 md:scroll-mt-28"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                Como funciona
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)] max-w-2xl mx-auto">
                Um fluxo rápido para você sair do “o que fazer?” e chegar no “bora executar”.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  n: "1",
                  t: "Conte seu perfil",
                  d: "Selecione seu objetivo (imigração, empresa ou viagens) e responda o essencial.",
                },
                {
                  n: "2",
                  t: "Receba o diagnóstico",
                  d: "Score, recomendações e pontos de atenção para você tomar decisões com clareza.",
                },
                {
                  n: "3",
                  t: "Execute o plano",
                  d: "Aplique os próximos passos, organize evidências e avance com consistência.",
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-verde-escuro)] text-white flex items-center justify-center text-xl font-black mb-5">
                    {step.n}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-[var(--muted-foreground)] leading-relaxed">
                    {step.d}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center">
              <Link href="/raio-x">
                <Button size="lg" className="animate-pulse-glow">
                  Começar agora
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-12 overflow-hidden relative">
              <div className="absolute inset-0 bg-brand-gradient-subtle" />
              <div className="relative">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                      Decida com segurança e{" "}
                      <span className="text-brand-gradient">avance mais rápido</span>
                    </h3>
                    <p className="mt-4 text-[var(--muted-foreground)] text-lg">
                      Um ponto de partida profissional para organizar sua estratégia e evitar decisões
                      no improviso.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link href="/raio-x">
                        <Button size="lg">Acessar a plataforma</Button>
                      </Link>
                      <Link href="/raio-x/viagens">
                        <Button variant="secondary" size="lg">
                          Ver Raio‑X de Viagens
                        </Button>
                      </Link>
                    </div>
                    <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                      Sem promessas mágicas: foco em organização, clareza e execução.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-[var(--card-border)] bg-white dark:bg-[var(--neutral-900)] p-6">
                    <p className="text-sm font-bold text-[var(--foreground)]">
                      Você sai com:
                    </p>
                    <ul className="mt-4 space-y-3 text-[var(--muted-foreground)]">
                      {[
                        "Direcionamento por objetivo (imigração, empresa ou viagens)",
                        "Checklist de próximos passos e pontos de atenção",
                        "Estrutura para organizar evidências e consistência de perfil",
                        "Sugestões práticas para reduzir riscos e retrabalho",
                      ].map((li) => (
                        <li key={li} className="flex items-start gap-3">
                          <span className="mt-1 w-2 h-2 rounded-full bg-[var(--brand-verde)] shrink-0" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[var(--neutral-50)] dark:bg-[var(--neutral-900)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">
                Perguntas frequentes
              </h2>
              <p className="mt-3 text-[var(--muted-foreground)]">
                Respostas rápidas antes de começar.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "Isso substitui consultoria?",
                  a: "Não. Serve para organizar e acelerar decisões. Se você já tem consultor, chega mais preparado.",
                },
                {
                  q: "Serve para quem está no começo?",
                  a: "Sim. Ajuda a estruturar o essencial e entender o que faz diferença antes de investir tempo e dinheiro.",
                },
                {
                  q: "Posso usar para empresa e imigração também?",
                  a: "Sim. Você escolhe o tipo de Raio‑X e o fluxo muda para o seu objetivo.",
                },
                {
                  q: "Como começo agora?",
                  a: "Clique em “Fazer meu Raio‑X”, escolha o objetivo e responda o fluxo. Em poucos passos você terá um direcionamento.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8"
                >
                  <p className="font-bold text-[var(--foreground)]">{item.q}</p>
                  <p className="mt-2 text-[var(--muted-foreground)] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
