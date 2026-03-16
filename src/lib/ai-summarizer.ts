import prisma from "@/lib/prisma";

const SUMMARIZE_PROMPT = `Sen deneyimli bir savaş muhabirisin. Verilen haber metnini analiz et.

Görevin:
1. Haberi Türkçe olarak özetle (2-3 cümle, maks 200 karakter)
2. Metindeki önemli varlıkları çıkar
3. Haberin duygusal tonunu belirle (negative, neutral, positive)
4. Haberin gerilim seviyesine katkısını 0-100 arasında puanla

JSON formatında yanıt ver:
{
  "summary": "özet metni",
  "entities": {
    "people": ["kişi adları"],
    "locations": ["yer adları"],
    "organizations": ["örgüt/kurum adları"]
  },
  "sentiment": "negative" | "neutral" | "positive",
  "tension_contribution": 0-100
}

Kurallar:
- Sadece en önemli bilgiyi ver (ne oldu, nerede, sonucu)
- Tarafsız ve net bir dil kullan
- Spekülatif ifadelerden kaçın
- Varlıklar orijinal dillerinde (Türkçe veya İngilizce) olabilir
- Her kategoride en fazla 5 varlık
- sentiment: saldırı/kayıp/tehdit haberleri "negative", barış/müzakere "positive", bilgilendirme "neutral"
- tension_contribution: savaş/saldırı=70-100, gerilim=40-70, diplomasi=10-40, bilgilendirme=0-20`;

export interface ArticleEntities {
  people: string[];
  locations: string[];
  organizations: string[];
}

export type Sentiment = "negative" | "neutral" | "positive";

export interface SummarizeResult {
  summary: string;
  entities?: ArticleEntities;
  sentiment?: Sentiment;
  tensionContribution?: number;
  source: "openai" | "fallback";
  tokensUsed?: number;
}

let openaiClient: import("openai").default | null = null;

function getOpenAIClient(): import("openai").default | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    // Dynamic import is handled at call site
    const OpenAI = require("openai").default;
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

/**
 * Summarize a single article using OpenAI or fallback
 */
export async function summarizeArticle(
  content: string,
  title: string,
  category: string,
): Promise<SummarizeResult> {
  const client = getOpenAIClient();

  if (!client) {
    return {
      summary: generateFallbackSummary(title, category),
      source: "fallback",
    };
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SUMMARIZE_PROMPT },
        { role: "user", content: content.slice(0, 3000) },
      ],
      max_tokens: 300,
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    if (!raw) {
      return { summary: generateFallbackSummary(title, category), source: "fallback" };
    }

    try {
      const parsed = JSON.parse(raw);
      const summary = parsed.summary || generateFallbackSummary(title, category);
      const entities: ArticleEntities | undefined = parsed.entities ? {
        people: Array.isArray(parsed.entities.people) ? parsed.entities.people.slice(0, 5) : [],
        locations: Array.isArray(parsed.entities.locations) ? parsed.entities.locations.slice(0, 5) : [],
        organizations: Array.isArray(parsed.entities.organizations) ? parsed.entities.organizations.slice(0, 5) : [],
      } : undefined;

      const sentiment: Sentiment | undefined =
        parsed.sentiment && ["negative", "neutral", "positive"].includes(parsed.sentiment)
          ? (parsed.sentiment as Sentiment)
          : undefined;

      const tensionContribution: number | undefined =
        typeof parsed.tension_contribution === "number"
          ? Math.min(100, Math.max(0, Math.round(parsed.tension_contribution)))
          : undefined;

      return { summary, entities, sentiment, tensionContribution, source: "openai", tokensUsed };
    } catch {
      // If JSON parse fails, use raw as summary
      return { summary: raw.slice(0, 200), source: "openai", tokensUsed };
    }
  } catch (error) {
    console.error("[AI] Summarize error:", error instanceof Error ? error.message : error);
    return { summary: generateFallbackSummary(title, category), source: "fallback" };
  }
}

function generateFallbackSummary(title: string, category: string): string {
  return `${title.slice(0, 120)}. Bu haber ${category.toLowerCase()} kategorisinde önemli bir gelişmeyi içermektedir.`;
}

// ============ RATE LIMITING ============

const RATE_LIMIT = {
  maxPerMinute: 20,
  maxPerDay: 500,
};

let minuteCount = 0;
let dayCount = 0;
let lastMinuteReset = Date.now();
let lastDayReset = Date.now();

function checkRateLimit(): boolean {
  const now = Date.now();

  // Reset minute counter
  if (now - lastMinuteReset > 60_000) {
    minuteCount = 0;
    lastMinuteReset = now;
  }

  // Reset day counter
  if (now - lastDayReset > 86_400_000) {
    dayCount = 0;
    lastDayReset = now;
  }

  if (minuteCount >= RATE_LIMIT.maxPerMinute || dayCount >= RATE_LIMIT.maxPerDay) {
    return false;
  }

  minuteCount++;
  dayCount++;
  return true;
}

// ============ BATCH PROCESSING ============

export interface BatchResult {
  total: number;
  summarized: number;
  skipped: number;
  fallback: number;
  errors: number;
  totalTokens: number;
}

/**
 * Generate AI summaries for articles that don't have one yet.
 * Processes in batches with rate limiting.
 */
export async function batchSummarize(limit: number = 20): Promise<BatchResult> {
  const result: BatchResult = {
    total: 0,
    summarized: 0,
    skipped: 0,
    fallback: 0,
    errors: 0,
    totalTokens: 0,
  };

  // Find articles without AI summary
  const articles = await prisma.newsArticle.findMany({
    where: { aiSummary: null },
    orderBy: { publishedAt: "desc" },
    take: limit,
    select: { id: true, title: true, content: true, category: true },
  });

  result.total = articles.length;

  if (articles.length === 0) {
    console.log("[AI Batch] No articles need summarization");
    return result;
  }

  console.log(`[AI Batch] Processing ${articles.length} articles`);

  for (const article of articles) {
    if (!checkRateLimit()) {
      console.log("[AI Batch] Rate limit reached, stopping");
      result.skipped += result.total - result.summarized - result.fallback - result.errors;
      break;
    }

    try {
      const { summary, entities, sentiment, source, tokensUsed } = await summarizeArticle(
        article.content,
        article.title,
        article.category,
      );

      await prisma.newsArticle.update({
        where: { id: article.id },
        data: {
          aiSummary: summary,
          ...(entities ? { entities: JSON.stringify(entities) } : {}),
          ...(sentiment ? { sentiment } : {}),
        },
      });

      if (source === "openai") {
        result.summarized++;
        result.totalTokens += tokensUsed ?? 0;
      } else {
        result.fallback++;
      }
    } catch (error) {
      console.error(`[AI Batch] Error for "${article.title.slice(0, 40)}":`, error instanceof Error ? error.message : error);
      result.errors++;
    }
  }

  console.log(`[AI Batch] Done: ${result.summarized} AI, ${result.fallback} fallback, ${result.errors} errors, ${result.totalTokens} tokens`);
  return result;
}
