"use client";

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface ProductActivityDonutProps {
  data: DonutSegment[];
  total: number;
  totalLabel: string;
}

export default function ProductActivityDonut({ data, total, totalLabel }: ProductActivityDonutProps) {
  const size = 180;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let currentOffset = 0;

  return (
    <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] p-6 rounded-3xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--dash-accent-orange)] rounded-full animate-pulse shadow-[0_0_8px_var(--dash-accent-orange)]"></div>
          Atividade de Leads
        </h3>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth={strokeWidth}
            />
            {data.map((item, idx) => {
              const percentage = (item.value / total) * 100;
              const dashArray = (percentage * circumference) / 100;
              const offset = (currentOffset * circumference) / 100;
              currentOffset += percentage;

              return (
                <circle
                  key={idx}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-white font-mono">{total.toLocaleString()}</span>
            <span className="text-[10px] text-[var(--dash-muted)] font-medium uppercase tracking-widest">{totalLabel}</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 w-full">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between group cursor-default">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shadow-lg transition-transform group-hover:scale-150" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
                <span className="text-[var(--dash-muted)] text-sm font-medium group-hover:text-white transition-colors">{item.label}</span>
              </div>
              <span className="text-white font-bold text-sm font-mono group-hover:text-[var(--dash-accent-pink)] transition-colors">{item.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
