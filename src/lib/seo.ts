import type { Metadata } from "next";

const SITE_NAME = "İran Savaş";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://iransavas.com";
const DEFAULT_DESCRIPTION =
  "İran savaşı hakkında kapsamlı haber, analiz ve raporlama platformu. Canlı harita, zaman çizelgesi, AI destekli haber özetleri.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export function createMetadata(overrides: {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const title = overrides.title;
  const description = overrides.description || DEFAULT_DESCRIPTION;
  const url = overrides.path ? `${SITE_URL}${overrides.path}` : SITE_URL;
  const image = overrides.image || DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    ...(overrides.noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
      description,
      url,
      siteName: SITE_NAME,
      locale: "tr_TR",
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title || SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
      description,
      images: [image],
    },
  };
}
