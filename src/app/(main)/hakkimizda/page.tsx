import type { Metadata } from "next";
import { Target, Shield, Globe, Users, Radio } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "İran Savaş platformu hakkında bilgi — misyonumuz, kapsam alanımız ve editoryal yaklaşımımız.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-600">
          <Target size={20} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Hakkımızda</h1>
          <p className="text-sm text-muted-foreground">
            İran Savaş Haber & Analiz Platformu
          </p>
        </div>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
        {/* Mission */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Radio size={18} className="text-red-500" />
            Misyonumuz
          </h2>
          <p>
            İran Savaş, 28 Şubat 2026&apos;dan bu yana devam eden çatışma
            sürecini bağımsız ve kapsamlı şekilde takip eden bir dijital haber
            ve analiz platformudur. Amacımız, güvenilir kaynaklardan derlenen
            bilgileri hızlı, doğru ve anlaşılır biçimde Türkçe olarak
            okuyuculara ulaştırmaktır.
          </p>
        </section>

        {/* Coverage */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Globe size={18} className="text-blue-500" />
            Kapsam Alanımız
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-foreground/70">
            <li>Askeri operasyonlar ve saha gelişmeleri</li>
            <li>Diplomatik süreçler ve uluslararası tepkiler</li>
            <li>Piyasa etkileri — petrol, altın, borsa</li>
            <li>OSINT (Açık Kaynak İstihbaratı) analizleri</li>
            <li>İnsani durum ve sivil etkiler</li>
            <li>Bölgesel güvenlik ve jeopolitik değerlendirmeler</li>
          </ul>
        </section>

        {/* Sources */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Shield size={18} className="text-green-500" />
            Kaynaklarımız
          </h2>
          <p>
            İçeriklerimiz Reuters, AP, BBC, Al Jazeera, Middle East Eye gibi
            uluslararası haber ajanslarının yanı sıra, doğrulanmış OSINT
            kaynakları ve resmi açıklamalardan derlenmektedir. Tüm haberler
            yayınlanmadan önce çapraz kontrol sürecinden geçirilir.
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Users size={18} className="text-purple-500" />
            Ekibimiz
          </h2>
          <p>
            Platform, bağımsız gazeteciler, güvenlik analistleri ve yazılım
            geliştiricilerden oluşan bir ekip tarafından yönetilmektedir.
            Herhangi bir hükümet, askeri kuruluş veya siyasi oluşumla organik
            bağımız bulunmamaktadır.
          </p>
        </section>

        {/* Tech */}
        <section className="rounded-lg border border-border bg-muted/30 p-5">
          <h3 className="text-sm font-bold text-foreground mb-2">
            Teknoloji Altyapısı
          </h3>
          <p className="text-xs text-muted-foreground">
            Next.js, AI destekli haber özetleri, interaktif harita (Leaflet),
            gerçek zamanlı veri akışı ve PWA desteği ile modern web teknolojileri
            kullanılarak geliştirilmiştir.
          </p>
        </section>
      </div>
    </div>
  );
}
