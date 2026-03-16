"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDate, relativeTime, truncate, highlightText } from "@/lib/utils";
import { PerspectiveBadge } from "@/components/news/perspective-badge";
import { BookmarkButton } from "@/components/news/bookmark-button";

interface NewsListItemProps {
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

export function NewsListItem({ id, title, summary, source, category, perspective, publishedAt, aiSummary, imageUrl, searchQuery }: NewsListItemProps) {
  const isBreaking = new Date(publishedAt).getTime() > Date.now() - 3600000;

  return (
    <Link href={`/haberler/${id}`}>
      <div className="group flex gap-4 rounded-lg border bg-card p-3 transition-all hover:border-red-500/30 hover:shadow-md">
        {imageUrl && (
          <div className="relative w-24 h-20 shrink-0 rounded-md overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            {isBreaking && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0 animate-pulse">
                SON DAKİKA
              </Badge>
            )}
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{category}</Badge>
            {perspective && <PerspectiveBadge perspective={perspective} />}
            {aiSummary && <Badge variant="warning" className="text-[10px] px-1.5 py-0">AI</Badge>}
          </div>
          <h3 className="text-sm font-semibold line-clamp-1 group-hover:text-red-400 transition-colors">
            <HighlightedText text={title} query={searchQuery} />
          </h3>
          {summary && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              <HighlightedText text={truncate(summary, 120)} query={searchQuery} />
            </p>
          )}
          <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
            <span>{source}</span>
            <span>·</span>
            <span title={formatDate(publishedAt)}>{relativeTime(publishedAt)}</span>
            <BookmarkButton articleId={id} size={13} className="ml-auto" />
          </div>
        </div>
      </div>
    </Link>
  );
}
