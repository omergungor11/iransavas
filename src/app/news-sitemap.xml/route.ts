import prisma from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iransavas.com";

export async function GET() {
  let articles: { id: string; title: string; publishedAt: Date; source: string }[] = [];

  try {
    articles = await prisma.newsArticle.findMany({
      select: { id: true, title: true, publishedAt: true, source: true },
      orderBy: { publishedAt: "desc" },
      take: 1000,
    });
  } catch {
    // DB unavailable
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articles
  .map(
    (a) => `  <url>
    <loc>${SITE_URL}/haberler/${a.id}</loc>
    <news:news>
      <news:publication>
        <news:name>İran Savaş</news:name>
        <news:language>tr</news:language>
      </news:publication>
      <news:publication_date>${a.publishedAt.toISOString()}</news:publication_date>
      <news:title>${escapeXml(a.title)}</news:title>
    </news:news>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
