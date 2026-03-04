export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { runDataCompiler, getLastCompileSummary } from "@/lib/data-compiler";

export async function POST() {
  try {
    const summary = await runDataCompiler();
    return NextResponse.json({ data: summary });
  } catch (error) {
    console.error("[API /compile]", error);
    return NextResponse.json(
      { error: { statusCode: 500, code: "COMPILE_ERROR", message: error instanceof Error ? error.message : "Derleme hatasi" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  const summary = getLastCompileSummary();
  if (!summary) {
    return NextResponse.json({ data: null, message: "Henuz derleme yapilmadi" });
  }
  return NextResponse.json({ data: summary });
}
