"use client";

import { TimelineEntryCard } from "./timeline-entry-card";

interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  importance: string;
}

interface VerticalTimelineProps {
  entries: TimelineEntry[];
}

export function VerticalTimeline({ entries }: VerticalTimelineProps) {
  if (entries.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p>Gosterilecek olay bulunamadi.</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Center line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-border md:left-1/2 md:-translate-x-px" />

      <div className="space-y-8 py-8">
        {entries.map((entry, index) => (
          <TimelineEntryCard
            key={entry.id}
            title={entry.title}
            description={entry.description}
            date={entry.date}
            category={entry.category}
            importance={entry.importance}
            side={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>
    </div>
  );
}
