import * as cheerio from "cheerio";
import type { NewsSource } from "./sources";
import type { FetchedArticle } from "./rss-fetcher";

const IRAN_KEYWORDS = [
  "iran", "İran", "tehran", "tahran", "persian gulf", "hormuz",
  "isfahan", "khamenei", "irgc", "bushehr", "revolutionary guard",
  "middle east", "iranian", "iran war", "iran strike",
];

function isIranRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return IRAN_KEYWORDS.some((kw) => lower.includes(kw.toLowerCase()));
}

export async function fetchFromScraping(source: NewsSource): Promise<FetchedArticle[]> {
  if (!source.selectors) {
    console.error(`[Scraper] No selectors defined for ${source.name}`);
    return [];
  }

  const articles: FetchedArticle[] = [];

  try {
    console.log(`[Scraper] Fetching: ${source.name} (${source.url})`);

    const res = await fetch(source.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    if (!res.ok) {
      console.error(`[Scraper] ${source.name} HTTP ${res.status}`);
      return [];
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const sel = source.selectors;

    $(sel.articleList).each((_, el) => {
      const $el = $(el);
      const titleEl = $el.find(sel.title).first();
      const title = titleEl.text().trim();
      if (!title) return;

      // Filter for Iran
      const summaryText = sel.summary ? $el.find(sel.summary).text().trim() : "";
      if (!isIranRelated(title + " " + summaryText)) return;

      let link = titleEl.attr("href") || "";
      if (link && !link.startsWith("http")) {
        const base = new URL(source.url);
        link = `${base.origin}${link.startsWith("/") ? "" : "/"}${link}`;
      }

      const summary = summaryText.slice(0, 500);
      const dateText = sel.date ? $el.find(sel.date).attr("datetime") || $el.find(sel.date).text().trim() : "";
      const publishedAt = dateText ? new Date(dateText) : new Date();

      const imageUrl = sel.image
        ? $el.find(sel.image).attr("src") || $el.find(sel.image).attr("data-src") || null
        : null;

      articles.push({
        title,
        content: summary || title,
        summary,
        sourceId: source.id,
        sourceName: source.name,
        sourceUrl: link || source.url,
        category: source.category,
        publishedAt: isNaN(publishedAt.getTime()) ? new Date() : publishedAt,
        imageUrl,
        language: source.language,
      });
    });

    console.log(`[Scraper] ${source.name}: ${articles.length} Iran-related articles found`);
  } catch (error) {
    console.error(`[Scraper] Error fetching ${source.name}:`, error instanceof Error ? error.message : error);
  }

  return articles;
}
