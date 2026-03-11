import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("tr-TR").format(num);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function highlightText(text: string, query: string): { parts: { text: string; highlight: boolean }[] } {
  if (!query.trim()) return { parts: [{ text, highlight: false }] };
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex).filter(Boolean).map((part) => ({
    text: part,
    highlight: regex.test(part) && (regex.lastIndex = 0, true),
  }));
  // Reset lastIndex side effect fix
  return { parts: parts.map((p) => ({ text: p.text, highlight: p.text.toLowerCase() === query.toLowerCase() })) };
}
