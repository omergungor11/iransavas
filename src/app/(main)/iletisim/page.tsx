import type { Metadata } from "next";
import { Mail, MessageSquare, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "İran Savaş platformu ile iletişime geçin — geri bildirim, düzeltme talepleri ve işbirliği.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-black text-foreground mb-2">İletişim</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Geri bildirimleriniz, düzeltme talepleriniz veya işbirliği
        önerileriniz için bize ulaşabilirsiniz.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Email */}
        <div className="rounded-lg border border-border bg-muted/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30">
              <Mail size={16} className="text-blue-400" />
            </div>
            <h2 className="text-sm font-bold text-foreground">E-posta</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Genel sorularınız ve işbirliği teklifleriniz için:
          </p>
          <a
            href="mailto:info@iransavas.com"
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            info@iransavas.com
          </a>
        </div>

        {/* Feedback */}
        <div className="rounded-lg border border-border bg-muted/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-600/20 border border-green-500/30">
              <MessageSquare size={16} className="text-green-400" />
            </div>
            <h2 className="text-sm font-bold text-foreground">
              Geri Bildirim
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            İçeriklerimizle ilgili geri bildirimlerinizi, eksik veya hatalı
            bilgi raporlarınızı bekliyoruz. Her mesaj editöryal ekibimiz
            tarafından değerlendirilir.
          </p>
        </div>

        {/* Corrections */}
        <div className="rounded-lg border border-border bg-muted/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/30">
              <AlertCircle size={16} className="text-orange-400" />
            </div>
            <h2 className="text-sm font-bold text-foreground">
              Düzeltme Talebi
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Yayınlarımızda fark ettiğiniz hataları bildirmek için{" "}
            <a
              href="mailto:duzeltme@iransavas.com"
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              duzeltme@iransavas.com
            </a>{" "}
            adresine yazabilirsiniz. Düzeltme politikamız hakkında detaylı
            bilgi için{" "}
            <a
              href="/duzeltme-politikasi"
              className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
            >
              Düzeltme Politikası
            </a>{" "}
            sayfamızı inceleyebilirsiniz.
          </p>
        </div>

        {/* Press */}
        <div className="rounded-lg border border-border bg-muted/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/30">
              <Mail size={16} className="text-purple-400" />
            </div>
            <h2 className="text-sm font-bold text-foreground">
              Basın & Medya
            </h2>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Basın sorularınız ve medya işbirlikleri için:
          </p>
          <a
            href="mailto:basin@iransavas.com"
            className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            basin@iransavas.com
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-lg border border-yellow-900/40 bg-yellow-950/20 p-4">
        <p className="text-xs text-yellow-200/70 leading-relaxed">
          <span className="font-semibold text-yellow-400">Not: </span>
          Tüm mesajlar editöryal ekibimiz tarafından incelenir. Acil hata
          bildirimleri öncelikli olarak değerlendirilir. Yanıt süresi genellikle
          24-48 saat içindedir.
        </p>
      </div>
    </div>
  );
}
