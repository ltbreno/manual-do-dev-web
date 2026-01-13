"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/leads");
      } else {
        setError("Credenciais inválidas");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] p-4 text-gray-900">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-green-500 rounded-xl transform rotate-12 shadow-lg" />
              <div className="absolute inset-2 bg-green-700 rounded-lg flex items-center justify-center shadow-inner">
                <span className="text-white font-bold text-sm">MB</span>
              </div>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Portal <span className="text-green-600">Administrativo</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
            Entre com suas credenciais para gerenciar leads.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800">
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-2xl mb-6 text-sm font-bold border border-red-100 dark:border-red-900/30 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-900 dark:text-gray-200 mb-2 uppercase tracking-wider">
                Usuário
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#0F172A] border-2 border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-[#0F172A] text-gray-900 dark:text-white font-bold outline-none transition-all duration-200 placeholder:text-gray-400"
                placeholder="Ex: seu.nome"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-black text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                  Senha
                </label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-[#0F172A] border-2 border-transparent focus:border-green-500 focus:bg-white dark:focus:bg-[#0F172A] text-gray-900 dark:text-white font-bold outline-none transition-all duration-200 placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>
            
            <Button 
              type="submit" 
              isLoading={loading} 
              className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-lg shadow-lg shadow-green-500/20 transform active:scale-[0.98] transition-all"
            >
              Acessar Painel
            </Button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-500 font-medium lowercase tracking-wide">
          v2.0 • Protegido por Manus AI Security
        </p>
      </div>
    </div>
  );
}
