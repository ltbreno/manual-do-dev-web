"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error for debugging
        console.error("Next.js Error:", error);

        // Check if it's a ChunkLoadError
        if (
            error.name === "ChunkLoadError" ||
            error.message?.includes("Loading chunk") ||
            error.message?.includes("Failed to fetch dynamically imported module")
        ) {
            console.warn("Detected ChunkLoadError. Attempting to reload page...");
            window.location.reload();
        }
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-grow flex items-center justify-center py-20 px-4 text-center">
                <div className="max-w-md bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="mb-6 inline-flex items-center justify-center p-4 rounded-full bg-amber-50 text-amber-600">
                        <AlertTriangle className="w-10 h-10" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">
                        Ops! Algo deu errado
                    </h1>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Houve um erro técnico ao carregar esta página. Isso pode acontecer
                        quando atualizamos o sistema.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Tentar novamente
                    </button>

                    <p className="mt-6 text-xs text-slate-400">
                        Se o erro persistir, por favor limpe o cache do seu navegador ou tente novamente mais tarde.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
