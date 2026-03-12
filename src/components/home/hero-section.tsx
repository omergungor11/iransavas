"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Radio, AlertTriangle, Share2 } from "lucide-react";

interface BreakingNews {
  title: string;
  source: string;
}

export function HeroSection() {
  const [breaking, setBreaking] = useState<BreakingNews | null>(null);

  useEffect(() => {
    fetch("/api/news?pageSize=1")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const article = json.data?.[0];
        if (article) {
          setBreaking({ title: article.title, source: article.source });
        }
      })
      .catch(() => { /* non-critical */ });
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Askerî operasyon - özel kuvvetler"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        {/* Scanline effect */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          {/* BREAKING badge */}
          {breaking && (
            <div className="mb-6 flex items-start gap-3">
              <span className="shrink-0 flex items-center gap-1.5 px-2 py-1 rounded bg-red-600 text-white text-[10px] font-black tracking-widest uppercase">
                <AlertTriangle size={10} />
                SON DAKİKA
              </span>
              <div>
                <p className="text-sm font-semibold text-white leading-snug">
                  {breaking.title}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Kaynak: {breaking.source}
                </p>
              </div>
            </div>
          )}

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            İran Savaşı:{" "}
            <span className="text-red-500">Canlı İstihbarat</span>{" "}
            Panosu
          </h1>

          <p className="mt-4 text-base md:text-lg text-foreground/80 max-w-2xl leading-relaxed">
            Askerî operasyonlar, piyasa etkileri, OSINT istihbaratı ve resmî açıklamalar —
            gerçek zamanlı çatışma izleme platformu.
          </p>

          {/* Source badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Al Jazeera", "BBC", "Reuters", "AP", "CNN", "OSINT"].map(
              (src) => (
                <span
                  key={src}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted/80 border border-border/50 text-muted-foreground"
                >
                  {src}
                </span>
              )
            )}
          </div>

          {/* Action row */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-800/60 bg-red-900/30">
              <Radio size={12} className="text-red-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-red-400 uppercase">
                7/24 Canlı
              </span>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "İran Savaş - Canlı Takip",
                    url: window.location.href,
                  }).catch(() => { /* user cancelled */ });
                }
              }}
              aria-label="Sayfayı paylaş"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              <Share2 size={12} />
              Paylaş
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
