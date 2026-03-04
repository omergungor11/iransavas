import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";

interface Article {
  id: string;
  title: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  publishedAt: string;
}

interface LatestNewsProps {
  articles: Article[];
}

export function LatestNews({ articles }: LatestNewsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Son Haberler</h2>
        <Link href="/haberler" className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300">
          Tum Haberleri Gor <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} {...article} publishedAt={article.publishedAt} />
        ))}
      </div>
    </section>
  );
}
