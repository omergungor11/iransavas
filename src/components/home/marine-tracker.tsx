"use client";

import { useState } from "react";
import { Ship, ExternalLink, Maximize2, Minimize2, Anchor } from "lucide-react";

export function MarineTracker() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Ship className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Deniz Trafigi & Gemi Takibi</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-zinc-400">Basra Korfezi ve Hurmuz Bogazi canli gemi trafigi</p>
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
              href="https://www.marinetraffic.com/en/ais/home/centerx:53.5/centery:26.5/zoom:5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <ExternalLink size={14} />
              MarineTraffic
            </a>
          </div>
        </div>

        {/* Marine Traffic Embed */}
        <div className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 transition-all ${expanded ? "h-[80vh]" : "h-[450px]"}`}>
          <iframe
            src="https://www.marinetraffic.com/en/ais/embed/zoom:5/centery:26.5/centerx:53.5/maptype:3/shownames:false"
            className="w-full h-full border-0"
            allowFullScreen
            title="MarineTraffic Canli Gemi Haritasi"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] text-blue-400 font-medium">AIS Canli</span>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Anchor size={12} className="text-blue-500" />
              <span className="text-[10px] text-blue-400 uppercase tracking-wider font-bold">Live AIS</span>
            </div>
            <p className="text-lg font-black text-white">48+</p>
            <p className="text-[10px] text-zinc-500">Savas gemisi / Korfez</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Ship size={12} className="text-cyan-500" />
              <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Petrol Tanker</span>
            </div>
            <p className="text-lg font-black text-white">120+</p>
            <p className="text-[10px] text-zinc-500">Gunluk transit</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Ship size={12} className="text-orange-500" />
              <span className="text-[10px] text-orange-400 uppercase tracking-wider font-bold">Hurmuz Bogazi</span>
            </div>
            <p className="text-lg font-black text-white">21M bbl</p>
            <p className="text-[10px] text-zinc-500">Gunluk petrol akisi</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <Ship size={12} className="text-yellow-500" />
              <span className="text-[10px] text-yellow-400 uppercase tracking-wider font-bold">Transit Durumu</span>
            </div>
            <p className="text-sm font-bold text-yellow-400">Yuksek Risk</p>
            <p className="text-[10px] text-zinc-500">Abluka tehdidi aktif</p>
          </div>
        </div>

        <p className="text-[10px] text-zinc-600 mt-3">
          Veri kaynagi: MarineTraffic AIS. Askeri gemiler AIS kapatabilir — gercek sayi daha yuksek olabilir.
        </p>
      </div>
    </section>
  );
}
