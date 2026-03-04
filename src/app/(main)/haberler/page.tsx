"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
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

export default function HaberlerPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState("TUMU");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: page.toString(), pageSize: "12" });
        if (category !== "TUMU") params.set("category", category);
        if (search) params.set("search", search);
        const res = await fetch(`/api/news?${params}`);
        const json = await res.json();
        setArticles(json.data || []);
        setTotal(json.meta?.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category, page, search]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Haberler</h1>
        <p className="text-muted-foreground">Iran savasi ile ilgili son gelismeler ve haberler</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CategoryFilter selected={category} onChange={(c) => { setCategory(c); setPage(1); }} />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Haberlerde ara..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="rounded-lg border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <NewsCard key={article.id} {...article} publishedAt={article.publishedAt} />
            ))}
          </div>
          {articles.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">Haber bulunamadi.</p>
          )}
          {total > 12 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>Onceki</Button>
              <span className="flex items-center px-4 text-sm text-muted-foreground">Sayfa {page} / {Math.ceil(total / 12)}</span>
              <Button variant="outline" disabled={page * 12 >= total} onClick={() => setPage(page + 1)}>Sonraki</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
