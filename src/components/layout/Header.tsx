"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "../ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[var(--neutral-950)]/80 backdrop-blur-lg border-b border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <div className="absolute inset-0 bg-[var(--brand-verde)] rounded-lg transform rotate-45" />
              <div className="absolute inset-1 bg-[var(--brand-bege)] rounded-lg transform rotate-45" />
              <div className="absolute inset-2 bg-[var(--brand-verde-escuro)] rounded-lg transform rotate-45 flex items-center justify-center">
                <span className="text-white font-bold text-xs md:text-sm transform -rotate-45">
                  MB
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg md:text-xl text-[var(--foreground)]">
                Manual do{" "}
                <span className="text-[var(--brand-verde)]">Brasileiro</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/#features"
              className="text-[var(--muted-foreground)] hover:text-[var(--brand-verde-escuro)] transition-colors font-medium"
            >
              Recursos
            </Link>
            <Link
              href="/#como-funciona"
              className="text-[var(--muted-foreground)] hover:text-[var(--brand-verde-escuro)] transition-colors font-medium"
            >
              Como Funciona
            </Link>
            <Link
              href="/raio-x"
              className="text-[var(--muted-foreground)] hover:text-[var(--brand-verde-escuro)] transition-colors font-medium"
            >
              Raio-X
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/raio-x">
              <Button size="sm">
                Começar Diagnóstico
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-800)] transition-colors"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6 text-[var(--foreground)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--card-border)] animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link
                href="/#features"
                className="text-[var(--muted-foreground)] hover:text-[var(--brasil-azul)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Recursos
              </Link>
              <Link
                href="/#como-funciona"
                className="text-[var(--muted-foreground)] hover:text-[var(--brasil-azul)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </Link>
              <Link
                href="/raio-x"
                className="text-[var(--muted-foreground)] hover:text-[var(--brasil-azul)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Raio-X
              </Link>
              <Link href="/raio-x" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full mt-2">
                  Começar Diagnóstico
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

