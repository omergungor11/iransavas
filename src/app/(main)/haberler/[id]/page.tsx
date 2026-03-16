export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Share2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { createMetadata } from "@/lib/seo";
import { PerspectiveBadge } from "@/components/news/perspective-badge";
import { getPerspectiveBySourceName } from "@/lib/fetchers/sources";
import { SocialShareButtons } from "@/components/news/social-share";

interface Props {
  params: { id: string };
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await prisma.newsArticle.findUnique({
    where: { id: params.id },
    select: { title: true, summary: true, aiSummary: true, imageUrl: true },
  });
  if (!article) return createMetadata({ title: "Haber Bulunamadı" });

  return createMetadata({
    title: article.title,
    description: article.aiSummary || article.summary || article.title,
    image: article.imageUrl || undefined,
    path: `/haberler/${params.id}`,
  });
}

export default async function HaberDetayPage({ params }: Props) {
  const article = await prisma.newsArticle.findUnique({ where: { id: params.id } });
  if (!article) notFound();

  const perspective = article.perspective || getPerspectiveBySourceName(article.source);
  const readingTime = estimateReadingTime(article.content || article.summary || "");
  const isBreaking = article.publishedAt.getTime() > Date.now() - 3600000;
  const shareUrl = `https://iransavas.vercel.app/haberler/${article.id}`;

  const related = await prisma.newsArticle.findMany({
    where: { category: article.category, id: { not: article.id } },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/haberler" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Haberlere Dön
      </Link>

      <article className="mt-4">
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          {isBreaking && (
            <Badge variant="destructive" className="animate-pulse">SON DAKİKA</Badge>
          )}
          <Badge>{article.category}</Badge>
          <PerspectiveBadge perspective={perspective} />
          <span className="text-sm text-muted-foreground">{article.source}</span>
          <span className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock size={14} />
            {readingTime} dk okuma
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        {article.imageUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Social Share */}
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Share2 size={14} /> Paylaş:
          </span>
          <SocialShareButtons url={shareUrl} title={article.title} />
        </div>

        {article.aiSummary && (
          <Card className="mb-6 border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-400">AI Özet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{article.aiSummary}</p>
            </CardContent>
          </Card>
        )}

        {article.summary && (
          <p className="mb-6 text-lg text-muted-foreground leading-relaxed">{article.summary}</p>
        )}

        <div className="prose prose-invert max-w-none">
          {(article.content || "").split("\n").map((p, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-foreground/90">{p}</p>
          ))}
        </div>

        {/* Source link */}
        {article.sourceUrl && (
          <div className="mt-6 pt-4 border-t">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Orijinal haberi oku →
            </a>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">İlgili Haberler</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.id} href={`/haberler/${r.id}`}>
                <Card className="group overflow-hidden transition-all hover:border-red-500/30">
                  <div className="flex">
                    {r.imageUrl && (
                      <div className="relative w-24 h-20 shrink-0">
                        <Image
                          src={r.imageUrl}
                          alt={r.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                    )}
                    <CardContent className="p-3 flex-1">
                      <h3 className="text-sm font-semibold mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.source} - {formatDate(r.publishedAt)}</p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
