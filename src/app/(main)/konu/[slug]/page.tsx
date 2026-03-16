"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getTopicBySlug, TOPIC_HUBS } from "@/lib/data/topic-hubs";

interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  source: string;
  category: string;
  publishedAt: string;
  perspective?: string;
}

export default function TopicHubPage() {
  const params = useParams();
  const slug = params.slug as string;
  const topic = getTopicBySlug(slug);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!topic) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Fetch articles for each keyword and merge
        const allArticles: Article[] = [];
        const seenIds = new Set<string>();

        for (const keyword of topic.keywords.slice(0, 3)) {
          const res = await fetch(
            `/api/news?search=${encodeURIComponent(keyword)}&pageSize=6`
          );
          const json = await res.json();
          if (json.data) {
            for (const article of json.data as Article[]) {
              if (!seenIds.has(article.id)) {
                seenIds.add(article.id);
                allArticles.push(article);
              }
            }
          }
        }

        // Sort by date
        allArticles.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        setArticles(allArticles);
      } catch (err) {
        console.error("[TopicHub] fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [topic]);

  if (!topic) {
    // Unknown slug — show 404-like page
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Konu Bulunamadi</h1>
        <p className="text-muted-foreground mb-6">Bu konu henuz tanimlanmamis.</p>
        <Link
          href="/konu"
          className="text-sm text-red-400 hover:text-red-300 inline-flex items-center gap-1"
        >
          <ArrowLeft size={14} /> Tum Konular
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/konu"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-white mb-6"
      >
        <ArrowLeft size={14} /> Tum Konular
      </Link>

      {/* Topic Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
        <p className="text-muted-foreground max-w-2xl">{topic.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {topic.keywords.map((kw) => (
            <Badge key={kw} variant="secondary">
              {kw}
            </Badge>
          ))}
        </div>
        {topic.relatedExplainer && (
          <Link
            href={topic.relatedExplainer}
            className="mt-3 inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
          >
            <ExternalLink size={14} /> Ilgili Aciklama Sayfasi
          </Link>
        )}
      </div>

      {/* Articles Grid */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Newspaper size={18} /> Ilgili Haberler
      </h2>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : articles.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Bu konuyla ilgili haber bulunamadi.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/haberler/${article.slug}`}>
              <Card className="h-full transition-colors hover:border-white/20 hover:bg-white/[0.02]">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm leading-snug line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {article.summary && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {article.summary}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{article.source}</span>
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  {article.perspective && (
                    <Badge variant="outline" className="mt-2 text-[10px]">
                      {article.perspective}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
