import { Resend } from "resend";

export const FROM_EMAIL = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@manual.com";

const noopResend = {
  emails: {
    send: async () => ({ data: null, error: { message: "RESEND_API_KEY não configurada" } }),
  },
} as unknown as Resend;

export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY não configurada. Email não será enviado.");
    return noopResend;
  }
  return new Resend(key);
}
