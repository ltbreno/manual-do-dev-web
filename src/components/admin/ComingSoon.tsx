import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Zap, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function ComingSoon({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-white overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 min-w-0 font-sans flex flex-col">
        <TopBar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--dash-accent-pink)] to-[var(--dash-accent-orange)] rounded-[2rem] flex items-center justify-center mb-8 border border-white/10 shadow-[0_0_50px_-12px_var(--dash-accent-pink)]">
             <Zap className="text-white w-10 h-10 fill-current" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{title}</h1>
          <p className="text-[var(--dash-muted)] text-center text-lg max-w-md font-medium leading-relaxed">
            {description}
          </p>
          <Link href="/admin/leads" className="mt-10 px-8 py-3.5 flex items-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-2xl font-bold transition-all hover:-translate-y-1">
            <ArrowLeft className="w-5 h-5" />
            Voltar para Triagem
          </Link>
        </div>
      </main>
    </div>
  );
}
