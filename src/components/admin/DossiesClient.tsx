"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import { businessAssessmentModules } from "@/data/business-assessment";
import {
  Search, FileText, ChevronRight, XCircle, Send
} from "lucide-react";
import EmailModal from "@/components/admin/EmailModal";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  score: number;
  ai_analysis: string;
  classification?: string;
  legal_risk?: string;
  status?: string;
  created_at: string;
  uploaded_files?: { name: string; type: string }[];
  business_data?: {
    investmentBudget?: string;
    contact?: { linkedin?: string };
    type?: string;
    answers?: Record<string, string>;
    scores?: Record<string, number>;
    [k: string]: unknown;
  };
}

const STATUS_OPTIONS = [
  { value: "new", label: "Novo" },
  { value: "contacted", label: "Em Contato" },
  { value: "meeting", label: "Reunião" },
  { value: "hired", label: "Contratado" },
  { value: "lost", label: "Perdido" },
];

const CLASS_COLORS: Record<string, string> = {
  Hot: "var(--dash-accent-pink)",
  Warm: "var(--dash-accent-blue)",
  Cold: "var(--dash-accent-orange)",
};

const RISK_COLORS: Record<string, string> = {
  High: "#ef4444",
  Medium: "var(--dash-accent-orange)",
  Low: "var(--dash-accent-green)",
};

