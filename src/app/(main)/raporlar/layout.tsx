import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Raporlar",
  description: "İran savaşı haftalık, aylık ve özel analiz raporları.",
  path: "/raporlar",
});

export default function RaporlarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
