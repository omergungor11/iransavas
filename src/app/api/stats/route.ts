export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [totalEvents, totalNews, casualtyAgg, events, recentEvents, casualties, recentNewsCount, casualtyCount] = await Promise.all([
      prisma.warEvent.count(),
      prisma.newsArticle.count(),
      prisma.casualtyReport.aggregate({
        _sum: { civilianCasualties: true, militaryCasualties: true, injured: true, displaced: true },
      }),
      prisma.warEvent.findMany({ select: { eventType: true, severity: true } }),
      prisma.warEvent.findMany({ orderBy: { date: "desc" }, take: 10 }),
      prisma.casualtyReport.findMany({ orderBy: { date: "asc" } }),
      prisma.newsArticle.count({ where: { publishedAt: { gte: oneDayAgo } } }),
      prisma.casualtyReport.count(),
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
