import {
  Html, Head, Body, Container, Section, Text, Heading,
  Hr, Link, Row, Column,
} from "@react-email/components";
import * as React from "react";

interface Scores {
  ifi?: number;
  iee?: number;
  ivg?: number;
  irce?: number;
}

interface LeadRoadmapEmailProps {
  name: string;
  score: number;
  classification: string;
  riskLevel: string;
  scores: Scores;
}

function scoreLabel(s: number) {
  if (s >= 80) return { text: "Empresa pronta para expansão acelerada", color: "#22c55e" };
  if (s >= 60) return { text: "Sólida base com pontos de atenção", color: "#3b82f6" };
  if (s >= 40) return { text: "Em desenvolvimento — ajustes necessários", color: "#f59e0b" };
  return { text: "Fundação em construção", color: "#ef4444" };
}

function moduleBar(value: number, color: string) {
  const pct = Math.round(value ?? 0);
  return (
    <Row style={{ marginBottom: 10 }}>
      <Column style={{ width: "30%" }}>
        <Text style={{ ...small, color: "#6b7280", margin: 0 }}>{pct}%</Text>
      </Column>
      <Column style={{ width: "70%" }}>
        <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8, overflow: "hidden" }}>
          <div style={{ background: color, width: `${pct}%`, height: "100%", borderRadius: 4 }} />
        </div>
      </Column>
    </Row>
  );
}

function visaPaths(scores: Scores) {
  const paths: { name: string; desc: string; fit: string }[] = [];
  const ifi = scores.ifi ?? 0;
  const iee = scores.iee ?? 0;
  const irce = scores.irce ?? 0;

  if (ifi >= 60 && iee >= 60) {
    paths.push({
      name: "L-1A — Transferência Intraco­mpanhia",
      desc: "Para executivos/gerentes com operação no Brasil que abrem subsidiária nos EUA.",
      fit: iee >= 70 ? "Alta aderência" : "Aderência moderada",
    });
  }
  if (iee >= 70 && irce >= 60) {
    paths.push({
      name: "EB-1C — Green Card de Executivo",
      desc: "Para gestores de empresas multinacionais que desejam residência permanente.",
      fit: "Avaliar com especialista",
    });
  }
  if (irce >= 60) {
    paths.push({
      name: "E-2 — Visto de Investidor",
      desc: "Para empresários que aportam capital substancial e gerem o negócio nos EUA.",
      fit: irce >= 75 ? "Alta aderência" : "Aderência moderada",
    });
  }
  paths.push({
    name: "EB-5 — Investidor Imigrante",
    desc: "Green Card via investimento de capital com criação de empregos americanos.",
    fit: "Consulte limites mínimos de capital",
  });

  return paths.slice(0, 3);
}

function nextSteps(scores: Scores) {
  const steps: string[] = [];
  if ((scores.ifi ?? 100) < 60) steps.push("Alinhar sócios e família sobre a expansão e definir responsabilidades claras");
  if ((scores.iee ?? 100) < 60) steps.push("Documentar SOPs, processos internos e criar camada de liderança de segundo nível");
  if ((scores.ivg ?? 100) < 60) steps.push("Validar demanda do mercado americano para o seu produto/serviço (pesquisa + visita de campo)");
  if ((scores.irce ?? 100) < 60) steps.push("Separar o 'budget de guerra' para expansão e resolver passivos trabalhistas/fiscais no Brasil");
  steps.push("Agendar consulta estratégica com o time do Manual do Brasileiro");
  steps.push("Iniciar due diligence jurídica e estrutura societária nos EUA");
  return steps;
}

