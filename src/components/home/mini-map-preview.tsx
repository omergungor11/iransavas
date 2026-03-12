"use client";

import Link from "next/link";
import nextDynamic from "next/dynamic";
import { MapPin, ArrowRight } from "lucide-react";

const WarMap = nextDynamic(
  () => import("@/components/map/war-map").then((mod) => mod.WarMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-card">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      </div>
    ),
  }
);

export function MiniMapPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
            <MapPin className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Savaş Haritası</h2>
            <p className="text-sm text-muted-foreground">Canlı olay takibi — İran bölgesi</p>
          </div>
        </div>
        <Link
          href="/harita"
          className="flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
        >
          Tam Ekran
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card" style={{ height: "500px" }}>
        <WarMap />
      </div>
    </section>
  );
}
