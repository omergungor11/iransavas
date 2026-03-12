import { NextResponse } from "next/server";
import { fetchLiveStreams } from "@/lib/fetchers/livestream-fetcher";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const streams = await fetchLiveStreams();
    return NextResponse.json({ data: streams });
  } catch (error) {
    return NextResponse.json(
      { error: { statusCode: 500, code: "INTERNAL_ERROR", message: "Canlı yayın verileri alınamadı" } },
      { status: 500 }
    );
  }
}
