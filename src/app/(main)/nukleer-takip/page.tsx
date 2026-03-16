import { Atom, MapPin, Clock, ShieldAlert, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ENRICHMENT_DATA,
  BREAKOUT_ESTIMATE,
  NUCLEAR_FACILITIES,
  IAEA_STATUS,
  NUCLEAR_TIMELINE,
} from "@/lib/data/nuclear-program";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nükleer Program Takibi | İranSavaş",
  description: "İran nükleer programının güncel durumu, tesisler, IAEA denetimleri ve zaman çizelgesi.",
};

function statusBadge(status: "aktif" | "hasarli" | "kapali") {
  switch (status) {
    case "aktif":
      return <Badge variant="success">Aktif</Badge>;
    case "hasarli":
      return <Badge variant="warning">Hasarli</Badge>;
    case "kapali":
      return <Badge variant="critical">Kapali</Badge>;
  }
}

function cooperationBadge(level: "tam" | "sinirli" | "yok") {
  switch (level) {
    case "tam":
      return (
        <span className="inline-flex items-center gap-1 text-green-400">
          <CheckCircle size={14} /> Tam Isbirligi
        </span>
      );
    case "sinirli":
      return (
        <span className="inline-flex items-center gap-1 text-yellow-400">
          <AlertTriangle size={14} /> Sinirli Isbirligi
        </span>
      );
    case "yok":
      return (
        <span className="inline-flex items-center gap-1 text-red-400">
          <XCircle size={14} /> Isbirligi Yok
        </span>
      );
  }
}

export default function NukleerTakipPage() {
  const enrichPct = (ENRICHMENT_DATA.currentLevel / 100) * 100;
  const thresholdPct = (ENRICHMENT_DATA.weaponsGradeThreshold / 100) * 100;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
          <Atom className="h-5 w-5 text-yellow-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Nukleer Program Takibi</h1>
          <p className="text-muted-foreground">
            Iran nukleer programinin guncel durumu ve analizi
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Mevcut Durum — Enrichment Gauge */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mevcut Zenginlestirme Durumu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-5xl font-black text-yellow-400">
                    %{ENRICHMENT_DATA.currentLevel}
                  </span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    uranyum zenginlestirme
                  </span>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  Son guncelleme: {ENRICHMENT_DATA.lastUpdated}
                </div>
              </div>

              {/* Progress bar with threshold marker */}
              <div className="relative">
                <div className="h-6 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000"
                    style={{ width: `${enrichPct}%` }}
                  />
                </div>
                {/* Threshold marker */}
                <div
                  className="absolute top-0 h-6 w-0.5 bg-red-500"
                  style={{ left: `${thresholdPct}%` }}
                />
                <div
                  className="absolute -top-6 -translate-x-1/2 text-xs text-red-400 font-semibold whitespace-nowrap"
                  style={{ left: `${thresholdPct}%` }}
                >
                  Silah Esigi %{ENRICHMENT_DATA.weaponsGradeThreshold}
                </div>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>%0 — Dogal Uranyum</span>
                <span>%3.67 — JCPOA Siniri</span>
                <span>%20 — Tibbi Kullanim</span>
                <span>%90+ — Silah Seviyesi</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Tesisler */}
        <div>
          <h2 className="mb-4 text-xl font-bold">Nukleer Tesisler</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {NUCLEAR_FACILITIES.map((facility) => (
              <Card key={facility.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{facility.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">{facility.type}</p>
                    </div>
                    {statusBadge(facility.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{facility.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />
                    <span>{facility.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3 & 4: Breakout + IAEA side by side */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Breakout Tahmini */}
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Breakout Tahmini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-5xl font-black text-red-400">
                    {BREAKOUT_ESTIMATE.minWeeks}-{BREAKOUT_ESTIMATE.maxWeeks}
                  </span>
                  <span className="ml-2 text-lg text-muted-foreground">hafta</span>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Bir nukleer silah icin yeterli fisil malzeme uretim suresi
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-white/5 pt-3">
                  <span>Guven seviyesi: {BREAKOUT_ESTIMATE.confidence}</span>
                  <span>Guncelleme: {BREAKOUT_ESTIMATE.lastUpdated}</span>
                </div>
                <p className="text-xs text-muted-foreground">{BREAKOUT_ESTIMATE.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* IAEA Durumu */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShieldAlert className="h-5 w-5 text-blue-400" />
                IAEA Denetim Durumu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Denetim Durumu</span>
                    <span className="text-sm font-medium">{IAEA_STATUS.inspectionStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Son Denetim</span>
                    <span className="text-sm font-medium">{IAEA_STATUS.lastInspectionDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Isbirligi Seviyesi</span>
                    {cooperationBadge(IAEA_STATUS.cooperationLevel)}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3">
                  <p className="text-xs text-muted-foreground">{IAEA_STATUS.notes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 5: Zaman Cizelgesi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-zinc-400" />
              Nukleer Program Zaman Cizelgesi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-800" />

              <div className="space-y-6">
                {NUCLEAR_TIMELINE.map((event, i) => (
                  <div key={i} className="relative pl-10">
                    {/* Dot */}
                    <div
                      className={`absolute left-2.5 top-1.5 h-3 w-3 rounded-full border-2 ${
                        event.significance === "high"
                          ? "border-red-500 bg-red-500/30"
                          : event.significance === "medium"
                          ? "border-yellow-500 bg-yellow-500/30"
                          : "border-zinc-500 bg-zinc-500/30"
                      }`}
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">
                          {event.year}
                          {event.month ? `/${String(event.month).padStart(2, "0")}` : ""}
                        </span>
                        <span className="text-sm font-semibold">{event.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
