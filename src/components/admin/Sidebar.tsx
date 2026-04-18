"use client";

import { 
  Home, 
  BarChart3, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Target,
  FileText,
  Mail,
  Zap
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", isActive: true },
  { 
    title: "Leads",
    items: [
      { icon: Target, label: "Triage", href: "/admin/leads" },
      { icon: FileText, label: "Dossiês", href: "/admin/dossies" },
      { icon: Mail, label: "Contatos", href: "/admin/contatos" },
    ]
  },
  { 
    title: "Análise",
    items: [
      { icon: BarChart3, label: "Estatísticas", href: "/admin/estatisticas" },
      { icon: Zap, label: "Performance AI", href: "/admin/performance-ai" },
    ]
  },
  { 
    title: "Sistema",
    items: [
      { icon: Users, label: "Usuários", href: "/admin/usuarios" },
      { icon: Settings, label: "Configurações", href: "/admin/configuracoes" },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[var(--dash-bg)] border-r border-[var(--dash-border)] flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[var(--dash-accent-pink)] rounded-xl flex items-center justify-center">
             <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">Manual Admin</span>
        </div>

        <nav className="space-y-8">
          {menuItems.map((group, idx) => (
            <div key={idx}>
              {group.title && (
                <h4 className="text-[10px] font-black uppercase text-[var(--dash-muted)] tracking-widest mb-4">
                  {group.title}
                </h4>
              )}
              <div className="space-y-1">
                {(group.items || [group]).map((item: any, i: number) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.isActive && pathname === "/admin");
                  
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? "bg-white/5 text-[var(--dash-accent-pink)]" 
                          : "text-[var(--dash-muted)] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? "text-[var(--dash-accent-pink)]" : ""}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--dash-accent-pink)] shadow-[0_0_8px_var(--dash-accent-pink)]"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-[var(--dash-border)]">
        <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white/5 border border-white/5">
          <div className="w-10 h-10 rounded-full bg-[var(--dash-accent-blue)] flex items-center justify-center font-bold text-white">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">Admin User</p>
            <p className="text-[10px] text-[var(--dash-muted)] truncate">admin@manual.com</p>
          </div>
        </div>
        <LogoutButton className="w-full justify-start text-[var(--dash-muted)] hover:text-red-400 hover:bg-red-400/10 px-4 py-3 rounded-2xl transition-colors flex items-center gap-3 font-medium text-sm" />
      </div>
    </aside>
  );
}
