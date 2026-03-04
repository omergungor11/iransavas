import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Iran Savas - Haber & Analiz Platformu",
    template: "%s | Iran Savas",
  },
  description:
    "Iran savasi hakkinda kapsamli haber, analiz ve raporlama platformu",
  keywords: [
    "iran",
    "savas",
    "haber",
    "analiz",
    "harita",
    "zaman cizelgesi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
