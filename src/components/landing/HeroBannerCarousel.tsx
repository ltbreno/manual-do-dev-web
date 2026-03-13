"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Slide = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone: "verde" | "escuro" | "bege";
  imageSrc: string;
  imageAlt: string;
};

const toneStyles: Record<Slide["tone"], { bg: string; border: string; pill: string; text: string }> =
  {
    verde: {
      bg: "bg-[var(--brand-verde)]/10",
      border: "border-[var(--brand-verde)]/20",
      pill: "bg-[var(--brand-verde)]/15 border-[var(--brand-verde)]/25 text-[var(--brand-verde-escuro)]",
      text: "text-[var(--brand-verde-escuro)]",
    },
    escuro: {
      bg: "bg-[var(--brand-verde-escuro)]/10",
      border: "border-[var(--brand-verde-escuro)]/20",
      pill: "bg-[var(--brand-verde-escuro)]/15 border-[var(--brand-verde-escuro)]/25 text-[var(--brand-verde-escuro)]",
      text: "text-[var(--brand-verde-escuro)]",
    },
    bege: {
      bg: "bg-[var(--brand-bege)]/35",
      border: "border-[var(--brand-bege)]/40",
      pill: "bg-[var(--brand-bege)]/55 border-[var(--brand-bege)]/60 text-[var(--brand-verde-escuro)]",
      text: "text-[var(--brand-verde-escuro)]",
    },
  };

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

function svgDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const EXAMPLE_BANNER_IMAGE_SRC = svgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1600" height="520" viewBox="0 0 1600 520">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#26473d"/>
        <stop offset="0.55" stop-color="#6dc24d"/>
        <stop offset="1" stop-color="#f0f3c7"/>
      </linearGradient>
      <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle cx="2.5" cy="2.5" r="2.5" fill="rgba(255,255,255,0.16)"/>
      </pattern>
    </defs>
    <rect width="1600" height="520" fill="url(#bg)"/>
    <rect width="1600" height="520" fill="url(#dots)" opacity="0.55"/>
    <circle cx="1280" cy="170" r="260" fill="rgba(255,255,255,0.12)"/>
    <circle cx="1160" cy="410" r="240" fill="rgba(38,71,61,0.10)"/>
    <path d="M-60 420 C 260 310, 520 560, 820 420 C 1120 290, 1340 580, 1660 380 L 1660 560 L -60 560 Z" fill="rgba(0,0,0,0.14)"/>
  </svg>
`);

const defaultSlides: Slide[] = [
  {
    id: "patrocinio",
    eyebrow: "Patrocínio",
    title: "Espaço de banner para parceiros",
    description: "Este espaço é para o cliente enviar a imagem. Exemplo aplicado como fundo.",
    href: "mailto:contato@manualdobrasileiro.com?subject=Patroc%C3%ADnio%20-%20Banner%20na%20Landing",
    cta: "Anunciar aqui",
    tone: "escuro",
    imageAlt: "Exemplo de banner patrocinado",
    imageSrc: EXAMPLE_BANNER_IMAGE_SRC,
  },
];

export type HeroBannerCarouselProps = {
  slides?: Slide[];
  intervalMs?: number;
};

export default function HeroBannerCarousel({ slides: slidesProp, intervalMs = 6500 }: HeroBannerCarouselProps) {
  const slides = useMemo(() => (slidesProp && slidesProp.length > 0 ? slidesProp : defaultSlides), [slidesProp]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    if (slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, isPaused, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full"
      aria-label="Destaques em carrossel"
    >
      <div className="relative w-full min-h-[320px] sm:min-h-[360px] md:min-h-[440px] overflow-hidden border-b border-[var(--card-border)]">
        <Image
          src={activeSlide.imageSrc}
          alt={activeSlide.imageAlt}
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.78)_45%,rgba(255,255,255,0.16)_100%)] dark:bg-[linear-gradient(90deg,rgba(10,10,10,0.92)_0%,rgba(10,10,10,0.72)_45%,rgba(10,10,10,0.18)_100%)]" />
        <div className="absolute inset-0 bg-brand-gradient-subtle opacity-25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold tracking-wider uppercase ${toneStyles[activeSlide.tone].pill}`}
                >
                  {activeSlide.eyebrow}
                </span>
                {slides.length > 1 && (
                  <span className="text-xs font-semibold text-[var(--muted-foreground)]">
                    Destaque {activeIndex + 1}/{slides.length}
                  </span>
                )}
              </div>

              <p className={`mt-3 text-xl sm:text-2xl font-bold ${toneStyles[activeSlide.tone].text}`}>
                {activeSlide.title}
              </p>
              <p className="mt-1 text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl">
                {activeSlide.description}
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Slide anterior"
                className="w-10 h-10 rounded-2xl border border-[var(--card-border)] bg-white/70 dark:bg-[var(--neutral-900)]/60 hover:bg-white transition-colors flex items-center justify-center"
                onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                disabled={slides.length <= 1}
              >
                <svg className="w-5 h-5 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Próximo slide"
                className="w-10 h-10 rounded-2xl border border-[var(--card-border)] bg-white/70 dark:bg-[var(--neutral-900)]/60 hover:bg-white transition-colors flex items-center justify-center"
                onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
                disabled={slides.length <= 1}
              >
                <svg className="w-5 h-5 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            {isExternalHref(activeSlide.href) ? (
              <a
                href={activeSlide.href}
                className={`inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-verde)] focus:ring-offset-2 ${toneStyles[activeSlide.tone].bg} ${toneStyles[activeSlide.tone].border} border ${toneStyles[activeSlide.tone].text}`}
              >
                {activeSlide.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            ) : (
              <Link
                href={activeSlide.href}
                className={`inline-flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--brand-verde)] focus:ring-offset-2 ${toneStyles[activeSlide.tone].bg} ${toneStyles[activeSlide.tone].border} border ${toneStyles[activeSlide.tone].text}`}
              >
                {activeSlide.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            )}

            {slides.length > 1 && (
              <div className="flex items-center gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Ir para ${s.title}`}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === activeIndex
                        ? "w-10 bg-[var(--brand-verde-escuro)]"
                        : "w-2.5 bg-[var(--neutral-300)] dark:bg-[var(--neutral-700)] hover:bg-[var(--neutral-400)]"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
