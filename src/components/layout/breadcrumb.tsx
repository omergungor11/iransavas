"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const pathLabels: Record<string, string> = {
  haberler: "Haberler",
  harita: "Harita",
  "canli-yayin": "Canlı Yayın",
  "zaman-cizelgesi": "Zaman Çizelgesi",
  analiz: "Analiz",
  raporlar: "Raporlar",
  hakkimizda: "Hakkımızda",
  iletisim: "İletişim",
  "editoryal-politika": "Editöryal Politika",
  "duzeltme-politikasi": "Düzeltme Politikası",
};

interface Crumb {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = segments.map((seg, i) => ({
    label: pathLabels[seg] || decodeURIComponent(seg),
    href: "/" + segments.slice(0, i + 1).join("/"),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://iransavas.com",
      },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        item: `https://iransavas.com${c.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
      >
        <ol className="flex items-center gap-1 text-xs text-muted-foreground">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home size={12} />
              <span>Ana Sayfa</span>
            </Link>
          </li>
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1">
                <ChevronRight size={12} className="text-muted-foreground/50" />
                {isLast ? (
                  <span className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
