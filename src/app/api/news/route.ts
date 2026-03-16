export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { getPerspectiveBySourceName } from "@/lib/fetchers/sources";

function sanitizeSearch(val: string): string {
  return val.replace(/[<>"';\\]/g, "").trim().slice(0, 200);
}

const newsQuerySchema = z.object({
  category: z.string().max(50).optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(12),
  search: z.string().max(200).transform(sanitizeSearch).optional(),
  source: z.string().max(100).optional(),
  dateRange: z.enum(["today", "3days", "week", "all"]).optional(),
  sort: z.enum(["newest", "oldest"]).default("newest"),
});

const FALLBACK_ARTICLES = [
  {
    id: "fallback-1",
    title: "ABD ve İsrail'den İsfahan'a Ortak Hava Operasyonu",
    slug: "abd-israil-isfahan-ortak-hava-operasyonu",
    summary: "Nükleer tesislere yönelik kapsamlı hava saldırısı düzenlendi. İran hava savunma sistemleri aktif.",
    aiSummary: null,
    source: "Reuters",
    category: "ASKERI",
    perspective: "Batı Medyası",
    imageUrl: null,
    publishedAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "Hürmüz Boğazı'nda Tanker Trafiği Durma Noktasında",
    slug: "hurmuz-bogazi-tanker-trafigi",
    summary: "İran Devrim Muhafızları'nın tehditleri sonrası petrol tanker geçişleri askıya alındı.",
    aiSummary: null,
    source: "Al Jazeera",
    category: "DENIZ",
    perspective: "Bağımsız",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "fallback-3",
    title: "Petrol Fiyatları 120 Doları Aştı",
    slug: "petrol-fiyatlari-120-dolari-asti",
    summary: "Brent petrol varil fiyatı çatışmanın etkisiyle son 3 yılın en yüksek seviyesine ulaştı.",
    aiSummary: null,
    source: "BBC",
    category: "EKONOMI",
    perspective: "Batı Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "fallback-4",
    title: "BM Güvenlik Konseyi Acil Toplantıya Çağrıldı",
    slug: "bm-guvenlik-konseyi-acil-toplanti",
    summary: "Fransa ve İngiltere'nin talebiyle ateşkes görüşmeleri için acil oturum kararı alındı.",
    aiSummary: null,
    source: "AP",
    category: "DIPLOMASI",
    perspective: "Batı Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "fallback-5",
    title: "Tahran'da Sivil Altyapıya Hasar Raporu",
    slug: "tahran-sivil-altyapi-hasar-raporu",
    summary: "İnsani yardım kuruluşları bölgedeki sivil kayıplar ve altyapı hasarını raporladı.",
    aiSummary: null,
    source: "Middle East Eye",
    category: "INSANI",
    perspective: "Bağımsız",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: "fallback-6",
    title: "USS Gerald Ford Taşıyıcı Grubu Basra Körfezi'nde",
    slug: "uss-gerald-ford-basra-korfezi",
    summary: "ABD Deniz Kuvvetleri'nin en büyük uçak gemisi savaş grubunun bölgeye konuşlandığı doğrulandı.",
    aiSummary: null,
    source: "CNN",
    category: "ASKERI",
    perspective: "Batı Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
  },
  {
    id: "fallback-7",
    title: "İran Siber Saldırı Kapasitesini Artırıyor",
    slug: "iran-siber-saldiri-kapasitesi",
    summary: "Batılı istihbarat kaynakları, İran'ın kritik altyapılara yönelik siber operasyonlarını yoğunlaştırdığını bildirdi.",
    aiSummary: null,
    source: "The Guardian",
    category: "SIBER",
    perspective: "Batı Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
  },
  {
    id: "fallback-8",
    title: "Bölge Ülkeleri Hava Sahalarını Kapattı",
    slug: "bolge-ulkeleri-hava-sahalari-kapali",
    summary: "Irak, Ürdün ve Kuveyt sivil havacılık trafiğini geçici olarak askıya aldı.",
    aiSummary: null,
    source: "TRT Haber",
    category: "BOLGESEL",
    perspective: "Türk Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
  },
  {
    id: "fallback-9",
    title: "Tahran Borsası Sert Düştü",
    slug: "tahran-borsasi-sert-dustu",
    summary: "İran borsasında işlemler çatışma haberleriyle %12 düşüş yaşandı, döviz piyasası baskı altında.",
    aiSummary: null,
    source: "Financial Times",
    category: "EKONOMI",
    perspective: "Batı Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
  },
  {
    id: "fallback-10",
    title: "IRNA: İran Hava Savunması Düşman Hedeflerini İmha Etti",
    slug: "irna-iran-hava-savunma-imha",
    summary: "İran resmi haber ajansı, hava savunma sistemlerinin başarıyla müdahale ettiğini duyurdu.",
    aiSummary: null,
    source: "IRNA",
    category: "ASKERI",
    perspective: "İran Resmî",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
  },
  {
    id: "fallback-11",
    title: "İsrail: Nükleer Tehdit Ortadan Kaldırıldı",
    slug: "israil-nukleer-tehdit-ortadan-kaldirildi",
    summary: "İsrail Savunma Bakanlığı, İran nükleer tesislerine yönelik operasyonun başarılı olduğunu açıkladı.",
    aiSummary: null,
    source: "Times of Israel",
    category: "ASKERI",
    perspective: "İsrail Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
  },
  {
    id: "fallback-12",
    title: "Türkiye Dışişleri: Ateşkes İçin Diplomasi Yoğunlaştı",
    slug: "turkiye-disisleri-ateskes-diplomasi",
    summary: "Ankara, bölgesel barış için arabuluculuk teklifini yineledi, tüm taraflarla görüşmeler sürüyor.",
    aiSummary: null,
    source: "Anadolu Ajansı",
    category: "DIPLOMASI",
    perspective: "Türk Medyası",
    imageUrl: null,
    publishedAt: new Date(Date.now() - 39600000).toISOString(),
  },
];

function getDateRangeFilter(dateRange: string): Date | null {
  const now = new Date();
  switch (dateRange) {
    case "today":
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    case "3days":
      return new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
    case "week":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}

function getFallbackResponse(
  category: string,
  search: string,
  page: number,
  pageSize: number,
  source?: string,
  dateRange?: string,
  sort?: string
) {
  let filtered = FALLBACK_ARTICLES.map((a) => ({
    ...a,
    perspective: a.perspective || getPerspectiveBySourceName(a.source),
  }));

  if (category && category !== "TUMU") {
    filtered = filtered.filter((a) => a.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (a) => a.title.toLowerCase().includes(q) || a.summary?.toLowerCase().includes(q)
    );
  }
  if (source) {
    const sources = source.split(",").map((s) => s.trim().toLowerCase());
    filtered = filtered.filter((a) => sources.includes(a.source.toLowerCase()));
  }
  if (dateRange && dateRange !== "all") {
    const from = getDateRangeFilter(dateRange);
    if (from) {
      filtered = filtered.filter((a) => new Date(a.publishedAt) >= from);
    }
  }
  if (sort === "oldest") {
    filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
  } else {
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  return { data: paginated, meta: { total, page, pageSize } };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raw: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      raw[key] = value;
    });

    const result = newsQuerySchema.safeParse(raw);
    if (!result.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Geçersiz parametreler" } },
        { status: 400 }
      );
    }

    const { category, page, pageSize, search, source, dateRange, sort } = result.data;

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
    if (source) {
      const sources = source.split(",").map((s) => s.trim());
      where.source = { in: sources };
    }
    if (dateRange && dateRange !== "all") {
      const from = getDateRangeFilter(dateRange);
      if (from) {
        where.publishedAt = { gte: from };
      }
    }

    const orderBy = { publishedAt: sort === "oldest" ? ("asc" as const) : ("desc" as const) };

    const [articles, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.newsArticle.count({ where }),
    ]);

    // Add perspective from source name if not in DB
    const enriched = articles.map((a) => ({
      ...a,
      perspective: a.perspective || getPerspectiveBySourceName(a.source),
    }));

    return NextResponse.json({
      data: enriched,
      meta: { total, page, pageSize },
    });
  } catch (error) {
    console.error("[API /news] DB error, returning fallback:", error);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "TUMU";
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 12;
    const search = searchParams.get("search") || "";
    const source = searchParams.get("source") || undefined;
    const dateRange = searchParams.get("dateRange") || undefined;
    const sort = searchParams.get("sort") || "newest";
    return NextResponse.json(getFallbackResponse(category, search, page, pageSize, source, dateRange, sort));
  }
}
