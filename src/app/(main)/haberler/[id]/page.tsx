export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { id: string };
}

export default async function HaberDetayPage({ params }: Props) {
  const article = await prisma.newsArticle.findUnique({ where: { id: params.id } });
  if (!article) notFound();

  const related = await prisma.newsArticle.findMany({
    where: { category: article.category, id: { not: article.id } },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/haberler" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Haberlere Don
      </Link>

      <article className="mt-4">
        <div className="mb-4 flex items-center gap-3">
          <Badge>{article.category}</Badge>
          <span className="text-sm text-muted-foreground">{article.source}</span>
          <span className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        {article.aiSummary && (
          <Card className="mb-6 border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-red-400">AI Ozet</CardTitle>
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
          {article.content.split("\n").map((p, i) => (
            <p key={i} className="mb-4 text-sm leading-relaxed text-foreground/90">{p}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Ilgili Haberler</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {related.map((r) => (
              <Link key={r.id} href={`/haberler/${r.id}`}>
                <Card className="transition-all hover:border-red-500/30">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-semibold mb-1">{r.title}</h3>
                    <p className="text-xs text-muted-foreground">{r.source} - {formatDate(r.publishedAt)}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
