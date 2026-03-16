export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iransavas.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { publishedAt: "desc" },
      take: 30,
      select: {
        id: true,
        title: true,
        summary: true,
        aiSummary: true,
        source: true,
        category: true,
        publishedAt: true,
        imageUrl: true,
      },
    });

    const lastBuildDate = articles[0]?.publishedAt?.toUTCString() || new Date().toUTCString();

    const items = articles.map((a) => {
      const description = a.aiSummary || a.summary || a.title;
      const link = `${SITE_URL}/haberler/${a.id}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(description)}</description>
      <category>${escapeXml(a.category)}</category>
      <source url="${SITE_URL}">${escapeXml(a.source)}</source>
      <pubDate>${a.publishedAt.toUTCString()}</pubDate>${
        a.imageUrl ? `\n      <enclosure url="${escapeXml(a.imageUrl)}" type="image/jpeg" />` : ""
      }
    </item>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>İran Savaş - Haber &amp; Analiz</title>
    <link>${SITE_URL}</link>
    <description>İran savaşı hakkında kapsamlı haber, analiz ve raporlama platformu.</description>
    <language>tr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/rss" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE_URL}/og-default.png</url>
      <title>İran Savaş</title>
      <link>${SITE_URL}</link>
    </image>
${items}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "s-maxage=900, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("[RSS] Error:", error);
    return NextResponse.json({ error: "RSS feed oluşturulamadı" }, { status: 500 });
  }
}
