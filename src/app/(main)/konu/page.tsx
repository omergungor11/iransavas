"use client";

import Link from "next/link";
import { Anchor, Atom, Plane, Shield, Heart, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TOPIC_HUBS } from "@/lib/data/topic-hubs";

const ICON_MAP: Record<string, LucideIcon> = {
  anchor: Anchor,
  atom: Atom,
  plane: Plane,
  shield: Shield,
  heart: Heart,
};

export default function KonuIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Konu Merkezleri</h1>
        <p className="text-muted-foreground mt-1">
          Iran savasi ile ilgili onemli konulari detayli takip edin
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPIC_HUBS.map((topic) => {
          const Icon = ICON_MAP[topic.icon] ?? Atom;
          return (
            <Link key={topic.slug} href={`/konu/${topic.slug}`}>
              <Card className="h-full transition-colors hover:border-white/20 hover:bg-white/[0.02]">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10">
                      <Icon className="h-4 w-4 text-red-400" />
                    </div>
                    <CardTitle className="text-base">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {topic.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {topic.keywords.slice(0, 4).map((kw) => (
                      <span
                        key={kw}
                        className="inline-block rounded bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
