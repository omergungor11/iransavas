"use client";

import { useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
}

export function Sheet({ open, onClose, children, side = "left" }: SheetProps) {
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, handleEsc]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          "absolute top-0 bottom-0 w-80 bg-gray-950 border-r border-white/10 shadow-xl overflow-y-auto transition-transform",
          side === "left" ? "left-0" : "right-0 border-r-0 border-l",
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-md p-1 text-gray-400 hover:text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
