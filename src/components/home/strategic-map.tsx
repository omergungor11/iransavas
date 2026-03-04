"use client";

import { useState } from "react";
import { Map, Maximize2, Minimize2, ExternalLink } from "lucide-react";

const mapCategories = [
  { label: "BOMBERS", color: "bg-red-500" },
  { label: "BASES", color: "bg-blue-500" },
  { label: "AIRCRAFT", color: "bg-yellow-500" },
  { label: "SHIPS", color: "bg-cyan-500" },
  { label: "SAM", color: "bg-orange-500" },
  { label: "ROUTES", color: "bg-green-500" },
  { label: "CABLES", color: "bg-purple-500" },
  { label: "AIRPORTS", color: "bg-pink-500" },
  { label: "PORTS", color: "bg-teal-500" },
  { label: "POWER", color: "bg-amber-500" },
  { label: "INFRA", color: "bg-indigo-500" },
];

export function StrategicMap() {
  const [expanded, setExpanded] = useState(false);

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
                <span className="text-[10px] text-zinc-500">71 obje</span>
              </div>
              <p className="text-xs text-zinc-400">Askeri varlklar, catisma bolgeleri ve stratejik altyapi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {expanded ? "Kucult" : "Tam Ekran"}
            </button>
            <a
              href="/harita"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <ExternalLink size={14} />
              Tam Harita
            </a>
          </div>
        </div>

        {/* Category legend bar */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {mapCategories.map((cat) => (
            <span
              key={cat.label}
              className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${cat.color}`} />
              {cat.label}
            </span>
          ))}
          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-zinc-700 text-zinc-300">
            LEGEND
          </span>
        </div>

        {/* Map embed — usvsiran */}
        <div className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 transition-all ${expanded ? "h-[80vh]" : "h-[500px]"}`}>
          <iframe
            src="https://usvsiran.com/embed?lat=31.8&lng=38.2&z=5&theme=schematic"
            className="w-full h-full border-0"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
            title="Stratejik Istihbarat Haritasi"
          />
          {/* Overlay stats */}
          <div className="absolute top-3 left-3 space-y-1.5">
            {[
              { label: "ADS-B LIVE", value: "612 havacilik", color: "text-green-400" },
              { label: "SAT TRACK", value: "34 uydu", color: "text-cyan-400" },
              { label: "LIVE AIS", value: "48 savas gemisi", color: "text-blue-400" },
              { label: "OIL FLOW", value: "21M bbl/gun", color: "text-yellow-400" },
            ].map((s) => (
              <div key={s.label} className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700/50 rounded-lg px-3 py-1.5 w-44">
                <p className={`text-[9px] font-bold uppercase tracking-wider ${s.color}`}>{s.label}</p>
                <p className="text-[11px] font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex items-center gap-4 mt-3 text-[10px] text-zinc-500">
          <span>71 obje</span>
          <span>·</span>
          <span>271 istihbarat noktasi</span>
          <span>·</span>
          <span>13 ulke bolgesi</span>
          <span>·</span>
          <span>Acik kaynak</span>
        </div>
      </div>
    </section>
  );
}
