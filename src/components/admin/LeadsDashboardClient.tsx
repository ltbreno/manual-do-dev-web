"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import StatCard from "@/components/admin/StatCard";
import ProductActivityDonut from "@/components/admin/charts/ProductActivityDonut";
import CustomerActivityBar from "@/components/admin/charts/CustomerActivityBar";
import { 
  Users, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  Search,
  Filter,
  MoreVertical,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle
} from "lucide-react";
import { businessAssessmentModules } from "@/data/business-assessment";

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
    type?: string;
    answers?: Record<string, string>;
    scores?: Record<string, number>;
    [key: string]: unknown;
  };
}

interface LeadsDashboardClientProps {
  initialLeads: Lead[];
}

export default function LeadsDashboardClient({ initialLeads }: LeadsDashboardClientProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesName =
        lead.name?.toLowerCase().includes(filterName.toLowerCase()) ||
        lead.email?.toLowerCase().includes(filterName.toLowerCase()) ||
        lead.company?.toLowerCase().includes(filterName.toLowerCase());
      
      const leadStatus = lead.status || "new";
      const matchesStatus = filterStatus ? leadStatus === filterStatus : true;
      return matchesName && matchesStatus;
    });
  }, [leads, filterName, filterStatus]);

  // Derive stats for KPI cards
  const stats = useMemo(() => {
    const total = leads.length;
    const hotLeads = leads.filter(l => l.classification === "Hot").length;
    const highBudget = leads.filter(l => l.business_data?.investmentBudget === "over_15k").length;
    const highRisk = leads.filter(l => l.legal_risk === "High").length;

    // Derived chart data
    const activityData = [
      { label: "Prioritários (Hot)", value: hotLeads, color: "var(--dash-accent-pink)" },
      { label: "Promissores (Warm)", value: leads.filter(l => l.classification === "Warm").length, color: "var(--dash-accent-blue)" },
      { label: "Frios (Cold)", value: leads.filter(l => l.classification === "Cold").length, color: "var(--dash-accent-orange)" },
      { label: "Desqualificados", value: leads.filter(l => l.status === "lost").length, color: "var(--dash-accent-green)" },
    ];

    const monthlyData = [
      { label: "Jan", value: 34, color: "var(--dash-accent-blue)" },
      { label: "Fev", value: 45, color: "var(--dash-accent-pink)" },
      { label: "Mar", value: 28, color: "var(--dash-accent-blue)" },
      { label: "Abr", value: total, color: "var(--dash-accent-pink)" },
    ];

    const countryData = [
      { label: "Brasil", value: leads.length, color: "var(--dash-accent-green)" },
      { label: "Portugal", value: Math.floor(leads.length / 3), color: "var(--dash-accent-blue)" },
      { label: "EUA", value: Math.floor(leads.length / 5), color: "var(--dash-accent-pink)" },
    ];

    return { total, hotLeads, highBudget, highRisk, activityData, monthlyData, countryData };
  }, [leads]);

  const sparkData = [20, 25, 22, 30, 28, 35, 33, 40];

  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-white overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-64 min-w-0 font-sans">
        <TopBar />
        
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total de Leads"
              value={stats.total}
              trend="+12%"
              trendColor="#00f2ad"
              icon={Users}
              iconColor="#00d2ff"
              sparkData={sparkData}
              sparkColor="#00d2ff"
            />
            <StatCard 
              title="Leads Prioritários"
              value={stats.hotLeads}
              trend="+5.3%"
              trendColor="#00f2ad"
              icon={TrendingUp}
              iconColor="#ff4b91"
              sparkData={[10, 15, 12, 18, 15, 22, 20]}
              sparkColor="#ff4b91"
            />
            <StatCard 
              title="Alto Potencial"
              value={stats.highBudget}
              trend="-1.2%"
              trendColor="#ff4b91"
              icon={Package}
              iconColor="#ff9a3e"
              sparkData={[30, 25, 28, 22, 25, 20, 18]}
              sparkColor="#ff9a3e"
            />
            <StatCard 
              title="Risco de Conformidade"
              value={stats.highRisk}
              trend="+0.8%"
              trendColor="#ff9a3e"
              icon={AlertTriangle}
              iconColor="#ff4b91"
              sparkData={[5, 6, 4, 8, 7, 9, 8]}
              sparkColor="#ff4b91"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <ProductActivityDonut 
                data={stats.activityData} 
                total={stats.total} 
                totalLabel="Leads" 
              />
            </div>
            <div className="lg:col-span-4">
              <CustomerActivityBar 
                title="Crescimento Mensal" 
                data={stats.monthlyData} 
              />
            </div>
            <div className="lg:col-span-4">
              <CustomerActivityBar 
                title="Ativos por Região" 
                data={stats.countryData} 
                type="horizontal"
              />
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl overflow-hidden glass-dark">
            <div className="p-6 border-b border-[var(--dash-border)] flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <h3 className="text-white font-bold text-lg">Histórico de Triagem</h3>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold text-[var(--dash-muted)] uppercase">
                  {filteredLeads.length} registros
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dash-muted)] group-focus-within:text-white transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search leads..."
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all w-48"
                  />
                </div>
                <button className="p-2 rounded-xl border border-white/10 text-[var(--dash-muted)] hover:text-white hover:bg-white/5 transition-all">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-[var(--dash-muted)] hover:text-white hover:bg-white/10 transition-all">
                  <Download className="w-4 h-4" />
                   Export
                </button>
              </div>
            </div>

            {/* CRM Status Tabs */}
            <div className="px-6 pt-4 border-b border-white/5 flex items-center gap-6 overflow-x-auto custom-scrollbar">
              {[
                { value: "", label: "Todos", count: leads.length },
                { value: "new", label: "Novos", count: leads.filter(l => l.status === "new" || !l.status).length },
                { value: "contacted", label: "Em Contato", count: leads.filter(l => l.status === "contacted").length },
                { value: "meeting", label: "Reagendado / Reunião", count: leads.filter(l => l.status === "meeting").length },
                { value: "hired", label: "Contratados", count: leads.filter(l => l.status === "hired").length },
                { value: "lost", label: "Perdidos", count: leads.filter(l => l.status === "lost").length }
              ].map(tab => (
                <button
                  key={tab.value}
                  onClick={() => setFilterStatus(tab.value)}
                  className={`flex items-center gap-2 pb-4 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                    filterStatus === tab.value 
                      ? "border-[var(--dash-accent-pink)] text-white" 
                      : "border-transparent text-[var(--dash-muted)] hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    filterStatus === tab.value ? "bg-[var(--dash-accent-pink)] text-white" : "bg-white/5 text-[var(--dash-muted)]"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.01]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Lead / Empresa</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest text-center">Score</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest text-center">Risco</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Último Contato</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <StatusBadge status={lead.status} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-xs border border-white/10">
                            {lead.name?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-[var(--dash-accent-pink)] transition-colors">{lead.name}</p>
                            <p className="text-[10px] text-[var(--dash-muted)] uppercase tracking-wider font-medium">{lead.company || "Pessoa Física"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-white/5 bg-white/[0.02] font-mono font-bold text-sm" 
                             style={{ borderColor: lead.score >= 70 ? 'var(--dash-accent-green)' : lead.score >= 40 ? 'var(--dash-accent-orange)' : 'var(--dash-accent-pink)' }}>
                          {lead.score}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          lead.legal_risk === 'Low' ? 'bg-green-500/10 text-green-500' : 
                          lead.legal_risk === 'Medium' ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {lead.legal_risk || 'Low'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs font-medium text-white">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</p>
                        <p className="text-[10px] text-[var(--dash-muted)]">Triagem Automática</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setSelectedLead(lead)}
                            className="p-2 rounded-xl bg-white/5 border border-white/5 text-[var(--dash-muted)] hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-[var(--dash-muted)] hover:text-white hover:bg-white/10 transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Reusing Modal logic with updated styles */}
      {selectedLead && (
        <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const configs: Record<string, { icon: any, color: string, label: string }> = {
    hired: { icon: CheckCircle2, color: "var(--dash-accent-green)", label: "Contratado" },
    meeting: { icon: Clock, color: "var(--dash-accent-blue)", label: "Reunião" },
    contacted: { icon: HelpCircle, color: "var(--dash-accent-orange)", label: "Contatado" },
    lost: { icon: XCircle, color: "var(--dash-accent-pink)", label: "Perdido" },
    new: { icon: Clock, color: "white", label: "Novo" },
    default: { icon: Clock, color: "var(--dash-muted)", label: "Pendente" }
  };

  const config = configs[status || ""] || configs.default;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
      <Icon className="w-3 h-3" style={{ color: config.color }} />
      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: config.color }}>{config.label}</span>
    </div>
  );
}

// Simplified LeadModal for the refactor - keeping original logic but updating UI
function LeadModal({ lead, onClose }: { lead: Lead, onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[var(--dash-bg)] border border-[var(--dash-border)] w-full max-w-2xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-[var(--dash-border)] bg-white/[0.02] flex justify-between items-center">
          <div>
            <h3 className="font-bold text-xl text-white">Dossiê de Inteligência</h3>
            <p className="text-[var(--dash-muted)] text-[10px] font-black uppercase tracking-widest mt-1">Automatizado via Manus AI</p>
          </div>
          <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-white">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-10 space-y-10 custom-scrollbar">
           {/* Section: Profile */}
           <div className="flex items-start gap-8">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--dash-accent-pink)] to-[var(--dash-accent-orange)] flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-pink-500/20">
                {lead.name?.charAt(0)}
              </div>
              <div className="space-y-4 flex-1">
                 <div>
                    <h4 className="text-2xl font-bold text-white">{lead.name}</h4>
                    <p className="text-[var(--dash-muted)] font-medium">{lead.email}</p>
                 </div>
                 <div className="flex gap-4">
                    <span className="bg-[var(--dash-accent-blue)]/10 text-[var(--dash-accent-blue)] px-3 py-1 rounded-lg text-xs font-bold uppercase">{lead.classification || 'Warm'}</span>
                    <span className="bg-[var(--dash-accent-green)]/10 text-[var(--dash-accent-green)] px-3 py-1 rounded-lg text-xs font-bold uppercase">{lead.legal_risk || 'Low Risk'}</span>
                 </div>
              </div>
           </div>

           {/* Section: AI Analysis */}
           <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] space-y-4">
              <h5 className="text-[var(--dash-muted)] text-[10px] font-black uppercase tracking-widest">Análise Detalhada AI</h5>
              <p className="text-white text-base leading-relaxed font-medium">
                {lead.ai_analysis || "Análise pendente. Solicite o re-processamento se necessário."}
              </p>
           </div>

           {/* Section: Business Data */}
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                 <p className="text-[var(--dash-muted)] text-[10px] font-black uppercase tracking-widest">Budget de Investimento</p>
                 <p className="text-lg font-bold text-white">{lead.business_data?.investmentBudget || "Não informado"}</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[var(--dash-muted)] text-[10px] font-black uppercase tracking-widest">WhatsApp</p>
                 <p className="text-lg font-bold text-[var(--dash-accent-green)]">{lead.whatsapp || "Nenhum"}</p>
              </div>
           </div>

           {/* Section: Business Assessment Custom Data */}
           {lead.business_data?.type === "business_expansion_assessment" && lead.business_data.answers && (
             <div className="space-y-6" style={{ marginTop: '2rem' }}>
                <h5 className="text-[var(--dash-muted)] text-xs font-black uppercase tracking-widest">Respostas do Raio-X de Expansão</h5>
                <div className="space-y-6">
                  {businessAssessmentModules.map((module) => {
                    const moduleScore = lead.business_data?.scores?.[module.id];
                    return (
                      <div key={module.id} className="bg-white/[0.02] border border-white/5 rounded-[24px] p-6 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                          <h6 className="font-bold text-white text-sm">{module.title}</h6>
                          {moduleScore !== undefined && (
                            <span className="text-[var(--dash-accent-pink)] font-black px-3 py-1 bg-[var(--dash-accent-pink)]/10 rounded-xl text-xs">{Math.round(moduleScore)}% de aderência</span>
                          )}
                        </div>
                        <div className="space-y-4 mt-4">
                          {module.questions.map((q) => {
                            const answerId = lead.business_data?.answers?.[q.id];
                            if (!answerId) return null;
                            const option = q.options.find(o => o.value === answerId);
                            return (
                              <div key={q.id} className="space-y-1.5">
                                <p className="text-xs text-[var(--dash-muted)] font-medium leading-relaxed">{q.label}</p>
                                <div className="text-sm text-white font-medium pl-3 border-l-2 border-[var(--dash-accent-blue)] py-0.5">
                                  {option ? option.label : answerId}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
             </div>
           )}
        </div>

        <div className="p-8 border-t border-[var(--dash-border)] bg-black/20 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-3 text-sm font-bold text-[var(--dash-muted)] hover:text-white transition-colors">Fechar</button>
          <button className="px-8 py-3 bg-[var(--dash-accent-pink)] hover:bg-[var(--dash-accent-pink)]/80 text-white rounded-2xl font-bold text-sm shadow-xl shadow-pink-500/20 transition-all active:scale-95">Aprovar Triagem</button>
        </div>
      </div>
    </div>
  );
}
