"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpikeData {
  keyword: string;
  count24h: number;
  dailyAvg7d: number;
  isSpike: boolean;
  changePercent: number;
}

export function SpikeAlerts() {
  const [spikes, setSpikes] = useState<SpikeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpikes = async () => {
      try {
        const res = await fetch("/api/spike-detection");
        const json = await res.json();
        setSpikes(json.data ?? []);
      } catch (err) {
        console.error("[SpikeAlerts]", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpikes();
  }, []);

  const activeSpikes = spikes.filter((s) => s.isSpike);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity size={18} />
          Anahtar Kelime Spike Alarmlari
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Son 24 saatte 7 gunluk ortalamaya gore anormal artis gosteren kelimeler
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-8 animate-pulse rounded bg-muted" />
            ))}
          </div>
        ) : activeSpikes.length === 0 ? (
          <div className="py-4 text-center text-sm text-muted-foreground">
            Spike yok — Tum anahtar kelimeler normal seviyelerde.
          </div>
        ) : (
          <div className="space-y-3">
            {activeSpikes.map((spike) => (
              <div
                key={spike.keyword}
                className="flex items-center justify-between rounded-lg bg-red-500/5 border border-red-500/10 px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  {/* Pulsing red dot */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                  </span>
                  <span className="text-sm font-medium">{spike.keyword}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground">
                    {spike.count24h} haber
                  </span>
                  <span className="font-bold text-red-400">
                    +%{spike.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show all tracked keywords summary */}
        {!loading && spikes.length > 0 && (
          <div className="mt-4 border-t border-white/5 pt-3">
            <p className="text-xs text-muted-foreground mb-2">Tum takip edilen kelimeler:</p>
            <div className="flex flex-wrap gap-1.5">
              {spikes.map((s) => (
                <span
                  key={s.keyword}
                  className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] ${
                    s.isSpike
                      ? "bg-red-500/20 text-red-400"
                      : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {s.isSpike && (
                    <span className="h-1 w-1 rounded-full bg-red-500" />
                  )}
                  {s.keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
