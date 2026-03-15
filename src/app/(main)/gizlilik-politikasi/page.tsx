import type { Metadata } from "next";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "İran Savaş platformunun gizlilik politikası — kişisel verilerin korunması ve çerez kullanımı.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <Lock size={24} className="text-green-500" />
        <h1 className="text-2xl font-black text-foreground">
          Gizlilik Politikası
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-10">
        Son güncelleme: 28 Şubat 2026
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">1. Genel Bakış</h2>
          <p>
            İran Savaş (&quot;Platform&quot;) olarak kullanıcılarımızın
            gizliliğine büyük önem veriyoruz. Bu politika, platformumuzu
            kullanırken hangi verilerin toplandığını, nasıl kullanıldığını ve
            nasıl korunduğunu açıklamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            2. Toplanan Veriler
          </h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Otomatik Olarak Toplanan Veriler
              </h3>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                <li>IP adresi (anonimleştirilmiş)</li>
                <li>Tarayıcı türü ve sürümü</li>
                <li>Cihaz bilgileri (mobil/masaüstü)</li>
                <li>Sayfa görüntüleme istatistikleri</li>
                <li>Ziyaret süresi ve etkileşim verileri</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Kullanıcı Tarafından Sağlanan Veriler
              </h3>
              <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1 mt-2">
                <li>İletişim formları aracılığıyla gönderilen e-posta adresleri</li>
                <li>Geri bildirim ve düzeltme talepleri</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            3. Verilerin Kullanımı
          </h2>
          <p>Toplanan veriler yalnızca aşağıdaki amaçlarla kullanılır:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
            <li>Platform performansının iyileştirilmesi</li>
            <li>İçerik kalitesinin artırılması</li>
            <li>Teknik sorunların tespiti ve çözümü</li>
            <li>İletişim taleplerine yanıt verilmesi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            4. Çerezler (Cookies)
          </h2>
          <p>Platformumuz şu çerezleri kullanmaktadır:</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left px-3 py-2 font-semibold text-foreground border-b border-border">
                    Çerez
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-foreground border-b border-border">
                    Amaç
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-foreground border-b border-border">
                    Süre
                  </th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2 font-mono">_vercel_analytics</td>
                  <td className="px-3 py-2">Sayfa görüntüleme analizi</td>
                  <td className="px-3 py-2">Oturum</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-3 py-2 font-mono">theme</td>
                  <td className="px-3 py-2">Tema tercihi (dark/light)</td>
                  <td className="px-3 py-2">1 yıl</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-mono">donation_dismissed</td>
                  <td className="px-3 py-2">Destek bildirimi tercihi</td>
                  <td className="px-3 py-2">3 gün</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            5. Üçüncü Taraf Hizmetler
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>
              <strong>Vercel Analytics:</strong> Anonimleştirilmiş sayfa
              görüntüleme istatistikleri
            </li>
            <li>
              <strong>OpenStreetMap / Leaflet:</strong> Harita verileri
              (kişisel veri toplanmaz)
            </li>
            <li>
              <strong>ADS-B Exchange / MarineTraffic:</strong> Uçuş ve deniz
              trafik embed&apos;leri
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            6. Verilerin Paylaşımı
          </h2>
          <p>
            Kişisel verileriniz üçüncü taraflarla <strong>paylaşılmaz</strong>,
            satılmaz veya kiralanmaz. Yasal zorunluluklar hariç hiçbir koşulda
            verileriniz aktarılmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            7. Veri Güvenliği
          </h2>
          <p>
            Verileriniz HTTPS şifreleme ile korunmaktadır. Sunucularımız
            Avrupa (Frankfurt) bölgesinde barındırılmaktadır. Düzenli güvenlik
            taramaları ve güncellemeler uygulanmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            8. Haklarınız
          </h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Verilerinize erişim talep etme hakkı</li>
            <li>Verilerinizin silinmesini isteme hakkı</li>
            <li>Çerezleri reddetme hakkı</li>
            <li>Veri işlemeye itiraz etme hakkı</li>
          </ul>
          <p className="mt-2">
            Haklarınızı kullanmak için{" "}
            <a
              href="/iletisim"
              className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
            >
              İletişim
            </a>{" "}
            sayfamızdan bize ulaşabilirsiniz.
          </p>
        </section>

        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <p className="text-xs text-muted-foreground">
            Bu gizlilik politikası zaman zaman güncellenebilir. Önemli
            değişiklikler platform üzerinden duyurulacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
