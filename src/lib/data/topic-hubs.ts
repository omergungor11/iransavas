// ── Topic Hub Definitions ─────────────────────────────────────────────

export interface TopicHub {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  icon: string;
  relatedExplainer?: string;
}

export const TOPIC_HUBS: TopicHub[] = [
  {
    slug: "hurmuz-krizi",
    title: "Hürmüz Boğazı Krizi",
    description:
      "Dünya petrol ticaretinin kritik geçiş noktası Hürmüz Boğazı'ndaki gerilim, abluka tehditleri ve deniz operasyonları hakkında tüm gelişmeler.",
    keywords: ["Hürmüz", "boğaz", "tanker", "deniz", "abluka", "petrol"],
    icon: "anchor",
    relatedExplainer: "/aciklamalar",
  },
  {
    slug: "nukleer-program",
    title: "İran Nükleer Programı",
    description:
      "İran'ın nükleer zenginleştirme faaliyetleri, IAEA denetimleri, tesisler ve uluslararası müzakereler hakkında kapsamlı takip.",
    keywords: ["nükleer", "zenginleştirme", "uranyum", "IAEA", "santrifüj", "Natanz", "Fordow"],
    icon: "atom",
    relatedExplainer: "/nukleer-takip",
  },
  {
    slug: "israil-operasyonlari",
    title: "İsrail Askeri Operasyonları",
    description:
      "İsrail'in İran'a yönelik askeri operasyonları, hava saldırıları, istihbarat faaliyetleri ve stratejik hedefleme analizleri.",
    keywords: ["İsrail", "operasyon", "hava saldırısı", "IDF", "Mossad", "saldırı"],
    icon: "plane",
    relatedExplainer: "/aciklamalar",
  },
  {
    slug: "siber-savas",
    title: "Siber Savaş",
    description:
      "İran ve müttefiklerinin siber saldırı kapasiteleri, kritik altyapı hedefleme, siber casusluk ve dijital cephede yaşanan gelişmeler.",
    keywords: ["siber", "hack", "altyapı", "dijital", "APT", "saldırı"],
    icon: "shield",
    relatedExplainer: "/aciklamalar",
  },
  {
    slug: "insani-kriz",
    title: "İnsani Kriz",
    description:
      "Çatışmanın sivil halk üzerindeki etkileri, mülteci hareketleri, insani yardım operasyonları ve sivil kayıp raporları.",
    keywords: ["sivil", "insani", "mülteci", "yardım", "tahliye", "kayıp", "hastane"],
    icon: "heart",
    relatedExplainer: "/aciklamalar",
  },
];

export function getTopicBySlug(slug: string): TopicHub | undefined {
  return TOPIC_HUBS.find((t) => t.slug === slug);
}
