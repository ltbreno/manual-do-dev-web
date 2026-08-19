import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowRight,
  Plane,
  Home as HomeIcon,
  Flag,
  Briefcase,
  CreditCard,
  Check,
  UtensilsCrossed,
  ShoppingCart,
  Stethoscope,
  Building2,
  Car,
  Shield,
  GraduationCap,
  Sparkles,
  Compass,
  Wrench,
  Church,
  MoreHorizontal,
  Handshake,
  Instagram,
  Facebook,
  Youtube,
  Apple,
  PlayCircle,
} from "lucide-react";

export const metadata = {
  title: "Manual do Brasileiro — Tudo que o brasileiro precisa nos EUA",
  description:
    "Encontre empresas, serviços, benefícios e informações para viver, visitar e fazer negócios nos Estados Unidos.",
};

const HELP_CARDS = [
  {
    icon: Plane,
    iconBg: "bg-[#2f6fed]",
    title: "Estou visitando os EUA",
    description:
      "Descontos, restaurantes, compras, parques, aluguel de carros, câmbio e tudo para aproveitar melhor sua viagem.",
    cta: "Explorar como turista",
    href: "#empresas",
  },
  {
    icon: HomeIcon,
    iconBg: "bg-[#1f9d55]",
    title: "Moro nos EUA",
    description:
      "Encontre profissionais, empresas, escolas, seguros, saúde, imóveis, serviços e benefícios perto de você.",
    cta: "Explorar como morador",
    href: "#empresas",
  },
  {
    icon: Flag,
    iconBg: "bg-[#e0a318]",
    title: "Quero morar nos EUA",
    description:
      "Informação para entender vistos e imigração, planejamento da mudança, moradia, escolas, abertura de conta e primeiros passos.",
    cta: "Começar minha jornada",
    href: "/raio-x",
  },
  {
    icon: Briefcase,
    iconBg: "bg-[#7c4fe0]",
    title: "Sou empresário",
    description:
      "Encontre oportunidades, parcerias e soluções para sua empresa — ou coloque seu negócio diante da comunidade brasileira.",
    cta: "Área do empresário",
    href: "#seja-parceiro",
  },
];

const PERKS = [
  { icon: Sparkles, label: "Descontos exclusivos" },
  { icon: CreditCard, label: "Acúmulo de pontos" },
  { icon: ShoppingCart, label: "Ofertas especiais" },
  { icon: Check, label: "Prêmios e experiências" },
  { icon: Compass, label: "Benefícios para moradores e turistas" },
];

const DIRECTORY_CATEGORIES = [
  { icon: UtensilsCrossed, label: "Restaurantes" },
  { icon: ShoppingCart, label: "Mercados" },
  { icon: Flag, label: "Imigração" },
  { icon: Building2, label: "Imóveis" },
  { icon: Car, label: "Automóveis" },
  { icon: Shield, label: "Seguros" },
  { icon: Stethoscope, label: "Saúde" },
  { icon: GraduationCap, label: "Educação" },
  { icon: Sparkles, label: "Beleza" },
  { icon: Compass, label: "Turismo" },
  { icon: Briefcase, label: "Negócios" },
  { icon: Wrench, label: "Serviços" },
  { icon: Church, label: "Igrejas" },
  { icon: PlayCircle, label: "Entretenimento" },
  { icon: MoreHorizontal, label: "Ver todas" },
];

const OFFERS = [
  {
    badge: "10% OFF",
    badgeColor: "bg-[#e0473f]",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
    title: "Restaurante parceiro",
    subtitle: "Exclusivo para membros",
  },
  {
    badge: "PONTOS EM DOBRO",
    badgeColor: "bg-[#e0a318]",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    title: "Empresa parceira",
    subtitle: "Somente esta semana",
  },
  {
    badge: "BENEFÍCIO EXCLUSIVO",
    badgeColor: "bg-[#7c4fe0]",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
    title: "Serviço parceiro",
    subtitle: "Apresente seu Cartão do Brasileiro",
  },
];

