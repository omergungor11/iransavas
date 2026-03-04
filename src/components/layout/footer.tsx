import Link from "next/link";
import { Target, ExternalLink, ShieldAlert } from "lucide-react";

const quickLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Haberler", href: "/haberler" },
  { label: "Harita", href: "/harita" },
  { label: "Zaman Cizelgesi", href: "/zaman-cizelgesi" },
  { label: "Analiz", href: "/analiz" },
  { label: "Raporlar", href: "/raporlar" },
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
      className="border-t border-zinc-800 bg-zinc-950 text-zinc-400"
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
              <span className="font-semibold text-yellow-400">Uyari: </span>
              Bu platform yalnizca{" "}
              <span className="font-medium text-yellow-300/80">
                bilgi amaclıdır
              </span>{" "}
              ve resmi bir haber kaynagi degildir. Paylasilan icerikler cesitli
              medya kuruluslari ve acik kaynaklardan derlenmektedir. Kesin bilgi
              icin resmi kaynaklara basvurunuz.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-4 group"
              aria-label="Iran Savas Ana Sayfa"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded bg-red-700 group-hover:bg-red-600 transition-colors duration-200">
                <Target
                  size={16}
                  className="text-white"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </div>
              <span className="text-lg font-black tracking-wider text-white uppercase">
                Iran <span className="text-red-500">Savas</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 max-w-xs">
              Iran savasi hakkinda kapsamli haber, analiz ve raporlama
              platformu. Canli harita, zaman cizelgesi ve AI destekli
              ozetlerle sahadan anlık bilgi.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-semibold tracking-widest text-red-400 uppercase">
                Canli Takip Aktif
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-zinc-300 uppercase mb-4">
              Hızlı Erisim
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors duration-150 hover:underline underline-offset-2"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External sources */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-zinc-300 uppercase mb-4">
              Kaynak Medya
            </h3>
            <ul className="space-y-2.5" role="list">
              {sources.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-white transition-colors duration-150"
                  >
                    {label}
                    <ExternalLink
                      size={11}
                      className="shrink-0 opacity-60"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(yeni sekmede acilir)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              &copy; {currentYear} Iran Savas. Tum haklar saklidir.
            </p>
            <p className="text-xs text-zinc-700 text-center sm:text-right">
              Bilgi amaclidir — resmi kaynak degildir. Haberler acik
              kaynaklardan derlenmektedir.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
