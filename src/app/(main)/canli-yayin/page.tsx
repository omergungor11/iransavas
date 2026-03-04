"use client";

import { useEffect, useState } from "react";
import { Radio, ExternalLink, RefreshCw, Tv, Play, Camera, X } from "lucide-react";

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

export default function CanliYayinPage() {
  const [streams, setStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStream, setActiveStream] = useState<LiveStream | null>(null);

  const fetchStreams = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/livestreams");
      const json = await res.json();
      if (json.data) {
        setStreams(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch streams:", err);
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

  const platformBadge: Record<string, { bg: string; label: string }> = {
    youtube: { bg: "bg-red-600", label: "YouTube" },
    twitch: { bg: "bg-purple-600", label: "Twitch" },
    windy: { bg: "bg-sky-600", label: "Webcam" },
    other: { bg: "bg-zinc-600", label: "Diger" },
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="sticky top-[4.5rem] z-30 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto max-w-screen-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
              <Camera className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Webcams</h1>
              <p className="text-xs text-zinc-400">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors disabled:opacity-50 text-zinc-300"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Yenile
            </button>
          </div>
        </div>
      </div>

      {/* Viewer overlay */}
      {activeStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-5xl bg-zinc-900 rounded-xl border border-zinc-700 overflow-hidden shadow-2xl">
            {/* Viewer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <div className="flex items-center gap-2 min-w-0">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <h2 className="text-sm font-semibold text-white truncate">{activeStream.title}</h2>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={activeStream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border border-zinc-700 hover:bg-zinc-800 transition-colors text-zinc-300"
                >
                  <ExternalLink size={12} />
                  Kaynakta Ac
                </a>
                <button
                  onClick={() => setActiveStream(null)}
                  className="flex items-center justify-center w-8 h-8 rounded hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            {/* Viewer body */}
            {activeStream.embedUrl ? (
              <div className="relative aspect-video bg-black">
                <iframe
                  key={activeStream.id}
                  src={activeStream.embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={activeStream.title}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-black">
                <Tv size={48} className="text-zinc-600 mb-3" />
                <p className="text-zinc-400 mb-4">Bu yayin dogrudan goruntulenemiyor</p>
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
            <div className="px-4 py-2.5 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
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
        {loading && streams.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {streams.map((stream) => (
              <article
                key={stream.id}
                className="group rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-all"
              >
                {/* Thumbnail */}
                <button
                  onClick={() => setActiveStream(stream)}
                  className="relative block w-full aspect-video bg-zinc-800 overflow-hidden cursor-pointer"
                >
                  {stream.thumbnail ? (
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Tv size={32} className="text-zinc-700" />
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
                  <h3 className="text-sm font-semibold text-zinc-200 leading-snug line-clamp-2">
                    {stream.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {stream.source} · {stream.region}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <button
                      onClick={() => setActiveStream(stream)}
                      className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      Open viewer
                    </button>
                    <span className="text-zinc-700">·</span>
                    <a
                      href={stream.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                      Source page
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
