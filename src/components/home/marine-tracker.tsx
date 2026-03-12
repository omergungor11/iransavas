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
                <h2 className="text-lg font-bold text-foreground">Deniz Trafiği & Gemi Takibi</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Basra Körfezi ve Hürmüz Boğazı canlı gemi trafiği</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Deniz trafiği panelini kapat" : "Deniz trafiği panelini aç"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Aç"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <>
            {/* MarineTraffic Embed Map */}
            <div className="relative rounded-lg overflow-hidden border border-border bg-card mb-4 h-[400px]">
              <iframe
                src="https://www.marinetraffic.com/en/ais/embed/zoom:6/centery:26.5/centerx:53.5/maptype:4/shownames:false/mmsi:0/shipid:0/fleet:/fleet_id:/vtypes:/showmenu:/remember:false"
                className="w-full h-full border-0"
                allowFullScreen
                title="MarineTraffic Canlı Gemi Haritası — Basra Körfezi"
                loading="lazy"
              />
              {/* Live indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] text-blue-400 font-medium">AIS Canlı</span>
              </div>
              <a
                href="https://www.marinetraffic.com/en/ais/home/centerx:53.5/centery:26.5/zoom:6"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] text-white hover:text-blue-400 transition-colors"
              >
                <ExternalLink size={10} />
                MarineTraffic&apos;te Aç
              </a>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Anchor size={12} className="text-blue-500" />
                  <span className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Live AIS</span>
                </div>
                <p className="text-lg font-black text-foreground">48+</p>
                <p className="text-[10px] text-muted-foreground">Savaş gemisi / Körfez</p>
              </div>
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Ship size={12} className="text-cyan-500" />
                  <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Petrol Tanker</span>
                </div>
                <p className="text-lg font-black text-foreground">120+</p>
                <p className="text-[10px] text-muted-foreground">Günlük transit</p>
              </div>
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Ship size={12} className="text-orange-500" />
                  <span className="text-[10px] text-orange-400 uppercase tracking-wider font-bold">Hürmüz Boğazı</span>
                </div>
                <p className="text-lg font-black text-foreground">21M bbl</p>
                <p className="text-[10px] text-muted-foreground">Günlük petrol akışı</p>
              </div>
              <div className="bg-card/80 border border-border rounded-lg px-3 py-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <Ship size={12} className="text-yellow-500" />
                  <span className="text-[10px] text-yellow-400 uppercase tracking-wider font-bold">Transit Durumu</span>
                </div>
                <p className="text-sm font-bold text-yellow-400">Yüksek Risk</p>
                <p className="text-[10px] text-muted-foreground">Abluka tehdidi aktif</p>
              </div>
            </div>

            <p className="text-[10px] text-zinc-600 mt-3">
              Veri kaynağı: MarineTraffic AIS. Askerî gemiler AIS kapatabilir — gerçek sayı daha yüksek olabilir.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
