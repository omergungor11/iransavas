"use client";

import { useState } from "react";
import { Globe, ExternalLink, Plane, Ship, Radio, ChevronUp, ChevronDown } from "lucide-react";

export function LiveGlobe() {
  const [expanded, setExpanded] = useState(true);

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
                  OSINT
                </span>
              </div>
              <p className="text-xs text-zinc-400">Gercek zamanli ucak, deniz varliklari ve catisma bolgesi aktivitesi</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "OSINT kure panelini kapat" : "OSINT kure panelini ac"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
          >
            {expanded ? "Kapat" : "Ac"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <>
            {/* External link instead of blocked iframe */}
            <a
              href="https://glint.trade"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-purple-600/40 transition-all mb-4"
            >
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-purple-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Glint Trade — Canli Askeri Kure</p>
                  <p className="text-xs text-zinc-500">3D kure uzerinde askeri hareketler, deniz varliklari ve catisma bolgesi aktivitesi</p>
                </div>
                <ExternalLink size={14} className="text-zinc-600 group-hover:text-purple-500 shrink-0" />
              </div>
            </a>

            {/* Mini stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
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
          </>
        )}
      </div>
    </section>
  );
}
