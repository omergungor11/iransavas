"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Prediction {
  question: string;
  probability: number;
  trend: "up" | "down" | "stable";
}

const PREDICTIONS: Prediction[] = [
  {
    question: "Iran nukleer silah uretecek mi? (6 ay icinde)",
    probability: 18,
    trend: "up",
  },
  {
    question: "Hurmuz Bogazi kapatilacak mi?",
    probability: 32,
    trend: "up",
  },
  {
    question: "Ateskes saglanacak mi? (3 ay icinde)",
    probability: 24,
    trend: "down",
  },
  {
    question: "ABD kara operasyonu baslatacak mi?",
    probability: 8,
    trend: "stable",
  },
  {
    question: "Israil ikinci dalga hava saldirisi yapacak mi?",
    probability: 55,
    trend: "up",
  },
];

function trendIcon(trend: Prediction["trend"]) {
  switch (trend) {
    case "up":
      return <TrendingUp size={14} className="text-red-400" />;
    case "down":
      return <TrendingDown size={14} className="text-green-400" />;
    case "stable":
      return <Minus size={14} className="text-zinc-400" />;
  }
}

function barColor(probability: number): string {
  if (probability >= 50) return "bg-red-500";
  if (probability >= 30) return "bg-yellow-500";
  return "bg-green-500";
}

export function PredictionWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tahmin Piyasasi</CardTitle>
        <p className="text-xs text-muted-foreground">
          Catismayla ilgili onemli sorularin olasilik degerlendirmesi
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {PREDICTIONS.map((pred, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm leading-snug">{pred.question}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {trendIcon(pred.trend)}
                  <span className="text-sm font-bold tabular-nums">
                    %{pred.probability}
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor(pred.probability)}`}
                  style={{ width: `${pred.probability}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
