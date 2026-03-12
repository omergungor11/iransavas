"use client";

import { useEffect, useState, useCallback } from "react";
import { Clock, AlertTriangle, RefreshCw } from "lucide-react";
import { VerticalTimeline } from "@/components/timeline/vertical-timeline";

interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  importance: string;
}

const IMPORTANCES = [
  { value: "ALL", label: "Tumu" },
  { value: "CRITICAL", label: "Kritik" },
  { value: "HIGH", label: "Yuksek" },
  { value: "MEDIUM", label: "Orta" },
  { value: "LOW", label: "Dusuk" },
];

export default function ZamanCizelgesiPage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [importance, setImportance] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTimeline = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      if (importance !== "ALL") params.set("importance", importance);
      const res = await fetch(`/api/timeline?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setEntries(json.data || []);
    } catch (err) {
      console.error("[ZamanCizelgesi]", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [importance]);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
          <Clock className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Savas Zaman Cizelgesi</h1>
          <p className="text-muted-foreground">Kronolojik olay takibi</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {IMPORTANCES.map((imp) => (
          <button
            key={imp.value}
            onClick={() => setImportance(imp.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              importance === imp.value ? "bg-red-600 text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {imp.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-8 py-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <p className="text-sm font-medium text-foreground">Zaman cizelgesi yuklenemedi</p>
          <p className="text-xs text-muted-foreground">Bir hata olustu. Lutfen tekrar deneyin.</p>
          <button
            onClick={fetchTimeline}
            className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            <RefreshCw size={14} />
            Tekrar Dene
          </button>
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16">
          <Clock className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {importance === "ALL" ? "Henuz zaman cizelgesi kaydi yok." : "Bu filtre icin sonuc bulunamadi."}
          </p>
          {importance !== "ALL" && (
            <button
              onClick={() => setImportance("ALL")}
              className="mt-1 text-xs text-red-400 hover:text-red-300"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      ) : (
        <VerticalTimeline entries={entries} />
      )}
    </div>
  );
}
