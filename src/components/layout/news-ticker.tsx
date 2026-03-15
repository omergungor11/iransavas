"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

interface TickerArticle {
  id: string;
  title: string;
  source: string;
  category: string;
  publishedAt: string;
}

const REFRESH_INTERVAL = 120_000; // 2 minutes

export function NewsTicker() {
  const [articles, setArticles] = useState<TickerArticle[]>([]);

  const fetchArticles = useCallback(async () => {
    try {
      const res = await fetch("/api/news?pageSize=10&page=1");
      if (!res.ok) return;
      const json = await res.json();
      if (json.data?.length) {
        setArticles(json.data);
      }
    } catch {
      // non-critical
    }
  }, []);

  useEffect(() => {
    fetchArticles();
    const interval = setInterval(fetchArticles, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchArticles]);

  if (articles.length === 0) return null;

  // Duplicate items for seamless loop
  const items = [...articles, ...articles];

  return (
    <div className="relative w-full bg-zinc-950 border-b border-white/[0.04] overflow-hidden h-8 flex items-center">
      {/* Label */}
      <div className="shrink-0 flex items-center gap-1.5 px-3 h-full bg-red-600 z-10">
        <Zap size={12} className="text-white" fill="currentColor" />
        <span className="text-[10px] font-bold tracking-widest text-white uppercase whitespace-nowrap">
          Son Dakika
        </span>
      </div>

      {/* Scrolling area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-track flex items-center gap-6 whitespace-nowrap">
          {items.map((a, i) => (
            <Link
              key={`${a.id}-${i}`}
              href={`/haberler/${a.id}`}
              className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors shrink-0"
            >
              <span className="h-1 w-1 rounded-full bg-red-500 shrink-0" />
              <span className="font-medium text-zinc-300">{a.title}</span>
              <span className="text-[10px] text-zinc-600">{a.source}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
