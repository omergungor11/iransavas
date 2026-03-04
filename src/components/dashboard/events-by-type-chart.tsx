"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TYPE_LABELS: Record<string, string> = {
  CATISMA: "Catisma",
  HAVA_SALDIRISI: "Hava Saldirisi",
  DENIZ_OPERASYONU: "Deniz Op.",
  DIPLOMASI: "Diplomasi",
  INSANI_KRIZ: "Insani Kriz",
  DIGER: "Diger",
};

interface EventsByTypeChartProps {
  data: { type: string; count: number }[];
}

export function EventsByTypeChart({ data }: EventsByTypeChartProps) {
  const chartData = data.map((d) => ({ ...d, name: TYPE_LABELS[d.type] || d.type }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Olay Turleri</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis type="number" stroke="#666" fontSize={12} />
            <YAxis dataKey="name" type="category" stroke="#666" fontSize={12} width={100} />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
            <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
