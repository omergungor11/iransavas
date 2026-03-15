"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Map, ExternalLink } from "lucide-react";
import Link from "next/link";

const WarMap = dynamic(
  () => import("@/components/map/war-map").then((mod) => mod.WarMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-card">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      </div>
    ),
  }
);

interface EventSummary {
  eventType: string;
  count: number;
}

const FALLBACK_TYPES: EventSummary[] = [
  { eventType: "CATISMA", count: 187 },
  { eventType: "HAVA_SALDIRISI", count: 234 },
  { eventType: "DENIZ_OPERASYONU", count: 89 },
  { eventType: "DIPLOMASI", count: 56 },
  { eventType: "INSANI_KRIZ", count: 124 },
  { eventType: "PATLAMA", count: 67 },
  { eventType: "SIBER_SALDIRI", count: 43 },
  { eventType: "DIGER", count: 47 },
];

export function StrategicMap() {
  const [stats, setStats] = useState<{ total: number; byType: EventSummary[] }>({
    total: 847,
    byType: FALLBACK_TYPES,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const d = json.data;
        if (d && d.totalEvents > 0) {
          setStats({
            total: d.totalEvents,
            byType: d.eventsByType || [],
          });
        }
      })
      .catch(() => { /* use fallback */ });
  }, []);

  const TYPE_COLORS: Record<string, string> = {
    CATISMA: "bg-red-500",
    HAVA_SALDIRISI: "bg-orange-500",
    DENIZ_OPERASYONU: "bg-cyan-500",
    DIPLOMASI: "bg-blue-500",
    INSANI_KRIZ: "bg-yellow-500",
    PATLAMA: "bg-amber-500",
    SIBER_SALDIRI: "bg-purple-500",
    DIGER: "bg-zinc-500",
  };

  const TYPE_LABELS: Record<string, string> = {
    CATISMA: "Çatışma",
    HAVA_SALDIRISI: "Hava Saldırısı",
    DENIZ_OPERASYONU: "Deniz Op.",
    DIPLOMASI: "Diplomasi",
    INSANI_KRIZ: "İnsanî Kriz",
    PATLAMA: "Patlama",
    SIBER_SALDIRI: "Siber Saldırı",
    DIGER: "Diğer",
  };

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <Map className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-foreground tracking-wide uppercase font-mono">
                  Canlı Stratejik İstihbarat Haritası
                </h2>
                <span className="text-[10px] text-muted-foreground">{stats.total} olay</span>
              </div>
              <p className="text-xs text-muted-foreground">Askerî varlıklar, çatışma bölgeleri ve stratejik altyapı</p>
            </div>
          </div>
          <Link
            href="/harita"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            <ExternalLink size={14} />
            Tam Harita
          </Link>
        </div>

        {/* Category legend bar */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {stats.byType.map((t) => (
            <span
              key={t.eventType}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-muted text-muted-foreground"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${TYPE_COLORS[t.eventType] || "bg-zinc-500"}`} />
              {TYPE_LABELS[t.eventType] || t.eventType} ({t.count})
            </span>
          ))}
        </div>

        {/* Interactive War Map */}
        <div className="rounded-lg overflow-hidden border border-border bg-card h-[500px]">
          <WarMap />
        </div>

        {/* Bottom stats */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground">
          <span>{stats.total} olay</span>
          <span>·</span>
          <span>Leaflet + OpenStreetMap</span>
          <span>·</span>
          <span>Açık kaynak</span>
        </div>
      </div>
    </section>
  );
}
