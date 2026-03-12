"use client";

import { cn } from "@/lib/utils";

const CATEGORIES = [
  { value: "TUMU", label: "Tümü" },
  { value: "GENEL", label: "Genel" },
  { value: "ASKERI", label: "Askerî" },
  { value: "SIYASI", label: "Siyasî" },
  { value: "EKONOMI", label: "Ekonomi" },
  { value: "INSANI_YARDIM", label: "İnsanî Yardım" },
  { value: "DIPLOMASI", label: "Diplomasi" },
];

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            selected === cat.value
              ? "bg-red-600 text-white"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
