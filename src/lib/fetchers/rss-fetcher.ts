import RssParser from "rss-parser";
import type { NewsSource } from "./sources";

const parser = new RssParser({
  timeout: 15000,
  headers: {
    "User-Agent": "IranSavas-NewsBot/1.0",
    Accept: "application/rss+xml, application/xml, text/xml",
  },
});

export interface FetchedArticle {
  title: string;
  content: string;
  summary: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  category: string;
  publishedAt: Date;
  imageUrl: string | null;
  language: string;
}

const IRAN_KEYWORDS = [
  // English
  "iran", "iranian", "tehran", "persian gulf", "hormuz", "strait of hormuz",
  "isfahan", "khamenei", "irgc", "revolutionary guard", "bushehr",
  "natanz", "tabriz", "ahvaz", "iran war", "iran strike",
  "iran military", "iran nuclear", "iran sanction", "iran conflict",
  "iran bomb", "iran attack", "iran missile", "iran drone",
  "middle east conflict", "hegseth iran", "centcom iran",
  // Turkish
  "İran", "tahran", "basra körfezi", "hürmüz", "hamaney",
  "devrim muhafızları", "buşehr", "tebriz",
  "savaş", "çatışma", "saldırı", "bombardıman", "füze", "hava saldırısı",
];

function isIranRelated(title: string, content: string): boolean {
  const text = `${title} ${content}`.toLowerCase();
  return IRAN_KEYWORDS.some((keyword) => text.includes(keyword.toLowerCase()));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-üöçşığ]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");
}

export async function fetchFromRss(source: NewsSource): Promise<FetchedArticle[]> {
  const articles: FetchedArticle[] = [];

  try {
    console.log(`[RSS] Fetching: ${source.name} (${source.url})`);
    const feed = await parser.parseURL(source.url);
    console.log(`[RSS] ${source.name}: ${feed.items?.length ?? 0} total items in feed`);

    for (const item of feed.items || []) {
      if (!item.title) continue;

      const title = item.title.trim();
      const content = item.contentSnippet || item.content || item.summary || "";
      const summary = item.contentSnippet || item.summary || "";

      // Filter for Iran-related content
      if (!isIranRelated(title, content)) continue;

      const publishedAt = item.pubDate ? new Date(item.pubDate) : new Date();
      const imageUrl = item.enclosure?.url ||
        extractImageFromContent(item.content || "") ||
        null;

      articles.push({
        title,
        content: content.slice(0, 5000),
        summary: summary.slice(0, 500),
        sourceId: source.id,
        sourceName: source.name,
        sourceUrl: item.link || source.url,
        category: source.category,
        publishedAt,
        imageUrl,
        language: source.language,
      });
    }

    console.log(`[RSS] ${source.name}: ${articles.length} Iran-related articles found`);
  } catch (error) {
    console.error(`[RSS] Error fetching ${source.name}:`, error instanceof Error ? error.message : error);
  }

  return articles;
}

function extractImageFromContent(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match?.[1] || null;
}

export { slugify };
