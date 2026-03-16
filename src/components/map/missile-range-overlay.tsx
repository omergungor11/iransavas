"use client";

import { Circle, Popup } from "react-leaflet";
import { MISSILE_SYSTEMS, type MissileSystem } from "@/lib/data/missile-database";

const TYPE_COLORS: Record<MissileSystem["type"], string> = {
  ballistic: "#ef4444",
  cruise: "#3b82f6",
  drone: "#f97316",
};

const TYPE_LABELS: Record<MissileSystem["type"], string> = {
  ballistic: "Balistik",
  cruise: "Seyir",
  drone: "Drone",
};

export function MissileRangeOverlay() {
  return (
    <>
      {MISSILE_SYSTEMS.map((missile) => {
        const color = TYPE_COLORS[missile.type];
        return (
          <Circle
            key={missile.name}
            center={[missile.origin_lat, missile.origin_lng]}
            radius={missile.range_km * 1000}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.08,
              weight: 1.5,
              dashArray: "6 4",
            }}
          >
            <Popup>
              <div className="min-w-[220px] space-y-2">
                <h3 className="font-semibold text-gray-100 leading-tight text-base">
                  {missile.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                    style={{ backgroundColor: color + "33", color }}
                  >
                    {TYPE_LABELS[missile.type]}
                  </span>
                  <span className="text-xs text-gray-500">
                    {missile.status === "active" ? "Aktif" : "Gelistirme"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{missile.description}</p>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                  <div>Menzil: <span className="text-gray-300 font-medium">{missile.range_km} km</span></div>
                  <div>Savas basi: <span className="text-gray-300 font-medium">{missile.warhead_kg} kg</span></div>
                </div>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}
