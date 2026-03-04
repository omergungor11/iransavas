export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const importance = searchParams.get("importance");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "100");

    const where: Record<string, unknown> = {};
    if (importance) where.importance = importance;
    if (category) where.category = category;

    const entries = await prisma.timelineEntry.findMany({
      where,
      orderBy: { date: "desc" },
      take: Math.min(limit, 200),
    });

    return NextResponse.json({ data: entries, meta: { total: entries.length } });
  } catch (error) {
    console.error("[API /timeline]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Zaman cizelgesi yuklenemedi" } },
      { status: 500 }
    );
  }
}
