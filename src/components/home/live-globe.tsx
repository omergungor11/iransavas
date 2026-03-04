"use client";

import { useState } from "react";
import { Globe, ExternalLink, Maximize2, Minimize2, Plane, Ship, Radio } from "lucide-react";

const categories = [
  { label: "Tumu", key: "all", active: true },
  { label: "ISR", key: "isr", active: false },
  { label: "VIP", key: "vip", active: false },
  { label: "Bombardiman", key: "bomber", active: false },
  { label: "Komuta", key: "command", active: false },
  { label: "Tanker", key: "tanker", active: false },
  { label: "Nakliye", key: "transport", active: false },
  { label: "Avci", key: "fighter", active: false },
];

export function LiveGlobe() {
  const [expanded, setExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <section className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
              <Globe className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Canli Kure — Askeri & Stratejik Takip</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-zinc-400">Gercek zamanli ucak, deniz varliklari ve catisma bolgesi aktivitesi</p>
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
              href="https://glint.trade"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <ExternalLink size={14} />
              Glint&apos;te Ac
            </a>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                activeFilter === cat.key
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Globe embed */}
        <div className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 transition-all ${expanded ? "h-[80vh]" : "h-[500px]"}`}>
          <iframe
            src="https://glint.trade"
            className="w-full h-full border-0"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-popups"
            title="Glint Trade - Canli Askeri Kure"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] text-purple-400 font-medium">Canli</span>
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-red-400 font-bold">GLOBAL TENSION</span>
              <span className="text-sm font-black text-red-500">100</span>
              <span className="text-[9px] text-red-400 font-bold">SEVERE</span>
            </div>
          </div>
        </div>

        {/* Mini stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">
          {[
            { icon: Plane, label: "ADS-B Canli", value: "612+", sub: "havacilik", color: "text-green-400" },
            { icon: Radio, label: "SAT Track", value: "34", sub: "uydu", color: "text-cyan-400" },
            { icon: Ship, label: "AIS Canli", value: "48+", sub: "savas gemisi", color: "text-blue-400" },
            { icon: Plane, label: "Askeri", value: "31", sub: "tanimlanmis", color: "text-orange-400" },
            { icon: Globe, label: "Bolge", value: "13", sub: "ulke", color: "text-purple-400" },
            { icon: Radio, label: "OSINT", value: "271+", sub: "istihbarat noktasi", color: "text-yellow-400" },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2 text-center">
              <stat.icon size={14} className={`${stat.color} mx-auto mb-1`} />
              <p className="text-lg font-black text-white leading-none">{stat.value}</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-zinc-600 mt-3">
          3D kure verisi Glint Trade tarafindan saglanmaktadir. Tahmin piyasasi istihbarati icin glint.trade&apos;i ziyaret edin.
        </p>
      </div>
    </section>
  );
}
