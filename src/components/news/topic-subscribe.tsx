"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";

const TOPICS = [
  { id: "nukleer", label: "Nukleer" },
  { id: "hava-saldirisi", label: "Hava Saldirisi" },
  { id: "deniz-operasyonu", label: "Deniz Operasyonu" },
  { id: "diplomasi", label: "Diplomasi" },
  { id: "siber", label: "Siber" },
  { id: "ekonomi", label: "Ekonomi" },
  { id: "insani-kriz", label: "Insani Kriz" },
] as const;

const STORAGE_KEY = "iransavas-topic-prefs";

export function getTopicPrefs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveTopicPrefs(prefs: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new Event("topic-prefs-changed"));
}

export function TopicSubscribe() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(getTopicPrefs());
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const toggle = (topicId: string) => {
    const next = selected.includes(topicId)
      ? selected.filter((s) => s !== topicId)
      : [...selected, topicId];
    setSelected(next);
    saveTopicPrefs(next);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={[
          "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
          selected.length > 0
            ? "bg-red-600/20 text-red-400 border border-red-500/30"
            : "bg-secondary text-muted-foreground hover:bg-secondary/80",
        ].join(" ")}
        title="Konu Tercihleri"
      >
        <Bell size={12} />
        Konular
        {selected.length > 0 && (
          <span className="ml-0.5 rounded-full bg-red-500/30 px-1.5 text-[10px]">
            {selected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-lg border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b px-3 py-2">
            <span className="text-sm font-medium">Konu Tercihleri</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded p-0.5 hover:bg-muted text-muted-foreground"
            >
              <X size={14} />
            </button>
          </div>
          <div className="p-3 space-y-2">
            <p className="text-[11px] text-muted-foreground mb-2">
              Ilgilendiginiz konulari secin. Yeni haberler geldiginde bildirim alacaksiniz.
            </p>
            {TOPICS.map((topic) => (
              <label
                key={topic.id}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(topic.id)}
                  onChange={() => toggle(topic.id)}
                  className="h-3.5 w-3.5 rounded border-zinc-600 bg-zinc-800 text-red-500 focus:ring-red-500 focus:ring-offset-0"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {topic.label}
                </span>
              </label>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="border-t px-3 py-2">
              <button
                type="button"
                onClick={() => {
                  setSelected([]);
                  saveTopicPrefs([]);
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Tumu Temizle
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
