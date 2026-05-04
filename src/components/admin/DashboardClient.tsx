"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import StatCard from "@/components/admin/StatCard";
import ProductActivityDonut from "@/components/admin/charts/ProductActivityDonut";
import CustomerActivityBar from "@/components/admin/charts/CustomerActivityBar";
import { Users, TrendingUp, CheckCircle2, AlertTriangle, Clock, Send, Check } from "lucide-react";

interface DashboardStats {
  total: number;
  hot: number;
  hired: number;
  high_risk: number;
  this_month: number;
}

interface MonthlyRow { month: string; count: number }
interface ClassRow { classification: string; count: number }
interface StatusRow { status: string; count: number }

interface DashboardData {
  stats: DashboardStats;
  monthly: MonthlyRow[];
  byClassification: ClassRow[];
  byStatus: StatusRow[];
}

export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportSending, setReportSending] = useState(false);
  const [reportSent, setReportSent] = useState(false);

  async function sendWeeklyReport() {
    setReportSending(true);
    try {
      await fetch("/api/email/report", { method: "POST" });
      setReportSent(true);
      setTimeout(() => setReportSent(false), 3000);
    } finally {
      setReportSending(false);
    }
  }

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sparkDefault = [10, 15, 12, 18, 16, 22, 20, 28];

  const activityData = data
    ? [
        { label: "Prioritários (Hot)", value: data.byClassification.find(c => c.classification === "Hot")?.count ?? 0, color: "var(--dash-accent-pink)" },
        { label: "Promissores (Warm)", value: data.byClassification.find(c => c.classification === "Warm")?.count ?? 0, color: "var(--dash-accent-blue)" },
        { label: "Frios (Cold)", value: data.byClassification.find(c => c.classification === "Cold")?.count ?? 0, color: "var(--dash-accent-orange)" },
      ]
    : [];

  const monthlyChart = data?.monthly.length
    ? data.monthly.map((m, i) => ({
        label: m.month,
        value: m.count,
        color: i % 2 === 0 ? "var(--dash-accent-blue)" : "var(--dash-accent-pink)",
      }))
    : [{ label: "—", value: 0, color: "var(--dash-accent-blue)" }];

  const statusChart = data?.byStatus.length
    ? data.byStatus.map((s) => {
        const colors: Record<string, string> = {
          new: "var(--dash-muted)",
          contacted: "var(--dash-accent-orange)",
          meeting: "var(--dash-accent-blue)",
          hired: "var(--dash-accent-green)",
          lost: "var(--dash-accent-pink)",
        };
        return { label: s.status, value: s.count, color: colors[s.status] ?? "var(--dash-muted)" };
      })
    : [{ label: "—", value: 0, color: "var(--dash-muted)" }];

  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 min-w-0 font-sans">
        <TopBar />
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-end">
            <button
              onClick={sendWeeklyReport}
              disabled={reportSending}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 text-[var(--dash-muted)] hover:text-white rounded-2xl font-bold text-sm transition-all disabled:opacity-50"
            >
              {reportSent ? <Check className="w-4 h-4 text-[var(--dash-accent-green)]" /> : <Send className="w-4 h-4" />}
              {reportSent ? "Relatório enviado!" : reportSending ? "Enviando..." : "Enviar Relatório Semanal"}
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl h-40 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total de Leads"
                  value={data?.stats.total ?? 0}
                  trend={`+${data?.stats.this_month ?? 0} este mês`}
                  trendColor="#00f2ad"
                  icon={Users}
                  iconColor="#00d2ff"
                  sparkData={sparkDefault}
                  sparkColor="#00d2ff"
                />
                <StatCard
                  title="Leads Prioritários"
                  value={data?.stats.hot ?? 0}
                  trend="Hot"
                  trendColor="#ff4b91"
                  icon={TrendingUp}
                  iconColor="#ff4b91"
                  sparkData={[5, 8, 6, 10, 9, 12, 11]}
                  sparkColor="#ff4b91"
                />
                <StatCard
                  title="Contratados"
                  value={data?.stats.hired ?? 0}
                  trend="Status: hired"
                  trendColor="#00f2ad"
                  icon={CheckCircle2}
                  iconColor="#00f2ad"
                  sparkData={[2, 3, 2, 4, 3, 5, 4]}
                  sparkColor="#00f2ad"
                />
                <StatCard
                  title="Risco Alto"
                  value={data?.stats.high_risk ?? 0}
                  trend="Atenção"
                  trendColor="#ff9a3e"
                  icon={AlertTriangle}
                  iconColor="#ff9a3e"
                  sparkData={[3, 4, 3, 5, 4, 6, 5]}
                  sparkColor="#ff9a3e"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4">
                  <ProductActivityDonut
                    data={activityData}
                    total={data?.stats.total ?? 0}
                    totalLabel="Leads"
                  />
                </div>
                <div className="lg:col-span-4">
                  <CustomerActivityBar title="Novos Leads por Mês" data={monthlyChart} />
                </div>
                <div className="lg:col-span-4">
                  <CustomerActivityBar title="Leads por Status" data={statusChart} type="horizontal" />
                </div>
              </div>

              <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-4 h-4 text-[var(--dash-accent-blue)]" />
                  <h3 className="font-bold text-white">Resumo do Pipeline</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {(data?.byStatus ?? []).map((s) => {
                    const labels: Record<string, string> = {
                      new: "Novos",
                      contacted: "Em Contato",
                      meeting: "Reunião",
                      hired: "Contratados",
                      lost: "Perdidos",
                    };
                    const colors: Record<string, string> = {
                      new: "var(--dash-muted)",
                      contacted: "var(--dash-accent-orange)",
                      meeting: "var(--dash-accent-blue)",
                      hired: "var(--dash-accent-green)",
                      lost: "var(--dash-accent-pink)",
                    };
                    const color = colors[s.status] ?? "var(--dash-muted)";
                    return (
                      <div key={s.status} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-bold font-mono" style={{ color }}>{s.count}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dash-muted)] mt-1">
                          {labels[s.status] ?? s.status}
                        </p>
                      </div>
                    );
                  })}
                  {!data?.byStatus.length && (
                    <div className="col-span-5 text-center text-[var(--dash-muted)] py-8 text-sm">
                      Nenhum dado ainda. Leads aparecerão após as primeiras triagens.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
