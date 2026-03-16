import Link from "next/link";
import Image from "next/image";
import { Swords, Landmark, TrendingUp, HeartHandshake, Scale, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, truncate, highlightText } from "@/lib/utils";
import { PerspectiveBadge } from "@/components/news/perspective-badge";

const CATEGORY_COLORS: Record<string, string> = {
  ASKERI: "from-red-900 to-red-700",
  SIYASI: "from-blue-900 to-blue-700",
  EKONOMI: "from-green-900 to-green-700",
  INSANI_YARDIM: "from-orange-900 to-orange-700",
  DIPLOMASI: "from-purple-900 to-purple-700",
  GENEL: "from-gray-800 to-gray-600",
};

const CATEGORY_ICONS: Record<string, typeof Newspaper> = {
  ASKERI: Swords,
  SIYASI: Landmark,
  EKONOMI: TrendingUp,
  INSANI_YARDIM: HeartHandshake,
  DIPLOMASI: Scale,
  GENEL: Newspaper,
};

const CATEGORY_LABELS: Record<string, string> = {
  ASKERI: "Askerî",
  SIYASI: "Siyasî",
  EKONOMI: "Ekonomi",
  INSANI_YARDIM: "İnsanî Yardım",
  DIPLOMASI: "Diplomasi",
  GENEL: "Genel",
};

interface NewsCardProps {
  id: string;
  title: string;
  summary: string | null;
  source: string;
  category: string;
  perspective?: string | null;
  publishedAt: string;
  aiSummary: string | null;
  imageUrl?: string | null;
  searchQuery?: string;
}

function HighlightedText({ text, query }: { text: string; query?: string }) {
  if (!query) return <>{text}</>;
  const { parts } = highlightText(text, query);
  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <mark key={i} className="bg-yellow-500/30 text-inherit rounded-sm px-0.5">{part.text}</mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

export function NewsCard({ id, title, summary, source, category, perspective, publishedAt, aiSummary, imageUrl, searchQuery }: NewsCardProps) {
  const gradient = CATEGORY_COLORS[category] || CATEGORY_COLORS.GENEL;
  const CategoryIcon = CATEGORY_ICONS[category] || Newspaper;
  const isBreaking = new Date(publishedAt).getTime() > Date.now() - 3600000;

  return (
    <Link href={`/haberler/${id}`}>
      <Card className="group overflow-hidden transition-all hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5">
        <div className={`relative h-40 bg-gradient-to-br ${gradient} flex items-end p-4`}>
          {imageUrl ? (
            <>
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <CategoryIcon size={48} className="text-white/15" />
            </div>
          )}

          {/* Breaking news badge - top right */}
          {isBreaking && (
            <div className="absolute top-3 right-3 z-10">
              <Badge variant="destructive" className="text-[10px] px-2 py-0.5 animate-pulse font-bold">
                SON DAKİKA
              </Badge>
            </div>
          )}

          <div className="relative flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-black/40 text-white text-xs">
              {CATEGORY_LABELS[category] || category}
            </Badge>
            {perspective && <PerspectiveBadge perspective={perspective} className="bg-black/30 border-white/20" />}
            {aiSummary && (
              <Badge variant="warning" className="text-xs">AI Özet</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-sm font-semibold leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
            <HighlightedText text={title} query={searchQuery} />
          </h3>
          {summary && (
            <p className="mb-3 text-xs text-muted-foreground line-clamp-3">
              <HighlightedText text={truncate(summary, 150)} query={searchQuery} />
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
