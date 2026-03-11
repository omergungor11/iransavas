import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Analiz & Istatistikler",
  description: "Iran savasi istatistikleri, olay dagilimi, kayip verileri ve trend analizleri.",
  path: "/analiz",
});

export default function AnalizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
