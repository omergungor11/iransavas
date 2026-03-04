"use client";

import { useState } from "react";
import { Plane, ExternalLink, Maximize2, Minimize2, Radar, AlertTriangle } from "lucide-react";

interface PriorityTrack {
  callsign: string;
  speed: string;
  alt: string;
  location: string;
  squawk: string;
  confidence: string;
  tag: string;
  tagColor: string;
}

const priorityTracks: PriorityTrack[] = [
  { callsign: "QTR65C", speed: "280 m/s", alt: "37000 ft", location: "Iran icinde", squawk: "3221", confidence: "65%", tag: "Yuksek hiz", tagColor: "bg-orange-500/20 text-orange-400" },
  { callsign: "HGO8633", speed: "293 m/s", alt: "37000 ft", location: "Iran icinde", squawk: "1647", confidence: "65%", tag: "Yuksek hiz", tagColor: "bg-orange-500/20 text-orange-400" },
  { callsign: "UAE856", speed: "257 m/s", alt: "35000 ft", location: "Iran icinde", squawk: "1416", confidence: "65%", tag: "Yuksek hiz", tagColor: "bg-orange-500/20 text-orange-400" },
  { callsign: "THY6252", speed: "253 m/s", alt: "39000 ft", location: "Iran icinde", squawk: "1060", confidence: "65%", tag: "Yuksek hiz", tagColor: "bg-orange-500/20 text-orange-400" },
];

const stats = [
  { label: "Takip Edilen", value: "120", color: "text-white" },
  { label: "Iran Icinde", value: "113", color: "text-yellow-400" },
  { label: "Stratejik Yakin", value: "0", color: "text-green-400" },
  { label: "Acil Squawk", value: "0", color: "text-green-400" },
  { label: "Askeri Callsign", value: "2", color: "text-orange-400" },
  { label: "MIL Feed Eslesme", value: "2", color: "text-orange-400" },
  { label: "Anonim Hizli", value: "2", color: "text-red-400" },
];

export function FlightTracker() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="military" className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <Radar className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Ucus Takip Sistemi</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-600 text-white uppercase tracking-wider">
                  ADS-B Live
                </span>
              </div>
              <p className="text-xs text-zinc-400">ADS-B Exchange + Flightradar24 canli hava trafigi</p>
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
              href="https://globe.adsbexchange.com/?lat=32.0&lon=47.0&zoom=5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <ExternalLink size={14} />
              ADS-B Exchange
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-2 py-2 text-center">
              <p className={`text-xl font-black font-mono ${s.color}`}>{s.value}</p>
              <p className="text-[9px] text-zinc-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FR24 Embed */}
        <div className={`relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 transition-all ${expanded ? "h-[80vh]" : "h-[400px]"}`}>
          <iframe
            src="https://www.flightradar24.com/simple_index.php?lat=32.0&lon=47.0&z=5&airports=1&amsl=1"
            className="w-full h-full border-0"
            allowFullScreen
            title="Flightradar24 Canli Ucus Haritasi"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-400 font-medium">Canli</span>
          </div>
        </div>

        {/* Priority Tracks */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle size={14} className="text-yellow-500" />
            ONCELIKLI IZLEME
          </h3>
          <div className="space-y-2">
            {priorityTracks.map((track) => (
              <div
                key={track.callsign}
                className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-bold text-red-400 font-mono">{track.callsign}</p>
                  <p className="text-[11px] text-zinc-500">
                    Hiz {track.speed} · Irtifa {track.alt} · {track.location} · Squawk {track.squawk}
                  </p>
                  <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${track.tagColor}`}>
                    {track.tag}
                  </span>
                </div>
                <span className="text-xs text-zinc-500">({track.confidence} guven)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <a
            href="https://globe.adsbexchange.com/?lat=32.0&lon=47.0&zoom=5"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-3 hover:border-sky-600/40 transition-all flex items-center gap-3"
          >
            <Radar size={18} className="text-sky-500 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">ADS-B Exchange — Filtresiz Radar</p>
              <p className="text-[10px] text-zinc-500">Askeri ucuslar dahil sansursuz ADS-B verisi</p>
            </div>
            <ExternalLink size={12} className="text-zinc-600 group-hover:text-sky-500 shrink-0" />
          </a>
          <a
            href="https://notams.aim.faa.gov/notamSearch/nsapp.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-lg border border-zinc-800 bg-zinc-900 p-3 hover:border-orange-600/40 transition-all flex items-center gap-3"
          >
            <Plane size={18} className="text-orange-500 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-bold text-white">NOTAM Uyarilari — Hava Sahasi Kapanislari</p>
              <p className="text-[10px] text-zinc-500">FAA NOTAM: ucusa yasak bolgeler ve acil uyarilar</p>
            </div>
            <ExternalLink size={12} className="text-zinc-600 group-hover:text-orange-500 shrink-0" />
          </a>
        </div>

        <p className="text-[10px] text-zinc-600 mt-3">
          Ucus verileri ADS-B Exchange ve Flightradar24 tarafindan saglanmaktadir. Askeri ucuslar transponder kapatabilir.
        </p>
      </div>
    </section>
  );
}
