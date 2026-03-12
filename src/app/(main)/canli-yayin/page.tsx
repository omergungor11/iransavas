"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Radio, ExternalLink, RefreshCw, Tv, Play, Camera, X, AlertTriangle } from "lucide-react";

interface LiveStream {
  id: string;
  title: string;
  url: string;
  embedUrl: string;
  thumbnail: string | null;
  source: string;
  platform: "youtube" | "twitch" | "windy" | "other";
  isLive: boolean;
  region: string;
  lastChecked: string;
}

const ALLOWED_EMBED_DOMAINS = [
  "youtube.com", "www.youtube.com", "youtube-nocookie.com",
  "player.twitch.tv", "twitch.tv",
  "windy.com", "embed.windy.com",
  "signalcockpit.com", "www.signalcockpit.com",
  "liveuamap.com",
];

function isAllowedEmbedUrl(url: string): boolean {
  try {
    const hostname = new URL(url).hostname;
    return ALLOWED_EMBED_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`));
  } catch {
    return false;
  }
}

export default function CanliYayinPage() {
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeStream, setActiveStream] = useState<LiveStream | null>(null);

  const fetchStreams = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/livestreams");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.data) {
        setStreams(json.data);
      }
    } catch (err) {
      console.error("[CanliYayin] fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreams();
    const interval = setInterval(fetchStreams, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape key + body scroll lock for viewer overlay
  useEffect(() => {
    if (!activeStream) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveStream(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeStream]);

  const platformBadge: Record<string, { bg: string; label: string }> = {
    youtube: { bg: "bg-red-600", label: "YouTube" },
    twitch: { bg: "bg-purple-600", label: "Twitch" },
    windy: { bg: "bg-sky-600", label: "Webcam" },
    other: { bg: "bg-zinc-600", label: "Diger" },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-[4.5rem] z-30 border-b border-border bg-background/95 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto max-w-screen-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
              <Camera className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Webcams</h1>
              <p className="text-xs text-muted-foreground">
                Canli kamera goruntusu — Iran, Israel & Orta Dogu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-red-800/60 bg-red-900/30">
              <Radio size={12} className="text-red-400 animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest text-red-400 uppercase">
                {streams.length} Webcam
              </span>
            </div>
            <button
              onClick={fetchStreams}
              disabled={loading}
              aria-label="Webcam listesini yenile"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors disabled:opacity-50 text-foreground/80"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} aria-hidden="true" />
              Yenile
            </button>
          </div>
        </div>
      </div>

      {/* Viewer overlay */}
      {activeStream && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={activeStream.title}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveStream(null); }}
        >
          <div className="w-full max-w-5xl bg-card rounded-xl border border-border overflow-hidden shadow-2xl">
            {/* Viewer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <h2 className="text-sm font-semibold text-foreground truncate">{activeStream.title}</h2>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={activeStream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-border hover:bg-muted transition-colors text-foreground/80"
                >
                  <ExternalLink size={12} />
                  Kaynakta Ac
                </a>
                <button
                  onClick={() => setActiveStream(null)}
                  aria-label="Yayin goruntuleyiciyi kapat"
                  className="flex items-center justify-center w-8 h-8 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            {/* Viewer body */}
            {activeStream.embedUrl && isAllowedEmbedUrl(activeStream.embedUrl) ? (
              <div className="relative aspect-video bg-black">
                <iframe
                  key={activeStream.id}
                  src={activeStream.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={activeStream.title}
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-black">
                <Tv size={48} className="text-muted-foreground mb-3" />
                <p className="text-muted-foreground mb-4">Bu yayin dogrudan goruntulenemiyor</p>
                <a
                  href={activeStream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                >
                  <ExternalLink size={14} />
                  Kaynakta Izle
                </a>
              </div>
            )}
            {/* Viewer footer */}
            <div className="px-4 py-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>{activeStream.source} — {activeStream.region}</span>
              <span
                className={`px-1.5 py-0.5 rounded font-bold text-white text-[10px] uppercase ${
                  platformBadge[activeStream.platform]?.bg || "bg-zinc-600"
                }`}
              >
                {platformBadge[activeStream.platform]?.label || activeStream.platform}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Webcam Grid */}
      <div className="mx-auto max-w-screen-2xl px-4 py-6">
        {error ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <p className="text-sm font-medium text-foreground">Webcamlar yuklenemedi</p>
            <p className="text-xs text-muted-foreground">Bir hata olustu. Lutfen tekrar deneyin.</p>
            <button
              onClick={fetchStreams}
              className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
            >
              <RefreshCw size={14} />
              Tekrar Dene
            </button>
          </div>
        ) : loading && streams.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          </div>
        ) : streams.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Aktif webcam bulunamadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {streams.map((stream) => (
              <article
                key={stream.id}
                className="group rounded-lg overflow-hidden border border-border bg-card hover:border-zinc-600 transition-all"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => setActiveStream(stream)}
                  className="relative block w-full aspect-video bg-muted overflow-hidden cursor-pointer"
                >
                  {stream.thumbnail ? (
                    <Image
                      src={stream.thumbnail}
                      alt={stream.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tv size={32} className="text-border" />
                    </div>
                  )}
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-900/30">
                      <Play size={20} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  {/* LIVE badge */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-600 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-bold uppercase">Canli</span>
                  </div>
                </button>

                {/* Card body */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-foreground/90 leading-snug line-clamp-2">
                    {stream.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stream.source} · {stream.region}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={() => setActiveStream(stream)}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Izle
                    </button>
                    <span className="text-border">·</span>
                    <a
                      href={stream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Kaynak
                    </a>
                    <span className="ml-auto">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase ${
                          platformBadge[stream.platform]?.bg || "bg-zinc-600"
                        }`}
                      >
                        {platformBadge[stream.platform]?.label || stream.platform}
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
