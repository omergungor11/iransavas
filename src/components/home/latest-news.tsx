import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";

interface Article {
  id: string;
  title: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  publishedAt: string;
  imageUrl?: string | null;
}

interface LatestNewsProps {
  articles: Article[];
  error?: boolean;
}

export function LatestNews({ articles, error }: LatestNewsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Son Haberler</h2>
        <Link href="/haberler" className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300">
          Tüm Haberleri Gör <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {error ? (
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card/50 p-6">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Haberler yüklenemedi</p>
            <p className="text-xs text-muted-foreground mt-0.5">Sayfayı yenileyerek tekrar deneyin.</p>
          </div>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Henüz haber yok.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.id} {...article} publishedAt={article.publishedAt} />
          ))}
        </div>
      )}
    </section>
  );
}
