import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Zaman Çizelgesi",
  description: "İran savaşı kronolojik olay takibi. Kritik gelişmeleri tarih sırasında inceleyin.",
  path: "/zaman-cizelgesi",
});

export default function ZamanCizelgesiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
