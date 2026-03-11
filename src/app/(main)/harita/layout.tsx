import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Interaktif Harita",
  description: "Iran savasi olaylarini interaktif harita uzerinde takip edin. Catismalar, hava saldirilari ve askeri operasyonlar.",
  path: "/harita",
});

export default function HaritaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
