"use client";

import { VisaScore } from "@/types/raio-x";

interface ScoreCircleProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function ScoreCircle({ score, size = "lg", label }: ScoreCircleProps) {
  const sizes = {
    sm: { width: 80, stroke: 6, fontSize: "text-lg" },
    md: { width: 120, stroke: 8, fontSize: "text-2xl" },
    lg: { width: 180, stroke: 10, fontSize: "text-4xl" },
  };

  const { width, stroke, fontSize } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Cor baseada no score
  const getScoreColor = (score: number) => {
    if (score >= 70) return "var(--brasil-verde)";
    if (score >= 40) return "var(--brasil-amarelo)";
    return "#ef4444"; // red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
        {/* Background circle */}
        <svg className="absolute inset-0 transform -rotate-90" width={width} height={width}>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="var(--neutral-200)"
            strokeWidth={stroke}
            className="dark:stroke-[var(--neutral-700)]"
          />
        </svg>
        
        {/* Progress circle */}
        <svg className="absolute inset-0 transform -rotate-90" width={width} height={width}>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={getScoreColor(score)}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="score-ring"
            style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-bold text-[var(--foreground)]`}>
            {score}
          </span>
          <span className="text-xs text-[var(--muted)] uppercase tracking-wider">
            pontos
          </span>
        </div>
      </div>
      {label && (
        <span className="mt-2 text-sm font-medium text-[var(--muted-foreground)]">
          {label}
        </span>
      )}
    </div>
  );
}

interface VisaCardProps {
  visa: VisaScore;
  rank: number;
}

export function VisaCard({ visa, rank }: VisaCardProps) {
  const getCompatibilityBadge = (compatibility: string) => {
    switch (compatibility) {
      case "high":
        return {
          text: "Alta",
          bg: "bg-[var(--brasil-verde)]/10",
          color: "text-[var(--brasil-verde)]",
        };
      case "medium":
        return {
          text: "Média",
          bg: "bg-[var(--brasil-amarelo)]/10",
          color: "text-[var(--brasil-amarelo-dark)]",
        };
      default:
        return {
          text: "Baixa",
          bg: "bg-red-100 dark:bg-red-900/20",
          color: "text-red-600 dark:text-red-400",
        };
    }
  };

  const badge = getCompatibilityBadge(visa.compatibility);
  const isTop = rank === 1;

  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all ${
        isTop
          ? "border-[var(--brasil-verde)] bg-[var(--brasil-verde)]/5"
          : "border-[var(--card-border)] bg-[var(--card-bg)]"
      }`}
    >
      {isTop && (
        <div className="absolute -top-3 left-4 px-3 py-1 bg-[var(--brasil-verde)] text-white text-xs font-bold rounded-full">
          🏆 Melhor Opção
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-[var(--brasil-azul)]">
              {visa.visaCode}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.color}`}>
              Compatibilidade {badge.text}
            </span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm">{visa.visaType}</p>
        </div>
        <ScoreCircle score={visa.score} size="sm" />
      </div>

      {/* Strengths */}
      {visa.strengths.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-[var(--brasil-verde)] mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Pontos Fortes
          </h4>
          <ul className="space-y-1">
            {visa.strengths.slice(0, 3).map((strength, i) => (
              <li key={i} className="text-sm text-[var(--foreground)] flex items-start gap-2">
                <span className="text-[var(--brasil-verde)]">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Improvements */}
      {visa.improvements.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-[var(--brasil-amarelo-dark)] mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Oportunidades de Melhoria
          </h4>
          <ul className="space-y-1">
            {visa.improvements.slice(0, 2).map((improvement, i) => (
              <li key={i} className="text-sm text-[var(--foreground)] flex items-start gap-2">
                <span className="text-[var(--brasil-amarelo)]">•</span>
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {isTop && visa.requirements.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
          <h4 className="text-sm font-semibold text-[var(--brasil-azul)] mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Requisitos Principais
          </h4>
          <ul className="space-y-1">
            {visa.requirements.map((req, i) => (
              <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                <span className="text-[var(--brasil-azul)]">→</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

interface RecommendationsListProps {
  items: string[];
  title: string;
  icon: React.ReactNode;
  iconColor: string;
}

export function RecommendationsList({ items, title, icon, iconColor }: RecommendationsListProps) {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6">
      <h3 className={`text-lg font-bold ${iconColor} mb-4 flex items-center gap-2`}>
        {icon}
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className={`w-6 h-6 rounded-full ${iconColor.replace("text-", "bg-")}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <span className={`text-sm font-bold ${iconColor}`}>{i + 1}</span>
            </span>
            <span className="text-[var(--foreground)]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