export default function DossiesClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [emailTarget, setEmailTarget] = useState<Lead | null>(null);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : [];
        setLeads(list);
        if (list.length > 0) setSelected(list[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        const q = search.toLowerCase();
        return (
          l.name?.toLowerCase().includes(q) ||
          l.company?.toLowerCase().includes(q) ||
          l.email?.toLowerCase().includes(q)
        );
      }),
    [leads, search]
  );

  async function updateStatus(leadId: string, newStatus: string) {
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json() as Lead;
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: updated.status } : l)));
        if (selected?.id === leadId) setSelected((prev) => prev ? { ...prev, status: updated.status } : prev);
      }
    } finally {
      setUpdatingStatus(false);
    }
  }

  const initials = (name?: string) =>
    (name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 min-w-0 font-sans flex flex-col">
        <TopBar />

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[var(--dash-accent-pink)] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Left panel – lead list */}
            <div className="w-80 shrink-0 border-r border-[var(--dash-border)] flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[var(--dash-border)]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dash-muted)]" />
                  <input
                    type="text"
                    placeholder="Buscar lead..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                </div>
                <p className="text-[10px] text-[var(--dash-muted)] mt-2 font-medium">{filtered.length} dossiês</p>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filtered.map((lead) => {
                  const classColor = CLASS_COLORS[lead.classification ?? ""] ?? "var(--dash-muted)";
                  const isActive = selected?.id === lead.id;
                  return (
                    <button
                      key={lead.id}
                      onClick={() => setSelected(lead)}
                      className={`w-full flex items-center gap-3 px-4 py-3 border-b border-white/[0.03] transition-all text-left ${
                        isActive ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: `${classColor}20`, color: classColor }}
                      >
                        {initials(lead.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${isActive ? "text-white" : "text-[var(--dash-muted)]"}`}>
                          {lead.name || "—"}
                        </p>
                        <p className="text-[10px] text-[var(--dash-muted)] truncate">
                          {lead.company || "Pessoa Física"}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold font-mono" style={{ color: classColor }}>{lead.score}</p>
                        <ChevronRight className={`w-3 h-3 mt-0.5 ml-auto ${isActive ? "text-white" : "text-[var(--dash-muted)]"}`} />
                      </div>
                    </button>
                  );
                })}
                {!filtered.length && (
                  <div className="p-8 text-center text-[var(--dash-muted)] text-sm">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    Nenhum dossiê
                  </div>
                )}
              </div>
            </div>

            {/* Right panel – dossier detail */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {selected ? (
                <DossierDetail
                  lead={selected}
                  onStatusChange={updateStatus}
                  updatingStatus={updatingStatus}
                  onEmail={() => setEmailTarget(selected)}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-[var(--dash-muted)]">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>Selecione um lead para ver o dossiê</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      {emailTarget && <EmailModal lead={emailTarget} onClose={() => setEmailTarget(null)} />}
    </div>
  );
}

function DossierDetail({
  lead,
  onStatusChange,
  updatingStatus,
  onEmail,
}: {
  lead: Lead;
  onStatusChange: (id: string, status: string) => void;
  updatingStatus: boolean;
  onEmail: () => void;
}) {
  const classColor = CLASS_COLORS[lead.classification ?? ""] ?? "var(--dash-muted)";
  const riskColor = RISK_COLORS[lead.legal_risk ?? ""] ?? "var(--dash-muted)";
  const initials = (lead.name || "?").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-300">
      {/* Profile */}
      <div className="flex items-start gap-6">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shrink-0 shadow-xl"
          style={{ background: `linear-gradient(135deg, ${classColor}44, ${classColor}11)`, border: `2px solid ${classColor}44` }}
        >
          {initials}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">{lead.name || "—"}</h2>
          <p className="text-[var(--dash-muted)] text-sm">{lead.email}</p>
          <p className="text-[var(--dash-muted)] text-sm">{lead.company || "Pessoa Física"}</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {lead.classification && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                style={{ color: classColor, background: `${classColor}20` }}>
                {lead.classification}
              </span>
            )}
            {lead.legal_risk && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                style={{ color: riskColor, background: `${riskColor}20` }}>
                Risco {lead.legal_risk}
              </span>
            )}
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/10 text-white font-mono">
              Score {lead.score}
            </span>
          </div>
        </div>
        <div className="shrink-0 flex flex-col gap-2">
          <label className="block text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest mb-1">Status</label>
          <select
            value={lead.status || "new"}
            onChange={(e) => onStatusChange(lead.id, e.target.value)}
            disabled={updatingStatus}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-50"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} className="bg-[#1a1d23]">{s.label}</option>
            ))}
          </select>
          <button
            onClick={onEmail}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-[var(--dash-accent-pink)] hover:bg-[var(--dash-accent-pink)]/80 text-white rounded-xl font-bold text-xs transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            Enviar Email
          </button>
        </div>
      </div>

      {/* AI Analysis */}
      {lead.ai_analysis && (
        <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 space-y-3">
          <h4 className="text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Análise AI</h4>
          <p className="text-white text-sm leading-relaxed">{lead.ai_analysis}</p>
        </div>
      )}

      {/* Contact + Budget */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "WhatsApp", value: lead.whatsapp },
          { label: "Budget", value: lead.business_data?.investmentBudget },
          { label: "LinkedIn", value: lead.business_data?.contact?.linkedin },
          { label: "Triagem em", value: new Date(lead.created_at).toLocaleDateString("pt-BR") },
        ].map(({ label, value }) => value ? (
          <div key={label} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4">
            <p className="text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">{label}</p>
            <p className="text-sm font-bold text-white mt-1 truncate">{value}</p>
          </div>
        ) : null)}
      </div>

      {/* Business Assessment */}
      {lead.business_data?.type === "business_expansion_assessment" && lead.business_data.answers && (
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Respostas do Raio-X</h4>
          {businessAssessmentModules.map((module) => {
            const moduleScore = lead.business_data?.scores?.[module.id];
            const hasAnswers = module.questions.some((q) => lead.business_data?.answers?.[q.id]);
            if (!hasAnswers) return null;
            return (
              <div key={module.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="font-bold text-white text-sm">{module.title}</h5>
                  {moduleScore !== undefined && (
                    <span className="text-[var(--dash-accent-pink)] font-black text-xs px-2 py-0.5 bg-[var(--dash-accent-pink)]/10 rounded-lg">
                      {Math.round(moduleScore)}% aderência
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  {module.questions.map((q) => {
                    const answerId = lead.business_data?.answers?.[q.id];
                    if (!answerId) return null;
                    const option = q.options.find((o) => o.value === answerId);
                    return (
                      <div key={q.id}>
                        <p className="text-xs text-[var(--dash-muted)] mb-1">{q.label}</p>
                        <p className="text-sm text-white font-medium border-l-2 border-[var(--dash-accent-blue)] pl-3">
                          {option?.label ?? answerId}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Uploaded Files */}
      {lead.uploaded_files && lead.uploaded_files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Arquivos Enviados</h4>
          <div className="grid grid-cols-2 gap-3">
            {lead.uploaded_files.map((file, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3">
                <XCircle className="w-4 h-4 text-[var(--dash-accent-blue)] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{file.name}</p>
                  <p className="text-[10px] text-[var(--dash-muted)]">{file.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