export default function LeadRoadmapEmail({
  name,
  score,
  classification,
  riskLevel,
  scores,
}: LeadRoadmapEmailProps) {
  const { text: scoreText, color: scoreColor } = scoreLabel(score);
  const paths = visaPaths(scores);
  const steps = nextSteps(scores);

  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>Manual do Brasileiro</Heading>
            <Text style={tagline}>Expansão para os EUA — seu roadmap personalizado</Text>
          </Section>

          {/* Score Hero */}
          <Section style={card}>
            <Text style={greeting}>Olá, {name} 👋</Text>
            <Text style={body2}>
              Seu diagnóstico de expansão foi concluído. Aqui está o seu resultado e o
              roadmap personalizado com os próximos passos para levar sua empresa aos EUA.
            </Text>

            <Section style={scoreBox}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  border: `4px solid ${scoreColor}`, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  background: `${scoreColor}15`,
                }}>
                  <Text style={{ fontSize: 24, fontWeight: 800, color: scoreColor, margin: 0, lineHeight: 1 }}>{score}</Text>
                </div>
                <div>
                  <Text style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>{scoreText}</Text>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                      padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
                      background: classification === "Hot" ? "#ff4b9120" : classification === "Warm" ? "#00d2ff20" : "#8a8f9820",
                      color: classification === "Hot" ? "#ff4b91" : classification === "Warm" ? "#00d2ff" : "#8a8f98",
                    }}>
                      {classification === "Hot" ? "🔥 Prioritário" : classification === "Warm" ? "⚡ Promissor" : "❄️ Em desenvolvimento"}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                      padding: "3px 10px", borderRadius: 20, letterSpacing: 1,
                      background: riskLevel === "High" ? "#ef444420" : riskLevel === "Medium" ? "#f59e0b20" : "#22c55e20",
                      color: riskLevel === "High" ? "#ef4444" : riskLevel === "Medium" ? "#f59e0b" : "#22c55e",
                    }}>
                      Risco {riskLevel === "High" ? "Alto" : riskLevel === "Medium" ? "Médio" : "Baixo"}
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          </Section>

          {/* Module Breakdown */}
          <Section style={card}>
            <Heading style={sectionTitle}>📊 Breakdown por Índice</Heading>
            <Text style={body2}>
              Entenda sua performance em cada dimensão da expansão:
            </Text>

            {[
              { id: "IFI™", label: "Força do Fundador e Intenção", value: scores.ifi ?? 0, color: "#ff4b91" },
              { id: "IEE™", label: "Estrutura Empresarial", value: scores.iee ?? 0, color: "#00d2ff" },
              { id: "IVG™", label: "Validação de Go-to-Market", value: scores.ivg ?? 0, color: "#f59e0b" },
              { id: "IRCE™", label: "Risco e Capacidade de Execução", value: scores.irce ?? 0, color: "#00f2ad" },
            ].map((m) => (
              <Section key={m.id} style={moduleRow}>
                <Row>
                  <Column style={{ width: "35%" }}>
                    <Text style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>{m.id}</Text>
                    <Text style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{m.label}</Text>
                  </Column>
                  <Column style={{ width: "45%", paddingTop: 6 }}>
                    <div style={{ background: "#f3f4f6", borderRadius: 4, height: 8, overflow: "hidden" }}>
                      <div style={{ background: m.color, width: `${Math.round(m.value)}%`, height: "100%", borderRadius: 4 }} />
                    </div>
                  </Column>
                  <Column style={{ width: "20%", textAlign: "right" }}>
                    <Text style={{ fontSize: 13, fontWeight: 800, color: m.color, margin: 0 }}>{Math.round(m.value)}%</Text>
                  </Column>
                </Row>
              </Section>
            ))}
          </Section>

          {/* Visa Paths */}
          <Section style={card}>
            <Heading style={sectionTitle}>🛂 Caminhos de Visto Recomendados</Heading>
            <Text style={body2}>
              Com base no seu perfil, estes são os caminhos mais aderentes ao seu caso:
            </Text>
            {paths.map((p) => (
              <Section key={p.name} style={visaCard}>
                <Text style={{ fontSize: 14, fontWeight: 700, color: "#26473d", margin: "0 0 4px" }}>{p.name}</Text>
                <Text style={{ fontSize: 12, color: "#4b5563", margin: "0 0 6px", lineHeight: "1.5" }}>{p.desc}</Text>
                <Text style={{ fontSize: 11, fontWeight: 700, color: "#6dc24d", margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>
                  ✓ {p.fit}
                </Text>
              </Section>
            ))}
          </Section>

          {/* Next Steps */}
          <Section style={card}>
            <Heading style={sectionTitle}>✅ Seus Próximos Passos</Heading>
            <Text style={body2}>Ações concretas recomendadas com base no seu diagnóstico:</Text>
            {steps.map((step, i) => (
              <Row key={i} style={{ marginBottom: 12 }}>
                <Column style={{ width: 28, verticalAlign: "top", paddingTop: 1 }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: "#26473d", color: "#f0f3c7",
                    fontSize: 11, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Text style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "#f0f3c7" }}>{i + 1}</Text>
                  </div>
                </Column>
                <Column>
                  <Text style={{ fontSize: 13, color: "#374151", margin: 0, lineHeight: "1.5" }}>{step}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          {/* CTA */}
          <Section style={{ ...card, textAlign: "center", background: "#26473d" }}>
            <Heading style={{ ...sectionTitle, color: "#f0f3c7" }}>
              Pronto para dar o próximo passo?
            </Heading>
            <Text style={{ ...body2, color: "#a8c5a0", marginBottom: 24 }}>
              Nossa equipe está pronta para transformar este diagnóstico em um plano de ação concreto.
            </Text>
            <Link
              href="https://wa.me/55119999999?text=Olá! Fiz o diagnóstico do Raio-X e gostaria de agendar uma consulta."
              style={{
                background: "#6dc24d", color: "#fff", fontWeight: 700,
                padding: "14px 32px", borderRadius: 12, fontSize: 14,
                textDecoration: "none", display: "inline-block",
              }}
            >
              Agendar Consulta Estratégica
            </Link>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
          <Text style={footer}>
            Manual do Brasileiro — Expansão para os EUA{"\n"}
            Este e-mail foi gerado automaticamente após o preenchimento do Raio-X Empresarial.{"\n"}
            Dúvidas? Responda este e-mail.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const body = { backgroundColor: "#f9fafb", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" };
const container = { maxWidth: 600, margin: "0 auto", padding: "32px 16px" };
const header = { background: "#26473d", borderRadius: "16px 16px 0 0", padding: "32px 32px 24px", textAlign: "center" as const };
const logo = { color: "#f0f3c7", fontSize: 24, fontWeight: 800, margin: "0 0 4px" };
const tagline = { color: "#a8c5a0", fontSize: 13, margin: 0 };
const card = { background: "#fff", padding: "28px 32px", borderBottom: "1px solid #f3f4f6" };
const scoreBox = { background: "#f9fafb", borderRadius: 12, padding: "20px 24px", margin: "16px 0 0" };
const sectionTitle = { fontSize: 16, fontWeight: 700, color: "#111827", margin: "0 0 8px" };
const body2 = { fontSize: 13, color: "#4b5563", lineHeight: "1.6", margin: "0 0 16px" };
const small = { fontSize: 11, margin: 0 };
const moduleRow = { padding: "10px 0", borderBottom: "1px solid #f3f4f6" };
const visaCard = { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "14px 16px", marginBottom: 10 };
const footer = { fontSize: 11, color: "#9ca3af", textAlign: "center" as const, lineHeight: "1.8", whiteSpace: "pre-line" as const };
const greeting = { fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 8px" };
