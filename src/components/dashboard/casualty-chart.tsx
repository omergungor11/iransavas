"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CasualtyChartProps {
  data: { date: string; civilian: number; military: number }[];
}

export function CasualtyChart({ data }: CasualtyChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Kayip Trendi</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a2e", border: "1px solid #333", borderRadius: "8px" }} />
            <Legend />
            <Area type="monotone" dataKey="civilian" name="Sivil" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
            <Area type="monotone" dataKey="military" name="Askeri" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
