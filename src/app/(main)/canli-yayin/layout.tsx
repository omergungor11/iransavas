import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Canlı Yayın",
  description: "İran savaşı canlı yayın akışları. Sahadaki gelişmeleri anında takip edin.",
  path: "/canli-yayin",
});

export default function CanliYayinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
