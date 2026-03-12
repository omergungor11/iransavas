import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "İnteraktif Harita",
  description: "İran savaşı olaylarını interaktif harita üzerinde takip edin. Çatışmalar, hava saldırıları ve askerî operasyonlar.",
  path: "/harita",
});

export default function HaritaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
