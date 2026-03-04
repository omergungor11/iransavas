import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

const IMPORTANCE_COLORS: Record<string, string> = {
  LOW: "border-l-gray-500",
  MEDIUM: "border-l-blue-500",
  HIGH: "border-l-orange-500",
  CRITICAL: "border-l-red-500",
};

const IMPORTANCE_LABELS: Record<string, string> = {
  LOW: "Dusuk",
  MEDIUM: "Orta",
  HIGH: "Yuksek",
  CRITICAL: "Kritik",
};

interface TimelineEntryCardProps {
  title: string;
  description: string;
  date: string;
  category: string;
  importance: string;
  side: "left" | "right";
}

export function TimelineEntryCard({ title, description, date, category, importance, side }: TimelineEntryCardProps) {
  return (
    <div className={`flex w-full ${side === "right" ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-4`}>
      <div className="hidden md:block md:w-1/2" />
      <div className="relative flex flex-col items-center">
        <div className={`h-4 w-4 rounded-full border-2 ${importance === "CRITICAL" ? "border-red-500 bg-red-500/30" : importance === "HIGH" ? "border-orange-500 bg-orange-500/30" : importance === "MEDIUM" ? "border-blue-500 bg-blue-500/30" : "border-gray-500 bg-gray-500/30"}`} />
        <div className="h-full w-0.5 bg-border" />
      </div>
      <div className={`flex-1 md:w-1/2 rounded-lg border ${IMPORTANCE_COLORS[importance] || "border-l-gray-500"} border-l-4 bg-card p-4 transition-all hover:shadow-lg`}>
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <time>{formatDate(date)}</time>
        </div>
        <h3 className="mb-1 text-sm font-semibold">{title}</h3>
        <p className="mb-3 text-xs text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-xs">{category}</Badge>
          <Badge variant={importance === "CRITICAL" ? "critical" : importance === "HIGH" ? "warning" : "secondary"} className="text-xs">
            {IMPORTANCE_LABELS[importance] || importance}
          </Badge>
        </div>
      </div>
    </div>
  );
}
