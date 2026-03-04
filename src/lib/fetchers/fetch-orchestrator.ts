import prisma from "@/lib/prisma";
import { getSourcesByType } from "./sources";
import { fetchFromRss, slugify, type FetchedArticle } from "./rss-fetcher";
import { fetchFromNewsApi } from "./newsapi-fetcher";
import { fetchFromScraping } from "./scraper";
import { fetchFromBamqam } from "./bamqam-fetcher";
import { fetchNasaFirms } from "./nasa-firms-fetcher";
import { runDataCompiler } from "@/lib/data-compiler";

export interface FetchResult {
  source: string;
  type: string;
  fetched: number;
  saved: number;
  duplicates: number;
  errors: string[];
}

export interface FetchSummary {
  startedAt: string;
  completedAt: string;
  durationMs: number;
  totalFetched: number;
  totalSaved: number;
  totalDuplicates: number;
  totalMapEvents: number;
  results: FetchResult[];
}

// Track cron status in-memory
let lastFetchSummary: FetchSummary | null = null;
let isFetching = false;

export function getLastFetchSummary(): FetchSummary | null {
  return lastFetchSummary;
}

export function getIsFetching(): boolean {
  return isFetching;
}

/**
 * Save fetched articles to database, deduplicating by slug
 */
async function saveArticles(articles: FetchedArticle[]): Promise<{ saved: number; duplicates: number }> {
  let saved = 0;
  let duplicates = 0;

  for (const article of articles) {
    const slug = slugify(article.title) || `article-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    try {
      // Check if slug already exists
      const existing = await prisma.newsArticle.findUnique({
        where: { slug },
        select: { id: true },
      });

      if (existing) {
        duplicates++;
        continue;
      }

      await prisma.newsArticle.create({
        data: {
          title: article.title,
          slug,
          content: article.content,
          summary: article.summary || null,
          source: article.sourceName,
          sourceUrl: article.sourceUrl,
          imageUrl: article.imageUrl,
          category: article.category,
          publishedAt: article.publishedAt,
        },
      });
      saved++;
    } catch (error) {
      // Unique constraint violation = duplicate
      if (error instanceof Error && error.message.includes("Unique")) {
        duplicates++;
      } else {
        console.error(`[Save] Error saving "${article.title.slice(0, 50)}":`, error instanceof Error ? error.message : error);
      }
    }
  }

  return { saved, duplicates };
}

/**
 * Main orchestrator — fetches from all sources
 */
export async function runFetchAll(): Promise<FetchSummary> {
  if (isFetching) {
    throw new Error("Fetch already in progress");
  }

  isFetching = true;
  const startedAt = new Date();
  const results: FetchResult[] = [];
  let totalMapEvents = 0;

  try {
    // ============ RSS FEEDS ============
    const rssSources = getSourcesByType("rss");
    for (const source of rssSources) {
      const errors: string[] = [];
      try {
        const articles = await fetchFromRss(source);
        const { saved, duplicates } = await saveArticles(articles);
        results.push({
          source: source.name,
          type: "rss",
          fetched: articles.length,
          saved,
          duplicates,
          errors,
        });
      } catch (error) {
        errors.push(error instanceof Error ? error.message : "Unknown error");
        results.push({ source: source.name, type: "rss", fetched: 0, saved: 0, duplicates: 0, errors });
      }
    }

    // ============ NEWSAPI ============
    const newsApiSources = getSourcesByType("newsapi");
    for (const source of newsApiSources) {
      const errors: string[] = [];
      try {
        const articles = await fetchFromNewsApi(source);
        const { saved, duplicates } = await saveArticles(articles);
        results.push({
          source: source.name,
          type: "newsapi",
          fetched: articles.length,
          saved,
          duplicates,
          errors,
        });
      } catch (error) {
        errors.push(error instanceof Error ? error.message : "Unknown error");
        results.push({ source: source.name, type: "newsapi", fetched: 0, saved: 0, duplicates: 0, errors });
      }
    }

    // ============ WEB SCRAPING ============
    const scrapeSources = getSourcesByType("scrape");
    for (const source of scrapeSources) {
      const errors: string[] = [];
      try {
        const articles = await fetchFromScraping(source);
        const { saved, duplicates } = await saveArticles(articles);
        results.push({
          source: source.name,
          type: "scrape",
          fetched: articles.length,
          saved,
          duplicates,
          errors,
        });
      } catch (error) {
        errors.push(error instanceof Error ? error.message : "Unknown error");
        results.push({ source: source.name, type: "scrape", fetched: 0, saved: 0, duplicates: 0, errors });
      }
    }

    // ============ BAMQAM MAP DATA ============
    try {
      const mapEvents = await fetchFromBamqam();
      totalMapEvents = mapEvents.length;

      for (const event of mapEvents) {
        try {
          // Deduplicate by title + coordinates (approximate)
          const existing = await prisma.warEvent.findFirst({
            where: {
              title: event.title,
              latitude: { gte: event.latitude - 0.01, lte: event.latitude + 0.01 },
              longitude: { gte: event.longitude - 0.01, lte: event.longitude + 0.01 },
            },
            select: { id: true },
          });

          if (!existing) {
            await prisma.warEvent.create({
              data: {
                title: event.title,
                description: event.description,
                date: event.date,
                latitude: event.latitude,
                longitude: event.longitude,
                eventType: event.eventType,
                severity: event.severity,
                source: event.source,
              },
            });
          }
        } catch (error) {
          console.error("[Bamqam Save]", error instanceof Error ? error.message : error);
        }
      }

      results.push({
        source: "bamqam.com",
        type: "map-scrape",
        fetched: mapEvents.length,
        saved: mapEvents.length,
        duplicates: 0,
        errors: [],
      });
    } catch (error) {
      results.push({
        source: "bamqam.com",
        type: "map-scrape",
        fetched: 0,
        saved: 0,
        duplicates: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      });
    }

    // ============ NASA FIRMS SATELLITE DATA ============
    try {
      const hotspots = await fetchNasaFirms(2);
      let firmsSaved = 0;
      for (const hs of hotspots) {
        try {
          const existing = await prisma.warEvent.findFirst({
            where: {
              latitude: { gte: hs.latitude - 0.005, lte: hs.latitude + 0.005 },
              longitude: { gte: hs.longitude - 0.005, lte: hs.longitude + 0.005 },
              date: { gte: new Date(hs.acqDate + "T00:00:00Z"), lte: new Date(hs.acqDate + "T23:59:59Z") },
            },
            select: { id: true },
          });
          if (!existing) {
            await prisma.warEvent.create({
              data: {
                title: `Uydu Isı Noktası (FRP: ${hs.frp.toFixed(1)})`,
                description: `NASA FIRMS uydu tespiti. Parlaklik: ${hs.brightness.toFixed(1)}, Güven: ${hs.confidence}, Saat: ${hs.acqTime}`,
                date: new Date(hs.acqDate + "T" + String(hs.acqTime).padStart(4, "0").replace(/(\d{2})(\d{2})/, "$1:$2") + ":00Z"),
                latitude: hs.latitude,
                longitude: hs.longitude,
                eventType: "PATLAMA",
                severity: hs.frp > 50 ? "YUKSEK" : hs.frp > 20 ? "ORTA" : "DUSUK",
                source: "NASA FIRMS",
              },
            });
            firmsSaved++;
          }
        } catch (e) {
          console.error("[FIRMS Save]", e instanceof Error ? e.message : e);
        }
      }
      totalMapEvents += firmsSaved;
      results.push({
        source: "NASA FIRMS",
        type: "satellite",
        fetched: hotspots.length,
        saved: firmsSaved,
        duplicates: hotspots.length - firmsSaved,
        errors: [],
      });
    } catch (error) {
      results.push({
        source: "NASA FIRMS",
        type: "satellite",
        fetched: 0,
        saved: 0,
        duplicates: 0,
        errors: [error instanceof Error ? error.message : "Unknown error"],
      });
    }

    // ============ DATA COMPILER ============
    try {
      const compileSummary = await runDataCompiler();
      console.log("[FetchAll] Data compiler done:", compileSummary);
    } catch (error) {
      console.error("[FetchAll] Data compiler error:", error instanceof Error ? error.message : error);
    }

  } finally {
    isFetching = false;
  }

  const completedAt = new Date();
  const summary: FetchSummary = {
    startedAt: startedAt.toISOString(),
    completedAt: completedAt.toISOString(),
    durationMs: completedAt.getTime() - startedAt.getTime(),
    totalFetched: results.reduce((sum, r) => sum + r.fetched, 0),
    totalSaved: results.reduce((sum, r) => sum + r.saved, 0),
    totalDuplicates: results.reduce((sum, r) => sum + r.duplicates, 0),
    totalMapEvents,
    results,
  };

  lastFetchSummary = summary;
  return summary;
}
