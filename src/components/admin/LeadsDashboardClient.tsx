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
  business_data?: Record<string, any>;
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
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-green-700 hover:text-green-900 hover:underline list-none font-bold flex items-center gap-1">
                            <span>Exibir Dossiê</span>
                            <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </summary>
                          <div className="mt-4 text-sm text-gray-900 bg-white p-6 rounded-2xl border-2 border-gray-100 max-w-2xl shadow-xl overflow-hidden">
                            <div className="bg-gray-900 text-white -mx-6 -mt-6 p-4 mb-6 flex justify-between items-center">
                               <h3 className="font-bold text-lg">Dossiê de Triagem Jurídica</h3>
                               <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                                  lead.classification === 'Hot' ? 'bg-red-500' :
                                  lead.classification === 'Warm' ? 'bg-orange-500' : 'bg-blue-500'
                               }`}>
                                  LEAD {lead.classification || 'COLD'}
                               </span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                               <div>
                                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-0.5">Visibilidade Vistos</h4>
                                  <p className="font-black text-gray-900 text-base">
                                     {lead.score >= 80 ? 'EB-1 / O-1 / NIW (Alta)' : 
                                      lead.score >= 50 ? 'NIW / EB-2 (Moderada)' : 'Ajustes Necessários'}
                                  </p>
                               </div>
                               <div>
                                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-0.5">Risco Jurídico</h4>
                                  <p className={`font-black text-base ${
                                     lead.legal_risk === 'Low' ? 'text-green-600' :
                                     lead.legal_risk === 'Medium' ? 'text-orange-600' : 'text-red-600'
                                  }`}>
                                     {lead.legal_risk === 'Low' ? 'BAIXO' : 
                                      lead.legal_risk === 'Medium' ? 'MÉDIO (Atenção)' : 'ALTO ⚠️'}
                                  </p>
                               </div>
                               <div>
                                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-0.5">Capacidade Financeira</h4>
                                  <p className="font-bold text-gray-900">
                                     {lead.business_data?.investmentBudget === 'over_15k' ? 'ALTA (> $15k)' : 
                                      lead.business_data?.investmentBudget === '10k_15k' ? 'MÉDIA ($10k-15k)' : 'BAIXA / NÃO INF.'}
                                  </p>
                               </div>
                               <div>
                                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-0.5">Contato Direto</h4>
                                  <p className="font-bold text-green-700">{lead.whatsapp || 'N/A'}</p>
                               </div>
                               <div className="col-span-2 pt-4 border-t border-gray-100">
                                  <h4 className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold mb-1">Documentos / LinkedIn</h4>
                                  <a href={lead.business_data?.contact?.linkedin} target="_blank" className="font-bold text-blue-700 underline break-all text-xs">
                                     {lead.business_data?.contact?.linkedin || 'Nenhum documento anexado'}
                                  </a>
                               </div>
                            </div>
                            
                            <div className="bg-gray-50 -mx-6 -mb-6 p-6 border-t border-gray-200">
                               <h4 className="text-[10px] uppercase tracking-tighter text-gray-500 font-black mb-3">Observações Estratégicas (Inteligência Manus AI)</h4>
                               <div className="prose prose-sm max-w-none prose-p:text-gray-900 prose-p:font-medium whitespace-pre-wrap leading-relaxed">
                                  {lead.ai_analysis || "Análise pendente."}
                               </div>
                            </div>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
