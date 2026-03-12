export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min max for Vercel Pro

import { NextRequest, NextResponse } from "next/server";
import { runFetchAll, getIsFetching } from "@/lib/fetchers/fetch-orchestrator";
import { requireCronSecret } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = requireCronSecret(request);
  if (authError) return authError;

  if (getIsFetching()) {
    return NextResponse.json(
      { message: "Fetch already running, skipping" },
      { status: 200 }
    );
  }

  try {
    const summary = await runFetchAll();
    console.log(`[Cron] Completed: ${summary.totalSaved} saved, ${summary.totalDuplicates} dupes (${summary.durationMs}ms)`);
    return NextResponse.json({
      ok: true,
      saved: summary.totalSaved,
      duplicates: summary.totalDuplicates,
      duration: summary.durationMs,
    });
  } catch (error) {
    console.error("[Cron] Fetch failed:", error);
    return NextResponse.json(
      { error: "Fetch failed" },
      { status: 500 }
    );
  }
}
