import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export const metadata = {
  title: "Manual do Brasileiro – Aprenda a construir sua vida nos EUA",
  description:
    "Landing Page oficial do Manual do Brasileiro. Estratégias, checklists e ferramentas práticas para planejar sua jornada e negócios nos Estados Unidos.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="pt-32 pb-16 bg-gradient-to-b from-[var(--neutral-50)] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--brand-verde)]/10 text-[var(--brand-verde-escuro)] text-xs font-bold tracking-wider uppercase">
                  Nova Edição
                </div>
                <h1 className="mt-4 text-4xl md:text-5xl font-black text-[var(--foreground)] leading-tight">
                  Manual do Brasileiro
                  <span className="block text-[var(--brand-verde-escuro)]">Negócios, Imigração e Vida nos EUA</span>
                </h1>
                <p className="mt-5 text-lg text-[var(--muted-foreground)]">
                  Um guia prático, direto ao ponto, com frameworks, checklists e roteiros prontos
                  para acelerar suas decisões e reduzir custos no caminho para os Estados Unidos.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/">
                    <Button size="lg">Acessar o Manual</Button>
                  </Link>
                  <Link href="/raio-x">
                    <Button variant="secondary" size="lg">Fazer Raio‑X de Vistos</Button>
                  </Link>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-verde-escuro)]/20" />
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-bege)]/30" />
                    <div className="w-8 h-8 rounded-full bg-[var(--brand-verde)]/20" />
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    +1.000 brasileiros já utilizaram nossos frameworks e checklists
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl border border-[var(--card-border)] bg-white shadow-xl p-6">
                  <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[var(--brand-verde)]/15 via-[var(--brand-bege)]/10 to-[var(--brand-verde-escuro)]/10"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-2xl bg-[var(--brand-verde)]/20 blur-2xl" />
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-[var(--brand-bege)]/30 blur-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-white">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-verde)]/15 flex items-center justify-center mb-4 text-[var(--brand-verde-escuro)]">📦</div>
                <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">Frameworks Práticos</h3>
                <p className="text-[var(--muted-foreground)]">Matrizes de decisão, roteiros de contato, listas de documentos e modelos prontos.</p>
              </div>
              <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-white">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-verde)]/15 flex items-center justify-center mb-4 text-[var(--brand-verde-escuro)]">🧭</div>
                <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">Passo a Passo</h3>
                <p className="text-[var(--muted-foreground)]">Do planejamento à execução: vistos, negócios, moradia, finanças e adaptação.</p>
              </div>
              <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-white">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-verde)]/15 flex items-center justify-center mb-4 text-[var(--brand-verde-escuro)]">⚖️</div>
                <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">Foco em Decisão</h3>
                <p className="text-[var(--muted-foreground)]">Conteúdo enxuto e acionável para reduzir erros caros e acelerar resultados.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--neutral-50)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">O que você vai encontrar</h2>
              <p className="mt-2 text-[var(--muted-foreground)]">Um resumo do conteúdo com foco em ação imediata</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "Vistos e Rotas Legais", d: "Visão geral objetiva: EB‑1, EB‑2 NIW, O‑1, L‑1, E‑2, EB‑5." },
                { t: "Negócios e Tributação", d: "Escolha de entidade, compliance, contabilidade e estruturação operacional." },
                { t: "Carreira e Networking", d: "Como mapear oportunidades, otimizar LinkedIn e abordar decisores." },
                { t: "Adaptação e Moradia", d: "Cidade, aluguel, histórico de crédito, seguros e custo de vida." },
                { t: "Bancos e Finanças", d: "Abertura de conta, cartões, remessas, planejamento cambial e riscos." },
                { t: "Checklists e Modelos", d: "Documentos, perguntas essenciais e templates prontos para usar." },
              ].map((i, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[var(--card-border)] bg-white">
                  <h3 className="font-bold text-lg text-[var(--foreground)]">{i.t}</h3>
                  <p className="mt-2 text-[var(--muted-foreground)]">{i.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[var(--card-border)] bg-white p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold text-[var(--foreground)]">Acesso imediato</h3>
              <p className="mt-3 text-[var(--muted-foreground)]">
                Ao clicar em “Acessar o Manual”, você será direcionado para a página oficial do Manual do Brasileiro.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/">
                  <Button size="lg">Acessar o Manual</Button>
                </Link>
                <Link href="/raio-x">
                  <Button variant="secondary" size="lg">Diagnosticar meu caso</Button>
                </Link>
              </div>
              <p className="mt-4 text-xs text-[var(--muted-foreground)]">
                Conteúdo em constante atualização. Você verá sempre a versão mais recente.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">Escolha seu Raio‑X</h2>
              <p className="mt-2 text-[var(--muted-foreground)]">Três diagnósticos para necessidades diferentes</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-white flex flex-col">
                <div className="text-3xl mb-3">🛂</div>
                <h3 className="font-bold text-lg text-[var(--foreground)]">Raio‑X Atual</h3>
                <p className="mt-2 text-[var(--muted-foreground)] flex-1">
                  Diagnóstico de elegibilidade de vistos (EB‑1/NIW/O‑1/L‑1/E‑2/EB‑5) com recomendações.
                </p>
                <Link href="/raio-x" className="mt-6">
                  <Button size="lg" className="w-full">Começar</Button>
                </Link>
              </div>
              <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-white flex flex-col">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="font-bold text-lg text-[var(--foreground)]">Raio‑X Viagem</h3>
                <p className="mt-2 text-[var(--muted-foreground)] flex-1">
                  Foco em turismo, estudo ou negócios de curta duração. Verifica vínculos e recursos.
                </p>
                <Link href="/raio-x?type=travel" className="mt-6">
                  <Button size="lg" className="w-full">Começar</Button>
                </Link>
              </div>
              <div className="p-6 rounded-2xl border border-[var(--card-border)] bg-white flex flex-col">
                <div className="text-3xl mb-3">🏢</div>
                <h3 className="font-bold text-lg text-[var(--foreground)]">Raio‑X Empresa</h3>
                <p className="mt-2 text-[var(--muted-foreground)] flex-1">
                  Para donos e executivos: expansão, transferência e estrutura corporativa EUA.
                </p>
                <Link href="/raio-x?type=empresa" className="mt-6">
                  <Button size="lg" className="w-full">Começar</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[var(--neutral-50)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { q: "Para quem é o Manual do Brasileiro?", a: "Empreendedores, executivos e profissionais brasileiros que querem planejar vida e negócios nos EUA com clareza e velocidade." },
                { q: "Há suporte ou comunidade?", a: "O foco é conteúdo prático. Comunidade e consultoria aparecem no roadmap e podem ser ofertadas conforme demanda." },
                { q: "Posso usar em conjunto com advogados/contadores?", a: "Sim. O manual ajuda a chegar às reuniões com domínio do contexto, reduzindo retrabalho e custos." },
              ].map((f, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-[var(--card-border)] bg-white">
                  <p className="font-bold text-[var(--foreground)]">{f.q}</p>
                  <p className="mt-2 text-[var(--muted-foreground)]">{f.a}</p>
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
