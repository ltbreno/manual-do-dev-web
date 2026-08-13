import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import LogoutButton from "@/components/account/LogoutButton";
import Card, { CardContent } from "@/components/ui/Card";

export const metadata = {
  title: "Minha Conta — Manual do Brasileiro",
};

export default async function ContaPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    redirect("/entrar");
  }

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 pt-28 pb-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-6">Minha Conta</h1>
        <Card>
          <CardContent>
            <p className="text-sm text-[var(--muted-foreground)] mb-1">Logado como</p>
            <p className="text-xl font-semibold text-[var(--foreground)] mb-1">{session.name}</p>
            <p className="text-[var(--muted-foreground)] mb-6">{session.email}</p>
            <LogoutButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
