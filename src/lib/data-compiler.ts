import prisma from "@/lib/prisma";

export interface CompileSummary {
  timelineFromNews: number;
  timelineFromWarEvents: number;
  casualtyReports: number;
  weeklyReports: number;
  compiledAt: string;
}

let lastCompileSummary: CompileSummary | null = null;

export function getLastCompileSummary(): CompileSummary | null {
  return lastCompileSummary;
}

// ─── Importance Detection ────────────────────────────────────────────

const CRITICAL_KEYWORDS = [
  "savas", "war", "bomba", "bomb", "nukleer", "nuclear", "istila", "invasion",
  "savasilan", "ateskes", "ceasefire", "kimyasal", "chemical",
];
const HIGH_KEYWORDS = [
  "saldiri", "attack", "oldu", "killed", "roket", "rocket", "firtina",
  "catisma", "clash", "operasyon", "operation", "hava saldiri", "airstrike",
  "fuze", "missile", "dron", "drone",
];
const MEDIUM_KEYWORDS = [
  "protesto", "protest", "yarali", "injured", "goc", "migration", "multeci",
  "refugee", "ambargo", "embargo", "yaptir", "sanction",
];

function detectImportance(text: string): "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" {
  const lower = text.toLowerCase();
  if (CRITICAL_KEYWORDS.some((k) => lower.includes(k))) return "CRITICAL";
  if (HIGH_KEYWORDS.some((k) => lower.includes(k))) return "HIGH";
  if (MEDIUM_KEYWORDS.some((k) => lower.includes(k))) return "MEDIUM";
  return "LOW";
}

// ─── Category Detection ──────────────────────────────────────────────

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  if (/bomba|roket|füze|hava saldırı|airstrike|missile|drone|dron/.test(lower)) return "ASKERI";
  if (/sivil|yaralı|öldü|kayıp|killed|casualt/.test(lower)) return "SIVIL";
  if (/protesto|gösterici|protest|rally/.test(lower)) return "PROTESTO";
  if (/nükleer|nuclear|zenginleştir/.test(lower)) return "NUKLEER";
  if (/diplomasi|görüşme|diplomat|anlaşma|summit|treaty/.test(lower)) return "DIPLOMASI";
  if (/yaptır|ambargo|sanction|embargo/.test(lower)) return "EKONOMI";
  return "GENEL";
}

// ─── A) NewsArticle → TimelineEntry ──────────────────────────────────

async function compileTimelineFromNews(): Promise<number> {
  const existingTitles = new Set(
    (await prisma.timelineEntry.findMany({ select: { title: true } })).map((e) => e.title)
  );

  const articles = await prisma.newsArticle.findMany({
    orderBy: { publishedAt: "desc" },
    take: 500,
  });

  let count = 0;
  for (const article of articles) {
    if (existingTitles.has(article.title)) continue;

    await prisma.timelineEntry.create({
      data: {
        title: article.title,
        description: article.summary || article.content.slice(0, 300),
        date: article.publishedAt,
        category: detectCategory(article.title + " " + article.content),
        importance: detectImportance(article.title + " " + (article.summary || "")),
      },
    });
    existingTitles.add(article.title);
    count++;
  }
  return count;
}

// ─── B) WarEvent → TimelineEntry ─────────────────────────────────────

const SEVERITY_MAP: Record<string, string> = {
  KRITIK: "CRITICAL",
  YUKSEK: "HIGH",
  ORTA: "MEDIUM",
  DUSUK: "LOW",
};

async function compileTimelineFromWarEvents(): Promise<number> {
  const linkedEventIds = new Set(
    (
      await prisma.timelineEntry.findMany({
        where: { relatedEventId: { not: null } },
        select: { relatedEventId: true },
      })
    ).map((e) => e.relatedEventId)
  );

  const events = await prisma.warEvent.findMany({
    orderBy: { date: "desc" },
    take: 500,
  });

  let count = 0;
  for (const event of events) {
    if (linkedEventIds.has(event.id)) continue;

    await prisma.timelineEntry.create({
      data: {
        title: event.title,
        description: event.description,
        date: event.date,
        category: detectCategory(event.title + " " + event.description),
        importance: SEVERITY_MAP[event.severity] || "MEDIUM",
        relatedEventId: event.id,
      },
    });
    linkedEventIds.add(event.id);
    count++;
  }
  return count;
}

// ─── C) NewsArticle → CasualtyReport ────────────────────────────────

const CASUALTY_PATTERNS = [
  /(\d+)\s*(?:kisi|sivil|asker)\s*(?:oldu|hayatini kaybetti|sehit)/gi,
  /(\d+)\s*(?:kisi|sivil)\s*(?:yaralan)/gi,
  /(\d+)\s*(?:kisi)\s*(?:yerinden\s*edil)/gi,
  /(\d+)\s*(?:people|civilians?|soldiers?)\s*(?:killed|dead|died)/gi,
  /(\d+)\s*(?:people|civilians?)\s*(?:injured|wounded)/gi,
  /(\d+)\s*(?:people|civilians?)\s*(?:displaced|fled)/gi,
  /(?:killed|oldu|sehit)\s*(\d+)/gi,
  /(?:injured|yarali)\s*(\d+)/gi,
];

