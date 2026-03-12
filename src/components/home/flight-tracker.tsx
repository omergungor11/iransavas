"use client";

import { useState } from "react";
import { Plane, ExternalLink, Radar, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";

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
  { label: "Takip Edilen", value: "120", color: "text-foreground" },
  { label: "Iran Icinde", value: "113", color: "text-yellow-400" },
  { label: "Stratejik Yakin", value: "0", color: "text-green-400" },
  { label: "Acil Squawk", value: "0", color: "text-green-400" },
  { label: "Askeri Callsign", value: "2", color: "text-orange-400" },
  { label: "MIL Feed Eslesme", value: "2", color: "text-orange-400" },
  { label: "Anonim Hizli", value: "2", color: "text-red-400" },
];

export function FlightTracker() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="military" className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
              <Radar className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Ucus Takip Sistemi</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-600 text-white uppercase tracking-wider">
                  ADS-B Live
                </span>
              </div>
              <p className="text-xs text-muted-foreground">ADS-B Exchange + Flightradar24 canli hava trafigi</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Ucus takip panelini kapat" : "Ucus takip panelini ac"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Ac"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <>
            {/* Stats bar */}
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-card/80 border border-border rounded-lg px-2 py-2 text-center">
                  <p className={`text-xl font-black font-mono ${s.color}`}>{s.value}</p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* External links instead of blocked iframe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <a
                href="https://globe.adsbexchange.com/?lat=32.0&lon=47.0&zoom=5"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card p-4 hover:border-sky-600/40 transition-all flex items-center gap-3"
              >
                <Radar size={24} className="text-sky-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">ADS-B Exchange — Filtresiz Radar</p>
                  <p className="text-xs text-muted-foreground">Askeri ucuslar dahil sansursuz ADS-B verisi</p>
                </div>
                <ExternalLink size={14} className="text-zinc-600 group-hover:text-sky-500 shrink-0" />
              </a>
              <a
                href="https://www.flightradar24.com/32.0,47.0/5"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card p-4 hover:border-yellow-600/40 transition-all flex items-center gap-3"
              >
                <Plane size={24} className="text-yellow-500 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">Flightradar24 — Canli Ucus Haritasi</p>
                  <p className="text-xs text-muted-foreground">Iran bolgesi hava trafigi izleme</p>
                </div>
                <ExternalLink size={14} className="text-zinc-600 group-hover:text-yellow-500 shrink-0" />
              </a>
            </div>

            {/* Priority Tracks */}
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle size={14} className="text-yellow-500" />
              ONCELIKLI IZLEME
            </h3>
            <div className="space-y-2">
              {priorityTracks.map((track) => (
                <div
                  key={track.callsign}
                  className="bg-card/80 border border-border rounded-lg px-4 py-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-red-400 font-mono">{track.callsign}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Hiz {track.speed} · Irtifa {track.alt} · {track.location} · Squawk {track.squawk}
                    </p>
                    <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${track.tagColor}`}>
                      {track.tag}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">({track.confidence} guven)</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-zinc-600 mt-3">
              Ucus verileri ADS-B Exchange ve Flightradar24 tarafindan saglanmaktadir. Askeri ucuslar transponder kapatabilir.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
