"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { formatDate } from "@/lib/utils";
import type { MapFiltersState } from "./map-filters";

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

const SEVERITY_PRIORITY: Record<string, number> = {
  DUSUK: 0,
  ORTA: 1,
  YUKSEK: 2,
  KRITIK: 3,
};

const EVENT_TYPE_LABELS: Record<string, string> = {
  CATISMA: "Çatışma",
  HAVA_SALDIRISI: "Hava Saldırısı",
  DENIZ_OPERASYONU: "Deniz Operasyonu",
  DIPLOMASI: "Diplomasi",
  INSANI_KRIZ: "İnsanî Kriz",
  PATLAMA: "Patlama",
  DIGER: "Diğer",
};

const IRAN_CENTER: [number, number] = [32.4279, 53.688];

function getRadius(casualties: number | null): number {
  if (!casualties || casualties <= 0) return 8;
  return Math.min(8 + Math.log10(casualties + 1) * 5, 25);
}

/**
 * Create cluster icon colored by the highest severity in the cluster
 */
function createClusterIcon(cluster: { getAllChildMarkers: () => L.Marker[]; getChildCount: () => number }) {
  const markers = cluster.getAllChildMarkers();
  let maxSeverity = 0;
  let maxColor = SEVERITY_COLORS.ORTA;

  for (const marker of markers) {
    const severity = (marker.options as { severity?: string }).severity || "ORTA";
    const priority = SEVERITY_PRIORITY[severity] ?? 1;
    if (priority > maxSeverity) {
      maxSeverity = priority;
      maxColor = SEVERITY_COLORS[severity] || SEVERITY_COLORS.ORTA;
    }
  }

  const count = cluster.getChildCount();
  const size = count < 10 ? 36 : count < 50 ? 44 : 52;

  return L.divIcon({
    html: `<div style="
      background: ${maxColor}22;
      border: 2px solid ${maxColor};
      color: ${maxColor};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
    ">${count}</div>`,
    className: "custom-cluster-icon",
    iconSize: L.point(size, size),
  });
}

interface WarMapCanvasProps {
  filters: MapFiltersState;
  onEventCountChange: (count: number) => void;
}

export function WarMapCanvas({ filters, onEventCountChange }: WarMapCanvasProps) {
  const [events, setEvents] = useState<WarEventData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async (f: MapFiltersState) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.eventType !== "ALL") params.set("eventType", f.eventType);
      if (f.severity !== "ALL") params.set("severity", f.severity);
      if (f.dateRange === "custom" && f.customFrom && f.customTo) {
        params.set("from", f.customFrom);
        params.set("to", f.customTo);
      } else if (f.dateRange !== "all") {
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
      setEvents(data);
      onEventCountChange(data.length);
    } catch (err) {
      console.error("Map fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [onEventCountChange]);

  useEffect(() => {
    fetchEvents(filters);
  }, [filters, fetchEvents]);

  return (
    <div className="relative h-full w-full">
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
        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          spiderfyOnMaxZoom
          showCoverageOnHover={false}
          iconCreateFunction={createClusterIcon}
        >
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
              // Pass severity to marker options for cluster coloring
              {...({ severity: event.severity } as Record<string, string>)}
            >
              <Popup>
                <div className="min-w-[220px] space-y-2">
                  <h3 className="font-semibold text-gray-100 leading-tight">{event.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{event.description}</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                    <div>Tarih: {formatDate(event.date)}</div>
                    <div>Tur: {EVENT_TYPE_LABELS[event.eventType] || event.eventType}</div>
                    {event.casualties != null && event.casualties > 0 && (
                      <div>Kayip: <span className="text-red-400 font-medium">{event.casualties}</span></div>
                    )}
                    {event.source && <div>Kaynak: {event.source}</div>}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
