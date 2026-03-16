export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { newsQuerySchema, parseQuery } from "@/lib/api-validation";

const FALLBACK_ARTICLES = [
  {
    id: "fallback-1",
    title: "ABD ve İsrail'den İsfahan'a Ortak Hava Operasyonu",
    slug: "abd-israil-isfahan-ortak-hava-operasyonu",
    summary: "Nükleer tesislere yönelik kapsamlı hava saldırısı düzenlendi. İran hava savunma sistemleri aktif.",
    aiSummary: null,
    source: "Reuters",
    category: "ASKERI",
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
    imageUrl: null,
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
  },
];

function getFallbackResponse(category: string, search: string, page: number, pageSize: number) {
  let filtered = FALLBACK_ARTICLES;
  if (category && category !== "TUMU") {
    filtered = filtered.filter((a) => a.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (a) => a.title.toLowerCase().includes(q) || a.summary?.toLowerCase().includes(q)
    );
  }
  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  return { data: paginated, meta: { total, page, pageSize } };
}

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
    console.error("[API /news] DB error, returning fallback:", error);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "TUMU";
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 12;
    const search = searchParams.get("search") || "";
    return NextResponse.json(getFallbackResponse(category, search, page, pageSize));
  }
}
