"use client";

import { useState, useMemo } from "react";
import {
  sanctions,
  SANCTION_CATEGORIES,
  SANCTION_IMPOSERS,
  type SanctionCategory,
  type SanctionImposedBy,
  type SanctionStatus,
} from "@/lib/data/sanctions-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STATUS_STYLES: Record<SanctionStatus, { bg: string; text: string; label: string }> = {
  Aktif: { bg: "bg-red-500/20", text: "text-red-400", label: "Aktif" },
  "Askıya Alındı": { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Askıya Alındı" },
  Kaldırıldı: { bg: "bg-green-500/20", text: "text-green-400", label: "Kaldırıldı" },
};

const IMPOSER_COLORS: Record<SanctionImposedBy, string> = {
  ABD: "bg-blue-500/20 text-blue-400",
  AB: "bg-purple-500/20 text-purple-400",
  BM: "bg-cyan-500/20 text-cyan-400",
  "Diğer": "bg-zinc-500/20 text-zinc-400",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function YaptirimlarPage() {
  const [selectedCategory, setSelectedCategory] = useState<SanctionCategory | "TUMU">("TUMU");
  const [selectedImposer, setSelectedImposer] = useState<SanctionImposedBy | "TUMU">("TUMU");

  const filtered = useMemo(() => {
    return sanctions.filter((s) => {
      if (selectedCategory !== "TUMU" && s.category !== selectedCategory) return false;
      if (selectedImposer !== "TUMU" && s.imposedBy !== selectedImposer) return false;
      return true;
    });
  }, [selectedCategory, selectedImposer]);

  // Summary stats
  const totalActive = sanctions.filter((s) => s.status === "Aktif").length;
  const byImposer = SANCTION_IMPOSERS.map((imp) => ({
    name: imp,
    count: sanctions.filter((s) => s.imposedBy === imp && s.status === "Aktif").length,
  }));
  const byCategory = SANCTION_CATEGORIES.map((cat) => ({
    name: cat,
    count: sanctions.filter((s) => s.category === cat && s.status === "Aktif").length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Yaptirimlar Takibi</h1>
        <p className="text-muted-foreground">
          Iran&apos;a uygulanan uluslararasi yaptirimlarin kapsamli takibi
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6 mb-8">
        <Card className="border-red-500/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{totalActive}</div>
            <div className="text-xs text-muted-foreground mt-1">Aktif Yaptirim</div>
          </CardContent>
        </Card>
        {byImposer.map((item) => (
          <Card key={item.name} className="border-zinc-700/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{item.count}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Kategoriye Gore Dagilim</h2>
        <div className="flex flex-wrap gap-2">
          {byCategory.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 rounded-lg border border-zinc-700/50 bg-card px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground">{item.name}</span>
              <Badge variant="secondary" className="text-xs">
                {item.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory("TUMU")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === "TUMU"
                ? "bg-red-600 text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            Tum Kategoriler
          </button>
          {SANCTION_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-border mx-1 hidden sm:block self-center" />

        {/* Imposer filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedImposer("TUMU")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedImposer === "TUMU"
                ? "bg-blue-600 text-white"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            Tum Kaynaklari
          </button>
          {SANCTION_IMPOSERS.map((imp) => (
            <button
              key={imp}
              onClick={() => setSelectedImposer(imp)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedImposer === imp
                  ? "bg-blue-600 text-white"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {imp}
            </button>
          ))}
        </div>
      </div>

      {/* Sanctions Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((sanction) => {
          const statusStyle = STATUS_STYLES[sanction.status];
          const imposerColor = IMPOSER_COLORS[sanction.imposedBy];

          return (
            <Card key={sanction.id} className="border-zinc-700/50 hover:border-zinc-600/80 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-semibold leading-tight">
                    {sanction.title}
                  </CardTitle>
                  <Badge
                    className={`shrink-0 ${statusStyle.bg} ${statusStyle.text} border-0 text-[10px]`}
                  >
                    {statusStyle.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {sanction.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`${imposerColor} border-0 text-[10px]`}>
                      {sanction.imposedBy}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {sanction.category}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {formatDate(sanction.date)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">
            Secilen filtrelere uygun yaptirim bulunamadi.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("TUMU");
              setSelectedImposer("TUMU");
            }}
            className="mt-3 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
}
