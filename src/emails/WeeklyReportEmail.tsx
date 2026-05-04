import {
  Html, Head, Body, Container, Section, Text, Heading, Hr, Row, Column,
} from "@react-email/components";
import * as React from "react";

interface LeadSummary {
  name: string;
  email: string;
  score: number;
  classification: string;
  created_at: string;
}

interface WeeklyReportEmailProps {
  weekStart: string;
  weekEnd: string;
  totalNew: number;
  totalHot: number;
  totalHired: number;
  pipeline: { status: string; count: number }[];
  topLeads: LeadSummary[];
}

export default function WeeklyReportEmail({
  weekStart,
  weekEnd,
  totalNew,
  totalHot,
  totalHired,
  pipeline,
  topLeads,
}: WeeklyReportEmailProps) {
  const statusLabels: Record<string, string> = {
    new: "Novos",
    contacted: "Em Contato",
    meeting: "Reunião",
    hired: "Contratados",
    lost: "Perdidos",
  };

  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={body}>
        <Container style={container}>

          <Section style={header}>
            <Text style={bannerText}>📊 RELATÓRIO SEMANAL</Text>
            <Heading style={logo}>Manual do Brasileiro</Heading>
            <Text style={period}>{weekStart} — {weekEnd}</Text>
          </Section>

          {/* KPIs */}
          <Section style={card}>
            <Row>
              {[
                { label: "Novos Leads", value: totalNew, color: "#00d2ff" },
                { label: "Prioritários (Hot)", value: totalHot, color: "#ff4b91" },
                { label: "Contratados", value: totalHired, color: "#22c55e" },
              ].map(({ label, value, color }) => (
                <Column key={label} style={{ width: "33%", textAlign: "center" as const, padding: "0 8px" }}>
                  <Section style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 12, padding: "16px 8px" }}>
                    <Text style={{ fontSize: 28, fontWeight: 800, color, margin: "0 0 4px" }}>{value}</Text>
                    <Text style={{ fontSize: 11, color: "#6b7280", fontWeight: 600, margin: 0, textTransform: "uppercase" as const, letterSpacing: 1 }}>{label}</Text>
                  </Section>
                </Column>
              ))}
            </Row>
          </Section>

          {/* Pipeline */}
          <Section style={card}>
            <Heading style={sectionTitle}>📋 Pipeline Atual</Heading>
            {pipeline.map(({ status, count }) => (
              <Row key={status} style={{ marginBottom: 10 }}>
                <Column style={{ width: "40%" }}>
                  <Text style={{ fontSize: 13, color: "#374151", fontWeight: 600, margin: 0 }}>
                    {statusLabels[status] ?? status}
                  </Text>
                </Column>
                <Column style={{ width: "45%", paddingTop: 6 }}>
                  <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8, overflow: "hidden" }}>
                    <div style={{
                      background: "#26473d",
                      width: `${Math.min((count / Math.max(...pipeline.map(p => p.count), 1)) * 100, 100)}%`,
                      height: "100%", borderRadius: 4,
                    }} />
                  </div>
                </Column>
                <Column style={{ width: "15%", textAlign: "right" as const }}>
                  <Text style={{ fontSize: 13, fontWeight: 800, color: "#26473d", margin: 0 }}>{count}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* Top Leads */}
          {topLeads.length > 0 && (
            <Section style={card}>
              <Heading style={sectionTitle}>🔥 Leads Prioritários para Acompanhar</Heading>
              {topLeads.map((lead) => {
                const classColor =
                  lead.classification === "Hot" ? "#ff4b91" :
                  lead.classification === "Warm" ? "#00d2ff" : "#8a8f98";
                return (
                  <Section key={lead.email} style={leadRow}>
                    <Row>
                      <Column style={{ width: 40 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: 10,
                          background: `${classColor}20`, color: classColor,
                          fontSize: 14, fontWeight: 800,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Text style={{ margin: 0, color: classColor, fontWeight: 800, fontSize: 14 }}>
                            {lead.name.charAt(0).toUpperCase()}
                          </Text>
                        </div>
                      </Column>
                      <Column>
                        <Text style={{ fontSize: 13, fontWeight: 700, color: "#111827", margin: 0 }}>{lead.name}</Text>
                        <Text style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{lead.email}</Text>
                      </Column>
                      <Column style={{ textAlign: "right" as const }}>
                        <Text style={{ fontSize: 16, fontWeight: 800, color: classColor, margin: 0 }}>{lead.score}</Text>
                        <Text style={{ fontSize: 10, color: "#9ca3af", margin: 0, textTransform: "uppercase" as const }}>score</Text>
                      </Column>
                    </Row>
                  </Section>
                );
              })}
            </Section>
          )}

          <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
          <Text style={footer}>
            Manual do Brasileiro — Relatório Semanal Automático{"\n"}
            Gerado em {new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: "#f9fafb", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" };
const container = { maxWidth: 580, margin: "0 auto", padding: "32px 16px" };
const header = { background: "#26473d", borderRadius: "14px 14px 0 0", padding: "24px 32px", textAlign: "center" as const };
const bannerText = { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" as const, margin: "0 0 4px" };
const logo = { color: "#f0f3c7", fontSize: 22, fontWeight: 800, margin: "0 0 4px" };
const period = { color: "#a8c5a0", fontSize: 12, margin: 0 };
const card = { background: "#fff", padding: "24px 28px", borderBottom: "1px solid #f3f4f6" };
const sectionTitle = { fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 16px" };
const leadRow = { padding: "10px 0", borderBottom: "1px solid #f9fafb" };
const footer = { fontSize: 11, color: "#9ca3af", textAlign: "center" as const, lineHeight: "1.8", whiteSpace: "pre-line" as const };
