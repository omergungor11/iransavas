import type { Metadata } from "next";
import {
  ShieldCheck,
  CheckCircle2,
  Eye,
  Scale,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Editöryal Politika",
  description:
    "İran Savaş platformunun editöryal ilkeleri, kaynak doğrulama standartları ve yayın politikası.",
};

const principles = [
  {
    icon: CheckCircle2,
    color: "text-green-500",
    title: "Doğruluk",
    description:
      "Her haber en az iki bağımsız kaynaktan doğrulanır. Doğrulanamayan bilgiler 'doğrulanmamış' etiketi ile paylaşılır.",
  },
  {
    icon: Scale,
    color: "text-blue-500",
    title: "Tarafsızlık",
    description:
      "Çatışmanın tüm taraflarına eşit mesafede durulur. Herhangi bir hükümet, askeri güç veya siyasi oluşumun sözcüsü değiliz.",
  },
  {
    icon: Eye,
    color: "text-purple-500",
    title: "Şeffaflık",
    description:
      "Kaynaklarımızı açıkça belirtiriz. Hatalarımızı kabul eder ve en kısa sürede düzeltiriz.",
  },
  {
    icon: AlertTriangle,
    color: "text-orange-500",
    title: "Sorumluluk",
    description:
      "Sivil güvenliği tehlikeye atabilecek hassas bilgiler filtrelenir. Şiddet içerikleri bağlamsız paylaşılmaz.",
  },
  {
    icon: BookOpen,
    color: "text-cyan-500",
    title: "Bağlam",
    description:
      "Haberler tarihsel ve jeopolitik bağlamda sunulur. Olayların arka planı ve muhtemel sonuçları analiz edilir.",
  },
] as const;

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-2">
        <ShieldCheck size={24} className="text-red-500" />
        <h1 className="text-2xl font-black text-foreground">
          Editöryal Politika
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-10">
        İçeriklerimizin arkasındaki ilkeler ve standartlar.
      </p>

      {/* Principles */}
      <div className="space-y-5 mb-12">
        {principles.map((p) => (
          <div
            key={p.title}
            className="flex gap-4 rounded-lg border border-border bg-muted/20 p-5"
          >
            <p.icon size={20} className={`${p.color} shrink-0 mt-0.5`} />
            <div>
              <h2 className="text-sm font-bold text-foreground mb-1">
                {p.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Source Verification */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Kaynak Doğrulama Süreci
        </h2>
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
          <div className="flex gap-3">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold">
              1
            </span>
            <p>
              <strong>Birincil Kaynak:</strong> Uluslararası haber ajansları
              (Reuters, AP, AFP) ve resmi kurumsal açıklamalar öncelikli
              kaynaklarımızdır.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold">
              2
            </span>
            <p>
              <strong>Çapraz Doğrulama:</strong> Her bilgi en az bir ek
              bağımsız kaynakla doğrulanır. Tek kaynağa dayalı haberler
              açıkça etiketlenir.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold">
              3
            </span>
            <p>
              <strong>OSINT Doğrulama:</strong> Açık kaynak istihbaratı
              materyalleri (uydu görüntüleri, sosyal medya) coğrafi ve
              zamansal analiz ile doğrulanır.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold">
              4
            </span>
            <p>
              <strong>AI Desteği:</strong> Yapay zeka destekli özetler
              &quot;AI Özet&quot; etiketi ile belirtilir ve editöryal
              denetimden geçirilir.
            </p>
          </div>
        </div>
      </section>

      {/* Corrections Link */}
      <div className="rounded-lg border border-border bg-muted/30 p-5">
        <h3 className="text-sm font-bold text-foreground mb-2">
          Hata Bildirimi
        </h3>
        <p className="text-sm text-muted-foreground">
          İçeriklerimizde fark ettiğiniz hataları{" "}
          <a
            href="/iletisim"
            className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
          >
            İletişim
          </a>{" "}
          sayfamızdan veya{" "}
          <a
            href="/duzeltme-politikasi"
            className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
          >
            Düzeltme Politikası
          </a>{" "}
          sayfamızdaki prosedürler ile bildirebilirsiniz.
        </p>
      </div>
    </div>
  );
}
