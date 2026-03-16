"use client";

import { cn } from "@/lib/utils";

const PERSPECTIVE_COLORS: Record<string, string> = {
  "Türk Medyası": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Batı Medyası": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "İran Resmî": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "İsrail Medyası": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Bağımsız": "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

interface PerspectiveBadgeProps {
  perspective: string;
  className?: string;
}

export function PerspectiveBadge({ perspective, className }: PerspectiveBadgeProps) {
  const colors = PERSPECTIVE_COLORS[perspective] || PERSPECTIVE_COLORS["Bağımsız"];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-1.5 py-0 text-[10px] font-medium leading-4",
        colors,
        className
      )}
    >
      {perspective}
    </span>
  );
}
