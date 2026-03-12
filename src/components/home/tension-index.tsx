"use client";

import { useEffect, useState } from "react";
import { Activity, Wifi, Ship, MessageSquareOff, Flame } from "lucide-react";

interface TensionData {
  score: number;
  level: string;
  indicators: {
    label: string;
    status: string;
    statusColor: string;
  }[];
}

const DEFAULT_TENSION: TensionData = {
  score: 50,
  level: "ELEVATED",
  indicators: [
    { label: "Aktif Hava Saldirisi", status: "Dogrulanmis", statusColor: "text-red-400" },
    { label: "Siber Operasyonlar", status: "Aktif", statusColor: "text-orange-400" },
    { label: "Hurmuz Bogazi Transiti", status: "Yuksek Risk", statusColor: "text-yellow-400" },
    { label: "Diplomatik Kanallar", status: "Askiya Alindi", statusColor: "text-red-400" },
  ],
};

const indicatorIcons = [Flame, Activity, Ship, MessageSquareOff];

function getLevelColor(level: string) {
  switch (level) {
    case "SEVERE": return "text-red-500";
    case "HIGH": return "text-orange-500";
    case "ELEVATED": return "text-yellow-500";
    default: return "text-green-500";
  }
}

function getBarGradient(score: number) {
  if (score >= 80) return "from-yellow-500 via-orange-500 to-red-600";
  if (score >= 60) return "from-green-500 via-yellow-500 to-orange-500";
  return "from-green-500 via-green-400 to-yellow-500";
}

export function TensionIndex() {
  const [data, setData] = useState<TensionData>(DEFAULT_TENSION);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    const mins = Math.floor(Math.random() * 10) + 1;
    setUpdated(`${mins}dk once`);

    fetch("/api/stats")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const d = json.data;
        if (d?.tensionScore != null) {
          setData((prev) => ({
            ...prev,
            score: d.tensionScore,
            level: d.tensionLevel || "ELEVATED",
          }));
        }
      })
      .catch((err) => console.error("[TensionIndex] fetch error:", err));
  }, []);

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-5">
        {/* Header row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <h2 className="text-sm font-bold text-foreground tracking-wide">
              Global Gerilim Endeksi
            </h2>
            <span className="text-[10px] text-muted-foreground">{updated}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={12} className="text-zinc-600" />
            <span className={`text-2xl font-black font-mono ${getLevelColor(data.level)}`}>
              {data.score}
            </span>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${getLevelColor(data.level)}`}>
              {data.level}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 rounded-full bg-muted overflow-hidden mb-4">
          <div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getBarGradient(data.score)} transition-all duration-1000`}
            style={{ width: `${data.score}%` }}
          />
        </div>

        {/* Indicator cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.indicators.map((ind, i) => {
            const Icon = indicatorIcons[i];
            return (
              <div
                key={ind.label}
                className="bg-card/80 border border-border rounded-lg px-3 py-2.5"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={12} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                    {ind.label}
                  </span>
                </div>
                <p className={`text-xs font-bold ${ind.statusColor}`}>
                  {ind.status}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
