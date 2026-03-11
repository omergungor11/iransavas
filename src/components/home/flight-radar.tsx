"use client";

import { useState } from "react";
import { Plane, ExternalLink, Radar, Maximize2, Minimize2 } from "lucide-react";

export function FlightRadar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <Plane className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Hava Sahasi & Ucus Takibi</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-600 text-white uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-zinc-400">Bolgedeki canli hava trafigi — Flightradar24</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={expanded ? "Hava sahasi panelini kucult" : "Hava sahasi panelini tam ekran yap"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              {expanded ? <Minimize2 size={14} aria-hidden="true" /> : <Maximize2 size={14} aria-hidden="true" />}
              {expanded ? "Kucult" : "Tam Ekran"}
            </button>
            <a
              href="https://www.flightradar24.com/34.08,34.12/4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <ExternalLink size={14} />
              FR24&apos;te Ac
            </a>
          </div>
        </div>

        {/* Flightradar24 Embed Map */}
        <div className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 transition-all ${expanded ? "h-[80vh]" : "h-[450px]"}`}>
          <iframe
            src="https://www.flightradar24.com/simple_index.php?lat=32.0&lon=47.0&z=5&airports=1&amsl=1"
            className="w-full h-full border-0"
            allowFullScreen
            title="Flightradar24 Canli Ucus Haritasi"
          />
          {/* Live indicator */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">Canli</span>
          </div>
        </div>

        {/* Additional trackers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* ADS-B Exchange */}
          <a
            href="https://globe.adsbexchange.com/?lat=32.0&lon=47.0&zoom=5"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-sky-600/40 transition-all flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
              <Radar className="h-5 w-5 text-sky-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">ADS-B Exchange</h3>
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">Sansursuz ve filtresiz ADS-B verileri — askeri ucuslar dahil tum hava trafigi</p>
            </div>
            <ExternalLink size={14} className="text-zinc-600 group-hover:text-sky-500 transition-colors shrink-0" />
          </a>

          {/* NOTAM */}
          <a
            href="https://notams.aim.faa.gov/notamSearch/nsapp.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-orange-600/40 transition-all flex items-center gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
              <Plane className="h-5 w-5 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">NOTAM Uyarilari</h3>
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">FAA NOTAM — hava sahasi kapanislari, ucusa yasak bolgeler ve acil uyarilar</p>
            </div>
            <ExternalLink size={14} className="text-zinc-600 group-hover:text-orange-500 transition-colors shrink-0" />
          </a>
        </div>

        {/* Attribution */}
        <p className="text-[10px] text-zinc-600 mt-3">
          Ucus verileri Flightradar24 tarafindan saglanmaktadir. Askeri ucuslar filtrelenebilir — tam veri icin ADS-B Exchange kullanin.
        </p>
      </div>
    </section>
  );
}
