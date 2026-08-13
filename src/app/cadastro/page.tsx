"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/conta");
        router.refresh();
      } else {
        setError(data.error || "Não foi possível concluir o cadastro");
      }
    } catch {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4 pt-24 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-[var(--brand-verde)] rounded-lg transform rotate-45" />
              <div className="absolute inset-1 bg-[var(--brand-bege)] rounded-lg transform rotate-45" />
              <div className="absolute inset-2 bg-[var(--brand-verde-escuro)] rounded-lg transform rotate-45 flex items-center justify-center">
                <span className="text-white font-bold text-sm transform -rotate-45">MB</span>
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--foreground)]">
            Crie sua conta no{" "}
            <span className="text-[var(--brand-verde)]">Manual do Brasileiro</span>
          </h1>
          <p className="text-[var(--muted-foreground)] mt-2">
            Acompanhe seus diagnósticos e conteúdos salvos.
          </p>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-8 rounded-3xl shadow-xl">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-semibold border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Nome</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-100)] dark:bg-[var(--neutral-900)] border-2 border-transparent focus:border-[var(--brand-verde)] text-[var(--foreground)] outline-none transition-all"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-100)] dark:bg-[var(--neutral-900)] border-2 border-transparent focus:border-[var(--brand-verde)] text-[var(--foreground)] outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-100)] dark:bg-[var(--neutral-900)] border-2 border-transparent focus:border-[var(--brand-verde)] text-[var(--foreground)] outline-none transition-all"
                placeholder="Mínimo 8 caracteres"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">Confirmar senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl bg-[var(--neutral-100)] dark:bg-[var(--neutral-900)] border-2 border-transparent focus:border-[var(--brand-verde)] text-[var(--foreground)] outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" isLoading={loading} className="w-full">
              Criar conta
            </Button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-[var(--muted-foreground)]">
          Já tem uma conta?{" "}
          <Link href="/entrar" className="text-[var(--brand-verde-escuro)] font-semibold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
