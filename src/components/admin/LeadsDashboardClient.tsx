"use client";

import { useState, useMemo } from "react";
import LogoutButton from "@/components/admin/LogoutButton";

interface Lead {
  id: string;
  created_at: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  score: number;
  ai_analysis: string;
  classification?: string;
  legal_risk?: string;
  uploaded_files?: { name: string; type: string }[];
  business_data?: {
    investmentBudget?: string;
    contactPreference?: string;
    contact?: {
      linkedin?: string;
    };
    [key: string]: unknown;
  };
}

interface LeadsDashboardClientProps {
  initialLeads: Lead[];
}

// Simple CSS Bar Chart Helper - Moved outside to fix lint error
const Bar = ({ label, value, color, total }: { label: string, value: number, color: string, total: number }) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-4 mb-2">
      <span className="w-24 text-sm font-medium text-gray-700">{label}</span>
      <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-12 text-sm text-gray-700">{value}</span>
    </div>
  );
};

export default function LeadsDashboardClient({ initialLeads }: LeadsDashboardClientProps) {
  const [filterName, setFilterName] = useState("");
  const [filterMinScore, setFilterMinScore] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      const matchesName =
        lead.name?.toLowerCase().includes(filterName.toLowerCase()) ||
        lead.email?.toLowerCase().includes(filterName.toLowerCase()) ||
        lead.company?.toLowerCase().includes(filterName.toLowerCase());
      
      const score = lead.score || 0;
      const minScore = filterMinScore ? parseInt(filterMinScore) : 0;
      const matchesScore = score >= minScore;

      return matchesName && matchesScore;
    });
  }, [initialLeads, filterName, filterMinScore]);

  // Statistics for Charts
  const stats = useMemo(() => {
    const total = filteredLeads.length;
    const high = filteredLeads.filter(l => l.score >= 70).length;
    const medium = filteredLeads.filter(l => l.score >= 40 && l.score < 70).length;
    const low = filteredLeads.filter(l => l.score < 40).length;
    
    return { total, high, medium, low };
  }, [filteredLeads]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Leads (Vistos)</h1>
            <p className="text-gray-700 mt-1">Gerencie os diagnósticos de visto recebidos</p>
          </div>
          <LogoutButton />
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Score (Eligibilidade)</h3>
            <div className="space-y-4">
              <Bar label="Alta Chance" value={stats.high} color="bg-green-500" total={stats.total} />
              <Bar label="Média Chance" value={stats.medium} color="bg-yellow-500" total={stats.total} />
              <Bar label="Baixa Chance" value={stats.low} color="bg-red-500" total={stats.total} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-700 text-center">
              Total de {stats.total} diagnósticos filtrados
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-center items-center text-center">
            {/* Simple Circle / Stat */}
            <div className="w-32 h-32 rounded-full border-8 border-[var(--brand-verde-escuro)] flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-[var(--brand-verde-escuro)]">{stats.total}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total de Leads</h3>
            <p className="text-gray-700 text-sm">No período selecionado</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por Nome, Email ou Empresa</label>
              <input 
                type="text" 
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Ex: João da Silva..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-verde-escuro)] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Score Mínimo</label>
              <select 
                value={filterMinScore}
                onChange={(e) => setFilterMinScore(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-verde-escuro)] focus:outline-none"
              >
                <option value="">Todos</option>
                <option value="40">Maior que 40 (Médio/Alto)</option>
                <option value="70">Maior que 70 (Alto)</option>
                <option value="90">Maior que 90 (Muito Alto)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-900 text-sm">Data</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Nome / Ocupação</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Triage (Lawyer)</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Score</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Dossiê Completo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Nenhum lead encontrado com os filtros atuais.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-800 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')} <br/>
                        <span className="text-xs text-gray-600 font-medium">{new Date(lead.created_at).toLocaleTimeString('pt-BR')}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{lead.name || "N/A"}</div>
                        <div className="text-sm text-gray-700 font-medium">{lead.company}</div>
                        <div className="text-xs text-gray-600 mt-1">{lead.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            lead.classification === 'Hot' ? 'bg-red-500 text-white' :
                            lead.classification === 'Warm' ? 'bg-orange-400 text-white' :
                            'bg-blue-400 text-white'
                          }`}>
                             {lead.classification || 'COLD'}
                          </span>
                          <span className={`text-[10px] font-bold ${
                            lead.legal_risk === 'Low' ? 'text-green-600' :
                            lead.legal_risk === 'Medium' ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            RISCO: {lead.legal_risk || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          lead.score >= 70 ? 'bg-green-100 text-green-900 border border-green-200' :
                          lead.score >= 40 ? 'bg-yellow-100 text-yellow-900 border border-yellow-200' :
                          'bg-red-100 text-red-900 border border-red-200'
                        }`}>
                          {lead.score}/100
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="text-sm text-green-700 hover:text-green-900 hover:underline font-bold flex items-center gap-1 group"
                        >
                          <span>Abrir Dossiê</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal do Dossiê */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-gray-900 text-white p-6 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="font-bold text-xl">Dossiê de Triagem Jurídica</h3>
                <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest font-bold">Inteligência Manus AI</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  selectedLead.classification === 'Hot' ? 'bg-red-500' :
                  selectedLead.classification === 'Warm' ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  LEAD {selectedLead.classification || 'COLD'}
                </span>
                <button 
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="overflow-y-auto p-8">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8 pb-8 border-b border-gray-100">
                <div>
                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Candidato</h4>
                  <p className="font-black text-gray-900 text-lg leading-tight">{selectedLead.name || "N/A"}</p>
                  <p className="text-sm text-gray-500">{selectedLead.email}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Contato Direto</h4>
                  <p className="font-bold text-green-700 text-lg">{selectedLead.whatsapp || 'N/A'}</p>
                  <p className="text-sm text-gray-500">Preferência: {selectedLead.business_data?.contactPreference || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Visibilidade de Visto</h4>
                  <p className="font-black text-gray-900 text-lg">
                    {selectedLead.score >= 80 ? 'EB-1 / O-1 / NIW (Alta)' : 
                     selectedLead.score >= 50 ? 'NIW / EB-2 (Moderada)' : 'Ajustes Necessários'}
                  </p>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Score: {selectedLead.score}/100</span>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Risco Jurídico</h4>
                  <p className={`font-black text-lg ${
                    selectedLead.legal_risk === 'Low' ? 'text-green-600' :
                    selectedLead.legal_risk === 'Medium' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {selectedLead.legal_risk === 'Low' ? 'BAIXO' : 
                     selectedLead.legal_risk === 'Medium' ? 'MÉDIO (Atenção)' : 'ALTO ⚠️'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Capacidade Financeira</h4>
                  <p className="font-bold text-gray-900 text-lg">
                    {selectedLead.business_data?.investmentBudget === 'over_15k' ? 'ALTA (> $15k)' : 
                     selectedLead.business_data?.investmentBudget === '10k_15k' ? 'MÉDIA ($10k-15k)' : 'BAIXA / NÃO INF.'}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Empresa / Ocupação</h4>
                  <p className="font-bold text-gray-900 text-lg">{selectedLead.company || 'N/A'}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-3">Documentos e Provas</h4>
                <div className="space-y-3">
                  {selectedLead.business_data?.contact?.linkedin && (
                    <a href={selectedLead.business_data?.contact?.linkedin} target="_blank" className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl group transition-colors hover:bg-blue-100">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-blue-900 uppercase tracking-tighter">Perfil LinkedIn</p>
                        <p className="text-sm text-blue-700 truncate">{selectedLead.business_data?.contact?.linkedin}</p>
                      </div>
                    </a>
                  )}
                  {selectedLead.uploaded_files && selectedLead.uploaded_files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedLead.uploaded_files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-500">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                             </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Documento Anexo</p>
                            <p className="text-sm text-gray-700 font-bold truncate">{file.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!selectedLead.business_data?.contact?.linkedin && (!selectedLead.uploaded_files || selectedLead.uploaded_files.length === 0) && (
                    <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center">
                      <p className="text-sm text-gray-500 italic">Nenhum documento ou link fornecido.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="text-[10px] uppercase tracking-tighter text-gray-500 font-black mb-4 flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                   Parecer Estratégico (Manus AI)
                </h4>
                <div className="text-[15px] text-gray-900 font-medium whitespace-pre-wrap leading-relaxed">
                   {selectedLead.ai_analysis || "Análise pendente. Solicite o re-processamento se necessário."}
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-6 border-t border-gray-100 bg-white sticky bottom-0 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedLead(null)}
                className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Fechar
              </button>
              <button 
                onClick={() => window.print()}
                className="px-6 py-2.5 text-sm font-bold bg-[var(--brand-verde-escuro)] text-white rounded-xl shadow-lg shadow-green-900/20 hover:brightness-110 transition-all"
              >
                Imprimir Dossiê
              </button>
            </div>
          </div>
          {/* Overlay click to close */}
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedLead(null)}></div>
        </div>
      )}
    </div>
  );
}
