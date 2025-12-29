import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manual do Brasileiro | O Sistema Operacional do Brasileiro nos EUA",
  description:
    "Sua jornada para os Estados Unidos começa aqui. Diagnóstico de imigração, comunidade e serviços verificados para brasileiros.",
  keywords: [
    "imigração EUA",
    "brasileiro nos EUA",
    "visto americano",
    "green card",
    "EB-1",
    "EB-2",
    "O-1",
    "L-1",
  ],
  authors: [{ name: "Manual do Brasileiro" }],
  openGraph: {
    title: "Manual do Brasileiro | O Sistema Operacional do Brasileiro nos EUA",
    description:
      "Sua jornada para os Estados Unidos começa aqui. Diagnóstico de imigração inteligente e gratuito.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
