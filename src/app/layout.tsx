import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iransavas.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "İran Savaş - Haber & Analiz Platformu",
    template: "%s | İran Savaş",
  },
  description:
    "İran savaşı hakkında kapsamlı haber, analiz ve raporlama platformu. Canlı harita, zaman çizelgesi, AI destekli haber özetleri.",
  keywords: [
    "iran", "savaş", "haber", "analiz", "harita", "zaman çizelgesi",
    "orta doğu", "çatışma", "istihbarat", "iran war",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Iran Savas",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NewsMediaOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "İran Savaş",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-default.png`,
      },
      description:
        "İran savaşı hakkında kapsamlı haber, analiz ve raporlama platformu.",
      foundingDate: "2026-02-28",
      actionableFeedbackPolicy: `${SITE_URL}/editoryal-politika`,
      correctionsPolicy: `${SITE_URL}/duzeltme-politikasi`,
      diversityStaffingReport: `${SITE_URL}/hakkimizda`,
      publishingPrinciples: `${SITE_URL}/editoryal-politika`,
    },
    {
      "@type": "LiveBlogPosting",
      "@id": `${SITE_URL}/#liveblog`,
      headline: "İran Savaşı: Canlı Güncellemeler",
      description:
        "İran savaşı hakkında anlık güncellemeler, askeri operasyonlar ve piyasa etkileri.",
      url: SITE_URL,
      coverageStartTime: "2026-02-28T00:00:00+00:00",
      isLiveBlogging: true,
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/og-default.png`,
      inLanguage: "tr",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "İran Savaş",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/haberler?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <head>
        <meta name="theme-color" content="#dc2626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-red-600 focus:text-white focus:text-sm focus:font-bold"
        >
          Ana icerige atla
        </a>
        <main id="main-content">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
