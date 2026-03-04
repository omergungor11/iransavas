"use client";

import { useState } from "react";
import { Shield, ChevronUp, ChevronDown, Anchor, Plane, Target, Radio } from "lucide-react";

interface ForceAsset {
  name: string;
  type: string;
  location: string;
  status: string;
  statusColor: string;
  icon: React.ElementType;
}

interface Statement {
  source: string;
  sourceColor: string;
  title: string;
  time: string;
}

const forceAssets: ForceAsset[] = [
  { name: "USS Gerald R. Ford CSG", type: "Ucak Gemisi Grubu", location: "Basra Korfezi", status: "Konuslandirildi", statusColor: "text-green-400", icon: Anchor },
  { name: "B-2 Spirit Bombardiman", type: "Stratejik Bombardiman", location: "Diego Garcia", status: "Hazir", statusColor: "text-yellow-400", icon: Plane },
  { name: "F-22 Raptor Filosu", type: "Hava Ustuluugu", location: "Al Udeid, Katar", status: "Aktif Gorev", statusColor: "text-green-400", icon: Plane },
  { name: "Patriot PAC-3 Bataryalari", type: "Hava Savunma", location: "Suudi Arabistan / BAE", status: "Operasyonel", statusColor: "text-green-400", icon: Target },
  { name: "USS Bataan ARG", type: "Amfibi Hazir Grup", location: "Kizildeniz", status: "Konuslandirildi", statusColor: "text-green-400", icon: Anchor },
  { name: "MQ-9 Reaper IHA", type: "ISR / Saldiri", location: "Irak / Suriye", status: "Aktif", statusColor: "text-orange-400", icon: Plane },
];

const statements: Statement[] = [
  { source: "CENTCOM", sourceColor: "text-blue-400", title: "Ortadogu'daki ABD kuvvetleri yuksek alarm seviyesine gecirildi", time: "2 saat once" },
  { source: "Hazine Bak.", sourceColor: "text-green-400", title: "Iran Merkez Bankasi'na yeni yaptrimlar uygulandirildi", time: "4 saat once" },
  { source: "AB", sourceColor: "text-purple-400", title: "Avrupa Birligi Iran'a ek kisitlayici tedbirler acikladi", time: "6 saat once" },
  { source: "IAEA", sourceColor: "text-yellow-400", title: "IAEA Iran nukleer tesislerinde denetimlerin kisitlandigini bildirdi", time: "8 saat once" },
  { source: "Pentagon", sourceColor: "text-blue-400", title: "Savunma Bakanligi bolgeye ek kuvvet konuslandirmayi onayladi", time: "10 saat once" },
];

export function OfficialStatements() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="border-y border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Resmi Aciklamalar & Kuvvet Konuslanmasi</h2>
              <p className="text-xs text-zinc-400">Hukumet aciklamalari, yaptrimlar ve askeri konuslanmalar</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
          >
            {expanded ? "Kapat" : "Ac"}
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {expanded && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Force Posture */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Radio size={12} className="text-green-400 animate-pulse" />
                ABD/Koalisyon Kuvvet Konuslanmasi
              </h3>
              <div className="space-y-2">
                {forceAssets.map((asset) => {
                  const Icon = asset.icon;
                  return (
                    <div
                      key={asset.name}
                      className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5 flex items-start gap-3"
                    >
                      <Icon size={16} className="text-zinc-500 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-white truncate">{asset.name}</p>
                          <span className={`text-[10px] font-bold shrink-0 ${asset.statusColor}`}>
                            {asset.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500">
                          {asset.type} — {asset.location}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Statements */}
            <div>
              <h3 className="text-sm font-bold text-white mb-3">
                Resmi Aciklamalar
              </h3>
              <div className="space-y-2">
                {statements.map((stmt, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${stmt.sourceColor}`}>
                        {stmt.source}
                      </span>
                      <span className="text-[10px] text-zinc-600">{stmt.time}</span>
                    </div>
                    <p className="text-xs text-zinc-300">{stmt.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
