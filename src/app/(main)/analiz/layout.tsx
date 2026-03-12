import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Analiz & İstatistikler",
  description: "İran savaşı istatistikleri, olay dağılımı, kayıp verileri ve trend analizleri.",
  path: "/analiz",
});

export default function AnalizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
