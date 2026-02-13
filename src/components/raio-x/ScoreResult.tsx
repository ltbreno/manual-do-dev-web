"use client";

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

  const getScoreColor = (score: number) => {
    if (score >= 70) return "var(--brand-verde)";
    if (score >= 40) return "var(--brand-bege)";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width, height: width }}>
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
