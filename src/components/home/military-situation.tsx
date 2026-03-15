"use client";

import { Shield, MapPin, AlertTriangle, Plane } from "lucide-react";

interface OperationZone {
  city: string;
  status: "active" | "monitoring" | "calm";
  detail: string;
}

const zones: OperationZone[] = [
  {
    city: "Tahran",
    status: "active",
    detail: "Hava savunma sistemleri aktif, diplomatik bölge güvenlik altında",
  },
  {
    city: "İsfahan",
    status: "active",
    detail: "Nükleer tesisler çevresinde yoğun askeri hareketlilik",
  },
  {
    city: "Buşehr",
    status: "monitoring",
    detail: "Nükleer santral çevresi izleme altında, deniz trafiği kısıtlı",
  },
  {
    city: "Hürmüz Boğazı",
    status: "active",
    detail: "Deniz kuvvetleri konuşlandırılmış, ticari gemi trafiği aksıyor",
  },
  {
    city: "Kum",
    status: "monitoring",
    detail: "Askeri üsler etrafında artan hareketlilik gözlemleniyor",
  },
  {
    city: "Tebriz",
    status: "calm",
    detail: "Kuzey sınır hattı nispeten sakin, gözlem devam ediyor",
  },
];

const statusConfig = {
  active: {
    label: "Aktif Operasyon",
    color: "bg-red-500",
    textColor: "text-red-400",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
  monitoring: {
    label: "İzleme Altında",
    color: "bg-yellow-500",
    textColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10 border-yellow-500/20",
  },
  calm: {
    label: "Nispeten Sakin",
    color: "bg-green-500",
    textColor: "text-green-400",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
};

export function MilitarySituation() {
  const activeCount = zones.filter((z) => z.status === "active").length;

  return (
    <section className="rounded-xl border border-border bg-card/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2.5">
          <Shield size={16} className="text-red-500" />
          <h2 className="text-sm font-bold text-foreground">
            Askeri Durum Özeti
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-red-400 uppercase tracking-wider">
            {activeCount} Aktif Bölge
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-5 py-2.5 border-b border-border/50 bg-muted/10">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${config.color}`} />
            <span className="text-[10px] text-muted-foreground">
              {config.label}
            </span>
          </div>
        ))}
      </div>

      {/* Zones grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/30">
        {zones.map((zone) => {
          const config = statusConfig[zone.status];
          return (
            <div
              key={zone.city}
              className="bg-card/80 p-4 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className={config.textColor} />
                  <span className="text-sm font-bold text-foreground">
                    {zone.city}
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${config.bgColor} ${config.textColor}`}
                >
                  {config.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {zone.detail}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      <div className="flex items-center gap-2 px-5 py-3 border-t border-border bg-muted/20">
        <AlertTriangle size={12} className="text-yellow-500" />
        <span className="text-[11px] text-muted-foreground">
          Veriler açık kaynak istihbarat (OSINT) ve uluslararası medya
          kaynaklarından derlenmektedir.
        </span>
      </div>
    </section>
  );
}
