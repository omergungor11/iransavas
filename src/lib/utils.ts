import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
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
  const segments = text.split(regex).filter(Boolean);
  const lowerQuery = query.toLowerCase();
  return {
    parts: segments.map((segment) => ({
      text: segment,
      highlight: segment.toLowerCase() === lowerQuery,
    })),
  };
}
