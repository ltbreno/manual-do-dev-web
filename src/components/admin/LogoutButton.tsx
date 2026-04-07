"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout failed", e);
    }
    router.push("/admin/login");
    router.refresh();
  };

  if (className || children) {
    return (
      <button className={className} onClick={handleLogout}>
        {children || (
          <>
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </>
        )}
      </button>
    );
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Sair
    </Button>
  );
}
