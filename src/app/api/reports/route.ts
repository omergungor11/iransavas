export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { reportsQuerySchema, parseQuery } from "@/lib/api-validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseQuery(searchParams, reportsQuerySchema);
    if (!parsed.success) return parsed.response;

    const { type } = parsed.data;

    const where: Record<string, unknown> = {};
    if (type) where.type = type;

    const reports = await prisma.report.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: 100,
    });

    return NextResponse.json({ data: reports, meta: { total: reports.length } });
  } catch (error) {
    console.error("[API /reports]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Raporlar yuklenemedi" } },
      { status: 500 }
    );
  }
}
