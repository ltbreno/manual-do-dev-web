"use client";

import { useState } from "react";
import { XCircle, Send, Check } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
}

interface EmailModalProps {
  lead: Lead;
  onClose: () => void;
}

export default function EmailModal({ lead, onClose }: EmailModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.email) {
      setError("Este lead não tem email cadastrado.");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: lead.email,
          recipientName: lead.name,
          subject,
          message,
        }),
      });
      if (!res.ok) {
        const d = await res.json() as { error?: string };
        setError(d.error ?? "Erro ao enviar.");
        return;
      }
      setSent(true);
      setTimeout(onClose, 1800);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[var(--dash-bg)] border border-[var(--dash-border)] w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-[var(--dash-border)] flex justify-between items-center">
          <div>
            <h3 className="font-bold text-white">Enviar Email</h3>
            <p className="text-[10px] text-[var(--dash-muted)] mt-0.5 font-medium">Para: {lead.email || "sem email"}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[var(--dash-accent-green)]/20 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[var(--dash-accent-green)]" />
            </div>
            <p className="font-bold text-white text-lg">Email enviado!</p>
            <p className="text-[var(--dash-muted)] text-sm">Mensagem entregue para {lead.name}</p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-8 space-y-5">
            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
            )}
            <div>
              <label className="block text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest mb-2">Assunto</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Próximos passos para sua expansão"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest mb-2">Mensagem</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Olá ${lead.name},\n\nEscreva sua mensagem aqui...`}
                required
                rows={7}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none"
              />
              <p className="text-[10px] text-[var(--dash-muted)] mt-1">O email será enviado com o template da Manual do Brasileiro.</p>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-2xl text-sm font-bold text-[var(--dash-muted)] hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={sending || !lead.email}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--dash-accent-pink)] hover:bg-[var(--dash-accent-pink)]/80 text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/20 transition-all disabled:opacity-50"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {sending ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
