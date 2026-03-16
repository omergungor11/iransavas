"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

interface EventPoint {
  latitude: number;
  longitude: number;
}

interface ChoroplethOverlayProps {
  events: EventPoint[];
}

// Simplified Iran provinces GeoJSON - bounding boxes approximated as polygons
const IRAN_PROVINCES: {
  name: string;
  bounds: [number, number][]; // [lat, lng] polygon points
}[] = [
  {
    name: "Tahran",
    bounds: [
      [35.2, 50.8],
      [36.2, 50.8],
      [36.2, 52.4],
      [35.2, 52.4],
    ],
  },
  {
    name: "Isfahan",
    bounds: [
      [31.5, 50.5],
      [34.0, 50.5],
      [34.0, 53.5],
      [31.5, 53.5],
    ],
  },
  {
    name: "Fars",
    bounds: [
      [27.5, 51.0],
      [31.0, 51.0],
      [31.0, 54.5],
      [27.5, 54.5],
    ],
  },
  {
    name: "Huzistan",
    bounds: [
      [30.0, 47.5],
      [32.5, 47.5],
      [32.5, 50.5],
      [30.0, 50.5],
    ],
  },
  {
    name: "Dogu Azerbaycan",
    bounds: [
      [36.7, 45.0],
      [39.5, 45.0],
      [39.5, 48.0],
      [36.7, 48.0],
    ],
  },
  {
    name: "Razavi Horasan",
    bounds: [
      [34.0, 56.5],
      [37.0, 56.5],
      [37.0, 61.0],
      [34.0, 61.0],
    ],
  },
  {
    name: "Kerman",
    bounds: [
      [27.5, 54.5],
      [32.0, 54.5],
      [32.0, 59.0],
      [27.5, 59.0],
    ],
  },
  {
    name: "Bati Azerbaycan",
    bounds: [
      [36.0, 44.0],
      [39.8, 44.0],
      [39.8, 46.5],
      [36.0, 46.5],
    ],
  },
  {
    name: "Bushire",
    bounds: [
      [27.5, 50.0],
      [29.5, 50.0],
      [29.5, 52.5],
      [27.5, 52.5],
    ],
  },
  {
    name: "Hürmüzgan",
    bounds: [
      [25.5, 53.5],
      [28.5, 53.5],
      [28.5, 59.0],
      [25.5, 59.0],
    ],
  },
];

function getColor(count: number): string {
  if (count >= 31) return "#ef4444";
  if (count >= 16) return "#f97316";
  if (count >= 6) return "#eab308";
  return "#22c55e";
}

function countEventsInProvince(
  events: EventPoint[],
  bounds: [number, number][]
): number {
  const minLat = Math.min(...bounds.map((b) => b[0]));
  const maxLat = Math.max(...bounds.map((b) => b[0]));
  const minLng = Math.min(...bounds.map((b) => b[1]));
  const maxLng = Math.max(...bounds.map((b) => b[1]));

  return events.filter(
    (e) =>
      e.latitude >= minLat &&
      e.latitude <= maxLat &&
      e.longitude >= minLng &&
      e.longitude <= maxLng
  ).length;
}

function buildGeoJson(events: EventPoint[]): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = IRAN_PROVINCES.map((province) => {
    const count = countEventsInProvince(events, province.bounds);
    // GeoJSON uses [lng, lat] order
    const coordinates = [
      [...province.bounds.map((b) => [b[1], b[0]]),
      [province.bounds[0][1], province.bounds[0][0]]],
    ];

    return {
      type: "Feature",
      properties: {
        name: province.name,
        count,
      },
      geometry: {
        type: "Polygon",
        coordinates,
      },
    };
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

export function ChoroplethOverlay({ events }: ChoroplethOverlayProps) {
  const map = useMap();

  useEffect(() => {
    const geojson = buildGeoJson(events);

    const layer = L.geoJSON(geojson, {
      style: (feature) => {
        const count = feature?.properties?.count ?? 0;
        return {
          fillColor: getColor(count),
          fillOpacity: 0.35,
          color: getColor(count),
          weight: 1.5,
          opacity: 0.8,
        };
      },
      onEachFeature: (feature, featureLayer) => {
        const name = feature.properties?.name ?? "";
        const count = feature.properties?.count ?? 0;
        featureLayer.bindTooltip(
          `<div class="text-sm font-medium">${name}</div><div class="text-xs">${count} olay</div>`,
          { sticky: true, className: "choropleth-tooltip" }
        );

        featureLayer.on({
          mouseover: (e) => {
            const target = e.target as L.Path;
            target.setStyle({ fillOpacity: 0.6, weight: 2.5 });
          },
          mouseout: (e) => {
            const target = e.target as L.Path;
            target.setStyle({ fillOpacity: 0.35, weight: 1.5 });
          },
        });
      },
    });

    layer.addTo(map);

    // Add legend
    const legend = new L.Control({ position: "bottomright" });
    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "choropleth-legend");
      div.innerHTML = `
        <div style="background: rgba(15,17,23,0.9); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 12px; font-size: 11px; color: #d4d4d8;">
          <div style="font-weight: 600; margin-bottom: 6px;">Olay Yogunlugu</div>
          <div style="display: flex; flex-direction: column; gap: 3px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 14px; height: 14px; border-radius: 3px; background: #22c55e; display: inline-block;"></span>
              0 - 5
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 14px; height: 14px; border-radius: 3px; background: #eab308; display: inline-block;"></span>
              6 - 15
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 14px; height: 14px; border-radius: 3px; background: #f97316; display: inline-block;"></span>
              16 - 30
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="width: 14px; height: 14px; border-radius: 3px; background: #ef4444; display: inline-block;"></span>
              31+
            </div>
          </div>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    return () => {
      map.removeLayer(layer);
      map.removeControl(legend);
    };
  }, [map, events]);

  return null;
}
