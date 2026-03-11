"use client";

import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { StatCards } from "@/components/dashboard/stat-cards";
import { CasualtyChart } from "@/components/dashboard/casualty-chart";
import { EventsByTypeChart } from "@/components/dashboard/events-by-type-chart";
import { SeverityChart } from "@/components/dashboard/severity-chart";
import { RecentEventsTable } from "@/components/dashboard/recent-events-table";

interface DashboardData {
  totalEvents: number;
  totalCasualties: number;
  totalDisplaced: number;
  totalNews: number;
  recentEvents: Array<{ id: string; title: string; date: string; eventType: string; severity: string; casualties: number | null }>;
  casualtyTrend: Array<{ date: string; civilian: number; military: number }>;
  eventsByType: Array<{ type: string; count: number }>;
  eventsBySeverity: Array<{ severity: string; count: number }>;
}

export default function AnalizPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const json = await res.json();
        setData(json.data);
      } catch (err) {
        console.error("[Analiz]", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !data) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 w-64 animate-pulse rounded bg-muted" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-80 animate-pulse rounded-lg bg-muted" />
            <div className="h-80 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  // Calculate civilian/military from casualty trend
  const totalCivilian = data.casualtyTrend.reduce((sum, d) => sum + d.civilian, 0);
  const totalMilitary = data.casualtyTrend.reduce((sum, d) => sum + d.military, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
          <BarChart3 className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Savas Analiz Dashboard&apos;u</h1>
          <p className="text-muted-foreground">Kapsamli istatistikler ve trend analizleri</p>
        </div>
      </div>

      <div className="space-y-6">
        <StatCards
          totalEvents={data.totalEvents}
          totalCasualties={data.totalCasualties}
          civilianCasualties={totalCivilian}
          militaryCasualties={totalMilitary}
          totalDisplaced={data.totalDisplaced}
          totalNews={data.totalNews}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <CasualtyChart data={data.casualtyTrend} />
          <EventsByTypeChart data={data.eventsByType} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SeverityChart data={data.eventsBySeverity} />
          <RecentEventsTable events={data.recentEvents} />
        </div>
      </div>
    </div>
  );
}
