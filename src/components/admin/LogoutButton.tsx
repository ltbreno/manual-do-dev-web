"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Sair
    </Button>
  );
}
