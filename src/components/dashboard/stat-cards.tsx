import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Shield, Home, Newspaper } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface StatCardsProps {
  totalEvents: number;
  totalCasualties: number;
  civilianCasualties: number;
  militaryCasualties: number;
  totalDisplaced: number;
  totalNews: number;
}

const stats = [
  { key: "totalEvents", label: "Toplam Olay", icon: Activity, color: "text-red-400" },
  { key: "civilianCasualties", label: "Sivil Kayip", icon: Users, color: "text-orange-400" },
  { key: "militaryCasualties", label: "Askeri Kayip", icon: Shield, color: "text-yellow-400" },
  { key: "totalDisplaced", label: "Yerinden Edilen", icon: Home, color: "text-blue-400" },
  { key: "totalNews", label: "Toplam Haber", icon: Newspaper, color: "text-green-400" },
] as const;

export function StatCards(props: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {stats.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <CardContent className="flex items-center gap-3 p-4">
            <Icon className={`h-8 w-8 ${color}`} />
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-lg font-bold">{formatNumber(props[key])}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
