import type { Metadata } from "next";
import { HelpCircle, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "İran Savaş platformu hakkında sıkça sorulan sorular ve yanıtları.",
};

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "İran Savaş nedir?",
    a: "İran Savaş, 28 Şubat 2026'dan bu yana devam eden çatışmayı bağımsız ve kapsamlı şekilde takip eden bir dijital haber ve analiz platformudur. Canlı harita, piyasa verileri, OSINT istihbaratı ve AI destekli haber özetleri sunmaktadır.",
  },
  {
    q: "Haberlerinizin kaynağı nedir?",
    a: "İçeriklerimiz Reuters, AP, BBC, Al Jazeera, Middle East Eye gibi uluslararası haber ajanslarının yanı sıra doğrulanmış OSINT kaynakları ve resmi açıklamalardan derlenmektedir. Tüm haberler yayınlanmadan önce çapraz doğrulama sürecinden geçirilir.",
  },
  {
    q: "Platform herhangi bir hükümet veya kuruluşla bağlantılı mı?",
    a: "Hayır. İran Savaş tamamen bağımsız bir platformdur. Herhangi bir hükümet, askeri kuruluş, siyasi parti veya ticari oluşumla organik bağımız bulunmamaktadır.",
  },
  {
    q: "Canlı harita verileri ne sıklıkla güncelleniyor?",
    a: "Canlı stratejik haritamız açık kaynak istihbarat verilerinden beslenmekte ve sürekli olarak güncellenmektedir. Olay verileri doğrulandıktan sonra haritaya eklenir.",
  },
  {
    q: "Piyasa verileri gerçek zamanlı mı?",
    a: "Piyasa verilerimiz (petrol, altın, borsa endeksleri) belirli aralıklarla güncellenmektedir. Anlık ticaret kararları için profesyonel finans platformlarını kullanmanızı öneriyoruz.",
  },
  {
    q: "AI özetleri nasıl çalışıyor?",
    a: "Yapay zeka destekli özetlerimiz, haber makalelerinin ana noktalarını otomatik olarak Türkçeye çevirir ve özetler. Tüm AI özetleri 'AI Özet' etiketi ile belirtilir ve editöryal denetimden geçirilir.",
  },
  {
    q: "İçeriklerinizde bir hata buldum, nasıl bildirmeliyim?",
    a: "Hata bildirimleri için İletişim sayfamızı kullanabilir veya duzeltme@iransavas.com adresine e-posta gönderebilirsiniz. Düzeltme prosedürlerimiz hakkında detaylı bilgi için Düzeltme Politikası sayfamızı inceleyebilirsiniz.",
  },
  {
    q: "OSINT nedir?",
    a: "OSINT (Open Source Intelligence — Açık Kaynak İstihbaratı), kamuya açık kaynaklardan derlenen istihbarat bilgisidir. Uydu görüntüleri, sosyal medya paylaşımları, hava/deniz trafik verileri ve resmi açıklamalar OSINT kapsamına girer.",
  },
  {
    q: "Platformu nasıl destekleyebilirim?",
    a: "Bağımsız gazetecilik projemizi Buy Me a Coffee, Papara veya banka havalesi ile destekleyebilirsiniz. Platform üzerindeki destek bölümünden detaylara ulaşabilirsiniz.",
  },
  {
    q: "Gerilim Endeksi nasıl hesaplanıyor?",
    a: "Gerilim Endeksi, aktif hava saldırıları, siber operasyonlar, Hürmüz Boğazı transit durumu ve diplomatik kanallar gibi birden fazla göstergenin ağırlıklı ortalaması ile hesaplanır. 0-100 arası bir skor üretir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-3 mb-2">
        <HelpCircle size={24} className="text-blue-500" />
        <h1 className="text-2xl font-black text-foreground">
          Sıkça Sorulan Sorular
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-10">
        Platform hakkında merak edilenler.
      </p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded-lg border border-border bg-muted/20 overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer select-none list-none hover:bg-muted/40 transition-colors">
              <span className="text-sm font-semibold text-foreground">
                {faq.q}
              </span>
              <ChevronDown
                size={16}
                className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
              />
            </summary>
            <div className="px-5 pb-4 pt-1">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
