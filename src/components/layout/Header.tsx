"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";

function readDisplayUser(): { name: string } | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )session_user=([^;]*)/);
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(readDisplayUser());
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

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
              Faça seu Cadastro
            </Link>
            <Link
              href="/blog"
              className="text-[var(--muted-foreground)] hover:text-[var(--brand-verde-escuro)] transition-colors font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Account + CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/conta"
                  className="text-[var(--muted-foreground)] hover:text-[var(--brand-verde-escuro)] transition-colors font-medium"
                >
                  Olá, {user.name.split(" ")[0]}
                </Link>
                <Button size="sm" variant="ghost" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/entrar"
                  className="text-[var(--muted-foreground)] hover:text-[var(--brand-verde-escuro)] transition-colors font-medium"
                >
                  Entrar
                </Link>
                <Link href="/cadastro">
                  <Button size="sm" variant="outline">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
            <Link href="/raio-x">
              <Button size="sm">
                Gerar Relatório IA
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
              <Link
                href="/blog"
                className="text-[var(--muted-foreground)] hover:text-[var(--brasil-azul)] transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              {user ? (
                <div className="flex items-center justify-between py-2">
                  <Link
                    href="/conta"
                    className="text-[var(--muted-foreground)] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Olá, {user.name.split(" ")[0]}
                  </Link>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3 py-2">
                  <Link
                    href="/entrar"
                    className="text-[var(--muted-foreground)] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link href="/cadastro" onClick={() => setIsMenuOpen(false)}>
                    <Button size="sm" variant="outline">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
              <Link href="/raio-x" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="w-full mt-2">
                  Faça seu Cadastro
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

