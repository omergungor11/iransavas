"use client";

import { cn } from "@/lib/utils";

export interface MapFiltersState {
  eventType: string;
  severity: string;
  dateRange: string;
  customFrom?: string;
  customTo?: string;
}

interface MapFiltersProps {
  filters: MapFiltersState;
  onChange: (filters: MapFiltersState) => void;
  eventCount: number;
}

const EVENT_TYPES = [
  { value: "ALL", label: "Tümü" },
  { value: "CATISMA", label: "Çatışma" },
  { value: "HAVA_SALDIRISI", label: "Hava Saldırısı" },
  { value: "DENIZ_OPERASYONU", label: "Deniz Op." },
  { value: "DIPLOMASI", label: "Diplomasi" },
  { value: "INSANI_KRIZ", label: "İnsanî Kriz" },
];

const SEVERITIES = [
  { value: "ALL", label: "Tümü" },
  { value: "DUSUK", label: "Düşük", color: "bg-blue-500" },
  { value: "ORTA", label: "Orta", color: "bg-yellow-500" },
  { value: "YUKSEK", label: "Yüksek", color: "bg-orange-500" },
  { value: "KRITIK", label: "Kritik", color: "bg-red-500" },
];

const DATE_RANGES = [
  { value: "all", label: "Tüm Zamanlar" },
  { value: "last_week", label: "Son Hafta" },
  { value: "last_month", label: "Son Ay" },
];

export function MapFilters({ filters, onChange, eventCount }: MapFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-gray-900/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-200">Filtreler</h2>
        <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-400">
          {eventCount} olay
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {EVENT_TYPES.map((t) => (
          <button key={t.value} onClick={() => onChange({ ...filters, eventType: t.value })}
            className={cn("rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              filters.eventType === t.value ? "bg-red-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {SEVERITIES.map((s) => (
          <button key={s.value} onClick={() => onChange({ ...filters, severity: s.value })}
            className={cn("rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              filters.severity === s.value ? "bg-red-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex gap-1.5">
        {DATE_RANGES.map((d) => (
          <button key={d.value} onClick={() => onChange({ ...filters, dateRange: d.value })}
            className={cn("rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
              filters.dateRange === d.value ? "bg-red-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}>
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
