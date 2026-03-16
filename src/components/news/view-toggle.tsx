"use client";

import { LayoutGrid, List, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list" | "magazine";

const VIEW_OPTIONS: { value: ViewMode; icon: typeof LayoutGrid; label: string }[] = [
  { value: "grid", icon: LayoutGrid, label: "Grid" },
  { value: "list", icon: List, label: "Liste" },
  { value: "magazine", icon: Newspaper, label: "Magazin" },
];

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center rounded-lg border bg-card p-1 gap-0.5">
      {VIEW_OPTIONS.map((opt) => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            title={opt.label}
            className={cn(
              "rounded-md p-1.5 transition-colors",
              value === opt.value
                ? "bg-red-600 text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}
