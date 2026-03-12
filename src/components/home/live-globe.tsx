"use client";

import { useState } from "react";
import { Globe, ExternalLink, Plane, Ship, Radio, ChevronUp, ChevronDown } from "lucide-react";

export function LiveGlobe() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Globe className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Canlı Küre — Askerî & Stratejik Takip</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white uppercase tracking-wider">
                  OSINT
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Gerçek zamanlı uçak, deniz varlıkları ve çatışma bölgesi aktivitesi</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "OSINT küre panelini kapat" : "OSINT küre panelini aç"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Aç"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <>
            {/* Glint.trade iframe */}
            <div className="relative rounded-lg overflow-hidden border border-border bg-black mb-4 h-[600px]">
              <iframe
                src="https://glint.trade"
                className="w-full h-full border-0"
                allowFullScreen
                title="Glint Trade — Canlı Askerî Küre"
                loading="lazy"
              />
              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none">
                <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                <span className="text-[10px] text-purple-400 font-medium">Canlı Küre</span>
              </div>
              <a
                href="https://glint.trade"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-white hover:text-purple-400 transition-colors"
              >
                <ExternalLink size={10} />
                Glint Trade&apos;de Aç
              </a>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { icon: Plane, label: "ADS-B Canlı", value: "612+", sub: "havacılık", color: "text-green-400" },
                { icon: Radio, label: "SAT Track", value: "34", sub: "uydu", color: "text-cyan-400" },
                { icon: Ship, label: "AIS Canlı", value: "48+", sub: "savaş gemisi", color: "text-blue-400" },
                { icon: Plane, label: "Askerî", value: "31", sub: "tanımlanmış", color: "text-orange-400" },
                { icon: Globe, label: "Bölge", value: "13", sub: "ülke", color: "text-purple-400" },
                { icon: Radio, label: "OSINT", value: "271+", sub: "istihbarat noktası", color: "text-yellow-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card/80 border border-border rounded-lg px-3 py-2 text-center">
                  <stat.icon size={14} className={`${stat.color} mx-auto mb-1`} />
                  <p className="text-lg font-black text-foreground leading-none">{stat.value}</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-zinc-600 mt-3">
              Veri kaynağı: Glint Trade. Askerî hareketler, deniz varlıkları ve çatışma bölgesi aktivitesi gösterilmektedir.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
