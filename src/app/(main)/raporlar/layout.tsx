import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Raporlar",
  description: "Iran savasi haftalik, aylik ve ozel analiz raporlari.",
  path: "/raporlar",
});

export default function RaporlarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
