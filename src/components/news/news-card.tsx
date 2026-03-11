import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, truncate } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  ASKERI: "from-red-900 to-red-700",
  SIYASI: "from-blue-900 to-blue-700",
  EKONOMI: "from-green-900 to-green-700",
  INSANI_YARDIM: "from-orange-900 to-orange-700",
  DIPLOMASI: "from-purple-900 to-purple-700",
  GENEL: "from-gray-800 to-gray-600",
};

const CATEGORY_LABELS: Record<string, string> = {
  ASKERI: "Askeri",
  SIYASI: "Siyasi",
  EKONOMI: "Ekonomi",
  INSANI_YARDIM: "Insani Yardim",
  DIPLOMASI: "Diplomasi",
  GENEL: "Genel",
};

interface NewsCardProps {
  id: string;
  title: string;
  summary: string | null;
  source: string;
  category: string;
  publishedAt: string;
  aiSummary: string | null;
  imageUrl?: string | null;
}

export function NewsCard({ id, title, summary, source, category, publishedAt, aiSummary, imageUrl }: NewsCardProps) {
  const gradient = CATEGORY_COLORS[category] || CATEGORY_COLORS.GENEL;

  return (
    <Link href={`/haberler/${id}`}>
      <Card className="group overflow-hidden transition-all hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5">
        <div className={`relative h-32 bg-gradient-to-br ${gradient} flex items-end p-4`}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {imageUrl && <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />}
          <div className="relative flex gap-2">
            <Badge variant="secondary" className="bg-black/40 text-white text-xs">
              {CATEGORY_LABELS[category] || category}
            </Badge>
            {aiSummary && (
              <Badge variant="warning" className="text-xs">AI Ozet</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-sm font-semibold leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
            {title}
          </h3>
          {summary && (
            <p className="mb-3 text-xs text-muted-foreground line-clamp-3">
              {truncate(summary, 150)}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{source}</span>
            <span>{formatDate(publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
