import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Zaman Cizelgesi",
  description: "Iran savasi kronolojik olay takibi. Kritik gelismeleri tarih sirasinda inceleyin.",
  path: "/zaman-cizelgesi",
});

export default function ZamanCizelgesiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
