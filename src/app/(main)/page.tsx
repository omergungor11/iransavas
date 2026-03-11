import prisma from "@/lib/prisma";
import { LatestNews } from "@/components/home/latest-news";
import { InteractiveSections, BottomSections } from "@/components/home/home-sections";

export default async function HomePage() {
  let articles: {
    id: string;
    title: string;
    summary: string | null;
    aiSummary: string | null;
    source: string;
    category: string;
    publishedAt: string;
    imageUrl: string | null;
  }[] = [];
  let articlesError = false;

  try {
    const rows = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        summary: true,
        aiSummary: true,
        source: true,
        category: true,
        publishedAt: true,
        imageUrl: true,
      },
    });
    articles = rows.map((r) => ({
      ...r,
      publishedAt: r.publishedAt.toISOString(),
    }));
  } catch (err) {
    console.error("[HomePage] articles fetch error:", err);
    articlesError = true;
  }

  return (
    <div>
      <InteractiveSections />

      <LatestNews articles={articles} error={articlesError} />

      <BottomSections />
    </div>
  );
}
