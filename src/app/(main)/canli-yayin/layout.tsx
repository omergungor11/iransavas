import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Canli Yayin",
  description: "Iran savasi canli yayin akislari. Sahadaki gelismeleri aninda takip edin.",
  path: "/canli-yayin",
});

export default function CanliYayinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
