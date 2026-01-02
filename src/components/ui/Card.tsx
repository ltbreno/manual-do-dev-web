"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = false,
  gradient = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-[var(--card-bg)] 
        border border-[var(--card-border)]
        rounded-2xl
        ${hover ? "cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--brand-verde)]/30" : ""}
        ${gradient ? "before:absolute before:inset-0 before:bg-brand-gradient-subtle before:opacity-50" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`p-6 pb-0 ${className}`}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>
  );
}

