"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import {
  Search, Mail, Phone, Linkedin, Copy, Check, ExternalLink, XCircle, TrendingUp, Send
} from "lucide-react";
import EmailModal from "@/components/admin/EmailModal";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  classification?: string;
  status?: string;
  score?: number;
  created_at: string;
  business_data?: { contact?: { linkedin?: string }; [k: string]: unknown };
}

export default function ContatosClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [emailTarget, setEmailTarget] = useState<Lead | null>(null);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => { setLeads(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const q = search.toLowerCase();
      const matchSearch =
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.whatsapp?.toLowerCase().includes(q) ||
        l.company?.toLowerCase().includes(q);
      const matchClass = filterClass ? l.classification === filterClass : true;
      return matchSearch && matchClass;
    });
  }, [leads, search, filterClass]);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  }

  const classColors: Record<string, string> = {
    Hot: "var(--dash-accent-pink)",
    Warm: "var(--dash-accent-blue)",
    Cold: "var(--dash-accent-orange)",
  };

  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 min-w-0 font-sans">
        <TopBar />
        <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

          {/* Header + Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Agenda de Contatos</h2>
              <p className="text-[var(--dash-muted)] text-xs mt-0.5">{filtered.length} contatos encontrados</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dash-muted)] group-focus-within:text-white transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar por nome, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 w-52"
                />
              </div>
              {["", "Hot", "Warm", "Cold"].map((c) => (
                <button
                  key={c}
                  onClick={() => setFilterClass(c)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    filterClass === c
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/5 bg-white/[0.02] text-[var(--dash-muted)] hover:text-white"
                  }`}
                >
                  {c || "Todos"}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl h-52 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-[var(--dash-muted)]">
              <Mail className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-bold">Nenhum contato encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((lead) => {
                const initials = (lead.name || "?").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
                const classColor = classColors[lead.classification ?? ""] ?? "var(--dash-muted)";
                const linkedin = lead.business_data?.contact?.linkedin;
                return (
                  <div
                    key={lead.id}
                    className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl p-5 flex flex-col gap-4 hover:bg-[var(--dash-card-hover)] transition-all group cursor-pointer"
                    onClick={() => setSelected(lead)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                          style={{ background: `linear-gradient(135deg, ${classColor}33, ${classColor}11)`, border: `1px solid ${classColor}33` }}>
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate group-hover:text-[var(--dash-accent-pink)] transition-colors">{lead.name || "—"}</p>
                          <p className="text-[10px] text-[var(--dash-muted)] uppercase tracking-wider truncate">{lead.company || "Pessoa Física"}</p>
                        </div>
                      </div>
                      {lead.classification && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0"
                          style={{ color: classColor, background: `${classColor}20` }}>
                          {lead.classification}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      {lead.email && (
                        <div className="flex items-center justify-between bg-white/[0.03] rounded-xl px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Mail className="w-3.5 h-3.5 text-[var(--dash-accent-blue)] shrink-0" />
                            <span className="text-xs text-[var(--dash-muted)] truncate">{lead.email}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(lead.email, `email-${lead.id}`)}
                            className="p-1 rounded-lg hover:bg-white/10 text-[var(--dash-muted)] hover:text-white transition-all shrink-0"
                          >
                            {copied === `email-${lead.id}` ? <Check className="w-3 h-3 text-[var(--dash-accent-green)]" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      )}
                      {lead.whatsapp && (
                        <div className="flex items-center justify-between bg-white/[0.03] rounded-xl px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Phone className="w-3.5 h-3.5 text-[var(--dash-accent-green)] shrink-0" />
                            <span className="text-xs text-[var(--dash-muted)] truncate">{lead.whatsapp}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(lead.whatsapp, `wa-${lead.id}`)}
                            className="p-1 rounded-lg hover:bg-white/10 text-[var(--dash-muted)] hover:text-white transition-all shrink-0"
                          >
                            {copied === `wa-${lead.id}` ? <Check className="w-3 h-3 text-[var(--dash-accent-green)]" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      )}
                      {linkedin && (
                        <a
                          href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-3 py-2 hover:bg-white/10 transition-all"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-[#0077b5] shrink-0" />
                          <span className="text-xs text-[var(--dash-muted)] truncate flex-1">LinkedIn</span>
                          <ExternalLink className="w-3 h-3 text-[var(--dash-muted)]" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <span className="text-[10px] text-[var(--dash-muted)]">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </span>
                      {lead.score != null && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-[var(--dash-muted)]" />
                          <span className="text-xs font-bold font-mono text-white">{lead.score}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {selected && <ContactModal lead={selected} onClose={() => setSelected(null)} onEmail={(l) => { setSelected(null); setEmailTarget(l); }} />}
      {emailTarget && <EmailModal lead={emailTarget} onClose={() => setEmailTarget(null)} />}
    </div>
  );
}

function ContactModal({ lead, onClose, onEmail }: { lead: Lead; onClose: () => void; onEmail: (l: Lead) => void }) {
  const classColors: Record<string, string> = {
    Hot: "var(--dash-accent-pink)",
    Warm: "var(--dash-accent-blue)",
    Cold: "var(--dash-accent-orange)",
  };
  const classColor = classColors[lead.classification ?? ""] ?? "var(--dash-muted)";
  const initials = (lead.name || "?").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const linkedin = lead.business_data?.contact?.linkedin;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[var(--dash-bg)] border border-[var(--dash-border)] w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-[var(--dash-border)] flex justify-between items-center">
          <h3 className="font-bold text-white">Detalhes do Contato</h3>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${classColor}44, ${classColor}11)`, border: `1px solid ${classColor}44` }}>
              {initials}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{lead.name}</h4>
              <p className="text-[var(--dash-muted)] text-sm">{lead.company || "Pessoa Física"}</p>
              <div className="flex gap-2 mt-2">
                {lead.classification && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full"
                    style={{ color: classColor, background: `${classColor}20` }}>
                    {lead.classification}
                  </span>
                )}
                {lead.score != null && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/10 text-white">
                    Score {lead.score}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: Mail, label: lead.email, color: "var(--dash-accent-blue)" },
              { icon: Phone, label: lead.whatsapp, color: "var(--dash-accent-green)" },
              ...(linkedin ? [{ icon: Linkedin, label: linkedin, color: "#0077b5" }] : []),
            ].map(({ icon: Icon, label, color }) => label ? (
              <div key={label} className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3">
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                <span className="text-sm text-white truncate">{label}</span>
              </div>
            ) : null)}
          </div>

          <p className="text-[10px] text-[var(--dash-muted)] text-center">
            Triagem em {new Date(lead.created_at).toLocaleDateString("pt-BR")}
          </p>
          <button
            onClick={() => onEmail(lead)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--dash-accent-pink)] hover:bg-[var(--dash-accent-pink)]/80 text-white rounded-2xl font-bold text-sm transition-all"
          >
            <Send className="w-4 h-4" />
            Enviar Email
          </button>
        </div>
      </div>
    </div>
  );
}
