import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Haberler",
  description: "Iran savasi ile ilgili son dakika haberleri, analizler ve gelismeler.",
  path: "/haberler",
});

export default function HaberlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
