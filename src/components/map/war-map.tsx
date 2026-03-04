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
      setEvents(json.data || []);
    } catch (err) {
      console.error("Map fetch error:", err);
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