const REGION_KEYWORDS: Record<string, string[]> = {
  Tahran: ["tahran", "tehran", "tehren"],
  Isfahan: ["isfahan"],
  Tebriz: ["tebriz", "tabriz"],
  Shiraz: ["shiraz", "siraz"],
  Ahvaz: ["ahvaz", "ahwaz"],
  Kirmanshah: ["kirmanshah", "kermanshah"],
  Mashhad: ["mashhad", "meshhed"],
  Bushehr: ["bushehr", "bushire"],
  Bandar: ["bandar", "bandar abbas"],
  Khuzestan: ["khuzestan", "huzistan"],
  Iran: ["iran", "pers"],
};

function detectRegion(text: string): string {
  const lower = text.toLowerCase();
  for (const [region, keywords] of Object.entries(REGION_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) return region;
  }
  return "Iran (Genel)";
}

async function extractCasualtiesFromNews(): Promise<number> {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const articles = await prisma.newsArticle.findMany({
    where: { publishedAt: { gte: since } },
    orderBy: { publishedAt: "desc" },
  });

  let count = 0;
  for (const article of articles) {
    const text = article.title + " " + article.content;
    const numbers: number[] = [];

    for (const pattern of CASUALTY_PATTERNS) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const num = parseInt(match[1]);
        if (num > 0 && num < 100000) numbers.push(num);
      }
    }

    if (numbers.length === 0) continue;

    const region = detectRegion(text);
    const dateStr = article.publishedAt.toISOString().split("T")[0];

    const existing = await prisma.casualtyReport.findFirst({
      where: {
        date: { gte: new Date(dateStr + "T00:00:00Z"), lte: new Date(dateStr + "T23:59:59Z") },
        source: article.source,
        region,
      },
    });

    if (existing) continue;

    const lower = text.toLowerCase();
    const isKilled = /killed|oldu|sehit|hayatini kaybetti/.test(lower);
    const isInjured = /injured|wounded|yarali/.test(lower);
    const isDisplaced = /displaced|fled|yerinden edil|goc/.test(lower);
    const isMilitary = /military|soldier|asker|ordu|savasci/.test(lower);

    const mainNum = Math.max(...numbers);

    await prisma.casualtyReport.create({
      data: {
        date: article.publishedAt,
        civilianCasualties: isKilled && !isMilitary ? mainNum : 0,
        militaryCasualties: isKilled && isMilitary ? mainNum : 0,
        injured: isInjured ? mainNum : 0,
        displaced: isDisplaced ? mainNum : 0,
        region,
        source: article.source,
      },
    });
    count++;
  }
  return count;
}

// ─── D) Weekly Report Generation ─────────────────────────────────────

async function generateWeeklyReport(): Promise<number> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const periodStr = `${weekAgo.toISOString().split("T")[0]} / ${now.toISOString().split("T")[0]}`;

  const existing = await prisma.report.findFirst({
    where: { type: "HAFTALIK", period: periodStr },
  });
  if (existing) return 0;

  const [newsCount, eventCount, casualtyAgg, timelineCount] = await Promise.all([
    prisma.newsArticle.count({ where: { publishedAt: { gte: weekAgo } } }),
    prisma.warEvent.count({ where: { date: { gte: weekAgo } } }),
    prisma.casualtyReport.aggregate({
      where: { date: { gte: weekAgo } },
      _sum: { civilianCasualties: true, militaryCasualties: true, injured: true, displaced: true },
    }),
    prisma.timelineEntry.count({ where: { date: { gte: weekAgo } } }),
  ]);

  const sums = casualtyAgg._sum;
  const totalCasualties = (sums.civilianCasualties || 0) + (sums.militaryCasualties || 0);

  const content = [
    `# Haftalık Rapor: ${periodStr}`,
    "",
    "## Özet",
    `Bu hafta **${newsCount}** haber makalesi, **${eventCount}** savaş olayı ve **${timelineCount}** zaman çizelgesi girdisi kaydedildi.`,
    "",
    "## Kayıplar",
    `- Sivil kayıp: ${sums.civilianCasualties || 0}`,
    `- Askerî kayıp: ${sums.militaryCasualties || 0}`,
    `- Yaralı: ${sums.injured || 0}`,
    `- Yerinden edilen: ${sums.displaced || 0}`,
    "",
    "## İstatistikler",
    `- Toplam haber: ${newsCount}`,
    `- Toplam olay: ${eventCount}`,
    `- Toplam zaman çizelgesi: ${timelineCount}`,
    `- Toplam kayıp: ${totalCasualties}`,
  ].join("\n");

  const summary = `${periodStr} dönemi: ${newsCount} haber, ${eventCount} olay, ${totalCasualties} kayıp raporlandı.`;

  await prisma.report.create({
    data: {
      title: `Haftalık Rapor - ${periodStr}`,
      type: "HAFTALIK",
      content,
      summary,
      period: periodStr,
    },
  });

  return 1;
}

// ─── Main Runner ─────────────────────────────────────────────────────

export async function runDataCompiler(): Promise<CompileSummary> {
  const timelineFromNews = await compileTimelineFromNews();
  const timelineFromWarEvents = await compileTimelineFromWarEvents();
  const casualtyReports = await extractCasualtiesFromNews();
  const weeklyReports = await generateWeeklyReport();

  const summary: CompileSummary = {
    timelineFromNews,
    timelineFromWarEvents,
    casualtyReports,
    weeklyReports,
    compiledAt: new Date().toISOString(),
  };

  lastCompileSummary = summary;
  console.log(`[DataCompiler] Done: news=${timelineFromNews} war=${timelineFromWarEvents} casualty=${casualtyReports} weekly=${weeklyReports}`);
  return summary;
}
