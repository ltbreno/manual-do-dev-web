"use client";

interface BarData {
  label: string;
  value: number;
  color: string;
}

interface CustomerActivityBarProps {
  data: BarData[];
  title: string;
  type?: "vertical" | "horizontal";
}

export default function CustomerActivityBar({ data, title, type = "vertical" }: CustomerActivityBarProps) {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-[var(--dash-card)] border border-[var(--dash-border)] p-6 rounded-3xl h-full flex flex-col">
      <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-8">
        <div className="w-2 h-2 bg-[var(--dash-accent-blue)] rounded-full animate-pulse shadow-[0_0_8px_var(--dash-accent-blue)]"></div>
        {title}
      </h3>

      {type === "vertical" ? (
        <div className="flex-1 flex items-end justify-between gap-2 px-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 group flex flex-col items-center">
              <div 
                className="w-full max-w-[40px] rounded-t-xl transition-all duration-500 ease-out group-hover:brightness-125 relative overflow-hidden"
                style={{ 
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                  boxShadow: `0 0 12px ${item.color}30`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <span className="mt-3 text-[var(--dash-muted)] text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-5">
          {data.map((item, idx) => (
            <div key={idx} className="space-y-2 group cursor-default">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-[var(--dash-muted)] group-hover:text-white transition-colors">
                <span>{item.label}</span>
                <span className="font-mono">{item.value.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out relative"
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`, 
                    backgroundColor: item.color,
                    boxShadow: `0 0 8px ${item.color}40`
                  }}
                >
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
