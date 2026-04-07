"use client";

import { LucideIcon } from "lucide-react";

interface SparklineProps {
  data: number[];
  color: string;
}

const Sparkline = ({ data, color }: SparklineProps) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const width = 100;
  const height = 40;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / (range || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
      />
    </svg>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendColor: string;
  icon: LucideIcon;
  iconColor: string;
  sparkData: number[];
  sparkColor: string;
}

export default function StatCard({
  title,
  value,
  trend,
  trendColor,
  icon: Icon,
  iconColor,
  sparkData,
  sparkColor,
}: StatCardProps) {
  return (
    <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] p-5 rounded-3xl transition-all hover:bg-[var(--dash-card-hover)] group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl bg-opacity-10`} style={{ backgroundColor: `${iconColor}20` }}>
          <Icon className="w-6 h-6" style={{ color: iconColor }} />
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full`} style={{ backgroundColor: `${trendColor}20`, color: trendColor }}>
          {trend}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-[var(--dash-muted)] text-xs font-medium uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white font-mono">{value}</h3>
      </div>

      <div className="mt-auto pt-2">
        <Sparkline data={sparkData} color={sparkColor} />
      </div>
    </div>
  );
}
