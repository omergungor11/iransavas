"use client";

import { useState } from "react";
import { TrendingUp, ChevronUp, ChevronDown } from "lucide-react";

interface TopicCard {
  topic: string;
  status: "Spiking" | "Rising" | "Stable";
  postCount: string;
  change: string;
  changePositive: boolean;
}

const topics: TopicCard[] = [
  { topic: "Iran Hava Sahasi", status: "Spiking", postCount: "4,470", change: "+3360", changePositive: true },
  { topic: "Petrol Piyasasi", status: "Spiking", postCount: "3,210", change: "+2100", changePositive: true },
  { topic: "IRGC Seferberlik", status: "Spiking", postCount: "148", change: "+128", changePositive: true },
  { topic: "Hurmuz Bogazi", status: "Rising", postCount: "890", change: "+340", changePositive: true },
  { topic: "ABD Donanmasi", status: "Rising", postCount: "1,420", change: "+560", changePositive: true },
  { topic: "Israel Operasyonlari", status: "Spiking", postCount: "5,100", change: "+4200", changePositive: true },
  { topic: "Nukleer Tesisler", status: "Rising", postCount: "670", change: "+210", changePositive: true },
  { topic: "Sivil Kayiplar", status: "Rising", postCount: "2,340", change: "+890", changePositive: true },
];

function statusColor(status: string) {
  switch (status) {
    case "Spiking": return "text-red-400";
    case "Rising": return "text-orange-400";
    default: return "text-green-400";
  }
}

function statusBg(status: string) {
  switch (status) {
    case "Spiking": return "bg-red-500/10 border-red-500/20";
    case "Rising": return "bg-orange-500/10 border-orange-500/20";
    default: return "bg-green-500/10 border-green-500/20";
  }
}

export function XTopicVolume() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
              <TrendingUp className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">X Konu Hacmi</h2>
              <p className="text-xs text-muted-foreground">Iran/Korfez konularinda 30 dakikalik post hacmi takibi</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground">15dk once guncellendi</span>
            <button
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label={expanded ? "X konu hacmi panelini kapat" : "X konu hacmi panelini ac"}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              {expanded ? "Kapat" : "Ac"}
              {expanded ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topics.map((t) => (
              <div
                key={t.topic}
                className={`rounded-lg border p-3 ${statusBg(t.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-foreground/80">{t.topic}</p>
                  <span className={`text-xs font-bold ${t.changePositive ? "text-green-400" : "text-red-400"}`}>
                    {t.change}
                  </span>
                </div>
                <p className={`text-lg font-black ${statusColor(t.status)}`}>
                  {t.status}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {t.postCount} post / 30dk
                </p>
                {/* Mini bar chart simulation */}
                <div className="flex items-end gap-[2px] mt-2 h-6">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const h = Math.max(3, Math.random() * 24);
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm ${
                          t.status === "Spiking"
                            ? "bg-red-500/60"
                            : t.status === "Rising"
                            ? "bg-orange-500/60"
                            : "bg-green-500/60"
                        }`}
                        style={{ height: `${h}px` }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
