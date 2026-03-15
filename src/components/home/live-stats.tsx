"use client";

import { useEffect, useState } from "react";
import { Activity, Users, Home, Zap } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface Stats {
  totalEvents: number;
  totalCasualties: number;
  totalDisplaced: number;
  recentNewsCount: number;
}

const FALLBACK_STATS: Stats = {
  totalEvents: 847,
  totalCasualties: 12430,
  totalDisplaced: 2150000,
  recentNewsCount: 34,
};

const statConfig = [
  { key: "totalEvents" as const, label: "Toplam Olay", icon: Activity, color: "text-red-400" },
  { key: "totalCasualties" as const, label: "Toplam Kayıp", icon: Users, color: "text-orange-400" },
  { key: "totalDisplaced" as const, label: "Yerinden Edilen", icon: Home, color: "text-blue-400" },
];

export function LiveStats() {
  const [stats, setStats] = useState<Stats>(FALLBACK_STATS);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const d = json.data;
        if (d && d.totalEvents > 0) {
          setStats(d);
        }
      })
      .catch(() => { /* use fallback */ });
  }, []);

  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statConfig.map(({ key, label, icon: Icon, color }) => (
            <div key={key} className="flex items-center gap-3">
              <Icon className={`h-6 w-6 ${color}`} />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{formatNumber(stats[key])}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs text-muted-foreground">Son 24 Saat</p>
              <p className="text-xl font-bold">
                {stats.recentNewsCount > 0 ? `${stats.recentNewsCount}+` : "0"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
