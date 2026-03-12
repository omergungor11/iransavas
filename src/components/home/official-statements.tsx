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
  { name: "USS Gerald R. Ford CSG", type: "Uçak Gemisi Grubu", location: "Basra Körfezi", status: "Konuşlandırıldı", statusColor: "text-green-400", icon: Anchor },
  { name: "B-2 Spirit Bombardıman", type: "Stratejik Bombardıman", location: "Diego Garcia", status: "Hazır", statusColor: "text-yellow-400", icon: Plane },
  { name: "F-22 Raptor Filosu", type: "Hava Üstünlüğü", location: "Al Udeid, Katar", status: "Aktif Görev", statusColor: "text-green-400", icon: Plane },
  { name: "Patriot PAC-3 Bataryaları", type: "Hava Savunma", location: "Suudi Arabistan / BAE", status: "Operasyonel", statusColor: "text-green-400", icon: Target },
  { name: "USS Bataan ARG", type: "Amfibi Hazır Grup", location: "Kızıldeniz", status: "Konuşlandırıldı", statusColor: "text-green-400", icon: Anchor },
  { name: "MQ-9 Reaper İHA", type: "İSR / Saldırı", location: "Irak / Suriye", status: "Aktif", statusColor: "text-orange-400", icon: Plane },
];

const statements: Statement[] = [
  { source: "CENTCOM", sourceColor: "text-blue-400", title: "Ortadoğu'daki ABD kuvvetleri yüksek alarm seviyesine geçirildi", time: "2 saat önce" },
  { source: "Hazine Bak.", sourceColor: "text-green-400", title: "İran Merkez Bankası'na yeni yaptırımlar uygulandırıldı", time: "4 saat önce" },
  { source: "AB", sourceColor: "text-purple-400", title: "Avrupa Birliği İran'a ek kısıtlayıcı tedbirler açıkladı", time: "6 saat önce" },
  { source: "IAEA", sourceColor: "text-yellow-400", title: "IAEA İran nükleer tesislerinde denetimlerin kısıtlandığını bildirdi", time: "8 saat önce" },
  { source: "Pentagon", sourceColor: "text-blue-400", title: "Savunma Bakanlığı bölgeye ek kuvvet konuşlandırmayı onayladı", time: "10 saat önce" },
];

export function OfficialStatements() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Resmî Açıklamalar & Kuvvet Konuşlanması</h2>
              <p className="text-xs text-muted-foreground">Hükümet açıklamaları, yaptırımlar ve askerî konuşlanmalar</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-label={expanded ? "Resmî açıklamalar panelini kapat" : "Resmî açıklamalar panelini aç"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            {expanded ? "Kapat" : "Aç"}
            {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
          </button>
        </div>

        {expanded && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Force Posture */}
            <div>
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <Radio size={12} className="text-green-400 animate-pulse" />
                ABD/Koalisyon Kuvvet Konuşlanması
              </h3>
              <div className="space-y-2">
                {forceAssets.map((asset) => {
                  const Icon = asset.icon;
                  return (
                    <div
                      key={asset.name}
                      className="bg-card/80 border border-border rounded-lg px-3 py-2.5 flex items-start gap-3"
                    >
                      <Icon size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-bold text-foreground truncate">{asset.name}</p>
                          <span className={`text-[10px] font-bold shrink-0 ${asset.statusColor}`}>
                            {asset.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
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
              <h3 className="text-sm font-bold text-foreground mb-3">
                Resmî Açıklamalar
              </h3>
              <div className="space-y-2">
                {statements.map((stmt, i) => (
                  <div
                    key={i}
                    className="bg-card/80 border border-border rounded-lg px-3 py-2.5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${stmt.sourceColor}`}>
                        {stmt.source}
                      </span>
                      <span className="text-[10px] text-zinc-600">{stmt.time}</span>
                    </div>
                    <p className="text-xs text-foreground/80">{stmt.title}</p>
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
