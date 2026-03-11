"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { MapFilters, type MapFiltersState } from "@/components/map/map-filters";
import { MapLegend } from "@/components/map/map-legend";
import { TimeSlider } from "@/components/map/time-slider";

const WarMapCanvas = dynamic(
  () => import("@/components/map/war-map-canvas").then((m) => m.WarMapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-gray-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      </div>
    ),
  },
);

// Default date range: last 90 days
const DEFAULT_MIN = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
const DEFAULT_MAX = new Date();

export default function HaritaPage() {
  const [filters, setFilters] = useState<MapFiltersState>({
    eventType: "ALL",
    severity: "ALL",
    dateRange: "all",
  });
  const [eventCount, setEventCount] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Time slider state
  const [timeFrom, setTimeFrom] = useState(DEFAULT_MIN);
  const [timeTo, setTimeTo] = useState(DEFAULT_MAX);

  const handleTimeChange = useCallback((from: Date, to: Date) => {
    setTimeFrom(from);
    setTimeTo(to);
    // Override dateRange filter with custom range
    setFilters((prev) => ({
      ...prev,
      dateRange: "custom",
      customFrom: from.toISOString(),
      customTo: to.toISOString(),
    }));
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
              <MapPin className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Interaktif Savas Haritasi</h1>
              <p className="text-xs text-muted-foreground">Canli olay takibi — {eventCount} olay</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" /> Filtreler
          </Button>
        </div>
      </div>

      {/* Main: Sidebar + Map */}
      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-white/10 bg-gray-950/80 p-4 overflow-y-auto">
          <MapFilters filters={filters} onChange={setFilters} eventCount={eventCount} />
          <div className="mt-4">
            <MapLegend inline />
          </div>
        </aside>

        {/* Mobile Sheet */}
        <Sheet open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
          <div className="p-4 pt-10 space-y-4">
            <MapFilters filters={filters} onChange={(f) => { setFilters(f); setMobileFiltersOpen(false); }} eventCount={eventCount} />
            <MapLegend inline />
          </div>
        </Sheet>

        {/* Map + Time Slider */}
        <div className="flex flex-1 flex-col min-h-0">
          <div className="relative flex-1 min-h-0">
            <WarMapCanvas filters={filters} onEventCountChange={setEventCount} />
            <div className="lg:hidden">
              <MapLegend />
            </div>
          </div>
          <TimeSlider
            minDate={DEFAULT_MIN}
            maxDate={DEFAULT_MAX}
            fromDate={timeFrom}
            toDate={timeTo}
            onChange={handleTimeChange}
          />
        </div>
      </div>
    </div>
  );
}
