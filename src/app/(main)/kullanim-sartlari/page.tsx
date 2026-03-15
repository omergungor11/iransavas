import type { Metadata } from "next";
import { ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "İran Savaş platformunun kullanım şartları ve hizmet koşulları.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <ScrollText size={24} className="text-blue-500" />
        <h1 className="text-2xl font-black text-foreground">
          Kullanım Şartları
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-10">
        Son güncelleme: 28 Şubat 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            1. Kabul ve Onay
          </h2>
          <p>
            İran Savaş platformunu (&quot;Platform&quot;) kullanarak bu
            kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul
            etmiyorsanız platformu kullanmamanız gerekmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            2. Hizmet Tanımı
          </h2>
          <p>
            Platform, İran savaşı hakkında haber, analiz ve raporlama hizmeti
            sunmaktadır. Sunulan içerikler:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
            <li>Uluslararası kaynaklardan derlenen haber özetleri</li>
            <li>AI destekli haber çevirileri ve özetler</li>
            <li>İnteraktif harita ve görselleştirmeler</li>
            <li>Piyasa verileri ve ekonomik etki analizleri</li>
            <li>OSINT (Açık Kaynak İstihbaratı) derlemeleri</li>
            <li>Canlı yayın embed&apos;leri</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            3. İçerik Sorumluluk Reddi
          </h2>
          <div className="rounded-lg border border-yellow-900/30 bg-yellow-950/20 p-4">
            <p className="text-xs text-yellow-200/80">
              <strong className="text-yellow-400">Önemli: </strong>
              Platform yalnızca bilgi amaçlıdır ve resmi bir haber kaynağı
              değildir. İçerikler çeşitli medya kuruluşları ve açık
              kaynaklardan derlenmektedir. Kesin bilgi için resmi kaynaklara
              başvurunuz. Platform, içeriklerin doğruluğu konusunda mutlak
              garanti vermemektedir.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            4. Fikri Mülkiyet
          </h2>
          <p>
            Platformdaki orijinal içerikler (tasarım, kod, analiz yazıları)
            İran Savaş&apos;a aittir. Üçüncü taraf kaynaklardan derlenen
            haberler ilgili kaynağa atıfta bulunularak paylaşılmaktadır.
            İçeriklerin izinsiz ticari kullanımı yasaktır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            5. Kullanıcı Yükümlülükleri
          </h2>
          <p>Kullanıcılar şunları yapmamayı kabul eder:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
            <li>Platform içeriklerini bağlam dışı veya yanıltıcı şekilde paylaşmak</li>
            <li>Platformun teknik altyapısına zarar vermeye çalışmak</li>
            <li>İçerikleri otomatik araçlarla toplamak (scraping)</li>
            <li>Platform üzerinden yasadışı faaliyetlerde bulunmak</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            6. Üçüncü Taraf İçerikler
          </h2>
          <p>
            Platform, üçüncü taraf hizmetlerine (MarineTraffic, ADS-B
            Exchange, Glint Trade, YouTube) bağlantılar ve embed&apos;ler
            içermektedir. Bu hizmetlerin içerik ve gizlilik politikalarından
            İran Savaş sorumlu değildir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            7. Sorumluluk Sınırlaması
          </h2>
          <p>
            İran Savaş, platform içeriklerine dayanılarak alınan kararlardan
            (yatırım, seyahat, güvenlik) doğabilecek zararlardan sorumlu
            tutulamaz. Piyasa verileri yalnızca bilgilendirme amaçlıdır ve
            yatırım tavsiyesi niteliği taşımaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            8. Hizmet Değişiklikleri
          </h2>
          <p>
            Platform, önceden bildirimde bulunmaksızın hizmetlerini
            değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            9. Uygulanacak Hukuk
          </h2>
          <p>
            Bu kullanım şartları Türkiye Cumhuriyeti yasalarına tabi olup,
            uyuşmazlıklarda İstanbul mahkemeleri yetkilidir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            10. İletişim
          </h2>
          <p>
            Bu şartlarla ilgili sorularınız için{" "}
            <a
              href="/iletisim"
              className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
            >
              İletişim
            </a>{" "}
            sayfamızdan bize ulaşabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
