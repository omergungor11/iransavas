export function MapLegend() {
  const severities = [
    { label: "Dusuk", color: "#3b82f6" },
    { label: "Orta", color: "#eab308" },
    { label: "Yuksek", color: "#f97316" },
    { label: "Kritik", color: "#ef4444" },
  ];

  const eventTypes = [
    { label: "Catisma", icon: "⚔" },
    { label: "Hava Saldirisi", icon: "✈" },
    { label: "Deniz Op.", icon: "⚓" },
    { label: "Diplomasi", icon: "🤝" },
    { label: "Insani Kriz", icon: "🏥" },
  ];

  return (
    <div className="absolute bottom-8 right-4 z-[1000] flex flex-col gap-3">
      <div className="rounded-lg border border-white/10 bg-gray-900/90 p-3 backdrop-blur-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Siddet</p>
        <ul className="space-y-1">
          {severities.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-gray-300">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-white/10 bg-gray-900/90 p-3 backdrop-blur-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Tur</p>
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
