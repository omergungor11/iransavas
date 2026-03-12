"use client";

import { useEffect, useState, useCallback } from "react";
import { FileText, Download, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface Report {
  id: string;
  title: string;
  type: string;
  content: string;
  summary: string;
  period: string;
  publishedAt: string;
}

const REPORT_TYPES = [
  { value: "ALL", label: "Tumu" },
  { value: "HAFTALIK", label: "Haftalik" },
  { value: "AYLIK", label: "Aylik" },
  { value: "OZEL", label: "Ozel" },
];

const TYPE_COLORS: Record<string, string> = {
  HAFTALIK: "bg-blue-500/20 text-blue-400",
  AYLIK: "bg-green-500/20 text-green-400",
  OZEL: "bg-purple-500/20 text-purple-400",
};

export default function RaporlarPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params = new URLSearchParams();
      if (filter !== "ALL") params.set("type", filter);
      const res = await fetch(`/api/reports?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setReports(json.data || []);
    } catch (err) {
      console.error("[Raporlar]", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10">
          <FileText className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Raporlar</h1>
          <p className="text-muted-foreground">Haftalik, aylik ve ozel analiz raporlari</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {REPORT_TYPES.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilter(t.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === t.value ? "bg-red-600 text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <p className="text-sm font-medium text-foreground">Raporlar yuklenemedi</p>
          <p className="text-xs text-muted-foreground">Bir hata olustu. Lutfen tekrar deneyin.</p>
          <button
            onClick={fetchReports}
            className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium border border-border hover:bg-muted transition-colors text-muted-foreground"
          >
            <RefreshCw size={14} />
            Tekrar Dene
          </button>
        </div>
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {filter === "ALL" ? "Henuz rapor yok." : "Bu filtre icin rapor bulunamadi."}
          </p>
          {filter !== "ALL" && (
            <button
              onClick={() => setFilter("ALL")}
              className="mt-1 text-xs text-red-400 hover:text-red-300"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className={TYPE_COLORS[report.type] || ""}>{report.type}</Badge>
                    <span className="text-xs text-muted-foreground">{report.period}</span>
                  </div>
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-3 w-3" /> PDF
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{report.summary}</p>
                <p className="text-xs text-muted-foreground">{formatDate(report.publishedAt)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
