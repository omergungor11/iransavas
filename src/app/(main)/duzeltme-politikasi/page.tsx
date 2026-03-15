import type { Metadata } from "next";
import { FileWarning, Clock, CheckCircle2, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Düzeltme Politikası",
  description:
    "İran Savaş platformunun hata düzeltme prosedürleri ve şeffaflık ilkeleri.",
};

export default function CorrectionsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <FileWarning size={24} className="text-orange-500" />
        <h1 className="text-2xl font-black text-foreground">
          Düzeltme Politikası
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-10">
        Hataları kabul etmek ve düzeltmek, güvenilir gazeteciliğin temel
        taşıdır.
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground/80">
        {/* Commitment */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">
            Taahhüdümüz
          </h2>
          <p>
            İran Savaş olarak yayınlarımızdaki doğruluğa büyük önem veriyoruz.
            Ancak hızlı akan bilgi ortamında hatalar kaçınılmazdır. Bir hata
            tespit edildiğinde, en kısa sürede şeffaf bir şekilde düzeltmeyi
            taahhüt ediyoruz.
          </p>
        </section>

        {/* Types of Corrections */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Düzeltme Türleri
          </h2>
          <div className="space-y-3">
            <div className="rounded-lg border border-red-900/30 bg-red-950/20 p-4">
              <h3 className="text-sm font-bold text-red-400 mb-1">
                Kritik Düzeltme
              </h3>
              <p className="text-xs text-muted-foreground">
                Haberin temel anlamını değiştiren factüel hatalar. İçerik
                derhal güncellenir ve düzeltme notu eklenir. Sosyal medya
                paylaşımlarında da düzeltme yapılır.
              </p>
            </div>
            <div className="rounded-lg border border-yellow-900/30 bg-yellow-950/20 p-4">
              <h3 className="text-sm font-bold text-yellow-400 mb-1">
                Standart Düzeltme
              </h3>
              <p className="text-xs text-muted-foreground">
                Yazım hataları, eksik bağlam veya küçük factüel hatalar. İçerik
                güncellenir ve düzeltme notu eklenir.
              </p>
            </div>
            <div className="rounded-lg border border-blue-900/30 bg-blue-950/20 p-4">
              <h3 className="text-sm font-bold text-blue-400 mb-1">
                Güncelleme
              </h3>
              <p className="text-xs text-muted-foreground">
                Gelişen olaylara bağlı yeni bilgi eklenmesi. Orijinal içerik
                korunur, güncelleme zaman damgası ile eklenir.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Düzeltme Süreci
          </h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border">
                <Mail size={14} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  1. Bildirim
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hata bildirimi{" "}
                  <a
                    href="mailto:duzeltme@iransavas.com"
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    duzeltme@iransavas.com
                  </a>{" "}
                  adresine veya{" "}
                  <a
                    href="/iletisim"
                    className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
                  >
                    İletişim
                  </a>{" "}
                  sayfası üzerinden yapılabilir.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border">
                <Clock size={14} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  2. Değerlendirme
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Editöryal ekibimiz bildirimi 24 saat içinde değerlendirir.
                  Kritik hatalar 1 saat içinde işleme alınır.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-muted border border-border">
                <CheckCircle2 size={14} className="text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  3. Düzeltme
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hata doğrulanırsa içerik güncellenir. İçeriğin altına
                  düzeltme notu, tarihi ve ne değiştiği açıkça belirtilir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transparency note */}
        <div className="rounded-lg border border-border bg-muted/30 p-5">
          <h3 className="text-sm font-bold text-foreground mb-2">
            Şeffaflık İlkesi
          </h3>
          <p className="text-xs text-muted-foreground">
            Düzeltilen içeriklerdeki orijinal hatalar silinmez — ne değiştiği
            açıkça belirtilir. Bu, okuyucularımıza karşı şeffaflık
            taahhüdümüzün bir parçasıdır. Tüm düzeltmeler tarih ve saat
            damgası ile kaydedilir.
          </p>
        </div>
      </div>
    </div>
  );
}
