import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { articleId } = await request.json();

    const article = await prisma.newsArticle.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return NextResponse.json(
        { error: { statusCode: 404, code: "NOT_FOUND", message: "Haber bulunamadi" } },
        { status: 404 }
      );
    }

    if (article.aiSummary) {
      return NextResponse.json({ data: { summary: article.aiSummary } });
    }

    let summary: string;

    if (process.env.OPENAI_API_KEY) {
      const { default: OpenAI } = await import("openai");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Sen bir savas muhabirisin. Verilen haber metninin Turkce kisa ozetini yaz. Ozet 2-3 cumle olsun.",
          },
          { role: "user", content: article.content },
        ],
        max_tokens: 200,
      });
      summary = completion.choices[0]?.message?.content || "Ozet olusturulamadi.";
    } else {
      summary = `AI Ozet: ${article.title} - Bu haber ${article.category.toLowerCase()} kategorisinde onemli gelismeleri icermektedir. Detayli analiz icin tam metni okuyunuz.`;
    }

    await prisma.newsArticle.update({
      where: { id: articleId },
      data: { aiSummary: summary },
    });

    return NextResponse.json({ data: { summary } });
  } catch (error) {
    console.error("[API /ai-summary]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "AI ozet olusturulamadi" } },
      { status: 500 }
    );
  }
}
