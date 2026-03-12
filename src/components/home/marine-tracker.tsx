"use client";

import { useState } from "react";
import { Ship, ExternalLink, Anchor, ChevronUp, ChevronDown } from "lucide-react";

export function MarineTracker() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Ship className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Deniz Trafigi & Gemi Takibi</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Basra Korfezi ve Hurmuz Bogazi canli gemi trafigi</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Deniz trafigi panelini kapat" : "Deniz trafigi panelini ac"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Ac"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <>
            {/* External link instead of blocked iframe */}
            <a
              href="https://www.marinetraffic.com/en/ais/home/centerx:53.5/centery:26.5/zoom:5"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-border bg-card p-4 hover:border-blue-600/40 transition-all mb-4"
            >
              <div className="flex items-center gap-3">
                <Anchor size={24} className="text-blue-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">MarineTraffic — Canli AIS Gemi Haritasi</p>
                  <p className="text-xs text-muted-foreground">Basra Korfezi ve Hurmuz Bogazi bolgesi canli gemi takibi</p>
                </div>
                <ExternalLink size={14} className="text-zinc-600 group-hover:text-blue-500 shrink-0" />
              </div>
            </a>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Anchor size={12} className="text-blue-500" />
                  <span className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Live AIS</span>
                </div>
                <p className="text-lg font-black text-foreground">48+</p>
                <p className="text-[10px] text-muted-foreground">Savas gemisi / Korfez</p>
              </div>
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Ship size={12} className="text-cyan-500" />
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Petrol Tanker</span>
                </div>
                <p className="text-lg font-black text-foreground">120+</p>
                <p className="text-[10px] text-muted-foreground">Gunluk transit</p>
              </div>
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Ship size={12} className="text-orange-500" />
                  <span className="text-[10px] text-orange-400 uppercase tracking-wider font-bold">Hurmuz Bogazi</span>
                </div>
                <p className="text-lg font-black text-foreground">21M bbl</p>
                <p className="text-[10px] text-muted-foreground">Gunluk petrol akisi</p>
              </div>
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Ship size={12} className="text-yellow-500" />
                  <span className="text-[10px] text-yellow-400 uppercase tracking-wider font-bold">Transit Durumu</span>
                </div>
                <p className="text-sm font-bold text-yellow-400">Yuksek Risk</p>
                <p className="text-[10px] text-muted-foreground">Abluka tehdidi aktif</p>
              </div>
            </div>

            <p className="text-[10px] text-zinc-600 mt-3">
              Veri kaynagi: MarineTraffic AIS. Askeri gemiler AIS kapatabilir — gercek sayi daha yuksek olabilir.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
