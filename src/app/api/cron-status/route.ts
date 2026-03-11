export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const { getCronStatus } = await import("@/lib/fetchers/cron-scheduler");
    const { getLastFetchSummary, getIsFetching } = await import("@/lib/fetchers/fetch-orchestrator");

    return NextResponse.json({
      data: {
        cron: getCronStatus(),
        isFetching: getIsFetching(),
        lastFetch: getLastFetchSummary(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Durum alinamadi" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action as string;

    if (action === "start") {
      const { startCron } = await import("@/lib/fetchers/cron-scheduler");
      const interval = body.interval || "*/30 * * * *";
      startCron(interval);
      return NextResponse.json({ data: { message: "Cron baslatildi", interval } });
    }

    if (action === "stop") {
      const { stopCron } = await import("@/lib/fetchers/cron-scheduler");
      stopCron();
      return NextResponse.json({ data: { message: "Cron durduruldu" } });
    }

    return NextResponse.json(
      { error: { statusCode: 400, code: "BAD_REQUEST", message: "Gecersiz action. 'start' veya 'stop' kullanin." } },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Islem basarisiz" } },
      { status: 500 }
    );
  }
}
