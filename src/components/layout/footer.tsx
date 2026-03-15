import Link from "next/link";
import { Target, ExternalLink, ShieldAlert } from "lucide-react";

const quickLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Haberler", href: "/haberler" },
  { label: "Harita", href: "/harita" },
  { label: "Zaman Çizelgesi", href: "/zaman-cizelgesi" },
  { label: "Analiz", href: "/analiz" },
  { label: "Raporlar", href: "/raporlar" },
] as const;

const policyLinks = [
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" },
  { label: "SSS", href: "/sss" },
  { label: "Editöryal Politika", href: "/editoryal-politika" },
  { label: "Düzeltme Politikası", href: "/duzeltme-politikasi" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Kullanım Şartları", href: "/kullanim-sartlari" },
] as const;

const sources = [
  { label: "Reuters", href: "https://www.reuters.com" },
  { label: "Al Jazeera", href: "https://www.aljazeera.com" },
  { label: "BBC News", href: "https://www.bbc.com/news" },
  { label: "AP News", href: "https://apnews.com" },
  { label: "Middle East Eye", href: "https://www.middleeasteye.net" },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-background text-muted-foreground"
      role="contentinfo"
    >
      {/* Disclaimer banner */}
      <div className="border-b border-yellow-900/40 bg-yellow-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-start gap-2.5">
            <ShieldAlert
              size={16}
              className="text-yellow-500 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <p className="text-xs text-yellow-200/70 leading-relaxed">
              <span className="font-semibold text-yellow-400">Uyarı: </span>
              Bu platform yalnızca{" "}
              <span className="font-medium text-yellow-300/80">
                bilgi amaçlıdır
              </span>{" "}
              ve resmî bir haber kaynağı değildir. Paylaşılan içerikler çeşitli
              medya kuruluşları ve açık kaynaklardan derlenmektedir. Kesin bilgi
              için resmî kaynaklara başvurunuz.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
              aria-label="İran Savaş Ana Sayfa"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded bg-red-700 group-hover:bg-red-600 transition-colors duration-200">
                <Target
                  size={16}
                  className="text-white"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </div>
              <span className="text-lg font-black tracking-wider text-foreground uppercase">
                İran <span className="text-red-500">Savaş</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              İran savaşı hakkında kapsamlı haber, analiz ve raporlama
              platformu. Canlı harita, zaman çizelgesi ve AI destekli
              özetlerle sahadan anlık bilgi.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-semibold tracking-widest text-red-400 uppercase">
                Canlı Takip Aktif
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-foreground/80 uppercase mb-4">
              Hızlı Erişim
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 hover:underline underline-offset-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-foreground/80 uppercase mb-4">
              Kurumsal
            </h3>
            <ul className="space-y-2.5" role="list">
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150 hover:underline underline-offset-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External sources */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-foreground/80 uppercase mb-4">
              Kaynak Medya
            </h3>
            <ul className="space-y-2.5" role="list">
              {sources.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {label}
                    <ExternalLink
                      size={11}
                      className="shrink-0 opacity-60"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(yeni sekmede açılır)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              &copy; {currentYear} İran Savaş. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-zinc-700 text-center sm:text-right">
              Bilgi amaçlıdır — resmî kaynak değildir. Haberler açık
              kaynaklardan derlenmektedir.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
