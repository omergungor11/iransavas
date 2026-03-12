export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin, validateCronInterval } from "@/lib/auth";

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
  } catch {
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Durum alinamadi" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) return authError;

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: { statusCode: 400, code: "BAD_REQUEST", message: "Gecersiz JSON body" } },
        { status: 400 }
      );
    }

    const action = body.action as string;

    if (action === "start") {
      const interval = (body.interval as string) || "*/30 * * * *";
      if (!validateCronInterval(interval)) {
        return NextResponse.json(
          { error: { statusCode: 400, code: "BAD_REQUEST", message: "Gecersiz cron interval. Izin verilenler: */15, */30, saatlik, 2 saatlik, 6 saatlik, gunluk" } },
          { status: 400 }
        );
      }
      const { startCron } = await import("@/lib/fetchers/cron-scheduler");
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
  } catch {
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Islem basarisiz" } },
      { status: 500 }
    );
  }
}
