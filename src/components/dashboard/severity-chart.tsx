"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SEVERITY_COLORS: Record<string, string> = {
  DUSUK: "#22c55e",
  ORTA: "#eab308",
  YUKSEK: "#f97316",
  KRITIK: "#ef4444",
};

const SEVERITY_LABELS: Record<string, string> = {
  DUSUK: "Dusuk",
  ORTA: "Orta",
  YUKSEK: "Yuksek",
  KRITIK: "Kritik",
};

interface SeverityChartProps {
  data: { severity: string; count: number }[];
}

export function SeverityChart({ data }: SeverityChartProps) {
  const chartData = data.map((d) => ({ ...d, name: SEVERITY_LABELS[d.severity] || d.severity }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Siddet Dagilimi</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="count" nameKey="name" label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={SEVERITY_COLORS[data[index]?.severity] || "#666"} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
