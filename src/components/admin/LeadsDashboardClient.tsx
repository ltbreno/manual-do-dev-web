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
  status?: "new" | "contacted" | "meeting" | "hired" | "lost";
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

// Simple CSS Bar Chart Helper
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
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filterName, setFilterName] = useState("");
  const [filterMinScore, setFilterMinScore] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterClassification, setFilterClassification] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesName =
        lead.name?.toLowerCase().includes(filterName.toLowerCase()) ||
        lead.email?.toLowerCase().includes(filterName.toLowerCase()) ||
        lead.company?.toLowerCase().includes(filterName.toLowerCase());
      
      const score = lead.score || 0;
      const minScore = filterMinScore ? parseInt(filterMinScore) : 0;
      const matchesScore = score >= minScore;

      const matchesStatus = filterStatus ? lead.status === filterStatus : true;
      const matchesClassification = filterClassification ? lead.classification === filterClassification : true;

      return matchesName && matchesScore && matchesStatus && matchesClassification;
    });
  }, [leads, filterName, filterMinScore, filterStatus, filterClassification]);

  // Executive KPIs
  const stats = useMemo(() => {
    const total = leads.length;
    const hotLeads = leads.filter(l => l.classification === "Hot").length;
    const highBudget = leads.filter(l => l.business_data?.investmentBudget === "over_15k" || l.business_data?.investmentBudget === "10k_15k").length;
    const highRisk = leads.filter(l => l.legal_risk === "High").length;
    const newLeads = leads.filter(l => !l.status || l.status === "new").length;
    
    const scoreHigh = leads.filter(l => l.score >= 70).length;
    const scoreMedium = leads.filter(l => l.score >= 40 && l.score < 70).length;
    const scoreLow = leads.filter(l => l.score < 40).length;

    return { total, hotLeads, highBudget, highRisk, newLeads, scoreHigh, scoreMedium, scoreLow };
  }, [leads]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Inteligência Jurídica</h1>
            <p className="text-gray-700 mt-1">Painel Executivo de Vistos & Imigração</p>
          </div>
          <LogoutButton />
        </div>

        {/* Executive KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           {/* KPI 1: Total & Growth */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12% mês</span>
             </div>
             <p className="text-gray-500 text-sm font-medium">Total de Leads</p>
             <h3 className="text-3xl font-bold text-gray-900">{stats.total}</h3>
           </div>

           {/* KPI 2: Hot / Prioritários */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-red-50 rounded-xl">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>
                </div>
             </div>
             <p className="text-gray-500 text-sm font-medium">Leads HOT (Prioritários)</p>
             <h3 className="text-3xl font-bold text-gray-900">{stats.hotLeads}</h3>
           </div>

           {/* KPI 3: High Ticket Potential */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
             </div>
             <p className="text-gray-500 text-sm font-medium">Alto Orçamento (10k)</p>
             <h3 className="text-3xl font-bold text-gray-900">{stats.highBudget}</h3>
           </div>

           {/* KPI 4: Action Needed */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Ação Necessária</span>
             </div>
             <p className="text-gray-500 text-sm font-medium">Novos / Pendentes</p>
             <h3 className="text-3xl font-bold text-gray-900">{stats.newLeads}</h3>
           </div>
        </div>

        {/* Charts & Graphs Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Viabilidade Jurídica</h3>
            <div className="space-y-4">
              <Bar label="Alta" value={stats.scoreHigh} color="bg-green-500" total={stats.total} />
              <Bar label="Média" value={stats.scoreMedium} color="bg-yellow-500" total={stats.total} />
              <Bar label="Baixa" value={stats.scoreLow} color="bg-red-500" total={stats.total} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
               <span>Baseado em {stats.total} diagnósticos</span>
               <span className="flex items-center gap-1 font-medium text-red-500">
                 ⚠️ {stats.highRisk} com Risco Alto
               </span>
            </div>
          </div>

        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filtros Inteligentes</h3>
            <button 
              onClick={() => {
                setFilterName("");
                setFilterMinScore("");
              }}
              className="text-sm text-gray-500 hover:text-[var(--brand-verde-escuro)] hover:underline"
            >
              Limpar Filtros
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Buscar</label>
              <input 
                type="text" 
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Nome, Email ou Empresa"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand-verde-escuro)] focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status do Lead</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand-verde-escuro)] focus:outline-none bg-white"
              >
                 <option value="">Todos</option>
                 <option value="new">🆕 Novos</option>
                 <option value="contacted">📞 Contatados</option>
                 <option value="meeting">📅 Reunião Agendada</option>
                 <option value="hired">✅ Contratados</option>
                 <option value="lost">❌ Perdidos</option>
               </select>
            </div>

            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Classificação</label>
               <select 
                 value={filterClassification}
                 onChange={(e) => setFilterClassification(e.target.value)}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand-verde-escuro)] focus:outline-none bg-white"
               >
                 <option value="">Todas</option>
                 <option value="Hot">🔥 Hot (Prioridade)</option>
                 <option value="Warm">⚡ Warm (Promissor)</option>
                 <option value="Cold">❄️ Cold (Longo Prazo)</option>
               </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Score Mínimo</label>
              <div className="relative">
                <select 
                  value={filterMinScore}
                  onChange={(e) => setFilterMinScore(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--brand-verde-escuro)] focus:outline-none appearance-none bg-white"
                >
                  <option value="">Todos os Scores</option>
                  <option value="40">40+ (Em Preparação)</option>
                  <option value="60">60+ (Viável)</option>
                  <option value="80">80+ (Alta Aderência)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-bold text-gray-900 text-sm">Status</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Data</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Lead / Empresa</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Triage</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Score</th>
                  <th className="p-4 font-bold text-gray-900 text-sm">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      Nenhum lead encontrado com os filtros atuais.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-4">
                        <select 
                          value={lead.status || "new"}
                          onChange={(e) => {
                             const newStatus = e.target.value as "new" | "contacted" | "meeting" | "hired" | "lost";
                             const updatedLeads = leads.map(l => l.id === lead.id ? { ...l, status: newStatus } : l);
                             setLeads(updatedLeads);
                             // TODO: Call API to persist status
                          }}
                          className={`text-xs font-bold uppercase rounded-full px-2 py-1 border-0 ring-1 ring-inset focus:ring-2 focus:ring-[var(--brand-verde-escuro)] cursor-pointer ${
                            lead.status === 'hired' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                            lead.status === 'lost' ? 'bg-gray-50 text-gray-600 ring-gray-500/10' :
                            lead.status === 'contacted' ? 'bg-blue-50 text-blue-700 ring-blue-700/10' :
                            lead.status === 'meeting' ? 'bg-purple-50 text-purple-700 ring-purple-700/10' :
                            'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                          }`}
                        >
                          <option value="new">Novo</option>
                          <option value="contacted">Contatado</option>
                          <option value="meeting">Reunião</option>
                          <option value="hired">Contratado</option>
                          <option value="lost">Perdido</option>
                        </select>
                      </td>
                      <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{lead.name || "N/A"}</div>
                        {lead.company && <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{lead.company}</div>}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            lead.classification === 'Hot' ? 'bg-red-100 text-red-700' :
                            lead.classification === 'Warm' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                             {lead.classification === 'Hot' ? '🔥 HOT' : lead.classification === 'Warm' ? '⚡ WARM' : '❄️ COLD'}
                          </span>
                          {lead.legal_risk === 'High' && (
                             <span className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                               ⚠️ RISCO ALTO
                             </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          lead.score >= 70 ? 'bg-green-100 text-green-900' :
                          lead.score >= 40 ? 'bg-yellow-100 text-yellow-900' :
                          'bg-red-100 text-red-900'
                        }`}>
                          {lead.score} pts
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="text-sm font-semibold text-gray-900 hover:text-[var(--brand-verde-escuro)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Ver Detalhes →
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
                <h3 className="font-bold text-xl">Relatório de Triagem Jurídica Automatizada</h3>
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
              
              {/* Resumo Executivo (NOVO) */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
                <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 border-b border-gray-200 pb-2">Resumo Executivo</h4>
                <div className="grid grid-cols-3 gap-6">
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Viabilidade Geral</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${selectedLead.score >= 70 ? 'bg-green-500' : selectedLead.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        <span className="font-bold text-gray-900 text-lg">
                          {selectedLead.score >= 70 ? 'ALTA' : selectedLead.score >= 40 ? 'MÉDIA' : 'BAIXA'}
                        </span>
                      </div>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Visto Recomendado</p>
                      <p className="font-bold text-gray-900 text-lg">
                        {selectedLead.score >= 80 ? 'EB-1 / O-1' : selectedLead.score >= 60 ? 'MIGRAÇÃO NIW' : 'Estudo / Trabalho'}
                      </p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Ação Sugerida</p>
                      <p className="font-bold text-[var(--brand-verde-escuro)] text-lg">
                        {selectedLead.classification === 'Hot' ? 'Agendar Consulta' : selectedLead.classification === 'Warm' ? 'Nutrir Lead' : 'Desqualificar'}
                      </p>
                   </div>
                </div>
              </div>

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

              {/* Checklist de Evidências (NOVO) */}
              <div className="mb-8">
                 <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-3">Checklist de Evidências Identificadas</h4>
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid grid-cols-2 gap-3">
                    {/* Mocked Checkitems for now since we don't have the full achievements list in this simplified lead type */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                       <span className={`w-4 h-4 flex items-center justify-center rounded border ${selectedLead.score > 50 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                         {selectedLead.score > 50 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                       </span>
                       Experiência {'>'} 5 anos
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                       <span className={`w-4 h-4 flex items-center justify-center rounded border ${selectedLead.score > 70 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                         {selectedLead.score > 70 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                       </span>
                       Alta Remuneração
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                       <span className={`w-4 h-4 flex items-center justify-center rounded border ${selectedLead.score > 80 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                         {selectedLead.score > 80 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                       </span>
                       Prêmios / Reconhecimento
                    </div>
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                       <span className={`w-4 h-4 flex items-center justify-center rounded border ${selectedLead.score > 60 ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                         {selectedLead.score > 60 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                       </span>
                       Formação Acadêmica
                    </div>
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
                   Análise Detalhada (AI)
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
