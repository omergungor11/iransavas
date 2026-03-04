export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { runFetchAll, getIsFetching } from "@/lib/fetchers/fetch-orchestrator";

export async function POST(request: NextRequest) {
  try {
    // Simple auth check via header
    const authHeader = request.headers.get("x-admin-key");
    if (process.env.ADMIN_KEY && authHeader !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: { statusCode: 401, code: "UNAUTHORIZED", message: "Gecersiz admin key" } },
        { status: 401 }
      );
    }

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
