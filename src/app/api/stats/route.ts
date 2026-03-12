export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [totalEvents, totalNews, casualtyAgg, events, recentEvents, casualties, recentNewsCount, casualtyCount, last7DaysEvents] = await Promise.all([
      prisma.warEvent.count(),
      prisma.newsArticle.count(),
      prisma.casualtyReport.aggregate({
        _sum: { civilianCasualties: true, militaryCasualties: true, injured: true, displaced: true },
      }),
      prisma.warEvent.findMany({ select: { eventType: true, severity: true }, take: 5000 }),
      prisma.warEvent.findMany({ orderBy: { date: "desc" }, take: 10 }),
      prisma.casualtyReport.findMany({ orderBy: { date: "asc" }, take: 500 }),
      prisma.newsArticle.count({ where: { publishedAt: { gte: oneDayAgo } } }),
      prisma.casualtyReport.count(),
      prisma.warEvent.findMany({
        where: { date: { gte: sevenDaysAgo } },
        select: { severity: true, casualties: true },
        take: 1000,
      }),
    ]);

    const sums = casualtyAgg._sum;
    let totalCasualties = (sums.civilianCasualties || 0) + (sums.militaryCasualties || 0);
    const totalDisplaced = sums.displaced || 0;

    // Fallback: if CasualtyReport is empty, sum WarEvent.casualties
    if (casualtyCount === 0 && totalEvents > 0) {
      const warCasualtyAgg = await prisma.warEvent.aggregate({
        _sum: { casualties: true },
      });
      totalCasualties = warCasualtyAgg._sum.casualties || 0;
    }

    // Group events by type
    const typeMap: Record<string, number> = {};
    const sevMap: Record<string, number> = {};
    for (const e of events) {
      typeMap[e.eventType] = (typeMap[e.eventType] || 0) + 1;
      sevMap[e.severity] = (sevMap[e.severity] || 0) + 1;
    }

    const eventsByType = Object.entries(typeMap).map(([type, count]) => ({ type, count }));
    const eventsBySeverity = Object.entries(sevMap).map(([severity, count]) => ({ severity, count }));

    // Casualty trend
    const casualtyTrend = casualties.map((c) => ({
      date: c.date.toISOString().split("T")[0],
      civilian: c.civilianCasualties,
      military: c.militaryCasualties,
    }));

    // --- Tension Score Algorithm ---
    // Weighted severity: KRITIK=10, YUKSEK=6, ORTA=3, DUSUK=1
    const SEVERITY_WEIGHTS: Record<string, number> = {
      KRITIK: 10, YUKSEK: 6, ORTA: 3, DUSUK: 1,
    };
    let weightedSum = 0;
    let totalCasualties7d = 0;
    for (const ev of last7DaysEvents) {
      weightedSum += SEVERITY_WEIGHTS[ev.severity] ?? 2;
      totalCasualties7d += ev.casualties ?? 0;
    }
    // Base: event intensity (0-60 range, saturates at ~20 weighted events)
    const intensityScore = Math.min(60, (weightedSum / 20) * 60);
    // Casualty factor (0-25 range, saturates at ~500 casualties)
    const casualtyScore = Math.min(25, (totalCasualties7d / 500) * 25);
    // News volume factor (0-15 range, saturates at ~50 recent news)
    const newsScore = Math.min(15, (recentNewsCount / 50) * 15);
    // Final score: 0-100
    const tensionScore = Math.round(Math.min(100, intensityScore + casualtyScore + newsScore));
    const tensionLevel =
      tensionScore >= 80 ? "SEVERE" :
      tensionScore >= 60 ? "HIGH" :
      tensionScore >= 35 ? "ELEVATED" : "LOW";

    return NextResponse.json({
      data: {
        totalEvents,
        totalCasualties,
        totalDisplaced,
        totalNews,
        recentNewsCount,
        recentEvents,
        casualtyTrend,
        eventsByType,
        eventsBySeverity,
        tensionScore,
        tensionLevel,
      },
    });
  } catch (error) {
    console.error("[API /stats]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Istatistikler yuklenemedi" } },
      { status: 500 }
    );
  }
}
