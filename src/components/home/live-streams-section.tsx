"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, ExternalLink, Play, Tv, ArrowRight } from "lucide-react";

interface LiveStream {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  thumbnail: string | null;
  source: string;
  platform: string;
  region: string;
}

export function LiveStreamsSection() {
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/livestreams")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (json.data) setStreams(json.data.slice(0, 8));
      })
      .catch(() => { /* non-critical */ })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && streams.length === 0) return null;

  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
              <Camera className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Canlı Yayınlar</h2>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                  Canlı
                </span>
              </div>
              <p className="text-xs text-muted-foreground">İran, İsrail & Orta Doğu canlı kamera görüntüsü</p>
            </div>
          </div>
          <Link
            href="/canli-yayin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            Tümü
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="aspect-video animate-pulse bg-muted" />
                <div className="p-2 space-y-1.5">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {streams.map((stream) => (
              <a
                key={stream.id}
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-border bg-card overflow-hidden hover:border-red-500/40 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {stream.thumbnail ? (
                    <Image
                      src={stream.thumbnail}
                      alt={stream.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tv size={24} className="text-border" />
                    </div>
                  )}
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600">
                      <Play size={14} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  {/* LIVE badge */}
                  <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1 py-0.5 rounded bg-red-600 text-white">
                    <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
                    <span className="text-[8px] font-bold uppercase">Canlı</span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-2">
                  <h3 className="text-[11px] font-semibold text-foreground/90 leading-tight line-clamp-1">
                    {stream.title}
                  </h3>
                  <p className="text-[9px] text-muted-foreground mt-0.5">
                    {stream.source} · {stream.region}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Footer link */}
        <div className="flex items-center justify-center mt-4">
          <Link
            href="/canli-yayin"
            className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            <ExternalLink size={12} />
            Tüm canlı yayınları gör
          </Link>
        </div>
      </div>
    </section>
  );
}
