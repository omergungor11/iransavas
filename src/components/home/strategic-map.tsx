"use client";

import { useEffect, useState } from "react";
import { Map, ExternalLink, MapPin } from "lucide-react";

interface EventSummary {
  eventType: string;
  count: number;
}

export function StrategicMap() {
  const [stats, setStats] = useState<{ total: number; byType: EventSummary[] }>({ total: 0, byType: [] });

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((json) => {
        const d = json.data;
        if (d) {
          setStats({
            total: d.totalEvents || 0,
            byType: d.eventsByType || [],
          });
        }
      })
      .catch((err) => console.error("[StrategicMap]", err));
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
    CATISMA: "Catisma",
    HAVA_SALDIRISI: "Hava Saldirisi",
    DENIZ_OPERASYONU: "Deniz Op.",
    DIPLOMASI: "Diplomasi",
    INSANI_KRIZ: "Insani Kriz",
    PATLAMA: "Patlama",
    SIBER_SALDIRI: "Siber Saldiri",
    DIGER: "Diger",
  };

  return (
    <section className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <Map className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
                  Canli Stratejik Istihbarat Haritasi
                </h2>
                <span className="text-[10px] text-zinc-500">{stats.total} olay</span>
              </div>
              <p className="text-xs text-zinc-400">Askeri varliklar, catisma bolgeleri ve stratejik altyapi</p>
            </div>
          </div>
          <a
            href="/harita"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
          >
            <ExternalLink size={14} />
            Tam Harita
          </a>
        </div>

        {/* Category legend bar */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {stats.byType.map((t) => (
            <span
              key={t.eventType}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${TYPE_COLORS[t.eventType] || "bg-zinc-500"}`} />
              {TYPE_LABELS[t.eventType] || t.eventType} ({t.count})
            </span>
          ))}
        </div>

        {/* Map preview — CARTO dark tiles static image + click to go */}
        <a href="/harita" className="block">
          <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 h-[500px] group cursor-pointer">
            {/* Static tile background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
              style={{
                backgroundImage: "url('https://basemaps.cartocdn.com/dark_all/5/20/13.png')",
                backgroundSize: "cover",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

            {/* Overlay stats */}
            <div className="absolute top-3 left-3 space-y-1.5">
              {[
                { label: "TOPLAM OLAY", value: `${stats.total} kayitli`, color: "text-red-400" },
                { label: "ADS-B LIVE", value: "612 havacilik", color: "text-green-400" },
                { label: "LIVE AIS", value: "48 savas gemisi", color: "text-blue-400" },
                { label: "OIL FLOW", value: "21M bbl/gun", color: "text-yellow-400" },
              ].map((s) => (
                <div key={s.label} className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-lg px-3 py-1.5 w-44">
                  <p className={`text-[9px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</p>
                  <p className="text-[11px] font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Center CTA */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600/90 group-hover:bg-red-600 transition-colors shadow-lg">
                <MapPin size={18} className="text-white" />
                <span className="text-sm font-bold text-white tracking-wide">Interaktif Haritayi Ac</span>
              </div>
            </div>
          </div>
        </a>

        {/* Bottom stats */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-zinc-500">
          <span>{stats.total} olay</span>
          <span>·</span>
          <span>Leaflet + OpenStreetMap</span>
          <span>·</span>
          <span>Acik kaynak</span>
        </div>
      </div>
    </section>
  );
}
