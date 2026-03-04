"use client";

import { useEffect, useState } from "react";
import { Radio, AlertTriangle, Share2 } from "lucide-react";

interface BreakingNews {
  title: string;
  source: string;
}

export function HeroSection() {
  const [breaking, setBreaking] = useState<BreakingNews | null>(null);

  useEffect(() => {
    fetch("/api/news?pageSize=1")
      .then((r) => r.json())
      .then((json) => {
        const article = json.data?.[0];
        if (article) {
          setBreaking({ title: article.title, source: article.source });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1580752300992-559f8e0734e0?w=1920&q=80')",
          }}
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
                SON DAKIKA
              </span>
              <div>
                <p className="text-sm font-semibold text-white leading-snug">
                  {breaking.title}
                </p>
                <p className="text-[10px] text-zinc-500 mt-0.5">
                  Kaynak: {breaking.source}
                </p>
              </div>
            </div>
          )}

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Iran Savasi:{" "}
            <span className="text-red-500">Canli Istihbarat</span>{" "}
            Panosu
          </h1>

          <p className="mt-4 text-base md:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Askeri operasyonlar, piyasa etkileri, OSINT istihbarati ve resmi aciklamalar —
            gercek zamanli catisma izleme platformu.
          </p>

          {/* Source badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Al Jazeera", "BBC", "Reuters", "AP", "CNN", "OSINT"].map(
              (src) => (
                <span
                  key={src}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800/80 border border-zinc-700/50 text-zinc-400"
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
                7/24 Canli
              </span>
            </div>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Iran Savas - Canli Takip",
                    url: window.location.href,
                  });
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-400"
            >
              <Share2 size={12} />
              Paylas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
