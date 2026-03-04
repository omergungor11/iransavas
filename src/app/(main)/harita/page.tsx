import type { Metadata } from "next";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Interaktif Savas Haritasi",
  description: "Iran savasi olay haritasi — catismalar, hava saldirilari ve insani krizlerin interaktif gorunumu.",
};

export default function HaritaPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto max-w-screen-2xl flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
            <MapPin className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Interaktif Savas Haritasi</h1>
            <p className="text-xs text-muted-foreground">Canli olay takibi — Iran bolgesi</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <iframe
          src="https://usvsiran.com/embed?lat=31.8&lng=38.2&z=5&theme=schematic"
          className="w-full h-full border-0"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin"
          title="Iran Savas Haritasi"
        />
      </div>
    </div>
  );
}
