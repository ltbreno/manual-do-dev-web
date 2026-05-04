import {
  Html, Head, Body, Container, Section, Text, Heading, Hr,
} from "@react-email/components";
import * as React from "react";

interface ManualLeadEmailProps {
  recipientName: string;
  subject: string;
  message: string;
  senderName?: string;
}

export default function ManualLeadEmail({
  recipientName,
  subject,
  message,
  senderName = "Equipe Manual do Brasileiro",
}: ManualLeadEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Body style={body}>
        <Container style={container}>

          <Section style={header}>
            <Heading style={logo}>Manual do Brasileiro</Heading>
          </Section>

          <Section style={card}>
            <Text style={greeting}>Olá, {recipientName} 👋</Text>
            <Hr style={{ borderColor: "#f3f4f6", margin: "16px 0" }} />
            {message.split("\n").map((line, i) =>
              line.trim() ? (
                <Text key={i} style={bodyText}>{line}</Text>
              ) : (
                <br key={i} />
              )
            )}
          </Section>

          <Section style={{ ...card, background: "#f9fafb" }}>
            <Text style={signoff}>
              Atenciosamente,{"\n"}
              <strong>{senderName}</strong>
            </Text>
          </Section>

          <Hr style={{ borderColor: "#e5e7eb", margin: "24px 0" }} />
          <Text style={footer}>
            Manual do Brasileiro — Expansão para os EUA{"\n"}
            Dúvidas? Responda este e-mail.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = { backgroundColor: "#f9fafb", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" };
const container = { maxWidth: 560, margin: "0 auto", padding: "32px 16px" };
const header = { background: "#26473d", borderRadius: "14px 14px 0 0", padding: "24px 32px", textAlign: "center" as const };
const logo = { color: "#f0f3c7", fontSize: 22, fontWeight: 800, margin: 0 };
const card = { background: "#fff", padding: "28px 32px", borderBottom: "1px solid #f3f4f6" };
const greeting = { fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 4px" };
const bodyText = { fontSize: 14, color: "#374151", lineHeight: "1.7", margin: "0 0 12px" };
const signoff = { fontSize: 13, color: "#374151", margin: 0, lineHeight: "1.6", whiteSpace: "pre-line" as const };
const footer = { fontSize: 11, color: "#9ca3af", textAlign: "center" as const, lineHeight: "1.8", whiteSpace: "pre-line" as const };
