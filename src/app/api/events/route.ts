export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { eventsQuerySchema, parseQuery } from "@/lib/api-validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseQuery(searchParams, eventsQuerySchema);
    if (!parsed.success) return parsed.response;

    const { eventType, severity, from, to } = parsed.data;

    const where: Record<string, unknown> = {};
    if (eventType) where.eventType = eventType;
    if (severity) where.severity = severity;
    if (from || to) {
      where.date = {};
      if (from) (where.date as Record<string, unknown>).gte = new Date(from);
      if (to) (where.date as Record<string, unknown>).lte = new Date(to);
    }

    const [events, total] = await Promise.all([
      prisma.warEvent.findMany({ where, orderBy: { date: "desc" } }),
      prisma.warEvent.count({ where }),
    ]);

    return NextResponse.json({
      data: events,
      meta: { total, page: 1, pageSize: total },
    });
  } catch (error) {
    console.error("[API /events]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Olaylar yuklenemedi" } },
      { status: 500 }
    );
  }
}
