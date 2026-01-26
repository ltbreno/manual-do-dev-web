"use client";

import { BusinessScore } from "@/types/raio-x";
import React from "react";

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
    if (score >= 70) return "var(--brand-verde)";
    if (score >= 40) return "var(--brand-bege)";
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

interface BusinessScoreCardProps {
  businessScore: BusinessScore;
  rank: number;
}

export function BusinessScoreCard({ businessScore, rank }: BusinessScoreCardProps) {
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return {
          text: "Alta Relevância",
          bg: "bg-[var(--brand-verde)]/10",
          color: "text-[var(--brand-verde)]",
        };
      case "medium":
        return {
          text: "Média Relevância",
          bg: "bg-[var(--brand-bege)]/10",
          color: "text-[var(--brand-bege-dark)]",
        };
      default:
        return {
          text: "Baixa Relevância",
          bg: "bg-red-100 dark:bg-red-900/20",
          color: "text-red-600 dark:text-red-400",
        };
    }
  };

  const badge = getImpactBadge(businessScore.impact);
  const isTop = rank === 1;

  return (
    <div
      className={`relative p-6 rounded-2xl border-2 transition-all ${
        isTop
          ? "border-[var(--brand-verde)] bg-[var(--brand-verde)]/5"
          : "border-[var(--card-border)] bg-[var(--card-bg)]"
      }`}
    >
      {isTop && (
        <div className="absolute -top-3 left-4 px-3 py-1 bg-[var(--brand-verde)] text-white text-xs font-bold rounded-full">
          🏆 Melhor Opção
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl font-bold text-[var(--brand-verde-escuro)]">
              {businessScore.category}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.color}`}>
              {badge.text}
            </span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm">{businessScore.description}</p>
        </div>
        <ScoreCircle score={businessScore.score} size="sm" />
      </div>

      {/* Recommendations */}
      {businessScore.recommendations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
          <h4 className="text-sm font-semibold text-[var(--brand-verde-escuro)] mb-2 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Recomendações Específicas
          </h4>
          <ul className="space-y-1">
            {businessScore.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                <span className="text-[var(--brand-verde)]">•</span>
                {rec}
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
