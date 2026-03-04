import { NextResponse } from "next/server";
import { fetchLiveStreams } from "@/lib/fetchers/livestream-fetcher";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const streams = await fetchLiveStreams();
    return NextResponse.json({ data: streams });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unknown error" } },
      { status: 500 }
    );
  }
}
