import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Haberler",
  description: "İran savaşı ile ilgili son dakika haberleri, analizler ve gelişmeler.",
  path: "/haberler",
});

export default function HaberlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
