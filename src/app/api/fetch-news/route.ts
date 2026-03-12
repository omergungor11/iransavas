export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { runFetchAll, getIsFetching } from "@/lib/fetchers/fetch-orchestrator";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    if (getIsFetching()) {
      return NextResponse.json(
        { error: { statusCode: 409, code: "ALREADY_RUNNING", message: "Fetch islemi devam ediyor" } },
        { status: 409 }
      );
    }

    const summary = await runFetchAll();
    return NextResponse.json({ data: summary });
  } catch (error) {
    console.error("[API /fetch-news]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Fetch basarisiz" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { getLastFetchSummary } = await import("@/lib/fetchers/fetch-orchestrator");
    const { getCronStatus } = await import("@/lib/fetchers/cron-scheduler");

    return NextResponse.json({
      data: {
        cron: getCronStatus(),
        lastFetch: getLastFetchSummary(),
      },
    });
  } catch (error) {
    console.error("[API /fetch-news GET]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Durum alinamadi" } },
      { status: 500 }
    );
  }
}
