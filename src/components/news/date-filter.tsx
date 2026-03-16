"use client";

import { cn } from "@/lib/utils";

export type DateRange = "all" | "today" | "3days" | "week";

const DATE_OPTIONS: { value: DateRange; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "today", label: "Bugün" },
  { value: "3days", label: "Son 3 Gün" },
  { value: "week", label: "Son Hafta" },
];

interface DateFilterProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export function DateFilter({ value, onChange }: DateFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {DATE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            value === opt.value
              ? "bg-red-600/20 text-red-400 border border-red-500/30"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
