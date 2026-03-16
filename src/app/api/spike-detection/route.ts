export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const TRACKED_KEYWORDS = [
  "nükleer",
  "Hürmüz",
  "füze",
  "hava saldırısı",
  "ateşkes",
  "siber",
  "yaptırım",
  "tahliye",
];

interface SpikeResult {
  keyword: string;
  count24h: number;
  dailyAvg7d: number;
  isSpike: boolean;
  changePercent: number;
}

async function countArticles(keyword: string, since: Date): Promise<number> {
  try {
    const count = await prisma.newsArticle.count({
      where: {
        publishedAt: { gte: since },
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { content: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });
    return count;
  } catch {
    return 0;
  }
}

export async function GET() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const results: SpikeResult[] = [];

    for (const keyword of TRACKED_KEYWORDS) {
      const [count24h, count7d] = await Promise.all([
        countArticles(keyword, oneDayAgo),
        countArticles(keyword, sevenDaysAgo),
      ]);

      const dailyAvg7d = count7d / 7;
      const isSpike = dailyAvg7d > 0 ? count24h > 2 * dailyAvg7d : count24h > 0;
      const changePercent =
        dailyAvg7d > 0 ? Math.round(((count24h - dailyAvg7d) / dailyAvg7d) * 100) : count24h > 0 ? 100 : 0;

      results.push({
        keyword,
        count24h,
        dailyAvg7d: Math.round(dailyAvg7d * 10) / 10,
        isSpike,
        changePercent,
      });
    }

    return NextResponse.json({
      data: results,
      meta: { timestamp: now.toISOString(), trackedKeywords: TRACKED_KEYWORDS.length },
    });
  } catch (error) {
    console.error("[API /spike-detection] error:", error);
    // Return fallback with no spikes
    const fallback: SpikeResult[] = TRACKED_KEYWORDS.map((keyword) => ({
      keyword,
      count24h: 0,
      dailyAvg7d: 0,
      isSpike: false,
      changePercent: 0,
    }));
    return NextResponse.json({
      data: fallback,
      meta: { timestamp: new Date().toISOString(), trackedKeywords: TRACKED_KEYWORDS.length },
    });
  }
}
