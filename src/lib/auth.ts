import { NextRequest, NextResponse } from "next/server";

/**
 * Verify admin authentication. Fails closed — if ADMIN_KEY is not set, all requests are denied.
 * Supports both `Authorization: Bearer <key>` and `x-admin-key: <key>` headers.
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return NextResponse.json(
      { error: { statusCode: 503, code: "NOT_CONFIGURED", message: "Admin key yapilandirilmamis" } },
      { status: 503 }
    );
  }

  const bearerHeader = request.headers.get("authorization");
  const adminHeader = request.headers.get("x-admin-key");

  const token = bearerHeader?.startsWith("Bearer ") ? bearerHeader.slice(7) : adminHeader;

  if (token !== adminKey) {
    return NextResponse.json(
      { error: { statusCode: 401, code: "UNAUTHORIZED", message: "Gecersiz kimlik bilgisi" } },
      { status: 401 }
    );
  }

  return null; // Auth passed
}

/**
 * Verify Vercel cron secret. Fails closed — if CRON_SECRET is not set, denies.
 */
export function requireCronSecret(request: NextRequest): NextResponse | null {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: { statusCode: 503, code: "NOT_CONFIGURED", message: "Cron secret yapilandirilmamis" } },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

const ALLOWED_CRON_INTERVALS = [
  "*/15 * * * *",
  "*/30 * * * *",
  "0 * * * *",
  "0 */2 * * *",
  "0 */6 * * *",
  "0 0 * * *",
];

export function validateCronInterval(interval: string): boolean {
  return ALLOWED_CRON_INTERVALS.includes(interval);
}
