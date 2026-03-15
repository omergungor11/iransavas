import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { NewsCard } from "@/components/news/news-card";

interface Article {
  id: string;
  title: string;
  summary: string | null;
  aiSummary: string | null;
  source: string;
  category: string;
  publishedAt: string;
  imageUrl?: string | null;
}

interface LatestNewsProps {
  articles: Article[];
  error?: boolean;
}

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "fallback-1",
    title: "ABD ve İsrail'den İsfahan'a Ortak Hava Operasyonu",
    summary: "Nükleer tesislere yönelik kapsamlı hava saldırısı düzenlendi. İran hava savunma sistemleri aktif.",
    aiSummary: null,
    source: "Reuters",
    category: "ASKERI",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "Hürmüz Boğazı'nda Tanker Trafiği Durma Noktasında",
    summary: "İran Devrim Muhafızları'nın tehditleri sonrası petrol tanker geçişleri askıya alındı.",
    aiSummary: null,
    source: "Al Jazeera",
    category: "DENIZ",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "fallback-3",
    title: "Petrol Fiyatları 120 Doları Aştı",
    summary: "Brent petrol varil fiyatı çatışmanın etkisiyle son 3 yılın en yüksek seviyesine ulaştı.",
    aiSummary: null,
    source: "BBC",
    category: "EKONOMI",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "fallback-4",
    title: "BM Güvenlik Konseyi Acil Toplantıya Çağrıldı",
    summary: "Fransa ve İngiltere'nin talebiyle ateşkes görüşmeleri için acil oturum kararı alındı.",
    aiSummary: null,
    source: "AP",
    category: "DIPLOMASI",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "fallback-5",
    title: "Tahran'da Sivil Altyapıya Hasar Raporu",
    summary: "İnsani yardım kuruluşları bölgedeki sivil kayıplar ve altyapı hasarını raporladı.",
    aiSummary: null,
    source: "Middle East Eye",
    category: "INSANI",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: "fallback-6",
    title: "USS Gerald Ford Taşıyıcı Grubu Basra Körfezi'nde",
    summary: "ABD Deniz Kuvvetleri'nin en büyük uçak gemisi savaş grubunun bölgeye konuşlandığı doğrulandı.",
    aiSummary: null,
    source: "CNN",
    category: "ASKERI",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
  },
];

export function LatestNews({ articles, error }: LatestNewsProps) {
  const displayArticles = !error && articles.length > 0 ? articles : FALLBACK_ARTICLES;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Son Haberler</h2>
        <Link href="/haberler" className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300">
          Tüm Haberleri Gör <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayArticles.map((article) => (
          <NewsCard key={article.id} {...article} publishedAt={article.publishedAt} />
        ))}
      </div>
    </section>
  );
}
