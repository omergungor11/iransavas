import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface RecentEvent {
  id: string;
  title: string;
  date: string;
  eventType: string;
  severity: string;
  casualties: number | null;
}

const TYPE_LABELS: Record<string, string> = {
  CATISMA: "Catisma", HAVA_SALDIRISI: "Hava Saldirisi", DENIZ_OPERASYONU: "Deniz Op.",
  DIPLOMASI: "Diplomasi", INSANI_KRIZ: "Insani Kriz", DIGER: "Diger",
};

interface RecentEventsTableProps {
  events: RecentEvent[];
}

export function RecentEventsTable({ events }: RecentEventsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Son Olaylar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="pb-2 text-left font-medium">Tarih</th>
                <th className="pb-2 text-left font-medium">Olay</th>
                <th className="pb-2 text-left font-medium">Tur</th>
                <th className="pb-2 text-left font-medium">Siddet</th>
                <th className="pb-2 text-right font-medium">Kayip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-muted/50">
                  <td className="py-2 text-xs text-muted-foreground">{formatDate(event.date)}</td>
                  <td className="py-2 max-w-[200px] truncate">{event.title}</td>
                  <td className="py-2"><Badge variant="outline" className="text-xs">{TYPE_LABELS[event.eventType] || event.eventType}</Badge></td>
                  <td className="py-2">
                    <Badge variant={event.severity === "KRITIK" ? "critical" : event.severity === "YUKSEK" ? "warning" : "secondary"} className="text-xs">
                      {event.severity}
                    </Badge>
                  </td>
                  <td className="py-2 text-right text-red-400">{event.casualties ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
