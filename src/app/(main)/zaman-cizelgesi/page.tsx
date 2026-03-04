"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
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

  useEffect(() => {
    const fetchTimeline = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (importance !== "ALL") params.set("importance", importance);
        const res = await fetch(`/api/timeline?${params}`);
        const json = await res.json();
        setEntries(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimeline();
  }, [importance]);

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
      ) : (
        <VerticalTimeline entries={entries} />
      )}
    </div>
  );
}
