import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json(
        { error: { statusCode: 404, code: "NOT_FOUND", message: "Haber bulunamadi" } },
        { status: 404 }
      );
    }

    const related = await prisma.newsArticle.findMany({
      where: { category: article.category, id: { not: article.id } },
      orderBy: { publishedAt: "desc" },
      take: 4,
    });

    return NextResponse.json({ data: { article, related } });
  } catch (error) {
    console.error("[API /news/id]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Haber yuklenemedi" } },
      { status: 500 }
    );
  }
}
