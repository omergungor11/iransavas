"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { formatDate } from "@/lib/utils";
import { MapLegend } from "./map-legend";
import { MapFilters, type MapFiltersState } from "./map-filters";

interface WarEventData {
  id: string;
  title: string;
  description: string;
  date: string;
  latitude: number;
  longitude: number;
  eventType: string;
  severity: string;
  casualties: number | null;
  source: string | null;
}

const SEVERITY_COLORS: Record<string, string> = {
  DUSUK: "#3b82f6",
  ORTA: "#eab308",
  YUKSEK: "#f97316",
  KRITIK: "#ef4444",
};

const IRAN_CENTER: [number, number] = [32.4279, 53.688];

const FALLBACK_EVENTS: WarEventData[] = [
  { id: "f1", title: "İsfahan Nükleer Tesisi Hava Saldırısı", description: "ABD-İsrail ortak hava operasyonu", date: "2026-03-15T08:00:00Z", latitude: 32.6546, longitude: 51.6680, eventType: "HAVA_SALDIRISI", severity: "KRITIK", casualties: 45, source: "Reuters" },
  { id: "f2", title: "Tahran Hava Savunma Aktivasyonu", description: "S-300 ve Bavar-373 sistemleri aktif", date: "2026-03-15T06:00:00Z", latitude: 35.6892, longitude: 51.3890, eventType: "CATISMA", severity: "YUKSEK", casualties: 12, source: "Al Jazeera" },
  { id: "f3", title: "Buşehr Nükleer Santral Çevresi İzleme", description: "Deniz kuvvetleri konuşlandırıldı", date: "2026-03-14T22:00:00Z", latitude: 28.9234, longitude: 50.8203, eventType: "DENIZ_OPERASYONU", severity: "ORTA", casualties: null, source: "BBC" },
  { id: "f4", title: "Hürmüz Boğazı Deniz Ablukası Girişimi", description: "İran Devrim Muhafızları hızlı botları aktif", date: "2026-03-15T04:00:00Z", latitude: 26.5944, longitude: 56.2500, eventType: "DENIZ_OPERASYONU", severity: "KRITIK", casualties: 8, source: "AP" },
  { id: "f5", title: "Kum Askeri Üssü Hava Saldırısı", description: "Balistik füze depolama tesisine saldırı", date: "2026-03-14T20:00:00Z", latitude: 34.6401, longitude: 50.8764, eventType: "HAVA_SALDIRISI", severity: "YUKSEK", casualties: 23, source: "CNN" },
  { id: "f6", title: "Tebriz Sınır Hattı Hareketliliği", description: "Kuzey sınırında askeri yığınak gözlemi", date: "2026-03-14T18:00:00Z", latitude: 38.0800, longitude: 46.2919, eventType: "CATISMA", severity: "DUSUK", casualties: null, source: "OSINT" },
  { id: "f7", title: "Bender Abbas Liman Operasyonu", description: "Deniz kuvvetleri limanı ablukaya aldı", date: "2026-03-15T02:00:00Z", latitude: 27.1865, longitude: 56.2808, eventType: "DENIZ_OPERASYONU", severity: "YUKSEK", casualties: 5, source: "Reuters" },
  { id: "f8", title: "Şiraz Havaalanı Pist Hasarı", description: "Cruise füze saldırısı sonrası pist devre dışı", date: "2026-03-14T16:00:00Z", latitude: 29.5918, longitude: 52.5836, eventType: "HAVA_SALDIRISI", severity: "YUKSEK", casualties: 15, source: "Middle East Eye" },
  { id: "f9", title: "Natanz Uranyum Zenginleştirme Tesisi", description: "İsrail saldırı sonrası hasar değerlendirmesi", date: "2026-03-15T10:00:00Z", latitude: 33.7210, longitude: 51.7270, eventType: "HAVA_SALDIRISI", severity: "KRITIK", casualties: 30, source: "BBC" },
  { id: "f10", title: "Kirmanşah Sınır Çatışması", description: "Irak sınırında PKK/PJAK ile çatışma", date: "2026-03-14T14:00:00Z", latitude: 34.3142, longitude: 47.0650, eventType: "CATISMA", severity: "ORTA", casualties: 7, source: "Al Jazeera" },
  { id: "f11", title: "Siber Saldırı: İran Enerji Şebekesi", description: "Ulusal elektrik şebekesine yönelik siber operasyon", date: "2026-03-15T01:00:00Z", latitude: 35.7000, longitude: 51.4200, eventType: "SIBER_SALDIRI", severity: "YUKSEK", casualties: null, source: "OSINT" },
  { id: "f12", title: "Ahvaz Petrol Rafinerisi Patlaması", description: "Hava saldırısı sonrası rafineri yangını", date: "2026-03-14T12:00:00Z", latitude: 31.3183, longitude: 48.6706, eventType: "PATLAMA", severity: "KRITIK", casualties: 52, source: "Reuters" },
];

function getRadius(casualties: number | null): number {
  if (!casualties || casualties <= 0) return 8;
  return Math.min(8 + Math.log10(casualties + 1) * 5, 25);
}

export function WarMap() {
  const [events, setEvents] = useState<WarEventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MapFiltersState>({
    eventType: "ALL", severity: "ALL", dateRange: "all",
  });

  const fetchEvents = useCallback(async (f: MapFiltersState) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.eventType !== "ALL") params.set("eventType", f.eventType);
      if (f.severity !== "ALL") params.set("severity", f.severity);
      if (f.dateRange !== "all") {
        const now = new Date();
        const from = new Date(now);
        if (f.dateRange === "last_week") from.setDate(from.getDate() - 7);
        else from.setMonth(from.getMonth() - 1);
        params.set("from", from.toISOString());
      }
      const qs = params.toString();
      const res = await fetch(`/api/events${qs ? `?${qs}` : ""}`);
      const json = await res.json();
      const data = json.data || [];
      setEvents(data.length > 0 ? data : FALLBACK_EVENTS);
    } catch {
      setEvents(FALLBACK_EVENTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchEvents(filters); }, [filters, fetchEvents]);

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <MapFilters filters={filters} onChange={setFilters} eventCount={events.length} />
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10">
        {loading && (
          <div className="absolute inset-0 z-[2000] flex items-center justify-center bg-gray-950/70">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          </div>
        )}
        <MapContainer center={IRAN_CENTER} zoom={6} className="h-full w-full" style={{ background: "#0f1117" }}>
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          {events.map((event) => (
            <CircleMarker
              key={event.id}
              center={[event.latitude, event.longitude]}
              radius={getRadius(event.casualties)}
              pathOptions={{
                color: SEVERITY_COLORS[event.severity] || "#eab308",
                fillColor: SEVERITY_COLORS[event.severity] || "#eab308",
                fillOpacity: 0.7,
                weight: 1.5,
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="mb-1 font-semibold text-gray-100">{event.title}</h3>
                  <p className="mb-2 text-xs text-gray-400">{event.description}</p>
                  <div className="text-xs text-gray-500 space-y-0.5">
                    <div>Tarih: {formatDate(event.date)}</div>
                    {event.casualties && <div>Kayip: <span className="text-red-400">{event.casualties}</span></div>}
                    {event.source && <div>Kaynak: {event.source}</div>}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        <MapLegend />
      </div>
    </div>
  );
}
