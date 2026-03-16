"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, AlertTriangle, Newspaper, RefreshCw, Clock, X, ArrowUpDown, Bell } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";
import { NewsListItem } from "@/components/news/news-list-item";
import { CategoryFilter } from "@/components/news/category-filter";
import { ViewToggle, type ViewMode } from "@/components/news/view-toggle";
import { DateFilter, type DateRange } from "@/components/news/date-filter";
import { SourceFilter } from "@/components/news/source-filter";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  perspective?: string | null;
  publishedAt: string;
  imageUrl: string | null;
}

const PAGE_SIZE = 12;
const SEARCH_HISTORY_KEY = "iransavas-search-history";
const VIEW_MODE_KEY = "iransavas-view-mode";
const MAX_HISTORY = 5;
const LIVE_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

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

function getSavedViewMode(): ViewMode {
  if (typeof window === "undefined") return "grid";
  return (localStorage.getItem(VIEW_MODE_KEY) as ViewMode) || "grid";
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "az önce";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} dk önce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;
  return `${Math.floor(hours / 24)} gün önce`;
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
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get("search") || "");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // New state for enhanced features
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [hasNewArticles, setHasNewArticles] = useState(false);
  const latestArticleRef = useRef<string | null>(null);

  // Infinite scroll sentinel
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Load saved preferences on mount
  useEffect(() => {
    setSearchHistory(getSearchHistory());
    setViewMode(getSavedViewMode());
  }, []);

  // Save view mode preference
  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(VIEW_MODE_KEY, mode);
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
    const qs = params.toString();
    router.replace(`/haberler${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [debouncedSearch, category, router]);

  // Debounce search input (300ms)
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      resetAndFetch();
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

  function resetAndFetch() {
    setPage(1);
    setArticles([]);
    setHasMore(true);
  }

  // Reset on filter changes
  useEffect(() => {
    resetAndFetch();
  }, [category, dateRange, selectedSources, sort, retryKey]);

  // Build query string
  function buildParams(pageNum: number): URLSearchParams {
    const params = new URLSearchParams({
      page: pageNum.toString(),
      pageSize: PAGE_SIZE.toString(),
      sort,
    });
    if (category !== "TUMU") params.set("category", category);
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (dateRange !== "all") params.set("dateRange", dateRange);
    if (selectedSources.length > 0) params.set("source", selectedSources.join(","));
    return params;
  }

  // Fetch articles
  useEffect(() => {
    if (page === 0) return; // skip initial double-render
    const controller = new AbortController();

    const fetchNews = async () => {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);

      try {
        const params = buildParams(page);
        const res = await fetch(`/api/news?${params}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const newArticles: Article[] = json.data || [];
        const newTotal = json.meta?.total || 0;

        if (page === 1) {
          setArticles(newArticles);
          if (newArticles.length > 0) {
            latestArticleRef.current = newArticles[0].id;
          }
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
        }
        setTotal(newTotal);
        setHasMore(newArticles.length === PAGE_SIZE);
        setLastUpdated(new Date());
        setHasNewArticles(false);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError("Haberler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchNews();
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category, debouncedSearch, dateRange, selectedSources, sort, retryKey]);

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading, loadingMore]);

  // Live update check (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const params = buildParams(1);
        const res = await fetch(`/api/news?${params}`);
        if (!res.ok) return;
        const json = await res.json();
        const latest = json.data?.[0];
        if (latest && latestArticleRef.current && latest.id !== latestArticleRef.current) {
          setHasNewArticles(true);
        }
      } catch {
        // silent fail
      }
    }, LIVE_CHECK_INTERVAL);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, debouncedSearch, dateRange, selectedSources, sort]);

  const handleRefresh = () => {
    setHasNewArticles(false);
    resetAndFetch();
    setRetryKey((k) => k + 1);
  };

  const selectFromHistory = (query: string) => {
    setSearch(query);
    setDebouncedSearch(query);
    resetAndFetch();
    setShowHistory(false);
    saveSearchHistory(query);
    setSearchHistory(getSearchHistory());
  };

  const handleRemoveHistory = (e: React.MouseEvent, query: string) => {
    e.stopPropagation();
    removeFromHistory(query);
    setSearchHistory(getSearchHistory());
  };

  // Breaking news ticker — articles from last hour
  const breakingArticles = articles.filter(
    (a) => new Date(a.publishedAt).getTime() > Date.now() - 3600000
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breaking News Ticker */}
      {breakingArticles.length > 0 && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/5 p-3 overflow-hidden">
          <div className="flex items-center gap-3">
            <span className="shrink-0 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white animate-pulse">
              SON DAKİKA
            </span>
            <div className="overflow-hidden">
              <div className="flex gap-8 animate-marquee whitespace-nowrap">
                {breakingArticles.map((a) => (
                  <span key={a.id} className="text-sm text-red-400 font-medium">
                    {a.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold mb-2">Haberler</h1>
          <p className="text-muted-foreground">İran savaşı ile ilgili son gelişmeler ve haberler</p>
        </div>
        {/* Live update indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-muted-foreground">
            Son güncelleme: {timeAgo(lastUpdated)}
          </span>
          {hasNewArticles && (
            <Button size="sm" variant="outline" onClick={handleRefresh} className="text-xs border-red-500/30 text-red-400 hover:bg-red-500/10">
              <Bell size={14} className="mr-1.5 animate-bounce" />
              Yeni haberler var — Güncelle
            </Button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="mb-4 flex flex-col gap-3">
        {/* Row 1: Category + Search + View Toggle */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CategoryFilter selected={category} onChange={(c) => setCategory(c)} />
          <div className="flex items-center gap-2">
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
                className="w-full sm:w-64 rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        aria-label={`"${item}" aramasını geçmişten sil`}
                      >
                        <X size={12} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ViewToggle value={viewMode} onChange={handleViewChange} />
          </div>
        </div>

        {/* Row 2: Date filter + Source filter + Sort */}
        <div className="flex flex-wrap items-center gap-2">
          <DateFilter value={dateRange} onChange={setDateRange} />
          <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
          <SourceFilter value={selectedSources} onChange={setSelectedSources} />
          <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
          <button
            onClick={() => setSort(sort === "newest" ? "oldest" : "newest")}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
          >
            <ArrowUpDown size={12} />
            {sort === "newest" ? "En Yeni" : "En Eski"}
          </button>
          {/* Active filter count */}
          {(dateRange !== "all" || selectedSources.length > 0 || sort !== "newest") && (
            <button
              onClick={() => { setDateRange("all"); setSelectedSources([]); setSort("newest"); }}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      {!loading && !error && total > 0 && (
        <div className="mb-4 text-xs text-muted-foreground">
          {total} haber bulundu
        </div>
      )}

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
        <div className={
          viewMode === "list"
            ? "flex flex-col gap-3"
            : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        }>
          {Array.from({ length: 6 }).map((_, i) => (
            viewMode === "list" ? (
              <div key={i} className="flex gap-4 rounded-lg border bg-card p-3">
                <div className="w-24 h-20 shrink-0 animate-pulse rounded-md bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-full animate-pulse rounded bg-muted" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ) : (
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
            )
          ))}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {articles.length > 0 ? (
            <>
              {/* Magazine View */}
              {viewMode === "magazine" && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Hero card */}
                  <div className="lg:col-span-2">
                    <NewsCard
                      key={articles[0].id}
                      {...articles[0]}
                      searchQuery={debouncedSearch || undefined}
                    />
                  </div>
                  {/* Side cards */}
                  <div className="flex flex-col gap-4">
                    {articles.slice(1, 4).map((article) => (
                      <NewsListItem
                        key={article.id}
                        {...article}
                        searchQuery={debouncedSearch || undefined}
                      />
                    ))}
                  </div>
                  {/* Rest in grid */}
                  {articles.length > 4 && (
                    <div className="lg:col-span-3 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {articles.slice(4).map((article) => (
                        <NewsCard
                          key={article.id}
                          {...article}
                          searchQuery={debouncedSearch || undefined}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Grid View */}
              {viewMode === "grid" && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article) => (
                    <NewsCard
                      key={article.id}
                      {...article}
                      searchQuery={debouncedSearch || undefined}
                    />
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="flex flex-col gap-3">
                  {articles.map((article) => (
                    <NewsListItem
                      key={article.id}
                      {...article}
                      searchQuery={debouncedSearch || undefined}
                    />
                  ))}
                </div>
              )}

              {/* Infinite Scroll Sentinel */}
              <div ref={sentinelRef} className="h-px" />

              {/* Loading more indicator */}
              {loadingMore && (
                <div className="flex justify-center py-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <RefreshCw size={16} className="animate-spin" />
                    Daha fazla yükleniyor...
                  </div>
                </div>
              )}

              {/* End of results */}
              {!hasMore && articles.length > PAGE_SIZE && (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Tüm haberler yüklendi ({total} haber)
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Newspaper className="mb-4 h-12 w-12 text-muted-foreground/40" />
              <h3 className="mb-2 text-lg font-semibold">Haber Bulunamadı</h3>
              <p className="mb-4 max-w-md text-sm text-muted-foreground">
                {debouncedSearch
                  ? `"${debouncedSearch}" için sonuç bulunamadı. Farklı anahtar kelimeler deneyin.`
                  : "Bu kategoride henüz haber bulunmuyor."}
              </p>
              {(debouncedSearch || category !== "TUMU" || dateRange !== "all" || selectedSources.length > 0) && (
                <Button variant="outline" onClick={() => {
                  setSearch(""); setDebouncedSearch(""); setCategory("TUMU");
                  setDateRange("all"); setSelectedSources([]); setSort("newest");
                }}>
                  Filtreleri Temizle
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
