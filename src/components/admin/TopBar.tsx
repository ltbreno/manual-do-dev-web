"use client";

import { Search, Bell, Globe, User } from "lucide-react";

export default function TopBar() {
  return (
    <header className="h-20 bg-[var(--dash-bg)] border-b border-[var(--dash-border)] flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 text-xs font-medium text-[var(--dash-muted)] uppercase tracking-widest">
        <span>Home</span>
        <span className="text-white/20">/</span>
        <span>Dashboard</span>
        <span className="text-white/20">/</span>
        <span className="text-white">Analytics</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dash-muted)] group-focus-within:text-[var(--dash-accent-pink)] transition-colors" />
          <input 
            type="text" 
            placeholder="Search keywords..." 
            className="bg-white/5 border border-[var(--dash-border)] rounded-2xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--dash-accent-pink)]/20 focus:border-[var(--dash-accent-pink)] transition-all w-64"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-xl bg-white/5 border border-[var(--dash-border)] text-[var(--dash-muted)] hover:text-white hover:bg-white/10 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--dash-accent-pink)] rounded-full border-2 border-[var(--dash-bg)]"></span>
          </button>
          <button className="p-2.5 rounded-xl bg-white/5 border border-[var(--dash-border)] text-[var(--dash-muted)] hover:text-white hover:bg-white/10 transition-all">
            <Globe className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[var(--dash-border)] cursor-pointer hover:border-[var(--dash-accent-pink)] transition-all">
            <div className="w-full h-full bg-[var(--dash-accent-blue)] flex items-center justify-center text-white font-bold">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
