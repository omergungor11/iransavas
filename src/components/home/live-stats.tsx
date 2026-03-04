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

const statConfig = [
  { key: "totalEvents" as const, label: "Toplam Olay", icon: Activity, color: "text-red-400" },
  { key: "totalCasualties" as const, label: "Toplam Kayip", icon: Users, color: "text-orange-400" },
  { key: "totalDisplaced" as const, label: "Yerinden Edilen", icon: Home, color: "text-blue-400" },
];

export function LiveStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((json) => setStats(json.data))
      .catch(console.error);
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
                <p className="text-xl font-bold">{stats ? formatNumber(stats[key]) : "..."}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 text-green-400" />
            <div>
              <p className="text-xs text-muted-foreground">Son 24 Saat</p>
              <p className="text-xl font-bold">
                {stats ? (stats.recentNewsCount > 0 ? `${stats.recentNewsCount}+` : "0") : "..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
