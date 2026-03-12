"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, AlertTriangle, Newspaper, RefreshCw, Clock, X } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";
import { CategoryFilter } from "@/components/news/category-filter";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  publishedAt: string;
  imageUrl: string | null;
}

const PAGE_SIZE = 12;
const SEARCH_HISTORY_KEY = "iransavas-search-history";
const MAX_HISTORY = 5;

function getSearchHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSearchHistory(query: string) {
  if (!query.trim()) return;
  const history = getSearchHistory().filter((h) => h !== query);
  history.unshift(query);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}

function removeFromHistory(query: string) {
  const history = getSearchHistory().filter((h) => h !== query);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

export default function HaberlerPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-8 w-48 animate-pulse rounded bg-muted mb-8" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card">
              <div className="h-32 animate-pulse bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <HaberlerContent />
    </Suspense>
  );
}

function HaberlerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState(searchParams.get("category") || "TUMU");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("search") || "");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load search history on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  // Close history dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category !== "TUMU") params.set("category", category);
    if (page > 1) params.set("page", page.toString());
    const qs = params.toString();
    router.replace(`/haberler${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [debouncedSearch, category, page, router]);

  // Debounce search input (300ms)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setPage(1);
      if (value.trim()) {
        saveSearchHistory(value.trim());
        setSearchHistory(getSearchHistory());
      }
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page: page.toString(), pageSize: PAGE_SIZE.toString() });
        if (category !== "TUMU") params.set("category", category);
        if (debouncedSearch) params.set("search", debouncedSearch);
        const res = await fetch(`/api/news?${params}`, { signal: controller.signal });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        setArticles(json.data || []);
        setTotal(json.meta?.total || 0);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Haberler yuklenirken bir hata olustu. Lutfen tekrar deneyin.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    return () => controller.abort();
  }, [category, page, debouncedSearch, retryKey]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const selectFromHistory = (query: string) => {
    setSearch(query);
    setDebouncedSearch(query);
    setPage(1);
    setShowHistory(false);
    saveSearchHistory(query);
    setSearchHistory(getSearchHistory());
  };

  const handleRemoveHistory = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    removeFromHistory(query);
    setSearchHistory(getSearchHistory());
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Haberler</h1>
        <p className="text-muted-foreground">Iran savasi ile ilgili son gelismeler ve haberler</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter selected={category} onChange={(c) => { setCategory(c); setPage(1); }} />
        <div className="relative w-full sm:w-auto" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="news-search" className="sr-only">Haberlerde ara</label>
          <input
            id="news-search"
            type="text"
            placeholder="Haberlerde ara..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => searchHistory.length > 0 && setShowHistory(true)}
            className="w-full sm:w-72 rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Search History Dropdown */}
          {showHistory && searchHistory.length > 0 && !search && (
            <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border bg-card shadow-lg z-10">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground border-b">
                Son Aramalar
              </div>
              {searchHistory.map((item) => (
                <div
                  key={item}
                  role="option"
                  tabIndex={0}
                  onClick={() => selectFromHistory(item)}
                  onKeyDown={(e) => { if (e.key === "Enter") selectFromHistory(item); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Clock size={14} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="flex-1 truncate">{item}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveHistory(e, item)}
                    className="shrink-0 p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                    aria-label={`"${item}" aramasini gecmisten sil`}
                  >
                    <X size={12} aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertTriangle className="mb-4 h-12 w-12 text-red-500/60" />
          <p className="mb-4 text-muted-foreground">{error}</p>
          <Button variant="outline" onClick={() => { setError(null); setRetryKey((k) => k + 1); }}>
            <RefreshCw className="mr-2 h-4 w-4" /> Tekrar Dene
          </Button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card">
              <div className="h-32 animate-pulse bg-muted" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                <div className="flex justify-between">
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <NewsCard key={article.id} {...article} publishedAt={article.publishedAt} searchQuery={debouncedSearch || undefined} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Newspaper className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="mb-2 text-lg font-semibold">Haber Bulunamadi</h3>
              <p className="mb-4 max-w-md text-sm text-muted-foreground">
                {debouncedSearch
                  ? `"${debouncedSearch}" icin sonuc bulunamadi. Farkli anahtar kelimeler deneyin.`
                  : "Bu kategoride henuz haber bulunmuyor."}
              </p>
              {(debouncedSearch || category !== "TUMU") && (
                <Button variant="outline" onClick={() => { setSearch(""); setDebouncedSearch(""); setCategory("TUMU"); setPage(1); }}>
                  Filtreleri Temizle
                </Button>
              )}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Onceki
              </Button>
              <span className="text-sm text-muted-foreground">
                Sayfa {page} / {totalPages} ({total} haber)
              </span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                Sonraki
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
