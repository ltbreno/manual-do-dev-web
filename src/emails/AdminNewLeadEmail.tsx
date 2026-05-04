import {
  Html, Head, Body, Container, Section, Text, Heading, Hr, Link, Row, Column,
} from "@react-email/components";
import * as React from "react";

interface AdminNewLeadEmailProps {
  name: string;
  email: string;
  whatsapp: string;
  score: number;
  classification: string;
  riskLevel: string;
  scores: { ifi?: number; iee?: number; ivg?: number; irce?: number };
  adminUrl?: string;
}

export default function AdminNewLeadEmail({
  name,
  email,
  whatsapp,
  score,
  classification,
  riskLevel,
  scores,
  adminUrl = "https://manualdodev.com/admin/leads",
}: AdminNewLeadEmailProps) {
  const classColor =
    classification === "Hot" ? "#ff4b91" : classification === "Warm" ? "#00d2ff" : "#8a8f98";
  const classLabel =
    classification === "Hot" ? "🔥 PRIORITÁRIO" : classification === "Warm" ? "⚡ PROMISSOR" : "❄️ FRIO";
  const riskColor = riskLevel === "High" ? "#ef4444" : riskLevel === "Medium" ? "#f59e0b" : "#22c55e";

  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={body}>
        <Container style={container}>

          <Section style={alertBanner}>
            <Text style={alertText}>⚡ NOVO LEAD — RAIO-X EMPRESARIAL</Text>
          </Section>

          <Section style={card}>
            <Heading style={title}>Novo lead na fila</Heading>
            <Text style={sub}>
              Um empresário acabou de completar o diagnóstico. Aqui estão os detalhes:
            </Text>

            <Section style={profileBox}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${classColor}20`, border: `2px solid ${classColor}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 800, color: classColor,
                marginBottom: 12,
              }}>
                {name.charAt(0).toUpperCase()}
              </div>
              <Text style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 4px" }}>{name}</Text>
              <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" as const }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: 20, background: `${classColor}20`, color: classColor }}>
                  {classLabel}
                </span>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, padding: "3px 10px", borderRadius: 20, background: `${riskColor}20`, color: riskColor }}>
                  Risco {riskLevel === "High" ? "Alto" : riskLevel === "Medium" ? "Médio" : "Baixo"}
                </span>
              </div>
            </Section>

            <Hr style={{ borderColor: "#f3f4f6", margin: "16px 0" }} />

            <Row>
              {[
                { label: "Email", value: email },
                { label: "WhatsApp", value: whatsapp },
              ].map(({ label, value }) => (
                <Column key={label} style={{ width: "50%", paddingRight: 12 }}>
                  <Text style={fieldLabel}>{label}</Text>
                  <Text style={fieldValue}>{value || "—"}</Text>
                </Column>
              ))}
            </Row>

            <Hr style={{ borderColor: "#f3f4f6", margin: "16px 0" }} />

            <Section style={{ background: "#f9fafb", borderRadius: 12, padding: "16px 20px" }}>
              <Row>
                <Column style={{ textAlign: "center" as const }}>
                  <Text style={{ fontSize: 28, fontWeight: 800, color: "#26473d", margin: 0 }}>{score}</Text>
                  <Text style={fieldLabel}>Score Final</Text>
                </Column>
                {[
                  { id: "IFI™", val: scores.ifi, color: "#ff4b91" },
                  { id: "IEE™", val: scores.iee, color: "#00d2ff" },
                  { id: "IVG™", val: scores.ivg, color: "#f59e0b" },
                  { id: "IRCE™", val: scores.irce, color: "#00f2ad" },
                ].map((m) => (
                  <Column key={m.id} style={{ textAlign: "center" as const }}>
                    <Text style={{ fontSize: 18, fontWeight: 800, color: m.color, margin: 0 }}>
                      {Math.round(m.val ?? 0)}
                    </Text>
                    <Text style={fieldLabel}>{m.id}</Text>
                  </Column>
                ))}
              </Row>
            </Section>
          </Section>

          <Section style={{ ...card, textAlign: "center" as const }}>
            <Link
              href={adminUrl}
              style={{
                background: "#26473d", color: "#f0f3c7", fontWeight: 700,
                padding: "12px 28px", borderRadius: 10, fontSize: 13,
                textDecoration: "none", display: "inline-block",
              }}
            >
              Ver no Painel Admin →
            </Link>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
          <Text style={footer}>Manual do Brasileiro Admin — Notificação automática de novo lead</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: "#f9fafb", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" };
const container = { maxWidth: 560, margin: "0 auto", padding: "32px 16px" };
const alertBanner = { background: "#26473d", borderRadius: "14px 14px 0 0", padding: "14px 24px", textAlign: "center" as const };
const alertText = { color: "#f0f3c7", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, margin: 0 };
const card = { background: "#fff", padding: "24px 28px", borderBottom: "1px solid #f3f4f6" };
const title = { fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 6px" };
const sub = { fontSize: 13, color: "#6b7280", margin: "0 0 20px", lineHeight: "1.5" };
const profileBox = { marginBottom: 8 };
const fieldLabel = { fontSize: 10, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" as const, letterSpacing: 1, margin: "0 0 2px" };
const fieldValue = { fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 };
const footer = { fontSize: 11, color: "#9ca3af", textAlign: "center" as const };
