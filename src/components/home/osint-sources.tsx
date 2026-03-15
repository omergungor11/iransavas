import {
  Radar,
  Satellite,
  Radio,
  Ship,
  Plane,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

interface OsintSource {
  name: string;
  description: string;
  icon: typeof Radar;
  color: string;
  url: string;
}

const sources: OsintSource[] = [
  {
    name: "Flightradar24",
    description: "Gerçek zamanlı askeri ve sivil uçuş takibi",
    icon: Plane,
    color: "text-blue-400",
    url: "https://www.flightradar24.com",
  },
  {
    name: "MarineTraffic",
    description: "Basra Körfezi ve Hürmüz Boğazı gemi hareketleri",
    icon: Ship,
    color: "text-cyan-400",
    url: "https://www.marinetraffic.com",
  },
  {
    name: "Sentinel Hub",
    description: "Uydu görüntüleri ile hasar tespiti ve değişiklik analizi",
    icon: Satellite,
    color: "text-green-400",
    url: "https://www.sentinel-hub.com",
  },
  {
    name: "Liveuamap",
    description: "Çatışma bölgesi harita güncellemeleri",
    icon: Radar,
    color: "text-red-400",
    url: "https://liveuamap.com",
  },
  {
    name: "ACLED",
    description: "Silahlı çatışma konum ve olay veritabanı",
    icon: Radio,
    color: "text-orange-400",
    url: "https://acleddata.com",
  },
  {
    name: "X / OSINT Toplulukları",
    description: "Doğrulanmış OSINT analistleri ve açık kaynak raporları",
    icon: MessageSquare,
    color: "text-purple-400",
    url: "https://x.com",
  },
];

export function OsintSources() {
  return (
    <section className="rounded-xl border border-border bg-card/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2.5">
          <Radar size={16} className="text-green-500" />
          <h2 className="text-sm font-bold text-foreground">
            OSINT Kaynakları
          </h2>
        </div>
        <span className="text-[10px] text-muted-foreground">
          Açık Kaynak İstihbarat
        </span>
      </div>

      {/* Sources grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
        {sources.map((source) => (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 bg-card/80 p-4 hover:bg-muted/20 transition-colors group"
          >
            <source.icon
              size={18}
              className={`${source.color} shrink-0 mt-0.5`}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground group-hover:text-white transition-colors">
                  {source.name}
                </span>
                <ExternalLink
                  size={10}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                {source.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="px-5 py-3 border-t border-border bg-muted/20">
        <p className="text-[11px] text-muted-foreground">
          OSINT kaynakları yalnızca bilgi amaçlıdır. Tüm veriler editöryal
          ekibimiz tarafından doğrulanmadan yayınlanmaz.
        </p>
      </div>
    </section>
  );
}
