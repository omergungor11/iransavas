"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Calendar,
  Shield,
  Eye,
  Users,
  Flame,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeeklyReportData {
  id: string;
  weekStart: string;
  weekEnd: string;
  summary: string;
  keyEvents: string;
  tensionTrend: string;
  tensionScore: number;
  totalIncidents: number;
  totalCasualties: number;
  outlook: string;
  publishedAt: string;
}

const TREND_CONFIG: Record<string, { label: string; color: string; icon: typeof TrendingUp }> = {
  rising: { label: "Yükseliyor", color: "text-red-400", icon: TrendingUp },
  stable: { label: "Sabit", color: "text-yellow-400", icon: Minus },
  declining: { label: "Düşüyor", color: "text-green-400", icon: TrendingDown },
};

function getTensionBadgeColor(score: number): string {
  if (score >= 80) return "bg-red-600/20 text-red-400 border-red-500/30";
  if (score >= 60) return "bg-orange-600/20 text-orange-400 border-orange-500/30";
  if (score >= 40) return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
  return "bg-green-600/20 text-green-400 border-green-500/30";
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  return `${s.toLocaleDateString("tr-TR", opts)} — ${e.toLocaleDateString("tr-TR", opts)}`;
}

export default function HaftalikOzetPage() {
  const [report, setReport] = useState<WeeklyReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch("/api/weekly-report");
        const json = await res.json();
        setReport(json.data);
      } catch (err) {
        console.error("Weekly report fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="h-8 w-64 animate-pulse rounded bg-muted mb-4" />
        <div className="h-4 w-48 animate-pulse rounded bg-muted mb-8" />
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/40" />
        <p className="text-muted-foreground">Haftalik rapor yuklenemedi.</p>
      </div>
    );
  }

  const keyEvents: string[] = (() => {
    try {
      return JSON.parse(report.keyEvents);
    } catch {
      return [];
    }
  })();

  const trend = TREND_CONFIG[report.tensionTrend] || TREND_CONFIG.stable;
  const TrendIcon = trend.icon;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Haftalik Durum Raporu</h1>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <Calendar size={14} />
          <span>{formatDateRange(report.weekStart, report.weekEnd)}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Shield size={20} className="text-red-400 mb-2" />
            <span className="text-2xl font-bold">{report.totalIncidents}</span>
            <span className="text-xs text-muted-foreground">Toplam Olay</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Users size={20} className="text-orange-400 mb-2" />
            <span className="text-2xl font-bold">{report.totalCasualties}</span>
            <span className="text-xs text-muted-foreground">Toplam Kayip</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Flame size={20} className={trend.color + " mb-2"} />
            <span className={`text-2xl font-bold ${trend.color}`}>{report.tensionScore}</span>
            <span className="text-xs text-muted-foreground">Gerilim Skoru</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <TrendIcon size={20} className={trend.color + " mb-2"} />
            <span className={`text-sm font-semibold ${trend.color}`}>{trend.label}</span>
            <span className="text-xs text-muted-foreground">Trend</span>
          </CardContent>
        </Card>
      </div>

      {/* Bu Hafta Ne Oldu */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar size={18} className="text-red-400" />
            Bu Hafta Ne Oldu
          </CardTitle>
          <CardDescription>Haftanin genel degerlendirmesi</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-zinc-300">{report.summary}</p>
        </CardContent>
      </Card>

      {/* One Cikan Gelismeler */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-400" />
            One Cikan Gelismeler
          </CardTitle>
          <CardDescription>Bu haftanin kritik olaylari</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {keyEvents.map((event, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600/20 text-xs font-bold text-red-400">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-300">{event}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Gerilim Trendi */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendIcon size={18} className={trend.color} />
            Gerilim Trendi
          </CardTitle>
          <CardDescription>Haftalik gerilim analizi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${getTensionBadgeColor(report.tensionScore)}`}
            >
              <TrendIcon size={14} />
              {report.tensionScore}/100 — {trend.label}
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${report.tensionScore}%`,
                background:
                  report.tensionScore >= 80
                    ? "linear-gradient(90deg, #ef4444, #dc2626)"
                    : report.tensionScore >= 60
                      ? "linear-gradient(90deg, #f97316, #ea580c)"
                      : report.tensionScore >= 40
                        ? "linear-gradient(90deg, #eab308, #ca8a04)"
                        : "linear-gradient(90deg, #22c55e, #16a34a)",
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Dusuk</span>
            <span>Orta</span>
            <span>Yuksek</span>
            <span>Kritik</span>
          </div>
        </CardContent>
      </Card>

      {/* Onumuzdeki Hafta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye size={18} className="text-blue-400" />
            Onumuzdeki Hafta
          </CardTitle>
          <CardDescription>Ne izleyelim?</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-zinc-300">{report.outlook}</p>
        </CardContent>
      </Card>
    </div>
  );
}
