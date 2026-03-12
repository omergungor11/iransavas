"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeEvent {
  lat: number;
  lng: number;
  label: string;
  color: string;
  size: number;
}

// Key conflict zones and military points
const STATIC_POINTS: GlobeEvent[] = [
  // Iran
  { lat: 35.6892, lng: 51.389, label: "Tahran", color: "#ef4444", size: 1.2 },
  { lat: 32.6546, lng: 51.6680, label: "İsfahan (Nükleer)", color: "#f97316", size: 1.0 },
  { lat: 33.7294, lng: 51.4146, label: "Natanz (Nükleer)", color: "#f97316", size: 0.9 },
  { lat: 28.9234, lng: 50.8203, label: "Büşehr (Nükleer)", color: "#f97316", size: 0.9 },
  { lat: 38.0962, lng: 46.2738, label: "Tebriz", color: "#ef4444", size: 0.7 },
  { lat: 27.1832, lng: 56.2666, label: "Bandar Abbas", color: "#3b82f6", size: 0.8 },
  // Strait of Hormuz
  { lat: 26.5, lng: 56.5, label: "Hürmüz Boğazı", color: "#06b6d4", size: 1.1 },
  // Israel
  { lat: 32.0853, lng: 34.7818, label: "Tel Aviv", color: "#22c55e", size: 0.9 },
  { lat: 31.7683, lng: 35.2137, label: "Kudüs", color: "#22c55e", size: 0.8 },
  { lat: 31.2590, lng: 34.7913, label: "Negev (Dimona)", color: "#f97316", size: 0.8 },
  // Iraq
  { lat: 33.3152, lng: 44.3661, label: "Bagdat", color: "#eab308", size: 0.8 },
  // Syria
  { lat: 33.5138, lng: 36.2765, label: "Şam", color: "#eab308", size: 0.7 },
  // Lebanon
  { lat: 33.8938, lng: 35.5018, label: "Beyrut", color: "#eab308", size: 0.7 },
  // Yemen
  { lat: 15.3694, lng: 44.1910, label: "San'a", color: "#ef4444", size: 0.7 },
  // US Bases
  { lat: 25.9304, lng: 50.6378, label: "Bahreyn (5. Filo)", color: "#3b82f6", size: 0.8 },
  { lat: 25.1185, lng: 51.3110, label: "Al Udeid (CENTCOM)", color: "#3b82f6", size: 0.9 },
  { lat: 29.0, lng: 47.5, label: "Kuveyt (US)", color: "#3b82f6", size: 0.7 },
];

// Arc connections showing strategic corridors
const ARCS = [
  { startLat: 35.69, startLng: 51.39, endLat: 33.51, endLng: 36.28, color: "rgba(239,68,68,0.4)" }, // Tehran-Damascus
  { startLat: 35.69, startLng: 51.39, endLat: 33.89, endLng: 35.50, color: "rgba(239,68,68,0.3)" }, // Tehran-Beirut
  { startLat: 35.69, startLng: 51.39, endLat: 15.37, endLng: 44.19, color: "rgba(239,68,68,0.3)" }, // Tehran-Sanaa
  { startLat: 32.09, startLng: 34.78, endLat: 25.12, endLng: 51.31, color: "rgba(59,130,246,0.3)" }, // Tel Aviv-Qatar
  { startLat: 26.5, startLng: 56.5, endLat: 25.93, endLng: 50.64, color: "rgba(6,182,212,0.4)" }, // Hormuz-Bahrain
];

export function Globe3D() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate container size
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Auto-rotate and set initial view to Middle East
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // Focus on Middle East
    globe.pointOfView({ lat: 30, lng: 48, altitude: 2.2 });

    // Enable auto-rotate
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = true;
  }, [dimensions]); // Re-run when globe mounts (dimensions change)

  // Pulsing effect via animated ring data
  const ringsData = useMemo(() =>
    STATIC_POINTS.filter((p) => p.size >= 0.9).map((p) => ({
      lat: p.lat,
      lng: p.lng,
      maxR: p.size * 3,
      propagationSpeed: 1.5,
      repeatPeriod: 1200,
      color: p.color,
    })),
    []
  );

  if (dimensions.width === 0) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full bg-black">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="#ef4444"
        atmosphereAltitude={0.15}
        // Points
        pointsData={STATIC_POINTS}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.01}
        pointRadius={(d: object) => (d as GlobeEvent).size * 0.3}
        pointLabel={(d: object) => {
          const p = d as GlobeEvent;
          return `<div style="background:rgba(0,0,0,0.8);padding:4px 8px;border-radius:4px;font-size:11px;color:white;border:1px solid ${p.color}">${p.label}</div>`;
        }}
        // Arcs
        arcsData={ARCS}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        // Rings (pulse effect)
        ringsData={ringsData}
        ringColor={(d: object) => (t: number) => {
          const ring = d as { color: string };
          const alpha = 1 - t;
          return ring.color.replace(")", `,${alpha})`).replace("rgb", "rgba");
        }}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />
    </div>
  );
}
