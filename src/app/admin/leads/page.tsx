import pool from "@/lib/db";
import LogoutButton from "@/components/admin/LogoutButton";
import { ensureLeadsTableExists } from "@/lib/db";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getLeads() {
  await ensureLeadsTableExists();
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM leads ORDER BY created_at DESC');
    return result.rows;
  } catch (e) {
    console.error("Error fetching leads:", e);
    return [];
  } finally {
    client.release();
  }
}

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard de Leads</h1>
            <p className="text-gray-500 mt-1">Gerencie os diagnósticos recebidos</p>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-700 text-sm">Data</th>
                  <th className="p-4 font-semibold text-gray-700 text-sm">Nome / Empresa</th>
                  <th className="p-4 font-semibold text-gray-700 text-sm">Contato</th>
                  <th className="p-4 font-semibold text-gray-700 text-sm">Score</th>
                  <th className="p-4 font-semibold text-gray-700 text-sm">Raio-X</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Nenhum lead encontrado ainda.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')} <br/>
                        <span className="text-xs text-gray-400">{new Date(lead.created_at).toLocaleTimeString('pt-BR')}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-gray-900">{lead.name || "N/A"}</div>
                        <div className="text-sm text-gray-500">{lead.company}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        <div>{lead.email}</div>
                        <div className="text-xs text-gray-500">{lead.whatsapp}</div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          lead.score >= 70 ? 'bg-green-100 text-green-800' :
                          lead.score >= 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {lead.score}/100
                        </span>
                      </td>
                      <td className="p-4">
                        <details className="group">
                          <summary className="cursor-pointer text-sm text-[var(--brand-verde-escuro)] hover:underline list-none font-medium">
                            Ver Análise IA
                          </summary>
                          <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap max-w-md border border-gray-100">
                            {lead.ai_analysis || "Análise pendente ou não gerada."}
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
