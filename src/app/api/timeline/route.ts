export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { timelineQuerySchema, parseQuery } from "@/lib/api-validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseQuery(searchParams, timelineQuerySchema);
    if (!parsed.success) return parsed.response;

    const { importance, category, limit } = parsed.data;

    const where: Record<string, unknown> = {};
    if (importance) where.importance = importance;
    if (category) where.category = category;

    const [entries, total] = await Promise.all([
      prisma.timelineEntry.findMany({
        where,
        orderBy: { date: "desc" },
        take: limit,
      }),
      prisma.timelineEntry.count({ where }),
    ]);

    return NextResponse.json({ data: entries, meta: { total, returned: entries.length } });
  } catch (error) {
    console.error("[API /timeline]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Zaman cizelgesi yuklenemedi" } },
      { status: 500 }
    );
  }
}
