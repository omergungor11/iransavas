"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TensionDataPoint {
  date: string;
  score: number;
  label?: string;
}

interface TensionChartProps {
  data: TensionDataPoint[];
  currentScore: number;
  currentLevel: string;
}

function getTrendInfo(data: TensionDataPoint[]): { direction: "up" | "down" | "stable"; delta: number } {
  if (data.length < 2) return { direction: "stable", delta: 0 };
  const recent = data[data.length - 1].score;
  const previous = data[data.length - 2].score;
  const delta = recent - previous;
  if (delta > 3) return { direction: "up", delta };
  if (delta < -3) return { direction: "down", delta };
  return { direction: "stable", delta };
}

function getLevelLabel(level: string): string {
  switch (level) {
    case "SEVERE": return "Kritik";
    case "HIGH": return "Yüksek";
    case "ELEVATED": return "Yükselişte";
    case "LOW": return "Düşük";
    default: return level;
  }
}

function getLevelColor(level: string): string {
  switch (level) {
    case "SEVERE": return "text-red-500";
    case "HIGH": return "text-orange-500";
    case "ELEVATED": return "text-yellow-500";
    default: return "text-green-500";
  }
}

export function TensionChart({ data, currentScore, currentLevel }: TensionChartProps) {
  const trend = getTrendInfo(data);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Gerilim Endeksi Trendi</CardTitle>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-black font-mono ${getLevelColor(currentLevel)}`}>
              {currentScore}
            </span>
            <div className="flex flex-col items-end">
              <span className={`text-[10px] font-bold uppercase ${getLevelColor(currentLevel)}`}>
                {getLevelLabel(currentLevel)}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                {trend.direction === "up" && <TrendingUp size={10} className="text-red-400" />}
                {trend.direction === "down" && <TrendingDown size={10} className="text-green-400" />}
                {trend.direction === "stable" && <Minus size={10} className="text-muted-foreground" />}
                {trend.direction === "up" ? "Yükseliyor" : trend.direction === "down" ? "Azalıyor" : "Stabil"}
                {trend.delta !== 0 && ` (${trend.delta > 0 ? "+" : ""}${trend.delta})`}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="tensionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#666" fontSize={11} />
            <YAxis domain={[0, 100]} stroke="#666" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px", fontSize: "12px" }}
              formatter={(value: number) => [`${value}/100`, "Gerilim"]}
              labelFormatter={(label: string) => `Tarih: ${label}`}
            />
            {/* Severity zones */}
            <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="3 3" label={{ value: "Kritik", fill: "#ef4444", fontSize: 10, position: "right" }} />
            <ReferenceLine y={60} stroke="#f97316" strokeDasharray="3 3" label={{ value: "Yüksek", fill: "#f97316", fontSize: 10, position: "right" }} />
            <ReferenceLine y={35} stroke="#eab308" strokeDasharray="3 3" label={{ value: "Yükseliş", fill: "#eab308", fontSize: 10, position: "right" }} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#tensionGradient)"
              dot={{ fill: "#ef4444", r: 3 }}
              activeDot={{ r: 5, fill: "#ef4444", stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> 80+ Kritik</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> 60-79 Yüksek</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> 35-59 Yükselişte</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> 0-34 Düşük</span>
        </div>
      </CardContent>
    </Card>
  );
}
