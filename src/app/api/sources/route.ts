export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { NEWS_SOURCES } from "@/lib/fetchers/sources";

export async function GET() {
  return NextResponse.json({
    data: NEWS_SOURCES.map((s) => ({
      id: s.id,
      name: s.name,
      type: s.type,
      url: s.url,
      language: s.language,
      category: s.category,
      enabled: s.enabled,
    })),
  });
}