const PARTNERS = ["Azul", "Santos Law Firm", "Orlando Health", "Academy Mortgage", "Car Point", "Voir Eyewear"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0d2444] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Link href="/blog" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#f5b942]" />
            </div>
            <span className="font-black tracking-tight leading-tight text-sm sm:text-base">
              MANUAL
              <br />
              DO BRASILEIRO
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-white/80">
            <a href="#empresas" className="hover:text-white transition-colors">Empresas</a>
            <a href="#cartao-beneficio" className="hover:text-white transition-colors">Benefícios</a>
            <Link href="/raio-x" className="hover:text-white transition-colors">Imigração</Link>
            <a href="#" className="hover:text-white transition-colors">Eventos</a>
            <Link href="/blog/conteudos" className="hover:text-white transition-colors">Conteúdos</Link>
            <a href="#seja-parceiro" className="hover:text-white transition-colors">Seja Parceiro</a>
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button type="button" className="flex items-center gap-1.5 border border-white/20 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 transition-colors">
              <MapPin className="w-4 h-4" />
              Orlando, FL
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/entrar"
              className="border border-white/20 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="bg-[#f5b942] hover:bg-[#e0a318] text-[#0d2444] rounded-lg px-4 py-2 text-sm font-bold transition-colors"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Skyline de uma cidade americana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2444] via-[#0d2444]/90 to-[#0d2444]/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">
            TUDO O QUE O BRASILEIRO PRECISA NOS ESTADOS UNIDOS,{" "}
            <span className="text-[#f5b942]">EM UM SÓ LUGAR.</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-xl">
            Encontre empresas, serviços, benefícios e informações para viver, visitar e fazer negócios nos Estados Unidos.
          </p>

          {/* Search bar */}
          <form className="mt-8 bg-white rounded-2xl p-2 flex items-center gap-2 max-w-2xl shadow-xl">
            <Search className="w-5 h-5 text-[var(--muted-foreground)] ml-2 shrink-0" />
            <input
              type="text"
              placeholder="O que você procura?"
              className="flex-1 min-w-0 py-2.5 text-sm text-[var(--foreground)] outline-none"
            />
            <button
              type="submit"
              className="bg-[#0d2444] hover:bg-[#132e57] text-white text-sm font-semibold rounded-xl px-5 py-2.5 shrink-0 transition-colors"
            >
              Buscar
            </button>
          </form>

          <p className="mt-4 text-white/60 text-sm max-w-2xl">
            Restaurantes • Imigração • Seguros • Carros • Casas • Saúde • Escolas • Turismo • Serviços
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#empresas"
              className="inline-flex items-center justify-center gap-2 bg-[#f5b942] hover:bg-[#e0a318] text-[#0d2444] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
            >
              EXPLORAR O MANUAL
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#cartao-beneficio"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              QUERO MEU CARTÃO GRÁTIS
              <CreditCard className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Como podemos ajudar você */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--foreground)] mb-10">
          Como podemos ajudar você?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HELP_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center mb-4`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg text-[var(--foreground)] mb-2">{card.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-4 leading-relaxed">{card.description}</p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2444] dark:text-[#f5b942] hover:gap-2.5 transition-all"
              >
                {card.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Cartão do Brasileiro + Diretório */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cartão do Brasileiro */}
          <div id="cartao-beneficio" className="bg-[#0d2444] rounded-3xl p-6 md:p-8 text-white scroll-mt-24">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Card mockup */}
              <div className="w-full sm:w-48 shrink-0 aspect-[1.6/1] rounded-2xl bg-gradient-to-br from-[#173764] to-[#0a1a30] border border-white/10 p-4 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold tracking-widest text-white/70">
                    MANUAL
                    <br />
                    DO BRASILEIRO
                  </span>
                  <div className="w-6 h-5 rounded bg-[#f5b942]/80" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Tiago Mauschi</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] font-bold text-[#f5b942] tracking-wide">GOLD ★★★★★</span>
                  </div>
                  <p className="text-[9px] text-white/50 mt-1">MEMBRO DESDE 2024</p>
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl font-bold">
                  <span className="text-white">CARTÃO DO BRASILEIRO</span>
                </h3>
                <p className="text-[#f5b942] font-semibold mt-1">Ser brasileiro tem benefícios.</p>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                  Um cartão gratuito para economizar e ganhar benefícios nas empresas parceiras do Manual.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-8">
              {PERKS.map((perk) => (
                <div key={perk.label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <perk.icon className="w-4 h-4 text-[#f5b942]" />
                  </div>
                  <span className="text-[11px] text-white/70 leading-tight">{perk.label}</span>
                </div>
              ))}
            </div>

            <Link
              href="/cadastro"
              className="mt-8 inline-flex items-center gap-2 bg-[#f5b942] hover:bg-[#e0a318] text-[#0d2444] font-bold text-sm px-6 py-3 rounded-xl transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              QUERO MEU CARTÃO — GRÁTIS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Diretório */}
          <div id="empresas" className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 md:p-8 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h3 className="text-xl font-bold text-[var(--foreground)]">Descubra o melhor perto de você</h3>
            </div>
            <div className="flex items-center justify-between gap-3 mb-6 bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] rounded-xl px-4 py-2.5">
              <span className="text-sm text-[var(--muted-foreground)]">Onde você está?</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-[var(--foreground)]">
                <MapPin className="w-4 h-4 text-[#0d2444] dark:text-[#f5b942]" />
                Orlando, FL
                <ChevronDown className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {DIRECTORY_CATEGORIES.map((cat) => (
                <a
                  key={cat.label}
                  href="#"
                  className="flex flex-col items-center text-center gap-2 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] flex items-center justify-center group-hover:bg-[#f5b942]/20 transition-colors">
                    <cat.icon className="w-4 h-4 text-[#0d2444] dark:text-[#f5b942]" />
                  </div>
                  <span className="text-[11px] text-[var(--muted-foreground)] leading-tight">{cat.label}</span>
                </a>
              ))}
            </div>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2444] dark:text-[#f5b942] hover:gap-2.5 transition-all"
            >
              Ver todas as empresas
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Ofertas + Simulador de vistos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-[var(--foreground)]">Ofertas para você</h3>
              <a href="#" className="text-sm font-semibold text-[#0d2444] dark:text-[#f5b942] inline-flex items-center gap-1">
                Ver todas <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {OFFERS.map((offer) => (
                <div key={offer.title} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl overflow-hidden">
                  <div className="relative h-28">
                    <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                    <span className={`absolute top-2 left-2 ${offer.badgeColor} text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full`}>
                      {offer.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-[var(--foreground)]">{offer.title}</h4>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">{offer.subtitle}</p>
                    <a href="#" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0d2444] dark:text-[#f5b942]">
                      Ver oferta <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulador de vistos */}
          <div className="relative rounded-3xl overflow-hidden bg-[#0d2444] text-white flex flex-col">
            <div className="relative h-32 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80"
                alt="Estátua da Liberdade"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2444] to-[#0d2444]/10" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold leading-snug">
                Está pensando em morar nos Estados Unidos?
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Descubra quais caminhos de imigração podem fazer sentido para você.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Responda algumas perguntas",
                  "Conheça possibilidades de vistos",
                  "Informação clara e atualizada",
                  "Gratuito e confidencial",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-[#4fd17a] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/raio-x"
                className="mt-5 inline-flex items-center justify-center gap-2 bg-[#2f6fed] hover:bg-[#255bc4] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                FAZER SIMULADOR DE VISTOS
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="mt-3 text-[11px] text-white/40 leading-relaxed">
                Conteúdo informativo. O simulador não substitui orientação jurídica individual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--foreground)]">Parceiros do Manual</h3>
            <p className="text-sm text-[var(--muted-foreground)]">Empresas para conhecer. Benefícios para aproveitar.</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#0d2444] dark:text-[#f5b942] inline-flex items-center gap-1 shrink-0">
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-y border-[var(--card-border)] py-8">
          {PARTNERS.map((name) => (
            <span key={name} className="text-lg font-bold text-[var(--neutral-400)] tracking-tight">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Seja parceiro CTA */}
      <section id="seja-parceiro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-24">
        <div className="bg-[#0d2444] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Handshake className="w-6 h-6 text-[#f5b942]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Sua empresa atende brasileiros?</h3>
              <p className="text-white/70 text-sm mt-1 max-w-xl">
                Faça parte da rede de parceiros do Manual do Brasileiro. Divulgue sua empresa, crie benefícios exclusivos, atraia novos clientes e acompanhe os resultados das suas campanhas.
              </p>
            </div>
          </div>
          <a
            href="mailto:parceiros@manualdobrasileiro.com"
            className="inline-flex items-center justify-center gap-2 bg-[#f5b942] hover:bg-[#e0a318] text-[#0d2444] font-bold text-sm px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            QUERO SER EMPRESA PARCEIRA
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1a30] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <Link href="/blog" className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#f5b942]" />
                </div>
                <span className="font-black text-sm">MANUAL DO BRASILEIRO</span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed">
                Conectamos brasileiros a oportunidades, benefícios e informação de qualidade nos Estados Unidos.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3">Links rápidos</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#empresas" className="hover:text-white transition-colors">Empresas</a></li>
                <li><a href="#cartao-beneficio" className="hover:text-white transition-colors">Benefícios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Eventos</a></li>
                <li><a href="#seja-parceiro" className="hover:text-white transition-colors">Seja Parceiro</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3">Siga o Manual</h4>
              <div className="flex gap-3">
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-3">Baixe o app</h4>
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 border border-white/20 rounded-lg px-3 py-2 text-xs text-white/70">
                  <Apple className="w-4 h-4" /> App Store
                </span>
                <span className="inline-flex items-center gap-2 border border-white/20 rounded-lg px-3 py-2 text-xs text-white/70">
                  <PlayCircle className="w-4 h-4" /> Google Play
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Manual do Brasileiro. Todos os direitos reservados.
            </p>
            <div className="flex gap-5 text-xs text-white/40">
              <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
              <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <a href="mailto:contato@manualdobrasileiro.com" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
