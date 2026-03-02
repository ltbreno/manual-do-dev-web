"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { MoveRight, Shield, Building2, Plane } from "lucide-react";

export default function RaioXGatewayPage() {
  const options = [
    {
      id: "imigracao",
      title: "Imigração & Carreira",
      description: "Planeje sua vida nos EUA. Avalie suas chances para Green Card (EB-1, EB-2 NIW) e vistos de trabalho.",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      href: "/raio-x/imigracao",
      color: "blue",
    },
    {
      id: "empresas",
      title: "Expansão de Empresas",
      description: "Leve seu negócio para o mercado americano. Avalie vistos L-1, EB-1C e estruturação corporativa.",
      icon: <Building2 className="w-8 h-8 text-emerald-600" />,
      href: "/raio-x/empresas",
      color: "emerald",
    },
    {
      id: "viagens",
      title: "Viagens & Estudos",
      description: "Vistos temporários de turismo, negócios rápidos ou intercâmbio acadêmico nos Estados Unidos.",
      icon: <Plane className="w-8 h-8 text-amber-600" />,
      href: "/raio-x/viagens",
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mt-16 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Seu Diagnóstico <span className="text-blue-600">Raio-X</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Selecione o perfil que melhor descreve seu objetivo atual para iniciarmos uma análise personalizada e precisa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {options.map((option) => (
              <Link
                key={option.id}
                href={option.href}
                className="group relative bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-2 h-full bg-${option.color}-600`} />

                <div className="mb-6 p-3 rounded-xl bg-slate-50 w-fit group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {option.title}
                </h3>

                <p className="text-slate-600 mb-8 leading-relaxed">
                  {option.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  Começar agora
                  <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>

                {/* Subtle gradient on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block p-6 rounded-2xl bg-blue-50 border border-blue-100 max-w-3xl">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Todas as informações fornecidas são tratadas com sigilo absoluto.
                Nossa inteligência artificial processa os dados com base nos critérios atuais do USCIS.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
