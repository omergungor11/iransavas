"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Target, Radio } from "lucide-react";

const navLinks = [
  { label: "Durum", href: "/#situation" },
  { label: "Piyasalar", href: "/#markets" },
  { label: "Askeri", href: "/#military" },
  { label: "OSINT", href: "/#osint" },
  { label: "Haberler", href: "/haberler" },
  { label: "Harita", href: "/harita" },
  { label: "Canli Yayin", href: "/canli-yayin" },
  { label: "Analiz", href: "/analiz" },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/80">
      {/* Top alert bar */}
      <div className="bg-red-700/20 border-b border-red-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-semibold tracking-widest text-red-400 uppercase">
                Canli Yayin
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              Son dakika haberleri ve sahadaki gelismeler icin takipte kalin
            </p>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Iran Savas Ana Sayfa"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded bg-red-700 group-hover:bg-red-600 transition-colors duration-200">
              <Target
                size={20}
                className="text-white"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-wider text-white uppercase">
                Iran{" "}
                <span className="text-red-500">Savas</span>
              </span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
                Haber & Analiz
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Ana navigasyon">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "relative px-3 py-2 text-sm font-medium rounded transition-colors duration-150",
                  "hover:text-white hover:bg-zinc-800",
                  isActive(href)
                    ? "text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-red-600"
                    : "text-zinc-400",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side: LIVE badge + mobile toggle */}
          <div className="flex items-center gap-3">
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-red-800/60 bg-red-900/30"
              aria-label="Canli yayin aktif"
            >
              <Radio
                size={12}
                className="text-red-400 animate-pulse"
                aria-hidden="true"
              />
              <span className="text-[11px] font-bold tracking-widest text-red-400 uppercase">
                Canli
              </span>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors duration-150"
              aria-label={mobileOpen ? "Menuyu kapat" : "Menuyu ac"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-zinc-800 bg-zinc-950"
          role="navigation"
          aria-label="Mobil navigasyon"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-150",
                  isActive(href)
                    ? "text-white bg-zinc-800 border-l-2 border-red-600 pl-[10px]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}

            <div className="flex items-center gap-1.5 mt-2 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
                Canli Yayin Aktif
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
