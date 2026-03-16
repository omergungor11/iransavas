import type { FetchedArticle } from "./rss-fetcher";

const GDELT_URL =
  "https://api.gdeltproject.org/api/v2/doc/doc?query=iran%20war&mode=ArtList&maxrecords=50&format=json";

const IRAN_KEYWORDS = [
  "iran",
  "iranian",
  "tehran",
  "tehran",
  "persian gulf",
  "hormuz",
  "isfahan",
  "khamenei",
  "irgc",
  "revolutionary guard",
  "bushehr",
  "natanz",
  "tabriz",
  "ahvaz",
  "iran war",
  "iran strike",
  "iran military",
  "iran nuclear",
  "iran sanction",
  "iran conflict",
  "iran missile",
  "iran drone",
  "iran attack",
  "iran bomb",
];

interface GdeltArticle {
  url: string;
  url_mobile: string;
  title: string;
  seendate: string;
  socialimage: string;
  domain: string;
  language: string;
  sourcecountry: string;
}

interface GdeltResponse {
  articles?: GdeltArticle[];
}

function isIranRelated(title: string): boolean {
  const text = title.toLowerCase();
  return IRAN_KEYWORDS.some((kw) => text.includes(kw));
}

export async function fetchFromGdelt(): Promise<FetchedArticle[]> {
  const articles: FetchedArticle[] = [];

  try {
    console.log("[GDELT] Fetching from GDELT 2.0 GKG API...");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(GDELT_URL, {
      signal: controller.signal,
      headers: {
        "User-Agent": "IranSavas-NewsBot/1.0",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`GDELT API responded with HTTP ${res.status}`);
    }

    const data: GdeltResponse = await res.json();
    const items = data.articles || [];

    console.log(`[GDELT] Received ${items.length} articles from GDELT`);

    for (const item of items) {
      if (!item.title) continue;

      const title = item.title.trim();

      // Filter for Iran-related content
      if (!isIranRelated(title)) continue;

      // Parse GDELT date format: "20260316T120000Z" -> Date
      let publishedAt: Date;
      try {
        const raw = item.seendate;
        if (raw && raw.length >= 8) {
          const year = raw.slice(0, 4);
          const month = raw.slice(4, 6);
          const day = raw.slice(6, 8);
          const hour = raw.length >= 11 ? raw.slice(9, 11) : "00";
          const minute = raw.length >= 13 ? raw.slice(11, 13) : "00";
          publishedAt = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
        } else {
          publishedAt = new Date();
        }
      } catch {
        publishedAt = new Date();
      }

      articles.push({
        title,
        content: title, // GDELT ArtList mode only provides titles
        summary: title,
        sourceId: "gdelt",
        sourceName: item.domain || "GDELT",
        sourceUrl: item.url || item.url_mobile || "",
        category: "GENEL",
        perspective: "Bağımsız",
        publishedAt,
        imageUrl: item.socialimage || null,
        language: item.language || "English",
      });
    }

    console.log(`[GDELT] ${articles.length} Iran-related articles after filtering`);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.error("[GDELT] Request timed out (15s)");
    } else {
      console.error(
        "[GDELT] Error fetching:",
        error instanceof Error ? error.message : error
      );
    }
  }

  return articles;
}
