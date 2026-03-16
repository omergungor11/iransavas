"use client";

interface Article {
  source: string;
  perspective?: string | null;
}

interface SourceDiversityProps {
  articles: Article[];
}

interface PerspectiveGroup {
  label: string;
  key: string;
  color: string;
  bgColor: string;
  count: number;
  sources: string[];
}

const PERSPECTIVE_MAP: Record<string, { label: string; color: string; bgColor: string }> = {
  "Bati": { label: "Bati", color: "bg-blue-500", bgColor: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  "Bolgesel": { label: "Bolgesel", color: "bg-amber-500", bgColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  "Turk": { label: "Turk", color: "bg-red-500", bgColor: "bg-red-500/10 text-red-400 border-red-500/20" },
  "Iran": { label: "Iran", color: "bg-green-500", bgColor: "bg-green-500/10 text-green-400 border-green-500/20" },
  "Israil": { label: "Israil", color: "bg-indigo-500", bgColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
};

function classifyPerspective(perspective: string | null | undefined, source: string): string {
  const p = (perspective || "").toLowerCase();
  const s = source.toLowerCase();

  if (p.includes("iran") || s.includes("irna") || s.includes("press tv") || s.includes("tehran")) {
    return "Iran";
  }
  if (p.includes("israil") || p.includes("israel") || s.includes("times of israel") || s.includes("jerusalem post") || s.includes("haaretz")) {
    return "Israil";
  }
  if (p.includes("turk") || p.includes("türk") || s.includes("anadolu") || s.includes("trt") || s.includes("hurriyet")) {
    return "Turk";
  }
  if (p.includes("bati") || p.includes("batı") || s.includes("reuters") || s.includes("bbc") || s.includes("cnn") || s.includes("ap") || s.includes("guardian") || s.includes("financial times")) {
    return "Bati";
  }
  // Default to Bolgesel for regional/independent sources
  return "Bolgesel";
}

export function SourceDiversity({ articles }: SourceDiversityProps) {
  if (articles.length === 0) return null;

  const uniqueSources = new Set<string>();
  const groupMap: Record<string, Set<string>> = {};

  for (const article of articles) {
    const group = classifyPerspective(article.perspective, article.source);
    uniqueSources.add(article.source);

    if (!groupMap[group]) {
      groupMap[group] = new Set();
    }
    groupMap[group].add(article.source);
  }

  const groups: PerspectiveGroup[] = Object.entries(PERSPECTIVE_MAP)
    .map(([key, config]) => ({
      ...config,
      key,
      count: groupMap[key]?.size || 0,
      sources: Array.from(groupMap[key] || []),
    }))
    .filter((g) => g.count > 0);

  const totalUnique = uniqueSources.size;

  if (totalUnique === 0) return null;

  const maxCount = Math.max(...groups.map((g) => g.count));

  return (
    <div className="mb-4 rounded-lg border border-border/50 bg-card/50 p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground">
          Kaynak Cesitliligi
        </span>
        <span className="text-xs text-muted-foreground">
          {totalUnique} farkli kaynak
        </span>
      </div>

      <div className="flex items-end gap-1.5">
        {groups.map((group) => (
          <div key={group.key} className="flex-1 group relative">
            {/* Bar */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-sm ${group.color} transition-all`}
                style={{
                  height: `${Math.max(4, (group.count / maxCount) * 24)}px`,
                  opacity: 0.7 + (group.count / maxCount) * 0.3,
                }}
              />
              <span className="text-[10px] text-muted-foreground text-center leading-tight">
                {group.label}
              </span>
              <span className="text-[10px] font-medium text-foreground/70">
                {group.count}
              </span>
            </div>

            {/* Tooltip on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="rounded-md bg-popover border border-border px-2 py-1.5 shadow-md whitespace-nowrap">
                <div className="text-xs font-medium mb-0.5">{group.label} Medyasi</div>
                {group.sources.map((src) => (
                  <div key={src} className="text-[10px] text-muted-foreground">{src}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
