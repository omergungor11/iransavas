export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const where: Record<string, unknown> = {};
    if (type) where.type = type;

    const reports = await prisma.report.findMany({
      where,
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ data: reports });
  } catch (error) {
    console.error("[API /reports]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Raporlar yuklenemedi" } },
      { status: 500 }
    );
  }
}
