"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_SOURCES = [
  "Reuters", "BBC News", "BBC Türkçe", "Al Jazeera", "Anadolu Ajansı",
  "TRT Haber", "Hürriyet", "Iran International", "Middle East Eye",
  "IRNA", "Times of Israel", "DW Türkçe", "Defense News",
  "CNN", "AP", "The Guardian", "Financial Times",
];

interface SourceFilterProps {
  value: string[];
  onChange: (sources: string[]) => void;
}

export function SourceFilter({ value, onChange }: SourceFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (source: string) => {
    if (value.includes(source)) {
      onChange(value.filter((s) => s !== source));
    } else {
      onChange([...value, source]);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
          value.length > 0
            ? "bg-red-600/20 text-red-400 border-red-500/30"
            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
        )}
      >
        Kaynak {value.length > 0 && `(${value.length})`}
        <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {value.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="ml-1 p-1 rounded-full hover:bg-muted text-muted-foreground"
          title="Temizle"
        >
          <X size={12} />
        </button>
      )}

      {open && (
        <div className="absolute top-full left-0 mt-1 w-56 max-h-64 overflow-y-auto rounded-lg border bg-card shadow-lg z-20">
          {ALL_SOURCES.map((source) => (
            <button
              key={source}
              onClick={() => toggle(source)}
              className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left hover:bg-muted/50 transition-colors"
            >
              <div className={cn(
                "w-4 h-4 rounded border flex items-center justify-center shrink-0",
                value.includes(source) ? "bg-red-600 border-red-600" : "border-muted-foreground/30"
              )}>
                {value.includes(source) && <Check size={10} className="text-white" />}
              </div>
              {source}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
