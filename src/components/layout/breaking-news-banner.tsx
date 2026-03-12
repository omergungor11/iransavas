"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { AlertTriangle, X } from "lucide-react";

interface BreakingArticle {
  id: string;
  title: string;
  publishedAt: string;
}

const REFRESH_INTERVAL = 60_000; // 60 seconds
const DISMISSED_KEY = "iransavas-dismissed-breaking";

export function BreakingNewsBanner() {
  const [article, setArticle] = useState<BreakingArticle | null>(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const articleIdRef = useRef<string | null>(null);

  const fetchBreaking = useCallback(async () => {
    try {
      const res = await fetch("/api/news?pageSize=1&page=1");
      if (!res.ok) return;
      const json = await res.json();
      const latest = json.data?.[0];
      if (!latest) return;

      const publishedAt = new Date(latest.publishedAt);
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      if (publishedAt < twoHoursAgo) return;

      const dismissed = sessionStorage.getItem(DISMISSED_KEY);
      if (dismissed === latest.id) return;

      if (articleIdRef.current !== latest.id) {
        articleIdRef.current = latest.id;
        setArticle(latest);
        setAnimating(true);
        setVisible(true);
        setTimeout(() => setAnimating(false), 500);
      }
    } catch {
      // Silently fail — non-critical feature
    }
  }, []);

  useEffect(() => {
    fetchBreaking();
    const interval = setInterval(fetchBreaking, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchBreaking]);

  const dismiss = () => {
    if (article) {
      sessionStorage.setItem(DISMISSED_KEY, article.id);
    }
    setVisible(false);
  };

  if (!visible || !article) return null;

  return (
    <div
      className={[
        "fixed bottom-0 left-0 right-0 z-50 border-t border-red-800/60 bg-red-950/95 backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        animating ? "translate-y-full opacity-0 animate-slide-up" : "translate-y-0 opacity-100",
      ].join(" ")}
      role="alert"
      aria-live="assertive"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <AlertTriangle size={16} className="text-red-400" aria-hidden="true" />
          <span className="text-xs font-bold tracking-widest text-red-400 uppercase hidden sm:inline">
            Son Dakika
          </span>
        </div>

        <Link
          href={`/haberler/${article.id}`}
          className="flex-1 text-sm font-medium text-white hover:text-red-300 transition-colors truncate"
        >
          {article.title}
        </Link>

        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 flex items-center justify-center w-7 h-7 rounded text-zinc-400 hover:text-white hover:bg-red-900/50 transition-colors"
          aria-label="Son dakika bannerini kapat"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
