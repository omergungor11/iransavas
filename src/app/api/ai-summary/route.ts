import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { summarizeArticle, batchSummarize } from "@/lib/ai-summarizer";

/**
 * POST /api/ai-summary
 * Body: { articleId: string } — single article
 * Body: { batch: true, limit?: number } — batch mode
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Batch mode
    if (body.batch) {
      const limit = Math.min(body.limit ?? 20, 50);
      const result = await batchSummarize(limit);
      return NextResponse.json({ data: result });
    }

    // Single article mode
    const { articleId } = body;
    if (!articleId) {
      return NextResponse.json(
        { error: { statusCode: 400, code: "BAD_REQUEST", message: "articleId gerekli" } },
        { status: 400 },
      );
    }

    const article = await prisma.newsArticle.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json(
        { error: { statusCode: 404, code: "NOT_FOUND", message: "Haber bulunamadi" } },
        { status: 404 },
      );
    }

    // Return cached summary if exists
    if (article.aiSummary) {
      return NextResponse.json({ data: { summary: article.aiSummary, cached: true } });
    }

    const { summary, source, tokensUsed } = await summarizeArticle(
      article.content,
      article.title,
      article.category,
    );

    await prisma.newsArticle.update({
      where: { id: articleId },
      data: { aiSummary: summary },
    });

    return NextResponse.json({ data: { summary, source, tokensUsed } });
  } catch (error) {
    console.error("[API /ai-summary]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "AI ozet olusturulamadi" } },
      { status: 500 },
    );
  }
}
