import type { NewsSource } from "./sources";
import type { FetchedArticle } from "./rss-fetcher";

interface NewsApiArticle {
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

export async function fetchFromNewsApi(source: NewsSource): Promise<FetchedArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.log(`[NewsAPI] Skipping ${source.name}: No API key configured`);
    return [];
  }

  const articles: FetchedArticle[] = [];

  try {
    console.log(`[NewsAPI] Fetching: ${source.name}`);

    const params = new URLSearchParams({
      q: source.newsApiQuery || "Iran war",
      language: source.language === "tr" ? "tr" : "en",
      sortBy: "publishedAt",
      pageSize: "20",
      apiKey,
    });

    const res = await fetch(`${source.url}?${params}`, {
      headers: { "User-Agent": "IranSavas-NewsBot/1.0" },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[NewsAPI] ${source.name} HTTP ${res.status}: ${text.slice(0, 200)}`);
      return [];
    }

    const data: NewsApiResponse = await res.json();

    if (data.status !== "ok") {
      console.error(`[NewsAPI] ${source.name} status: ${data.status}`);
      return [];
    }

    for (const item of data.articles) {
      if (!item.title || item.title === "[Removed]") continue;

      articles.push({
        title: item.title,
        content: item.content || item.description || "",
        summary: item.description || "",
        sourceId: source.id,
        sourceName: item.source.name || source.name,
        sourceUrl: item.url,
        category: source.category,
        publishedAt: new Date(item.publishedAt),
        imageUrl: item.urlToImage || null,
        language: source.language,
      });
    }

    console.log(`[NewsAPI] ${source.name}: ${articles.length} articles found`);
  } catch (error) {
    console.error(`[NewsAPI] Error fetching ${source.name}:`, error instanceof Error ? error.message : error);
  }

  return articles;
}
