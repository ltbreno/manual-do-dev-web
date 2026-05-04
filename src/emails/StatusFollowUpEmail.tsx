import {
  Html, Head, Body, Container, Section, Text, Heading, Hr, Link,
} from "@react-email/components";
import * as React from "react";

interface StatusFollowUpEmailProps {
  name: string;
  status: string;
  score?: number;
}

const statusContent: Record<string, {
  banner: string;
  title: string;
  body: string;
  steps: string[];
  cta: string;
  ctaHref: string;
}> = {
  contacted: {
    banner: "📬 PRIMEIRO CONTATO",
    title: "Obrigado pelo seu interesse!",
    body: "Nossa equipe recebeu seu diagnóstico e entrará em contato em breve. Enquanto isso, aqui estão alguns pontos importantes:",
    steps: [
      "Separe os documentos da sua empresa (contrato social, balanço, CNPJ)",
      "Pense nas principais dúvidas que você quer tirar na nossa conversa",
      "Explore nosso conteúdo sobre expansão para os EUA",
    ],
    cta: "Acesse nosso conteúdo gratuito",
    ctaHref: "https://manualdodev.com",
  },
  meeting: {
    banner: "📅 REUNIÃO AGENDADA",
    title: "Sua reunião está confirmada!",
    body: "Estamos animados para conversar sobre o futuro da sua empresa nos EUA. Para aproveitar ao máximo o nosso tempo, prepare-se com antecedência:",
    steps: [
      "Tenha em mãos o faturamento anual da empresa dos últimos 2 anos",
      "Liste os principais produtos/serviços que deseja levar para os EUA",
      "Pense no budget disponível para a expansão inicial",
      "Anote suas principais dúvidas sobre vistos e estrutura jurídica",
    ],
    cta: "Confirmar presença via WhatsApp",
    ctaHref: "https://wa.me/55119999999?text=Confirmando presença na reunião",
  },
  hired: {
    banner: "🎉 BEM-VINDO AO TIME",
    title: "Bem-vindo ao Manual do Brasileiro!",
    body: "É oficial — você está dando o primeiro passo concreto para levar sua empresa aos EUA. Nossa equipe está dedicada ao seu sucesso. Aqui está o que acontece a partir de agora:",
    steps: [
      "Você receberá em breve um e-mail com os documentos iniciais para assinar",
      "Nosso time jurídico iniciará a análise do seu caso",
      "Agendar reunião de kickoff com seu gestor de conta dedicado",
      "Acesso à nossa plataforma de acompanhamento de processo será liberado",
    ],
    cta: "Fale com seu gestor agora",
    ctaHref: "https://wa.me/55119999999?text=Olá! Acabei de contratar e gostaria de falar com meu gestor.",
  },
};

export default function StatusFollowUpEmail({ name, status, score }: StatusFollowUpEmailProps) {
  const content = statusContent[status];
  if (!content) return null;

  const bannerColor = status === "hired" ? "#6dc24d" : status === "meeting" ? "#00d2ff" : "#26473d";

  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={body}>
        <Container style={container}>

          <Section style={{ ...header, background: bannerColor }}>
            <Text style={bannerText}>{content.banner}</Text>
            <Heading style={logo}>Manual do Brasileiro</Heading>
          </Section>

          <Section style={card}>
            <Text style={greeting}>Olá, {name}!</Text>
            <Heading style={title}>{content.title}</Heading>
            <Text style={bodyText}>{content.body}</Text>

            {score !== undefined && (
              <Section style={scoreChip}>
                <Text style={{ margin: 0, fontSize: 13, color: "#26473d", fontWeight: 600 }}>
                  Seu score diagnóstico: <strong>{score} pontos</strong>
                </Text>
              </Section>
            )}

            <Text style={stepsTitle}>Próximos passos:</Text>
            {content.steps.map((step, i) => (
              <Section key={i} style={stepRow}>
                <Text style={stepNum}>{i + 1}</Text>
                <Text style={stepText}>{step}</Text>
              </Section>
            ))}
          </Section>

          <Section style={{ ...card, textAlign: "center" as const, background: "#f9fafb" }}>
            <Link
              href={content.ctaHref}
              style={{
                background: "#26473d", color: "#f0f3c7", fontWeight: 700,
                padding: "12px 28px", borderRadius: 10, fontSize: 13,
                textDecoration: "none", display: "inline-block",
              }}
            >
              {content.cta} →
            </Link>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
          <Text style={footer}>
            Manual do Brasileiro — Expansão para os EUA{"\n"}
            Para cancelar comunicações, responda este e-mail.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: "#f9fafb", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" };
const container = { maxWidth: 560, margin: "0 auto", padding: "32px 16px" };
const header = { borderRadius: "14px 14px 0 0", padding: "20px 32px 16px", textAlign: "center" as const };
const bannerText = { color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, margin: "0 0 4px" };
const logo = { color: "#fff", fontSize: 20, fontWeight: 800, margin: 0 };
const card = { background: "#fff", padding: "28px 32px", borderBottom: "1px solid #f3f4f6" };
const greeting = { fontSize: 14, color: "#6b7280", margin: "0 0 6px" };
const title = { fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 12px" };
const bodyText = { fontSize: 13, color: "#4b5563", lineHeight: "1.6", margin: "0 0 16px" };
const scoreChip = { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "10px 16px", marginBottom: 16 };
const stepsTitle = { fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase" as const, letterSpacing: 1, margin: "0 0 12px" };
const stepRow = { display: "flex", alignItems: "flex-start", marginBottom: 10, gap: 10 };
const stepNum = { width: 22, height: 22, borderRadius: "50%", background: "#26473d", color: "#f0f3c7", fontSize: 11, fontWeight: 800, textAlign: "center" as const, lineHeight: "22px", margin: "0 10px 0 0", flexShrink: 0 };
const stepText = { fontSize: 13, color: "#374151", margin: 0, lineHeight: "1.5", flex: 1 };
const footer = { fontSize: 11, color: "#9ca3af", textAlign: "center" as const, lineHeight: "1.8", whiteSpace: "pre-line" as const };
