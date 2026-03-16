"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Target,
  Newspaper,
  Map,
  Video,
  BarChart3,
  FileText,
  Clock,
  BookOpen,
} from "lucide-react";

const navLinks = [
  { label: "Haberler", href: "/haberler", icon: Newspaper },
  { label: "Harita", href: "/harita", icon: Map },
  { label: "Canlı Yayın", href: "/canli-yayin", icon: Video },
  { label: "Zaman Çizelgesi", href: "/zaman-cizelgesi", icon: Clock },
  { label: "Analiz", href: "/analiz", icon: BarChart3 },
  { label: "Raporlar", href: "/raporlar", icon: FileText },
  { label: "Aciklamalar", href: "/aciklamalar", icon: BookOpen },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/95 backdrop-blur-md border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="İran Savaş Ana Sayfa"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-600 group-hover:bg-red-500 transition-colors">
              <Target size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-wide text-white uppercase">
                İran<span className="text-red-500">Savaş</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-600/20 border border-red-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-bold tracking-widest text-red-400 uppercase">
                  Canlı
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            aria-label="Ana navigasyon"
          >
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  "px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150",
                  isActive(href)
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]",
                ]
                  .join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-white/[0.06] bg-zinc-950"
          role="navigation"
          aria-label="Mobil navigasyon"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {navLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive(href)
                    ? "text-white bg-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]",
                ]
                  .join(" ")}
                aria-current={isActive(href) ? "page" : undefined}
              >
                <Icon size={16} className="shrink-0" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
