import { cn } from "@/lib/utils";

const severities = [
  { label: "Düşük", color: "#3b82f6" },
  { label: "Orta", color: "#eab308" },
  { label: "Yüksek", color: "#f97316" },
  { label: "Kritik", color: "#ef4444" },
];

const eventTypes = [
  { label: "Çatışma", icon: "⚔" },
  { label: "Hava Saldırısı", icon: "✈" },
  { label: "Deniz Op.", icon: "⚓" },
  { label: "Diplomasi", icon: "🤝" },
  { label: "İnsanî Kriz", icon: "🏥" },
];

interface MapLegendProps {
  /** Render inline (inside sidebar) instead of absolute overlay */
  inline?: boolean;
}

export function MapLegend({ inline = false }: MapLegendProps) {
  const wrapper = inline
    ? "flex flex-col gap-3"
    : "absolute bottom-8 right-4 z-[1000] flex flex-col gap-3";

  return (
    <div className={wrapper}>
      <div className={cn("rounded-lg border border-white/10 p-3 backdrop-blur-sm", inline ? "bg-white/5" : "bg-gray-900/90")}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Şiddet</p>
        <ul className="space-y-1">
          {severities.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-gray-300">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={cn("rounded-lg border border-white/10 p-3 backdrop-blur-sm", inline ? "bg-white/5" : "bg-gray-900/90")}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Tür</p>
        <ul className="space-y-1">
          {eventTypes.map((e) => (
            <li key={e.label} className="flex items-center gap-2">
              <span className="text-sm">{e.icon}</span>
              <span className="text-xs text-gray-300">{e.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
