import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-red-950/20 to-gray-950 py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5">
          <Radio className="h-3 w-3 text-red-500 animate-pulse" />
          <span className="text-xs font-medium text-red-400">Canli Takip</span>
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Iran Savasi: <span className="text-red-500">Canli Takip</span> ve Analiz
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Kapsamli haber, interaktif harita, zaman cizelgesi ve AI destekli analizlerle Iran savasi gelismelerini takip edin.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/haberler">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">Son Haberler</Button>
          </Link>
          <Link href="/harita">
            <Button size="lg" variant="outline">Haritayi Gor</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
