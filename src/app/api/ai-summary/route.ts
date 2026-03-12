import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { summarizeArticle, batchSummarize } from "@/lib/ai-summarizer";
import { requireAdmin } from "@/lib/auth";

/**
 * POST /api/ai-summary
 * Body: { articleId: string } — single article
 * Body: { batch: true, limit?: number } — batch mode
 * Requires ADMIN_KEY authentication.
 */
export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: { statusCode: 400, code: "BAD_REQUEST", message: "Gecersiz JSON body" } },
        { status: 400 },
      );
    }

    // Batch mode
    if (body.batch) {
      const limit = Math.min(typeof body.limit === "number" ? body.limit : 20, 50);
      const result = await batchSummarize(limit);
      return NextResponse.json({ data: result });
    }

    // Single article mode
    const { articleId } = body;
    if (!articleId || typeof articleId !== "string") {
      return NextResponse.json(
        { error: { statusCode: 400, code: "BAD_REQUEST", message: "articleId (string) gerekli" } },
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
