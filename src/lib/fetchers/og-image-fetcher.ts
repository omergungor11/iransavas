import * as cheerio from "cheerio";
import prisma from "@/lib/prisma";

/**
 * Fetch og:image from a URL's HTML meta tags
 */
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; IranSavas-Bot/1.0)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(10_000),
      redirect: "follow",
    });

    if (!res.ok) return null;

    // Only read first 50KB to find meta tags (they're in <head>)
    const reader = res.body?.getReader();
    if (!reader) return null;

    let html = "";
    const decoder = new TextDecoder();
    while (html.length < 50_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
    }
    reader.cancel();

    const $ = cheerio.load(html);

    // Try og:image first, then twitter:image
    const ogImage =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[name="twitter:image:src"]').attr("content") ||
      $('meta[property="og:image:url"]').attr("content");

    if (!ogImage) return null;

    // Make absolute if relative
    if (ogImage.startsWith("//")) return `https:${ogImage}`;
    if (ogImage.startsWith("/")) {
      const base = new URL(url);
      return `${base.origin}${ogImage}`;
    }
    if (ogImage.startsWith("http")) return ogImage;

    return null;
  } catch {
    return null;
  }
}

/**
 * Backfill imageUrl for articles that have a sourceUrl but no imageUrl
 */
export async function backfillOgImages(limit = 20): Promise<number> {
  const articles = await prisma.newsArticle.findMany({
    where: {
      imageUrl: null,
      sourceUrl: { not: null },
    },
    select: { id: true, sourceUrl: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });

  if (articles.length === 0) return 0;

  let updated = 0;

  // Process in batches of 5 to avoid overwhelming
  for (let i = 0; i < articles.length; i += 5) {
    const batch = articles.slice(i, i + 5);
    const results = await Promise.allSettled(
      batch.map(async (article) => {
        if (!article.sourceUrl) return null;
        const imageUrl = await fetchOgImage(article.sourceUrl);
        if (imageUrl) {
          await prisma.newsArticle.update({
            where: { id: article.id },
            data: { imageUrl },
          });
          return imageUrl;
        }
        return null;
      })
    );

    for (const result of results) {
      if (result.status === "fulfilled" && result.value) updated++;
    }
  }

  console.log(`[OG-Image] Backfilled ${updated}/${articles.length} articles with og:image`);
  return updated;
}
