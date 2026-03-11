export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { newsQuerySchema, parseQuery } from "@/lib/api-validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = parseQuery(searchParams, newsQuerySchema);
    if (!parsed.success) return parsed.response;

    const { category, page, pageSize, search } = parsed.data;

    const where: Record<string, unknown> = {};
    if (category && category !== "TUMU") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const [articles, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.newsArticle.count({ where }),
    ]);

    return NextResponse.json({
      data: articles,
      meta: { total, page, pageSize },
    });
  } catch (error) {
    console.error("[API /news]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Haberler yuklenemedi" } },
      { status: 500 }
    );
  }
}
