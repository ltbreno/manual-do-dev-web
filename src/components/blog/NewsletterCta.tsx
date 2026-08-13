"use client";

import { useState } from "react";

export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Não foi possível concluir sua inscrição");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao conectar ao servidor");
    }
  };

  if (status === "success") {
    return (
      <p className="text-white font-semibold max-w-md mx-auto">
        Inscrição confirmada! Fique de olho no seu e-mail.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="seu@email.com"
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--brand-verde)] transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-[var(--brand-verde)] hover:bg-[var(--brand-verde-dark)] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors whitespace-nowrap"
        >
          {status === "loading" ? "Enviando..." : "Quero receber"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-300 text-sm mt-3">{errorMessage}</p>
      )}
    </form>
  );
}
