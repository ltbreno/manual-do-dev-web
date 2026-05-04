import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { getResend, FROM_EMAIL } from "@/lib/resend";
import ManualLeadEmail from "@/emails/ManualLeadEmail";

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      to: string;
      recipientName: string;
      subject: string;
      message: string;
    };

    const { to, recipientName, subject, message } = body;

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "to, subject e message são obrigatórios" }, { status: 400 });
    }

    const html = await render(ManualLeadEmail({ recipientName: recipientName || to, subject, message }));

    const { data, error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data?.id, success: true });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
